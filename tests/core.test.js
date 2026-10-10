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
  assert.equal(lib.constraints.length, 167);
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
  assert.equal(stats.usable, 145);
  assert.equal(stats.combinations, 363717);
  assert.equal(stats.withSlots, 1459026);
});

test("settings and gear normalisation tolerate old or broken data", () => {
  const s = Core.normalizeSettings({ cardCount: 42, difficulty: "nope" });
  assert.equal(s.cardCount, 10);
  assert.equal(s.difficulty, "balanced");
  const g = Core.normalizeGear({ lenses: [{ name: "35mm", minFocal: "35", maxFocal: 35 }], accessories: ["tripod", "laser"] });
  assert.equal(g.lenses[0].minFocal, 35);
  assert.deepEqual(g.accessories, ["tripod"]);
});
