// Run with: node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Core = require("../js/core.js");

function loadLibrary() {
  const src = fs.readFileSync(path.join(__dirname, "..", "data", "constraints.js"), "utf8");
  const json = src.split("/*BEGIN-JSON*/")[1].split("/*END-JSON*/")[0];
  return Core.prepareLibrary(JSON.parse(json));
}

const starter = () => Core.defaultGear();
const enthusiast = () => Core.normalizeGear({
  cropFactor: 1.5,
  lenses: [
    { name: "18-55mm f/3.5-5.6", minFocal: 18, maxFocal: 55, maxAperture: 3.5 },
    { name: "50mm f/1.8", minFocal: 50, maxFocal: 50, maxAperture: 1.8 },
    { name: "70-300mm f/4.5-5.6", minFocal: 70, maxFocal: 300, maxAperture: 4.5 }
  ],
  accessories: ["tripod", "flash", "off-camera-flash", "reflector", "nd", "gels", "multi-exposure"]
});

const everything = () => Core.normalizeGear({
  cropFactor: 1.5,
  lenses: [
    { name: "18-55mm", minFocal: 18, maxFocal: 55, maxAperture: 3.5 },
    { name: "35mm f/1.8", minFocal: 35, maxFocal: 35, maxAperture: 1.8 },
    { name: "70-300mm", minFocal: 70, maxFocal: 300, maxAperture: 4.5 },
    { name: "10.5mm fisheye", minFocal: 10, maxFocal: 10, maxAperture: 2.8, isFisheye: true },
    { name: "Lensbaby 50mm", minFocal: 50, maxFocal: 50, maxAperture: 2.5, isTilt: true },
    { name: "Helios 58mm", minFocal: 58, maxFocal: 58, maxAperture: 2, isManual: true }
  ],
  accessories: Core.ACCESSORIES.map(a => a.id)
});

function assertValidDeal(lib, gen, cards) {
  const defs = cards.map(c => lib.byId[c.constraintID]);
  for (let i = 0; i < defs.length; i++) {
    assert.ok(gen.isAllowed(defs[i]), "card allowed: " + defs[i].id);
    for (let j = i + 1; j < defs.length; j++) assert.ok(Core.Generator.compatible(defs[i], defs[j]), defs[i].id + " vs " + defs[j].id);
  }
  cards.forEach(c => assert.ok(!/\{[a-z]+\}/.test(c.text), "slots resolved: " + c.text));
}

test("library loads and every constraint references a known axis", () => {
  const lib = loadLibrary();
  assert.equal(lib.constraints.length, 317);
  assert.equal(lib.axes.length, 16);
  lib.constraints.forEach(c => assert.ok(lib.axisById[c.axis], c.id));
});

test("capabilities and focal options", () => {
  const caps = Core.capabilities(starter());
  assert.deepEqual(Object.keys(caps).sort(), ["wide", "zoom"]);
  assert.deepEqual(Core.focalOptions(starter()), [18, 20, 24, 28, 35, 40, 50, 55]);
  const big = Core.capabilities(enthusiast());
  ["prime", "tele", "fast-lens", "flash", "tripod"].forEach(k => assert.ok(big[k], k));
});

test("lens description parsing", () => {
  const cases = [
    ["Nikkor AF-S DX 18-55mm f/3.5-5.6G VR", 18, 55, 3.5, false],
    ["AF-S NIKKOR 35mm 1:1.8G", 35, 35, 1.8, false],
    ["Sigma 70–300 F4-5.6 DG Macro", 70, 300, 4, true],
    ["Helios 44-2 58mm f/2", 58, 58, 2, false],
    ["AF-S 70-200mm f/2,8", 70, 200, 2.8, false],
    ["Nikkor 105mm f/2.8 1:1 micro", 105, 105, 2.8, true]
  ];
  for (const [text, lo, hi, ap, macro] of cases) {
    const r = Core.parseLensName(text);
    assert.equal(r.minFocal, lo, text); assert.equal(r.maxFocal, hi, text);
    assert.equal(r.maxAperture, ap, text); assert.equal(r.isMacro, macro, text);
  }
  assert.equal(Core.parseLensName("New lens").foundAnything, false);
});

test("deals 1 to 10 valid cards at every difficulty", () => {
  const lib = loadLibrary();
  for (const gear of [starter(), enthusiast()]) {
    for (const difficulty of ["relaxed", "balanced", "tough"]) {
      for (const n of [1, 3, 5, 10]) {
        const settings = Object.assign(Core.defaultSettings(), { cardCount: n, difficulty });
        const gen = new Core.Generator(lib, gear, settings, []);
        const r = gen.deal([]);
        assert.equal(r.cards.length, n, `${difficulty} ${n}`);
        assertValidDeal(lib, gen, r.cards);
        assert.ok(Core.difficultyAcceptsLevels(difficulty, r.cards.map(c => c.difficulty)), `${difficulty} budget`);
      }
    }
  }
});

test("locked cards stay in place on a re-deal", () => {
  const lib = loadLibrary();
  const settings = Object.assign(Core.defaultSettings(), { cardCount: 4 });
  const gen = new Core.Generator(lib, starter(), settings, []);
  const first = gen.deal([]).cards;
  first[1].isLocked = true;
  const second = gen.deal(first).cards;
  assert.equal(second[1].id, first[1].id);
  assert.equal(second.length, 4);
  assertValidDeal(lib, gen, second);
});

test("pinned groups each get a card, and more pins than cards raises the count", () => {
  const lib = loadLibrary();
  const settings = Object.assign(Core.defaultSettings(), { cardCount: 2, focusGroups: ["light", "composition", "subject"] });
  const gen = new Core.Generator(lib, enthusiast(), settings, []);
  for (let i = 0; i < 30; i++) {
    const cards = gen.deal([]).cards;
    assert.equal(cards.length, 3);
    const groups = new Set(cards.map(c => lib.groupOfAxis[c.axis]));
    ["light", "composition", "subject"].forEach(g => assert.ok(groups.has(g), g));
  }
});

test("reroll keeps a pinned group's only card in that group", () => {
  const lib = loadLibrary();
  const settings = Object.assign(Core.defaultSettings(), { cardCount: 3, focusGroups: ["light"] });
  const gen = new Core.Generator(lib, enthusiast(), settings, []);
  for (let i = 0; i < 30; i++) {
    const cards = gen.deal([]).cards;
    const lightIndexes = cards.map((c, idx) => lib.groupOfAxis[c.axis] === "light" ? idx : -1).filter(x => x >= 0);
    if (lightIndexes.length !== 1) continue;
    const idx = lightIndexes[0];
    const after = gen.reroll(idx, cards).cards;
    assert.equal(lib.groupOfAxis[after[idx].axis], "light");
    assert.notEqual(after[idx].constraintID, cards[idx].constraintID);
  }
});

test("extend keeps current cards and adds new ones", () => {
  const lib = loadLibrary();
  const settings = Object.assign(Core.defaultSettings(), { cardCount: 3 });
  const gen = new Core.Generator(lib, starter(), settings, []);
  const cards = gen.deal([]).cards;
  const more = gen.extend(cards, 6).cards;
  assert.equal(more.length, 6);
  assert.deepEqual(more.slice(0, 3).map(c => c.id), cards.map(c => c.id));
  assertValidDeal(lib, gen, more);
});

test("context filters: night outdoor never deals daylight-only or indoor-only cards", () => {
  const lib = loadLibrary();
  const settings = Object.assign(Core.defaultSettings(), { cardCount: 10, time: "night", place: "outdoor" });
  const gen = new Core.Generator(lib, enthusiast(), settings, []);
  for (let i = 0; i < 20; i++) {
    gen.deal([]).cards.forEach(card => {
      const c = lib.byId[card.constraintID];
      if (c.time) assert.ok(c.time.includes("night"), c.id);
      if (c.place) assert.ok(c.place.includes("outdoor"), c.id);
    });
  }
});

test("pool stats match the Python report for the starter kit", async () => {
  const lib = loadLibrary();
  const settings = Object.assign(Core.defaultSettings(), { cardCount: 3, difficulty: "balanced" });
  const stats = await new Core.Generator(lib, starter(), settings, []).poolStats();
  assert.equal(stats.usable, 218);
  assert.equal(stats.combinations, 1225236);
  assert.equal(stats.withSlots, 3835008);
});

test("settings and gear normalisation tolerate old or broken data", () => {
  const s = Core.normalizeSettings({ cardCount: 42, difficulty: "nope" });
  assert.equal(s.cardCount, 10);
  assert.equal(s.difficulty, "balanced");
  const g = Core.normalizeGear({ lenses: [{ name: "35mm", minFocal: "35", maxFocal: 35 }], accessories: ["tripod", "laser"] });
  assert.equal(g.lenses[0].minFocal, 35);
  assert.deepEqual(g.accessories, ["tripod"]);
});

// ---- Contradiction audit -------------------------------------------------------
// Tag pairs that mean opposite things. No card carrying the first may ever share a
// hand with a card carrying the second. Add a row here when you add a new kind of tag.
const OPPOSITES = `
  slow-shutter/fast-shutter motion-blur/freeze wide-aperture/narrow-aperture wide-aperture/deep-focus
  defocus/deep-focus defocus-bg/bg-sharp defocus-bg/deep-focus high-key/low-key high-key/silhouette
  silhouette/frontlight silhouette/sidelight silhouette/flash frontlight/backlight hard-light/soft-light
  flash/natural-only flash/ambient-only artificial-only/natural-only artificial-only/sun overcast/sun
  overcast/bright-source sun/rain bw/colour-dependent monotone/colour-dependent tonal-only/colour-dependent
  people/no-people low-angle/high-angle close-up/distance centered/off-center filled-frame/negative-space
  vertical/square vertical/pano square/pano crop-45/square crop-45/pano square/no-crop base-iso/high-iso
  tilted/level-lines single-focal/zoom-action on-tripod/handheld burst/few-frames burst/slow-pace
  set/single-winner single-winner/worst-frame three-only/needs-five two-subjects/odd-count pairs/odd-count
  hue-rule/hue-subject hue-rule/hue-grade hue-rule/hue-cast hue-subject/hue-grade pastel/saturated
  single-temperature/warm-cool coloured-light/grey-frame hue-cast/grey-frame warm-light/cool-palette phone/no-phone moving-feet/one-spot
  fixed-shutter/slow-shutter fixed-shutter/fast-shutter fixed-shutter/fixed-aperture
  fixed-shutter/varied-shutter fixed-shutter/motion-blur fixed-shutter/aperture-priority
  light-painting/fixed-light multi-frame/single-take multi-frame/three-only many-frames/few-frames
  multi-frame/slow-pace large-subject/hand-size hand-size/hyperfocal reflection/no-reflection fixed-framing/zoom-action manual-focus/autofocus bent-lines/level-lines infrared/colour-dependent steep-angle/vertical-lines
  varies-exposure/fixed-shutter aperture-priority/fixed-shutter worst-frame/single-winner`.trim().split(/\s+/).map(p => p.split("/"));

test("every opposite tag pair is used by the library and can never meet in a hand", () => {
  const lib = loadLibrary();
  const tagged = t => lib.constraints.filter(c => c.tags.includes(t));
  const clashes = [];
  for (const [x, y] of OPPOSITES) {
    assert.ok(tagged(x).length && tagged(y).length, `tag pair ${x}/${y} is used`);
    for (const a of tagged(x)) for (const b of tagged(y)) {
      if (a.id !== b.id && Core.Generator.compatible(a, b)) clashes.push(`${x}/${y}: ${a.id} + ${b.id}`);
    }
  }
  assert.deepEqual(clashes, []);
});

test("every exclude names a tag that some card actually has", () => {
  const lib = loadLibrary();
  const tags = new Set(lib.constraints.flatMap(c => c.tags));
  const unknown = lib.constraints.flatMap(c => c.excludes.filter(t => !tags.has(t)).map(t => c.id + " -> " + t));
  assert.deepEqual(unknown, []);
});

test("cards limited to different times or places are never compatible", () => {
  const lib = loadLibrary();
  const apart = (x, y) => x && y && !x.some(v => y.includes(v));
  for (const a of lib.constraints) for (const b of lib.constraints) {
    if (apart(a.time, b.time) || apart(a.place, b.place)) {
      assert.equal(Core.Generator.compatible(a, b), false, `${a.id} + ${b.id}`);
    }
  }
});

test("thousands of random 10-card hands contain no contradictions", () => {
  const lib = loadLibrary();
  const contexts = [["anytime", "anywhere"], ["day", "outdoor"], ["night", "outdoor"], ["golden", "indoor"]];
  for (const gear of [starter(), enthusiast(), everything()]) {
    for (const difficulty of ["relaxed", "balanced", "tough"]) {
      for (const [time, place] of contexts) {
        const settings = Object.assign(Core.defaultSettings(), { cardCount: 10, difficulty, time, place });
        for (let i = 0; i < 60; i++) {
          const gen = new Core.Generator(lib, gear, settings, []);
          const r = gen.deal([]);
          assertValidDeal(lib, gen, r.cards);
          for (let j = 0; j < 3; j++) assertValidDeal(lib, gen, gen.reroll(j % r.cards.length, r.cards).cards);
        }
      }
    }
  }
});

// ---- Gear groups and new gear ----------------------------------------------------
test("every accessory sits in a known group and unlocks at least two cards", () => {
  const lib = loadLibrary();
  const groups = Core.ACCESSORY_GROUPS.map(g => g.id);
  const ids = Core.ACCESSORIES.map(a => a.id);
  assert.equal(new Set(ids).size, ids.length, "unique accessory ids");
  for (const a of Core.ACCESSORIES) {
    assert.ok(groups.includes(a.group), a.id + " group");
    const derived = { "extension-tubes": "macro" }[a.id]; // tubes unlock every macro card too
    const unlocked = lib.constraints.filter(c => c.requires.includes(a.id) || c.requires.includes(derived)).length;
    assert.ok(unlocked >= 2, `${a.id} unlocks ${unlocked} cards`);
  }
  for (const t of Core.LENS_TRAITS) {
    assert.ok(lib.constraints.filter(c => c.requires.includes(t.cap)).length >= 2, t.cap);
  }
  // Every requirement in the library is something the gear screen can provide.
  const caps = Core.capabilities(everything());
  lib.constraints.forEach(c => c.requires.forEach(r => assert.ok(caps[r], `${c.id} requires ${r}`)));
});

test("derived capabilities: tubes give macro, a teleconverter extends reach, a second flash is a flash", () => {
  const g = Core.normalizeGear({ cropFactor: 1.5, lenses: [{ name: "18-55", minFocal: 18, maxFocal: 55, maxAperture: 3.5 }], accessories: ["extension-tubes", "second-flash"] });
  const caps = Core.capabilities(g);
  assert.ok(caps.macro && caps.flash && !caps.tele);
  g.accessories.push("teleconverter");
  assert.ok(Core.capabilities(g).tele, "55mm × 1.4 × 1.5 crop counts as tele");
});

test("lens character is read from the description and survives old saved gear", () => {
  assert.equal(Core.parseLensName("Nikon AF DX Fisheye-Nikkor 10.5mm f/2.8G").isFisheye, true);
  assert.equal(Core.parseLensName("Lensbaby Composer Pro II 50mm").isTilt, true);
  assert.equal(Core.parseLensName("Nikon PC-E 24mm f/3.5").isTilt, true);
  assert.equal(Core.parseLensName("Nikkor 50mm f/1.4 AI-S").isManual, true);
  assert.equal(Core.parseLensName("AF-S NIKKOR 35mm 1:1.8G").isManual, false);
  const old = Core.normalizeGear({ lenses: [{ name: "50mm", minFocal: 50, maxFocal: 50, maxAperture: 1.8, isMacro: true }], accessories: ["tripod", "bogus"] });
  assert.deepEqual(old.accessories, ["tripod"]);
  assert.equal(old.lenses[0].isFisheye, false);
  assert.ok(Core.capabilities(old).macro);
});
