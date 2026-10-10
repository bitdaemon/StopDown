/*
 * StopDown app state: gear, settings, current cards and accepted challenges.
 * Everything is saved to this browser's localStorage; nothing leaves the device.
 */
(function (root) {
  "use strict";
  var Core = root.SDCore;

  var KEYS = {
    gear: "stopdown.gear", settings: "stopdown.settings", history: "stopdown.history",
    cards: "stopdown.cards", welcome: "stopdown.hasSeenWelcome"
  };
  var HISTORY_LIMIT = 10;

  function load(key) {
    try {
      var raw = root.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) { return null; }
  }

  function save(key, value) {
    try { root.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { return false; }
  }

  function normalizeHistory(list) {
    if (!Array.isArray(list)) return [];
    return list.filter(function (e) { return e && Array.isArray(e.cards) && e.date; }).map(function (e) {
      return {
        id: e.id || Core.uuid(), date: e.date, cards: e.cards,
        completedCardIDs: Array.isArray(e.completedCardIDs) ? e.completedCardIDs : []
      };
    }).slice(-HISTORY_LIMIT);
  }

  function Store(library) {
    this.lib = library;
    this.gear = Core.normalizeGear(load(KEYS.gear));
    this.settings = Core.normalizeSettings(load(KEYS.settings));
    this.history = normalizeHistory(load(KEYS.history));
    var cards = load(KEYS.cards);
    this.cards = Array.isArray(cards) ? cards.filter(function (c) { return c && library.byId[c.constraintID]; }) : [];
    this.note = null;
    this.hasSeenWelcome = load(KEYS.welcome) === true;
    this.storageOK = save("stopdown.probe", 1);
    this.listeners = [];
  }

  Store.HISTORY_LIMIT = HISTORY_LIMIT;

  Store.prototype.subscribe = function (fn) { this.listeners.push(fn); };
  Store.prototype.emit = function () { this.listeners.forEach(function (fn) { fn(); }); };

  Store.prototype.generator = function () {
    return new Core.Generator(this.lib, this.gear, this.settings, this.history);
  };

  // ----- saving -----
  Store.prototype.saveGear = function () { save(KEYS.gear, this.gear); };
  Store.prototype.saveSettings = function () { save(KEYS.settings, this.settings); };
  Store.prototype.saveHistory = function () { save(KEYS.history, this.history); };
  Store.prototype.saveCards = function () { save(KEYS.cards, this.cards); };

  // ----- challenge -----
  Store.prototype.lockedCards = function () { return this.cards.filter(function (c) { return c.isLocked; }); };
  Store.prototype.hasLockedCards = function () { return this.lockedCards().length > 0; };
  /** True when exactly the locked cards were already saved as the latest accepted challenge (survives reloads). */
  Store.prototype.isCurrentAccepted = function () {
    var ids = this.lockedCards().map(function (c) { return c.id; }).join("|");
    var last = this.history[this.history.length - 1];
    return ids.length > 0 && !!last && last.cards.map(function (c) { return c.id; }).join("|") === ids;
  };

  Store.prototype.deal = function () {
    var r = this.generator().deal(this.cards);
    this.cards = r.cards;
    this.note = r.note;
    this.saveCards();
    this.emit();
  };

  Store.prototype.reroll = function (index) {
    var r = this.generator().reroll(index, this.cards);
    this.cards = r.cards;
    this.note = r.note;
    this.saveCards();
    this.emit();
  };

  Store.prototype.toggleLock = function (index) {
    if (!this.cards[index]) return;
    this.cards[index].isLocked = !this.cards[index].isLocked;
    this.saveCards();
    this.emit();
  };

  /** Saves the locked cards as an accepted challenge. Unlocked cards are left out. */
  Store.prototype.accept = function () {
    var chosen = this.lockedCards();
    if (!chosen.length || this.isCurrentAccepted()) return;
    this.history.push({
      id: Core.uuid(), date: new Date().toISOString(),
      cards: JSON.parse(JSON.stringify(chosen)), completedCardIDs: []
    });
    if (this.history.length > HISTORY_LIMIT) this.history.splice(0, this.history.length - HISTORY_LIMIT);
    this.note = chosen.length === 1 ? "1 card accepted. Go shoot!" : chosen.length + " cards accepted. Go shoot!";
    this.saveHistory();
    this.emit();
  };

  Store.prototype.dismissNote = function () { this.note = null; this.emit(); };

  // ----- focus -----
  Store.prototype.setFocus = function (groups) {
    this.settings.focusGroups = groups.slice();
    this.saveSettings();
    this.deal();
  };

  Store.prototype.toggleFocus = function (groupId) {
    var g = this.settings.focusGroups.slice();
    var i = g.indexOf(groupId);
    if (i >= 0) g.splice(i, 1); else g.push(groupId);
    this.setFocus(g);
  };

  Store.prototype.focusSummary = function () {
    var self = this;
    var names = this.lib.groups.filter(function (g) { return self.settings.focusGroups.indexOf(g.id) >= 0; })
      .map(function (g) { return g.short || g.name; });
    var total = Core.effectiveCardCount(this.settings);
    if (!names.length) return "Completely random: " + total + " card" + (total === 1 ? "" : "s") + " from any category.";
    var list = names.length === 1 ? names[0] : names.slice(0, -1).join(", ") + " and " + names[names.length - 1];
    var extra = total - names.length;
    return (names.length === 1 ? "One card from " : "One card each from ") + list + (extra > 0 ? ", plus " + extra + " random." : ".");
  };

  // ----- card count -----
  /** Adding keeps the current cards and deals extra ones; removing takes unlocked cards off the bottom. */
  Store.prototype.setCardCount = function (count) {
    var n = Math.min(Core.MAX_CARDS, Math.max(1, count));
    if (n === this.settings.cardCount) return;
    this.settings.cardCount = n;
    this.saveSettings();
    var target = Core.effectiveCardCount(this.settings);
    if (this.cards.length < target) {
      var r = this.generator().extend(this.cards, target);
      this.cards = r.cards;
      this.note = r.note;
    } else if (this.cards.length > target) {
      this.removeCardsDownTo(target);
    }
    this.saveCards();
    this.emit();
  };

  Store.prototype.removeCardsDownTo = function (target) {
    var lib = this.lib, focus = this.settings.focusGroups;
    var result = this.cards.slice();
    while (result.length > target) {
      var removable = [];
      for (var i = result.length - 1; i >= 0; i--) if (!result[i].isLocked) removable.push(i);
      if (!removable.length) break;
      var safe = removable.filter(function (idx) {
        var g = lib.groupOfAxis[result[idx].axis];
        if (focus.indexOf(g) < 0) return true;
        return result.some(function (c, j) { return j !== idx && lib.groupOfAxis[c.axis] === g; });
      });
      result.splice(safe.length ? safe[0] : removable[0], 1);
    }
    this.cards = result;
    this.note = result.length > target ? "Unlock a card to go down to " + target + "." : null;
  };

  // ----- settings & gear -----
  Store.prototype.updateSettings = function (patch, redeal) {
    var self = this;
    Object.keys(patch).forEach(function (k) { self.settings[k] = patch[k]; });
    this.saveSettings();
    this.emit();
  };

  Store.prototype.toggleAxis = function (axisId) {
    var d = this.settings.disabledAxes, i = d.indexOf(axisId);
    if (i >= 0) d.splice(i, 1); else d.push(axisId);
    this.saveSettings();
    this.emit();
  };

  Store.prototype.updateGear = function (mutator, silent) {
    mutator(this.gear);
    this.saveGear();
    if (!silent) this.emit();
  };

  Store.prototype.usableCount = function (axisId) { return this.generator().usableCount(axisId); };

  // ----- history -----
  Store.prototype.completedChallengeCount = function () {
    return this.history.filter(function (e) { return isCompleted(e); }).length;
  };

  Store.prototype.toggleDone = function (entryId, cardId) {
    var e = this.findEntry(entryId);
    if (!e) return;
    var i = e.completedCardIDs.indexOf(cardId);
    if (i >= 0) e.completedCardIDs.splice(i, 1); else e.completedCardIDs.push(cardId);
    this.saveHistory();
    this.emit();
  };

  Store.prototype.setDone = function (entryId, done) {
    var e = this.findEntry(entryId);
    if (!e) return;
    e.completedCardIDs = done ? e.cards.map(function (c) { return c.id; }) : [];
    this.saveHistory();
    this.emit();
  };

  Store.prototype.deleteEntry = function (entryId) {
    this.history = this.history.filter(function (e) { return e.id !== entryId; });
    this.saveHistory();
    this.emit();
  };

  Store.prototype.clearHistory = function () {
    this.history = [];
    this.saveHistory();
    this.emit();
  };

  Store.prototype.findEntry = function (id) {
    return this.history.filter(function (e) { return e.id === id; })[0];
  };

  function doneCount(e) {
    return e.cards.filter(function (c) { return e.completedCardIDs.indexOf(c.id) >= 0; }).length;
  }
  function isCompleted(e) { return e.cards.length > 0 && doneCount(e) === e.cards.length; }
  Store.doneCount = doneCount;
  Store.isCompleted = isCompleted;

  // ----- welcome -----
  Store.prototype.finishWelcome = function (groups, count) {
    this.hasSeenWelcome = true;
    save(KEYS.welcome, true);
    this.settings.cardCount = Math.min(Core.MAX_CARDS, Math.max(1, count));
    this.setFocus(groups);
  };

  Store.prototype.showWelcomeAgain = function () {
    this.hasSeenWelcome = false;
    save(KEYS.welcome, false);
    this.emit();
  };

  // ----- backup -----
  Store.prototype.exportData = function () {
    return {
      app: "StopDown", format: 1, exported: new Date().toISOString(),
      gear: this.gear, settings: this.settings, history: this.history, cards: this.cards
    };
  };

  Store.prototype.importData = function (data) {
    if (!data || data.app !== "StopDown") throw new Error("This isn't a StopDown backup file.");
    this.gear = Core.normalizeGear(data.gear);
    this.settings = Core.normalizeSettings(data.settings);
    this.history = normalizeHistory(data.history);
    var lib = this.lib;
    this.cards = Array.isArray(data.cards) ? data.cards.filter(function (c) { return c && lib.byId[c.constraintID]; }) : [];
    this.note = "Backup restored.";
    this.saveGear(); this.saveSettings(); this.saveHistory(); this.saveCards();
    this.emit();
  };

  root.SDStore = Store;
})(window);
