#!/usr/bin/env python3
"""Validate StopDown's constraint library and measure how big the challenge pool is.

Usage:
    python3 tools/pool_report.py                       # all profiles in tools/profiles.json
    python3 tools/pool_report.py --profile starter     # one profile
    python3 tools/pool_report.py --time night --place outdoor
    python3 tools/pool_report.py --sample 20           # print 20 random valid 3-card challenges

The rules here mirror js/core.js. If you change one, change the other.
"""
import argparse, itertools, json, math, random, re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIBRARY = ROOT / "data" / "constraints.js"
PROFILES = Path(__file__).resolve().parent / "profiles.json"

ACCESSORIES = {"tripod", "flash", "off-camera-flash", "nd", "polariser", "reflector", "gels", "multi-exposure"}
LENS_CAPS = {"zoom", "prime", "wide", "tele", "fast-lens", "macro"}
KNOWN_CAPS = ACCESSORIES | LENS_CAPS
TIMES = {"day", "golden", "night"}
PLACES = {"indoor", "outdoor"}
GEAR_SLOTS = {"focal"}
FOCAL_STOPS = [10, 12, 14, 16, 18, 20, 24, 28, 35, 40, 50, 55, 70, 85, 105, 135, 150, 200, 250, 300, 400, 500, 600]
SLOT_RE = re.compile(r"\{([a-z]+)\}")


def load_library():
    """data/constraints.js is JSON wrapped in a line of JavaScript; read the JSON between the markers."""
    text = LIBRARY.read_text(encoding="utf-8")
    return json.loads(text.split("/*BEGIN-JSON*/", 1)[1].split("/*END-JSON*/", 1)[0])


# ---------- gear ----------
def capabilities(profile):
    caps = set(profile.get("accessories", []))
    if "off-camera-flash" in caps:
        caps.add("flash")
    crop = profile.get("cropFactor", 1.0)
    for l in profile.get("lenses", []):
        if l["minFocal"] < l["maxFocal"]: caps.add("zoom")
        if l["minFocal"] == l["maxFocal"]: caps.add("prime")
        if l["minFocal"] * crop <= 28: caps.add("wide")
        if l["maxFocal"] * crop >= 100: caps.add("tele")
        if l["maxAperture"] <= 2.0: caps.add("fast-lens")
        if l.get("isMacro"): caps.add("macro")
    return caps


def focal_options(profile):
    out = set()
    for l in profile.get("lenses", []):
        lo, hi = l["minFocal"], l["maxFocal"]
        out.update({lo, hi})
        out.update(s for s in FOCAL_STOPS if lo < s < hi)
    return sorted(out)


# ---------- rules (mirror Generator.swift) ----------
def slot_count(c, lib, profile):
    n = 1
    for slot in SLOT_RE.findall(c["text"]):
        if slot == "focal":
            n *= max(len(focal_options(profile)), 1)
        else:
            n *= len(lib["lists"].get(slot, [""]))
    return n


def allowed(c, caps, time, place, enabled_axes):
    if c["axis"] not in enabled_axes: return False
    if not set(c.get("requires", [])) <= caps: return False
    if time != "any" and c.get("time") and time not in c["time"]: return False
    if place != "any" and c.get("place") and place not in c["place"]: return False
    return True


def compatible(a, b):
    if a["axis"] == b["axis"]: return False
    if set(a.get("excludes", [])) & set(b.get("tags", [])): return False
    if set(b.get("excludes", [])) & set(a.get("tags", [])): return False
    for key in ("time", "place"):
        if a.get(key) and b.get(key) and not set(a[key]) & set(b[key]): return False
    return True


def difficulty_ok(ds, mode):
    n, total = len(ds), sum(ds)
    if mode == "relaxed": return max(ds) <= 2 and total <= math.ceil(1.5 * n)
    if mode == "balanced": return total <= 2 * n
    if mode == "tough": return total >= 2 * n
    return True


# ---------- validation ----------
def validate(lib):
    problems, warnings = [], []
    axis_ids = {a["id"] for a in lib["axes"]}
    group_ids = {g["id"] for g in lib["groups"]}
    for a in lib["axes"]:
        if a["group"] not in group_ids: problems.append(f"axis {a['id']}: unknown group {a['group']}")
    ids = Counter(c["id"] for c in lib["constraints"])
    for i, n in ids.items():
        if n > 1: problems.append(f"duplicate id {i}")
    all_tags = {t for c in lib["constraints"] for t in c.get("tags", [])}
    for c in lib["constraints"]:
        cid = c["id"]
        if c["axis"] not in axis_ids: problems.append(f"{cid}: unknown axis {c['axis']}")
        if c["difficulty"] not in (1, 2, 3): problems.append(f"{cid}: difficulty must be 1-3")
        for r in c.get("requires", []):
            if r not in KNOWN_CAPS: problems.append(f"{cid}: unknown requirement '{r}'")
        for t in c.get("time", []):
            if t not in TIMES: problems.append(f"{cid}: unknown time '{t}'")
        for p in c.get("place", []):
            if p not in PLACES: problems.append(f"{cid}: unknown place '{p}'")
        for s in SLOT_RE.findall(c["text"]):
            if s not in GEAR_SLOTS and s not in lib["lists"]: problems.append(f"{cid}: unknown slot {{{s}}}")
        if set(c.get("tags", [])) & set(c.get("excludes", [])): problems.append(f"{cid}: excludes its own tag")
        for e in c.get("excludes", []):
            if e not in all_tags: warnings.append(f"{cid}: excludes '{e}' but no constraint has that tag")
        if not c.get("why"): warnings.append(f"{cid}: missing 'why'")
    per_axis = Counter(c["axis"] for c in lib["constraints"])
    for a in axis_ids:
        if per_axis[a] < 8: warnings.append(f"axis {a}: only {per_axis[a]} constraints (aim for 8+)")
    return problems, warnings


# ---------- pool ----------
def report(lib, name, profile, time, place, sample):
    caps = capabilities(profile)
    enabled = {a["id"] for a in lib["axes"]}
    pool = [c for c in lib["constraints"] if allowed(c, caps, time, place, enabled)]
    mult = [slot_count(c, lib, profile) for c in pool]
    print(f"\n=== {name}  (time={time}, place={place}) ===")
    print(f"capabilities: {', '.join(sorted(caps)) or 'none'}")
    print(f"usable constraints: {len(pool)} / {len(lib['constraints'])}   "
          f"with slot values: {sum(mult)}")
    per_axis = Counter(c["axis"] for c in pool)
    thin = [f"{a['id']}={per_axis[a['id']]}" for a in lib["axes"] if per_axis[a["id"]] < 5]
    if thin: print(f"thin axes for this profile (<5): {', '.join(thin)}")

    n = len(pool)
    compat = [[compatible(pool[i], pool[j]) for j in range(n)] for i in range(n)]
    modes = ["any", "relaxed", "balanced", "tough"]
    for size in (1, 2, 3):
        combos = {m: 0 for m in modes}
        weighted = {m: 0 for m in modes}
        valid3 = []
        for idx in itertools.combinations(range(n), size):
            if any(not compat[a][b] for a, b in itertools.combinations(idx, 2)):
                continue
            ds = [pool[i]["difficulty"] for i in idx]
            w = math.prod(mult[i] for i in idx)
            for m in modes:
                if difficulty_ok(ds, m):
                    combos[m] += 1
                    weighted[m] += w
            if size == 3 and sample: valid3.append(idx)
        print(f"{size} card(s): " + "  ".join(f"{m}: {combos[m]:,} ({weighted[m]:,} with slots)" for m in modes))
    # 4 cards, ignoring difficulty, via bitsets
    masks = [sum(1 << j for j in range(n) if compat[i][j] and j > i) for i in range(n)]
    four = 0
    for i in range(n):
        for j in range(i + 1, n):
            if not compat[i][j]: continue
            mij = masks[i] & masks[j]
            k_mask = mij
            while k_mask:
                k = (k_mask & -k_mask).bit_length() - 1
                k_mask &= k_mask - 1
                four += bin(mij & masks[k]).count("1")
    print(f"4 cards (any difficulty, without slots): {four:,}")
    if sample:
        print(f"\n--- {sample} random 3-card challenges ---")
        for idx in random.sample(valid3, min(sample, len(valid3))):
            print(" | ".join(f"[{pool[i]['axis']}] {pool[i]['text']}" for i in idx))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--profile")
    ap.add_argument("--time", default="any", choices=["any", *sorted(TIMES)])
    ap.add_argument("--place", default="any", choices=["any", *sorted(PLACES)])
    ap.add_argument("--sample", type=int, default=0)
    args = ap.parse_args()
    lib = load_library()
    problems, warnings = validate(lib)
    for p in problems: print("ERROR  ", p)
    for w in warnings: print("warning", w)
    if problems: raise SystemExit(1)
    print(f"library OK: {len(lib['constraints'])} constraints, {len(lib['axes'])} axes")
    profiles = json.loads(PROFILES.read_text())
    for name, prof in profiles.items():
        if args.profile and name != args.profile: continue
        report(lib, name, prof, args.time, args.place, args.sample)


if __name__ == "__main__":
    main()
