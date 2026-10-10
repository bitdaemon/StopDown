/*
 * StopDown core: gear, settings, lens-name parsing and the challenge generator.
 * No DOM access here, so the same file runs in the browser and in Node tests.
 * The rules mirror tools/pool_report.py. If you change one, change the other.
 */
(function (root) {
  "use strict";

  // ---------- small helpers ----------

  function uuid() {
    if (root.crypto && typeof root.crypto.randomUUID === "function") {
      try { return root.crypto.randomUUID(); } catch (e) { /* not a secure context */ }
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  function randomElement(list) {
    return list.length ? list[Math.floor(Math.random() * list.length)] : undefined;
  }

  function formatAperture(a) {
    return String(Math.round(a * 100) / 100);
  }

  // ---------- library helpers ----------

  function slotsOf(text) {
    var out = [];
    var re = /\{([a-z]+)\}/g, m;
    while ((m = re.exec(text))) if (out.indexOf(m[1]) < 0) out.push(m[1]);
    return out;
  }

  function resolveText(text, values) {
    return text.replace(/\{([a-z]+)\}/g, function (all, name) {
      return Object.prototype.hasOwnProperty.call(values, name) ? values[name] : all;
    });
  }

  function prepareLibrary(lib) {
    var axisById = {}, groupOfAxis = {}, groupById = {}, byId = {};
    lib.axes.forEach(function (a) { axisById[a.id] = a; groupOfAxis[a.id] = a.group; });
    lib.groups.forEach(function (g) { groupById[g.id] = g; });
    lib.constraints.forEach(function (c) {
      c.tags = c.tags || [];
      c.excludes = c.excludes || [];
      c.requires = c.requires || [];
      c.slots = slotsOf(c.text);
      byId[c.id] = c;
    });
    lib.axisById = axisById;
    lib.groupOfAxis = groupOfAxis;
    lib.groupById = groupById;
    lib.byId = byId;
    lib.axesIn = function (groupId) { return lib.axes.filter(function (a) { return a.group === groupId; }); };
    return lib;
  }

  // ---------- gear ----------

  var FOCAL_STOPS = [10, 12, 14, 16, 18, 20, 24, 28, 35, 40, 50, 55, 70, 85,
    105, 135, 150, 200, 250, 300, 400, 500, 600];

  var ACCESSORIES = [
    { id: "tripod", label: "Tripod", detail: "Or any stable support" },
    { id: "flash", label: "Flash / speedlight", detail: "On-camera or hot-shoe flash" },
    { id: "off-camera-flash", label: "Off-camera flash", detail: "Cable, radio or optical trigger (e.g. Nikon CLS)" },
    { id: "nd", label: "ND filter", detail: "For long exposures in daylight" },
    { id: "polariser", label: "Polariser", detail: "Circular polarising filter" },
    { id: "reflector", label: "Reflector", detail: "Or a sheet of white card" },
    { id: "gels", label: "Flash gels", detail: "Colour gels such as CTO" },
    { id: "multi-exposure", label: "In-camera multiple exposure", detail: "Your camera has a multiple-exposure mode" }
  ];

  var SENSORS = [
    { crop: 1.0, label: "Full frame 1.0×" },
    { crop: 1.5, label: "APS-C 1.5× (Nikon, Sony, Fuji)" },
    { crop: 1.6, label: "APS-C 1.6× (Canon)" },
    { crop: 2.0, label: "Micro Four Thirds 2.0×" }
  ];

  var APERTURES = [0.95, 1.2, 1.4, 1.7, 1.8, 2, 2.8, 3.5, 4, 4.5, 5.6, 6.3];

  function newLens(fields) {
    var lens = { id: uuid(), name: "", minFocal: 50, maxFocal: 50, maxAperture: 1.8, isMacro: false };
    if (fields) Object.keys(fields).forEach(function (k) { lens[k] = fields[k]; });
    return lens;
  }

  function lensShortest(l) { return Math.min(l.minFocal, l.maxFocal); }
  function lensLongest(l) { return Math.max(l.minFocal, l.maxFocal); }
  function lensIsZoom(l) { return lensShortest(l) < lensLongest(l); }
  function lensDisplayName(l) { var t = (l.name || "").trim(); return t || "Unnamed lens"; }
  function lensSummary(l) {
    var range = lensIsZoom(l) ? lensShortest(l) + "–" + lensLongest(l) + "mm" : lensShortest(l) + "mm";
    return range + "  ·  f/" + formatAperture(l.maxAperture) + (l.isMacro ? "  ·  macro" : "");
  }

  function defaultGear() {
    return {
      cropFactor: 1.5,
      lenses: [newLens({ name: "18–55mm kit zoom", minFocal: 18, maxFocal: 55, maxAperture: 3.5 })],
      accessories: []
    };
  }

  function normalizeGear(g) {
    var d = defaultGear();
    if (!g || typeof g !== "object") return d;
    var known = ACCESSORIES.map(function (a) { return a.id; });
    return {
      cropFactor: typeof g.cropFactor === "number" ? g.cropFactor : d.cropFactor,
      lenses: Array.isArray(g.lenses) ? g.lenses.map(function (l) {
        return newLens({
          id: l.id || uuid(), name: String(l.name || ""),
          minFocal: toInt(l.minFocal, 50), maxFocal: toInt(l.maxFocal, toInt(l.minFocal, 50)),
          maxAperture: typeof l.maxAperture === "number" ? l.maxAperture : 3.5,
          isMacro: !!l.isMacro
        });
      }) : d.lenses,
      accessories: Array.isArray(g.accessories) ? g.accessories.filter(function (a) { return known.indexOf(a) >= 0; }) : []
    };
  }

  function toInt(v, fallback) {
    var n = parseInt(v, 10);
    return isFinite(n) && n > 0 ? n : fallback;
  }

  /** Capability strings matched against a constraint's `requires`. */
  function capabilities(gear) {
    var caps = {};
    gear.accessories.forEach(function (a) { caps[a] = true; });
    if (caps["off-camera-flash"]) caps.flash = true;
    gear.lenses.forEach(function (l) {
      if (lensIsZoom(l)) caps.zoom = true; else caps.prime = true;
      if (lensShortest(l) * gear.cropFactor <= 28) caps.wide = true;
      if (lensLongest(l) * gear.cropFactor >= 100) caps.tele = true;
      if (l.maxAperture <= 2.0) caps["fast-lens"] = true;
      if (l.isMacro) caps.macro = true;
    });
    return caps;
  }

  /** Focal lengths the {focal} slot can take: each lens's ends plus the standard stops in between. */
  function focalOptions(gear) {
    var set = {};
    gear.lenses.forEach(function (l) {
      var lo = lensShortest(l), hi = lensLongest(l);
      set[lo] = true; set[hi] = true;
      FOCAL_STOPS.forEach(function (s) { if (s > lo && s < hi) set[s] = true; });
    });
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  }

  // ---------- lens description parsing ----------

  var RE_RANGE_MM = /(\d{1,4}(?:[.,]\d)?)\s*(?:-|–|—|~|to)\s*(\d{1,4}(?:[.,]\d)?)\s*mm/i;
  var RE_SINGLE_MM = /(\d{1,4}(?:[.,]\d)?)\s*mm/i;
  var RE_RANGE_NO_UNIT = /(?<![\d.,/:])(\d{1,4})\s*[-–—~]\s*(\d{1,4})(?![\d.,])/;
  var RE_APERTURE = /(?:\bf\s*\/?\s*|\b1\s*:\s*)(\d{1,2}(?:[.,]\d{1,2})?)/i;
  var RE_MACRO = /\b(?:macro|micro)\b/i;

  function num(s) { return parseFloat(String(s).replace(",", ".")); }

  /** Reads focal length, widest aperture and macro from a lens description. */
  function parseLensName(text) {
    var r = { minFocal: null, maxFocal: null, maxAperture: null, isMacro: false };
    var m;
    function setFocal(a, b) {
      var lo = Math.round(Math.min(a, b)), hi = Math.round(Math.max(a, b));
      if (lo >= 1 && hi <= 2000) { r.minFocal = lo; r.maxFocal = hi; }
    }
    if ((m = RE_RANGE_MM.exec(text))) setFocal(num(m[1]), num(m[2]));
    else if ((m = RE_SINGLE_MM.exec(text))) setFocal(num(m[1]), num(m[1]));
    else if ((m = RE_RANGE_NO_UNIT.exec(text)) && num(m[2]) > num(m[1])) setFocal(num(m[1]), num(m[2]));
    if ((m = RE_APERTURE.exec(text))) {
      var a = num(m[1]);
      if (a >= 0.7 && a <= 32) r.maxAperture = a;
    }
    r.isMacro = RE_MACRO.test(text);
    r.hasFocal = r.minFocal !== null;
    r.foundAnything = r.hasFocal || r.maxAperture !== null || r.isMacro;
    var parts = [];
    if (r.hasFocal) parts.push(r.minFocal === r.maxFocal ? r.minFocal + "mm prime" : r.minFocal + "–" + r.maxFocal + "mm zoom");
    if (r.maxAperture !== null) parts.push("f/" + formatAperture(r.maxAperture));
    if (r.isMacro) parts.push("macro");
    r.summary = parts.join(" · ");
    return r;
  }

  // ---------- settings ----------

  var MAX_CARDS = 10;
  var TIMES = [
    { id: "anytime", label: "Any time" }, { id: "day", label: "Daylight" },
    { id: "golden", label: "Golden / blue hour" }, { id: "night", label: "Night" }
  ];
  var PLACES = [
    { id: "anywhere", label: "Anywhere" }, { id: "indoor", label: "Indoors" }, { id: "outdoor", label: "Outdoors" }
  ];
  var DIFFICULTIES = [
    { id: "relaxed", label: "Relaxed" }, { id: "balanced", label: "Balanced" }, { id: "tough", label: "Tough" }
  ];

  function defaultSettings() {
    return {
      cardCount: 3, difficulty: "balanced", disabledAxes: [], time: "anytime", place: "anywhere",
      cooldownDays: 7, focusGroups: []
    };
  }

  function normalizeSettings(s) {
    var d = defaultSettings();
    if (!s || typeof s !== "object") return d;
    function pick(list, v, fb) { return list.some(function (x) { return x.id === v; }) ? v : fb; }
    return {
      cardCount: Math.min(MAX_CARDS, Math.max(1, toInt(s.cardCount, d.cardCount))),
      difficulty: pick(DIFFICULTIES, s.difficulty, d.difficulty),
      disabledAxes: Array.isArray(s.disabledAxes) ? s.disabledAxes.slice() : [],
      time: pick(TIMES, s.time, d.time),
      place: pick(PLACES, s.place, d.place),
      cooldownDays: Math.min(60, Math.max(0, isFinite(parseInt(s.cooldownDays, 10)) ? parseInt(s.cooldownDays, 10) : d.cooldownDays)),
      focusGroups: Array.isArray(s.focusGroups) ? s.focusGroups.slice() : []
    };
  }

  function effectiveCardCount(settings) {
    return Math.min(MAX_CARDS, Math.max(1, settings.cardCount, settings.focusGroups.length));
  }

  /** Difficulty budget rules. Keep in sync with tools/pool_report.py. */
  function difficultyAccepts(mode, total, maxLevel, count) {
    if (mode === "relaxed") return maxLevel <= 2 && total <= Math.ceil(1.5 * count);
    if (mode === "tough") return total >= 2 * count;
    return total <= 2 * count;
  }

  function difficultyAcceptsLevels(mode, levels) {
    var total = 0, max = 0;
    levels.forEach(function (l) { total += l; if (l > max) max = l; });
    return difficultyAccepts(mode, total, max, levels.length);
  }

  /** Bias the draw toward the mode, so fewer attempts get rejected by the budget. */
  function difficultyWeight(mode, level) {
    if (mode === "relaxed") return level === 1 ? 3 : level === 2 ? 2 : 0.3;
    if (mode === "tough") return level === 1 ? 0.5 : level === 2 ? 1.5 : 3;
    return 1;
  }

  // ---------- generator ----------

  var ATTEMPTS = 150;
  var DAY_MS = 86400000;

  function compatible(a, b) {
    if (a.id === b.id || a.axis === b.axis) return false;
    var i;
    for (i = 0; i < a.excludes.length; i++) if (b.tags.indexOf(a.excludes[i]) >= 0) return false;
    for (i = 0; i < b.excludes.length; i++) if (a.tags.indexOf(b.excludes[i]) >= 0) return false;
    return true;
  }

  function Generator(lib, gear, settings, history, now) {
    this.lib = lib;
    this.gear = gear;
    this.settings = settings;
    this.history = history || [];
    this.now = now || Date.now();
    this.caps = capabilities(gear);
    this.focals = focalOptions(gear);
  }

  Generator.compatible = compatible;

  Generator.prototype.isAllowed = function (c, ignoreDisabledAxes) {
    var s = this.settings;
    if (!ignoreDisabledAxes && s.disabledAxes.indexOf(c.axis) >= 0) return false;
    for (var i = 0; i < c.requires.length; i++) if (!this.caps[c.requires[i]]) return false;
    if (s.time !== "anytime" && c.time && c.time.indexOf(s.time) < 0) return false;
    if (s.place !== "anywhere" && c.place && c.place.indexOf(s.place) < 0) return false;
    if (c.slots.indexOf("focal") >= 0 && this.focals.length === 0) return false;
    return true;
  };

  Generator.prototype.pool = function () {
    var self = this;
    return this.lib.constraints.filter(function (c) { return self.isAllowed(c, false); });
  };

  Generator.prototype.usableCount = function (axisId) {
    var self = this;
    return this.lib.constraints.filter(function (c) { return c.axis === axisId && self.isAllowed(c, true); }).length;
  };

  /** Pinned groups in library order. */
  Generator.prototype.orderedFocusGroups = function () {
    var focus = this.settings.focusGroups;
    return this.lib.groups.map(function (g) { return g.id; }).filter(function (id) { return focus.indexOf(id) >= 0; });
  };

  /** Keeps locked cards in place and fills the other positions. Every pinned group gets at least one card. */
  Generator.prototype.deal = function (current) {
    var lib = this.lib, self = this;
    var target = effectiveCardCount(this.settings);
    var positions = [];
    for (var i = 0; i < target; i++) positions.push(i < current.length && current[i].isLocked ? current[i] : null);
    var kept = positions.filter(Boolean).map(function (c) { return lib.byId[c.constraintID]; }).filter(Boolean);
    var covered = {};
    kept.forEach(function (c) { covered[lib.groupOfAxis[c.axis]] = true; });
    var missing = this.orderedFocusGroups().filter(function (g) { return !covered[g]; });
    // Locked cards may use up slots a pinned group needs: add positions rather than drop the group.
    while (positions.filter(function (p) { return p === null; }).length < missing.length) positions.push(null);
    var needed = positions.filter(function (p) { return p === null; }).length;
    var discarded = current.filter(function (c) { return !c.isLocked; }).map(function (c) { return c.constraintID; });

    var outcome = this.draw(kept, needed, missing, discarded);
    if (outcome.picks.length < needed && discarded.length) outcome = this.draw(kept, needed, missing, []);

    var k = 0;
    for (var j = 0; j < positions.length; j++) {
      if (positions[j] === null && k < outcome.picks.length) positions[j] = self.makeCard(outcome.picks[k++]);
    }
    return { cards: positions.filter(Boolean), note: outcome.note };
  };

  /** Adds cards to reach `target`, keeping every current card where it is. */
  Generator.prototype.extend = function (current, target) {
    var lib = this.lib, self = this;
    var kept = current.map(function (c) { return lib.byId[c.constraintID]; }).filter(Boolean);
    var covered = {};
    kept.forEach(function (c) { covered[lib.groupOfAxis[c.axis]] = true; });
    var missing = this.orderedFocusGroups().filter(function (g) { return !covered[g]; });
    var needed = Math.max(target - current.length, missing.length);
    if (needed <= 0) return { cards: current, note: null };
    var outcome = this.draw(kept, needed, missing, []);
    return { cards: current.concat(outcome.picks.map(function (c) { return self.makeCard(c); })), note: outcome.note };
  };

  /** Replaces one card, keeping every other card. A pinned group's only card is replaced from the same group. */
  Generator.prototype.reroll = function (index, current) {
    if (index < 0 || index >= current.length) return { cards: current, note: null };
    var lib = this.lib;
    var others = current.filter(function (c, i) { return i !== index; })
      .map(function (c) { return lib.byId[c.constraintID]; }).filter(Boolean);
    var otherGroups = {};
    others.forEach(function (c) { otherGroups[lib.groupOfAxis[c.axis]] = true; });
    var myGroup = lib.groupOfAxis[current[index].axis];
    var required = (myGroup && this.settings.focusGroups.indexOf(myGroup) >= 0 && !otherGroups[myGroup]) ? [myGroup] : [];
    var outcome = this.draw(others, 1, required, [current[index].constraintID]);
    if (!outcome.picks.length) {
      return { cards: current, note: outcome.note || "Nothing else fits alongside the other cards." };
    }
    var cards = current.slice();
    cards[index] = this.makeCard(outcome.picks[0]);
    return { cards: cards, note: outcome.note };
  };

  /** Draws `count` constraints compatible with `kept`; the first picks come from `requiredGroups`. */
  Generator.prototype.draw = function (kept, count, requiredGroups, excluding) {
    if (count <= 0) return { picks: [], note: null };
    var lib = this.lib, self = this;
    var keptIds = kept.map(function (c) { return c.id; });
    var candidates = this.pool().filter(function (c) {
      return excluding.indexOf(c.id) < 0 && keptIds.indexOf(c.id) < 0;
    });

    var usable = {};
    candidates.forEach(function (c) { usable[lib.groupOfAxis[c.axis]] = true; });
    var required = requiredGroups.filter(function (g) { return usable[g]; });
    var unusable = requiredGroups.filter(function (g) { return !usable[g]; });
    var unusableNote = unusable.length
      ? "Nothing available for " + unusable.map(function (g) { return lib.groupById[g] ? (lib.groupById[g].short || lib.groupById[g].name) : g; }).join(" and ") + ". Check its categories in Settings."
      : null;

    var recency = this.lastUsedDates();
    var fallback = [];
    for (var attempt = 0; attempt < ATTEMPTS; attempt++) {
      var chosen = kept.slice();
      var picks = [];
      for (var slot = 0; slot < count; slot++) {
        var group = slot < required.length ? required[slot] : null;
        var options = candidates.filter(function (c) {
          if (group && lib.groupOfAxis[c.axis] !== group) return false;
          for (var i = 0; i < chosen.length; i++) if (!compatible(chosen[i], c)) return false;
          return true;
        });
        var pick = this.weightedPick(options, recency);
        if (!pick) break;
        chosen.push(pick);
        picks.push(pick);
      }
      if (picks.length === count && difficultyAcceptsLevels(this.settings.difficulty, chosen.map(function (c) { return c.difficulty; }))) {
        return { picks: picks, note: unusableNote };
      }
      if (picks.length > fallback.length) fallback = picks;
    }
    if (fallback.length === count) {
      var label = DIFFICULTIES.filter(function (d) { return d.id === self.settings.difficulty; })[0].label.toLowerCase();
      return { picks: fallback, note: unusableNote || "Couldn't hit the " + label + " difficulty with these cards. Try unlocking one." };
    }
    return { picks: fallback, note: unusableNote || "Not enough compatible constraints. Switch on more categories or add gear." };
  };

  Generator.prototype.weightedPick = function (options, recency) {
    if (!options.length) return null;
    var self = this;
    var weights = options.map(function (c) { return self.weight(c, recency); });
    var total = weights.reduce(function (a, b) { return a + b; }, 0);
    if (total <= 0) return randomElement(options);
    var roll = Math.random() * total;
    for (var i = 0; i < options.length; i++) {
      if (roll < weights[i]) return options[i];
      roll -= weights[i];
    }
    return options[options.length - 1];
  };

  Generator.prototype.weight = function (c, recency) {
    var w = difficultyWeight(this.settings.difficulty, c.difficulty);
    var last = recency[c.id];
    if (this.settings.cooldownDays > 0 && last) {
      var days = (this.now - last) / DAY_MS;
      var fraction = days / this.settings.cooldownDays;
      if (fraction < 1) w *= Math.max(0.05, fraction * fraction);
    }
    return w;
  };

  Generator.prototype.lastUsedDates = function () {
    var out = {};
    this.history.forEach(function (entry) {
      var t = new Date(entry.date).getTime();
      entry.cards.forEach(function (card) {
        if (!out[card.constraintID] || out[card.constraintID] < t) out[card.constraintID] = t;
      });
    });
    return out;
  };

  Generator.prototype.slotOptions = function (slot) {
    return slot === "focal" ? this.focals.map(String) : (this.lib.lists[slot] || []);
  };

  Generator.prototype.makeCard = function (c) {
    var values = {}, self = this;
    c.slots.forEach(function (slot) {
      var options = self.slotOptions(slot);
      var recent = self.recentSlotValues(c.id, slot);
      var fresh = options.filter(function (o) { return recent.indexOf(o) < 0; });
      values[slot] = randomElement(fresh.length ? fresh : options) || "?";
    });
    return {
      id: uuid(), constraintID: c.id, axis: c.axis, text: resolveText(c.text, values),
      why: c.why, difficulty: c.difficulty, slotValues: values, isLocked: false
    };
  };

  /** Slot values used for this constraint in the last 10 accepted challenges. */
  Generator.prototype.recentSlotValues = function (constraintId, slot) {
    var out = [];
    this.history.slice(-10).forEach(function (e) {
      e.cards.forEach(function (card) {
        if (card.constraintID === constraintId && card.slotValues && card.slotValues[slot]) out.push(card.slotValues[slot]);
      });
    });
    return out;
  };

  // ---------- pool size ----------

  var MAX_COUNTED_CARDS = 4;

  /**
   * Counts every valid challenge for the current settings, including pinned groups.
   * Works through the first index in chunks and yields between them, so a 4-card count
   * doesn't freeze the page. `isCancelled` lets the caller abandon a stale count.
   */
  Generator.prototype.poolStats = function (options) {
    options = options || {};
    var self = this, lib = this.lib;
    var p = this.pool(), n = p.length;
    var k = effectiveCardCount(this.settings);
    if (k > MAX_COUNTED_CARDS) return Promise.resolve({ usable: n, cardCount: k, combinations: null, withSlots: null });

    var mode = this.settings.difficulty;
    var groupIds = lib.groups.map(function (g) { return g.id; });
    var groupBit = p.map(function (c) { var i = groupIds.indexOf(lib.groupOfAxis[c.axis]); return i < 0 ? 0 : 1 << i; });
    var requiredMask = this.orderedFocusGroups().reduce(function (m, g) { var i = groupIds.indexOf(g); return i < 0 ? m : m | (1 << i); }, 0);
    var compat = [];
    for (var i = 0; i < n; i++) {
      compat.push(new Uint8Array(n));
      for (var j = 0; j < n; j++) if (i !== j && compatible(p[i], p[j])) compat[i][j] = 1;
    }
    var levels = p.map(function (c) { return c.difficulty; });
    var mult = p.map(function (c) {
      return c.slots.reduce(function (acc, s) { return acc * Math.max(1, self.slotOptions(s).length); }, 1);
    });

    var combinations = 0, withSlots = 0, chosen = [];
    function walk(start, total, maxLevel, weight, groups) {
      if (chosen.length === k) {
        if ((groups & requiredMask) === requiredMask && difficultyAccepts(mode, total, maxLevel, k)) {
          combinations++;
          withSlots += weight;
        }
        return;
      }
      for (var x = start; x < n; x++) {
        var ok = true;
        for (var y = 0; y < chosen.length; y++) if (!compat[chosen[y]][x]) { ok = false; break; }
        if (!ok) continue;
        chosen.push(x);
        walk(x + 1, total + levels[x], Math.max(maxLevel, levels[x]), weight * mult[x], groups | groupBit[x]);
        chosen.pop();
      }
    }

    return new Promise(function (resolve) {
      var first = 0;
      function step() {
        if (options.isCancelled && options.isCancelled()) return resolve(null);
        var until = Date.now() + 12;
        while (first < n && Date.now() < until) {
          chosen = [first];
          if (k === 1) {
            if ((groupBit[first] & requiredMask) === requiredMask && difficultyAccepts(mode, levels[first], levels[first], 1)) {
              combinations++; withSlots += mult[first];
            }
          } else {
            walk(first + 1, levels[first], levels[first], mult[first], groupBit[first]);
          }
          first++;
        }
        if (first >= n) resolve({ usable: n, cardCount: k, combinations: combinations, withSlots: withSlots });
        else setTimeout(step, 0);
      }
      step();
    });
  };

  var api = {
    uuid: uuid, formatAperture: formatAperture, slotsOf: slotsOf, resolveText: resolveText,
    prepareLibrary: prepareLibrary,
    FOCAL_STOPS: FOCAL_STOPS, ACCESSORIES: ACCESSORIES, SENSORS: SENSORS, APERTURES: APERTURES,
    newLens: newLens, lensShortest: lensShortest, lensLongest: lensLongest, lensIsZoom: lensIsZoom,
    lensDisplayName: lensDisplayName, lensSummary: lensSummary,
    defaultGear: defaultGear, normalizeGear: normalizeGear, capabilities: capabilities, focalOptions: focalOptions,
    parseLensName: parseLensName,
    MAX_CARDS: MAX_CARDS, TIMES: TIMES, PLACES: PLACES, DIFFICULTIES: DIFFICULTIES,
    defaultSettings: defaultSettings, normalizeSettings: normalizeSettings, effectiveCardCount: effectiveCardCount,
    difficultyAccepts: difficultyAccepts, difficultyAcceptsLevels: difficultyAcceptsLevels,
    Generator: Generator, MAX_COUNTED_CARDS: MAX_COUNTED_CARDS
  };

  if (typeof module === "object" && module.exports) module.exports = api;
  else root.SDCore = api;
})(typeof window !== "undefined" ? window : globalThis);
