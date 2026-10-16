/*
 * StopDown screens. Each screen is a function that returns HTML; clicks and edits are
 * handled by delegated listeners keyed on data-action / data-field attributes.
 */
(function (root) {
  "use strict";
  var Core = root.SDCore;
  var Store = root.SDStore;

  // SF Symbol names in the library → icons in icons sprite (Lucide).
  var ICONS = {
    "camera": "camera", "camera.aperture": "aperture", "timer": "timer", "scope": "crosshair",
    "plusminus.circle": "contrast", "sun.max": "sun", "lightbulb": "lightbulb", "bolt": "zap",
    "triangle": "triangle", "square.grid.3x3": "grid-3x3", "eye": "eye",
    "person.crop.rectangle": "square-user", "sparkles": "sparkles", "hourglass": "hourglass",
    "photo": "image", "viewfinder": "scan", "paintpalette": "palette"
  };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function icon(name, extraClass) {
    var id = ICONS[name] || name;
    return '<svg class="icon' + (extraClass ? " " + extraClass : "") + '" aria-hidden="true"><use href="#i-' + id + '"></use></svg>';
  }

  function plural(n, word) { return n + " " + word + (n === 1 ? "" : "s"); }

  function formatDate(iso) {
    var d = new Date(iso);
    try {
      return d.toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) { return d.toString(); }
  }

  function UI(rootEl, store) {
    this.root = rootEl;
    this.store = store;
    this.showWhy = {};          // card id -> bool
    this.welcomePicked = [];
    this.welcomeCount = store.settings.cardCount;
    this.lensManual = {};       // lens id -> true once the numbers were typed by hand
    this.lensKindOverride = {}; // lens id -> "prime" | "zoom"
    this.poolKey = null;
    this.pool = null;
    this.poolToken = 0;
    var self = this;
    store.subscribe(function () { self.render(); });
    root.addEventListener("hashchange", function () { self.render(true); });
    rootEl.addEventListener("click", function (e) { self.onClick(e); });
    rootEl.addEventListener("change", function (e) { self.onChange(e); });
    rootEl.addEventListener("input", function (e) { self.onInput(e); });
  }

  // ---------- routing & rendering ----------

  UI.prototype.route = function () {
    var h = (root.location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/");
    if (parts[0] === "history") return { name: "history" };
    if (parts[0] === "settings") return { name: "settings" };
    if (parts[0] === "gear") return { name: "gear" };
    if (parts[0] === "lens" && parts[1]) return { name: "lens", id: decodeURIComponent(parts[1]) };
    return { name: "home" };
  };

  UI.prototype.render = function (scrollTop) {
    var active = document.activeElement;
    var focusKey = active && active.getAttribute ? active.getAttribute("data-key") : null;
    var route = this.route();
    var html;
    switch (route.name) {
      case "history": html = this.historyView(); break;
      case "settings": html = this.settingsView(); break;
      case "gear": html = this.gearView(); break;
      case "lens": html = this.lensView(route.id); break;
      default: html = this.homeView();
    }
    if (!this.store.hasSeenWelcome) html += this.welcomeView();
    this.root.innerHTML = html;
    if (scrollTop) root.scrollTo(0, 0);
    if (focusKey) {
      var again = this.root.querySelector('[data-key="' + focusKey + '"]');
      if (again) again.focus({ preventScroll: true });
    }
    document.title = route.name === "home" ? "StopDown" : "StopDown · " + ({ history: "Accepted", settings: "Settings", gear: "My gear", lens: "Lens" })[route.name];
    if (route.name === "settings") this.updatePoolStats();
  };

  function topbar(title, left, right) {
    return '<header class="topbar"><div class="left">' + (left || "") + '</div><h1>' + esc(title) +
      '</h1><div class="right">' + (right || "") + "</div></header>";
  }

  function backLink(href, label) {
    return '<a class="icon-btn" href="' + href + '" data-key="back">' + icon("chevron-left") + "<span>" + esc(label) + "</span></a>";
  }

  // ---------- home: the challenge ----------

  UI.prototype.homeView = function () {
    var s = this.store, lib = s.lib, self = this;
    var open = s.history.filter(function (e) { return !Store.isCompleted(e); }).length;
    var left = '<a class="icon-btn" href="#/history" aria-label="Accepted challenges' + (open ? ", " + open + " open" : "") + '" data-key="nav-history">' +
      icon("history") + (open ? '<span class="badge">' + open + "</span>" : "") + "</a>";
    var right = '<a class="icon-btn" href="#/settings" aria-label="Settings" data-key="nav-settings">' + icon("sliders-horizontal") + "</a>";

    var chips = '<button class="chip" data-action="focus-random" aria-pressed="' + (s.settings.focusGroups.length === 0) + '" data-key="chip-random">' +
      icon("dices") + "Random</button>";
    lib.groups.forEach(function (g) {
      var on = s.settings.focusGroups.indexOf(g.id) >= 0;
      chips += '<button class="chip" data-action="focus-toggle" data-id="' + esc(g.id) + '" aria-pressed="' + on + '" data-key="chip-' + esc(g.id) + '">' +
        icon(g.symbol) + esc(g.short || g.name) + "</button>";
    });

    var focus = '<section class="focus-bar" aria-label="What to practise"><div class="chips" role="group" aria-label="Categories">' + chips + "</div>" +
      '<div class="focus-row"><span class="summary">' + esc(s.focusSummary()) + "</span>" +
      stepper(s.settings.cardCount, "card-count", "cards") + "</div></section>";

    var note = s.note ? '<div class="note" role="status">' + icon("info") + "<p>" + esc(s.note) +
      '</p><button data-action="dismiss-note" aria-label="Dismiss">' + icon("x") + "</button></div>" : "";

    var cards = s.cards.map(function (card, i) { return self.cardHTML(card, i); }).join("");
    if (!s.cards.length) {
      cards = '<div class="empty">' + icon("dices") + "<h2>No challenge yet</h2><p>Tap New challenge to deal some constraints.</p></div>";
    }

    var locked = s.lockedCards().length;
    var accepted = s.isCurrentAccepted();
    var acceptLabel = locked === 0 ? "Lock to accept" : accepted ? "Accepted" : "Accept " + locked;
    var bar = '<div class="actionbar"><div class="inner">' +
      '<button class="btn primary" data-action="deal" data-key="deal">' + icon("dices") + (s.hasLockedCards() ? "Reroll unlocked" : "New challenge") + "</button>" +
      '<button class="btn secondary" data-action="accept" data-key="accept"' + (locked === 0 || accepted ? " disabled" : "") +
      ' title="Saves only the locked cards as an accepted challenge">' + icon(accepted ? "circle-check" : "check") + esc(acceptLabel) + "</button>" +
      "</div></div>";

    return topbar("StopDown", left, right) + '<main>' + focus + this.optionsHTML() + note + '<div class="cards">' + cards + "</div></main>" + bar;
  };

  /** Difficulty, time of day, place and repeat window, right above the cards (same settings as in Settings). */
  UI.prototype.optionsHTML = function () {
    var st = this.store.settings;
    function select(label, field, options, value) {
      return '<label class="opt-select"><span class="opt-label">' + esc(label) + '</span><span class="opt-value"><select data-field="' + field + '" data-key="home-' + field + '">' +
        options.map(function (o) { return '<option value="' + o.id + '"' + (o.id === value ? " selected" : "") + ">" + esc(o.label) + "</option>"; }).join("") +
        "</select>" + icon("chevron-right", "chev") + "</span></label>";
    }
    return '<section class="options" aria-label="Challenge options">' +
      '<div class="segmented" role="group" aria-label="Difficulty">' + Core.DIFFICULTIES.map(function (d) {
        return '<button data-action="difficulty" data-id="' + d.id + '" aria-pressed="' + (st.difficulty === d.id) + '" data-key="home-diff-' + d.id + '">' + d.label + "</button>";
      }).join("") + "</div>" +
      '<div class="opt-grid">' + select("Time of day", "time", Core.TIMES, st.time) + select("Where", "place", Core.PLACES, st.place) + "</div>" +
      '<div class="opt-row"><span class="grow">' + (st.cooldownDays === 0 ? "Repeats allowed" : "Avoid repeats for " + plural(st.cooldownDays, "day")) + "</span>" +
      stepper(st.cooldownDays, "cooldown", "days", 0, 60).replace(icon("layers"), "").replace(/data-key="cooldown-/g, 'data-key="home-cooldown-') + "</div>" +
      "</section>";
  };

  UI.prototype.cardHTML = function (card, index) {
    var axis = this.store.lib.axisById[card.axis];
    var why = !!this.showWhy[card.id];
    var dots = "";
    for (var d = 1; d <= 3; d++) dots += '<i class="' + (d <= card.difficulty ? "on" : "") + '"></i>';
    return '<article class="card' + (card.isLocked ? " locked" : "") + '" aria-label="' + esc((axis ? axis.name : card.axis) + ": " + card.text) + '">' +
      '<div class="card-head"><span class="axis">' + icon(axis ? axis.symbol : "circle") + esc(axis ? axis.name : card.axis) + "</span>" +
      '<span class="dots" role="img" aria-label="Difficulty ' + card.difficulty + ' of 3">' + dots + "</span></div>" +
      '<p class="card-text">' + esc(card.text) + "</p>" +
      (why ? '<p class="card-why">' + esc(card.why) + "</p>" : "") +
      '<div class="card-foot">' +
      '<button class="text-btn" data-action="why" data-id="' + esc(card.id) + '" aria-expanded="' + why + '" data-key="why-' + esc(card.id) + '">' + icon("lightbulb") + (why ? "Hide" : "Why?") + "</button>" +
      '<span class="spacer"></span>' +
      '<button class="text-btn" data-action="reroll" data-index="' + index + '"' + (card.isLocked ? " disabled" : "") + ' aria-label="Reroll this card" title="Reroll this card" data-key="reroll-' + esc(card.id) + '">' + icon("refresh-cw") + "</button>" +
      '<button class="text-btn" data-action="lock" data-index="' + index + '" aria-pressed="' + !!card.isLocked + '" aria-label="' + (card.isLocked ? "Unlock card" : "Lock card") + '" title="' + (card.isLocked ? "Unlock" : "Lock") + '" data-key="lock-' + esc(card.id) + '">' + icon(card.isLocked ? "lock" : "lock-open") + "</button>" +
      "</div></article>";
  };

  /** Controls on the main screen re-deal unlocked cards when changed; the same controls in Settings don't. */
  function isHome(el) { return (el.getAttribute("data-key") || "").indexOf("home-") === 0; }

  function stepper(value, name, unit, min, max) {
    min = min || 1; max = max || Core.MAX_CARDS;
    return '<span class="stepper" role="group" aria-label="Number of ' + unit + '">' +
      '<button data-action="step" data-name="' + name + '" data-delta="-1" aria-label="Fewer ' + unit + '"' + (value <= min ? " disabled" : "") + ' data-key="' + name + '-minus">' + icon("minus") + "</button>" +
      '<span class="value" aria-live="polite">' + icon("layers") + value + "</span>" +
      '<button data-action="step" data-name="' + name + '" data-delta="1" aria-label="More ' + unit + '"' + (value >= max ? " disabled" : "") + ' data-key="' + name + '-plus">' + icon("plus") + "</button></span>";
  }

  // ---------- welcome ----------

  UI.prototype.welcomeView = function () {
    var self = this, lib = this.store.lib;
    var picked = this.welcomePicked;
    var rows = optionRow("welcome-random", "", "dices", "Surprise me", "Completely random, from every category.", picked.length === 0);
    rows += "<h3>Or focus on</h3>";
    lib.groups.forEach(function (g) {
      var axes = lib.axesIn(g.id).map(function (a) { return a.name; }).join(", ");
      rows += optionRow("welcome-toggle", g.id, g.symbol, g.name, axes, picked.indexOf(g.id) >= 0);
    });
    return '<div class="overlay" role="dialog" aria-modal="true" aria-labelledby="welcome-title"><div class="content">' +
      '<img class="app-mark" src="icons/icon-192.png" alt="">' +
      '<h1 id="welcome-title">What do you want to practise?</h1>' +
      '<p class="lead-text">You can change this any time with the buttons above your cards.</p>' + rows +
      '<div class="count-row"><div class="grow"><strong>How many cards?</strong><div class="sub" style="color:var(--muted);font-size:14px">Up to ' + Core.MAX_CARDS + '. You can change this later above your cards.</div></div>' +
      stepper(this.welcomeCount, "welcome-count", "cards") + "</div>" +
      '<p class="sub" style="color:var(--muted);font-size:13px;margin-top:16px">Each category you pick is guaranteed one card. Any remaining cards are random.</p>' +
      '</div><div class="actionbar"><div class="inner"><button class="btn primary" data-action="welcome-done" data-key="welcome-done">Deal my first challenge</button></div></div></div>';
  };

  function optionRow(action, id, symbol, title, sub, on) {
    return '<button class="option" data-action="' + action + '" data-id="' + esc(id) + '" aria-pressed="' + on + '" data-key="' + action + "-" + esc(id) + '">' +
      icon(symbol, "big-icon") + '<span class="grow"><strong>' + esc(title) + '</strong><span class="sub">' + esc(sub) + "</span></span>" +
      icon(on ? "circle-check" : "circle", "tick") + "</button>";
  }

  // ---------- accepted challenges ----------

  UI.prototype.historyView = function () {
    var s = this.store, lib = s.lib;
    var entries = s.history.slice().reverse();
    var right = entries.length ? '<button class="icon-btn" data-action="history-clear" data-key="history-clear">Clear</button>' : "";
    var body;
    if (!entries.length) {
      body = '<div class="empty">' + icon("history") + "<h2>Nothing accepted yet</h2><p>Lock the cards you want and tap Accept. They show up here, and the generator avoids repeating them for a while.</p></div>";
    } else {
      body = '<p style="margin:4px 4px 0"><strong>' + s.completedChallengeCount() + " of " + plural(entries.length, "challenge") + " completed</strong></p>" +
        '<p class="foot" style="margin:2px 4px 0;color:var(--muted);font-size:13px">Tap a card to tick it off. StopDown keeps your last ' + Store.HISTORY_LIMIT + " accepted challenges; accepting a new one drops the oldest.</p>";
      entries.forEach(function (e) {
        var done = Store.doneCount(e), complete = Store.isCompleted(e);
        var status = complete ? '<span class="right done">' + icon("badge-check") + "Done</span>" : '<span class="right">' + done + "/" + e.cards.length + "</span>";
        var rows = e.cards.map(function (c) {
          var isDone = e.completedCardIDs.indexOf(c.id) >= 0;
          var axis = lib.axisById[c.axis];
          return '<button class="row check-row' + (isDone ? " done" : "") + '" data-action="tick" data-entry="' + esc(e.id) + '" data-card="' + esc(c.id) + '" aria-pressed="' + isDone + '" data-key="tick-' + esc(c.id) + '">' +
            icon(isDone ? "circle-check" : "circle", "tick") +
            '<span class="grow"><span class="axis-line">' + icon(axis ? axis.symbol : "circle") + esc(axis ? axis.name : c.axis) + '</span><span class="card-line">' + esc(c.text) + "</span></span></button>";
        }).join("");
        body += '<section class="section"><h2>' + esc(formatDate(e.date)) + status + '</h2><div class="group">' + rows +
          '<div class="entry-actions"><button class="text-btn" data-action="entry-done" data-entry="' + esc(e.id) + '" data-done="' + !complete + '" data-key="entry-done-' + esc(e.id) + '">' + icon(complete ? "x" : "check") + (complete ? "Not done" : "All done") + "</button>" +
          '<button class="text-btn danger" data-action="entry-delete" data-entry="' + esc(e.id) + '" data-key="entry-delete-' + esc(e.id) + '">' + icon("trash-2") + "Delete</button></div></div></section>";
      });
    }
    return topbar("Accepted", backLink("#/", "Back"), right) + '<main class="narrow">' + body + "</main>";
  };

  // ---------- settings ----------

  UI.prototype.settingsView = function () {
    var s = this.store, st = s.settings, lib = s.lib, self = this;
    var html = "";

    html += '<section class="section"><h2>Challenge</h2><div class="group">' +
      '<div class="row"><span class="grow">Cards</span>' + stepper(st.cardCount, "card-count", "cards") + "</div>" +
      '<div class="row"><div class="segmented" role="group" aria-label="Difficulty">' + Core.DIFFICULTIES.map(function (d) {
        return '<button data-action="difficulty" data-id="' + d.id + '" aria-pressed="' + (st.difficulty === d.id) + '" data-key="diff-' + d.id + '">' + d.label + "</button>";
      }).join("") + "</div></div>" +
      selectRow("Time of day", "time", Core.TIMES, st.time) +
      selectRow("Where", "place", Core.PLACES, st.place) +
      '<div class="row"><span class="grow">' + (st.cooldownDays === 0 ? "Repeats allowed" : "Avoid repeats for " + plural(st.cooldownDays, "day")) + "</span>" +
      stepper(st.cooldownDays, "cooldown", "days", 0, 60).replace(icon("layers"), "") + "</div>" +
      "</div>" +
      (st.focusGroups.length > st.cardCount ? '<p class="foot">You\'ve pinned ' + st.focusGroups.length + " categories, so you'll get " + Core.effectiveCardCount(st) + " cards: one for each.</p>" : "") +
      "</section>";

    html += '<section class="section"><div class="group"><a class="row" href="#/gear" data-key="nav-gear">' + icon("camera", "lead") +
      '<span class="grow">My gear</span><span class="value">' + plural(s.gear.lenses.length, "lens").replace("lenss", "lenses") + ", " + s.gear.accessories.length + " extras</span>" + icon("chevron-right", "chev") + "</a></div></section>";

    lib.groups.forEach(function (g) {
      html += '<section class="section"><h2>' + esc(g.name) + '</h2><div class="group">';
      lib.axesIn(g.id).forEach(function (a) {
        var count = s.usableCount(a.id);
        var on = st.disabledAxes.indexOf(a.id) < 0;
        html += '<label class="row">' + icon(a.symbol, "lead") + '<span class="grow">' + esc(a.name) + '<span class="sub">' +
          (count === 0 ? "None available with your gear" : count + " available") + "</span></span>" +
          '<span class="switch"><input type="checkbox" role="switch" data-field="axis" data-id="' + esc(a.id) + '"' + (on ? " checked" : "") + ' data-key="axis-' + esc(a.id) + '"><span></span></span></label>';
      });
      html += "</div></section>";
    });

    html += '<section class="section"><h2>Idea pool</h2><div class="group" id="pool-stats">' + this.poolStatsHTML() + "</div>" +
      '<p class="foot">Every valid combination for your gear, context, categories and difficulty. Slot values are things like the colour or focal length a card asks for.</p></section>';

    html += '<section class="section"><h2>Backup</h2><div class="group">' +
      '<button class="row" data-action="export" data-key="export">' + icon("download", "lead") + '<span class="grow">Export backup<span class="sub">Saves your gear, settings and accepted challenges as a file.</span></span></button>' +
      '<label class="row" data-key="import">' + icon("upload", "lead") + '<span class="grow">Import backup<span class="sub">Replaces what\'s on this device with a backup file.</span></span>' +
      '<input type="file" accept="application/json,.json" data-field="import" class="visually-hidden"></label>' +
      "</div>" + (s.storageOK ? "" : '<p class="foot" style="color:var(--danger)">This browser isn\'t letting StopDown save data, so nothing will be kept after you close it. Private browsing can cause this.</p>') +
      '<p class="foot">Everything stays in this browser on this device. On iPhone, add StopDown to your Home Screen so Safari keeps your data, and export a backup now and then.</p></section>';

    html += '<section class="section"><h2>About</h2><div class="group">' +
      '<button class="row" data-action="show-welcome" data-key="show-welcome">' + icon("sparkles", "lead") + '<span class="grow">Show the welcome screen again</span></button>' +
      '<div class="row"><span class="grow sub" style="font-size:13px">StopDown · ' + lib.constraints.length + " constraints in " + lib.axes.length + ' categories. No account, no tracking. Icons by <a href="https://lucide.dev" style="color:inherit">Lucide</a> (ISC licence).</span></div>' +
      "</div></section>";

    return topbar("Settings", backLink("#/", "Done"), "") + '<main class="narrow">' + html + "</main>";
  };

  function selectRow(label, field, options, value) {
    return '<label class="row"><span class="grow">' + esc(label) + '</span><select data-field="' + field + '" data-key="sel-' + field + '">' +
      options.map(function (o) { return '<option value="' + o.id + '"' + (o.id === value ? " selected" : "") + ">" + esc(o.label) + "</option>"; }).join("") +
      "</select>" + icon("chevron-right", "chev") + "</label>";
  }

  UI.prototype.poolKeyNow = function () {
    return JSON.stringify([this.store.gear, this.store.settings]);
  };

  UI.prototype.poolStatsHTML = function () {
    var p = this.pool;
    if (!p || this.poolKey !== this.poolKeyNow()) {
      return '<div class="row"><span class="grow">Counting…</span></div>';
    }
    var html = '<div class="row"><span class="grow">Usable constraints</span><span class="value stat">' + p.usable.toLocaleString() + "</span></div>";
    if (p.combinations === null) {
      html += '<div class="row"><span class="grow">' + p.cardCount + '-card challenges</span><span class="value">Too many to count</span></div>';
    } else {
      html += '<div class="row"><span class="grow">' + p.cardCount + '-card challenges</span><span class="value stat">' + p.combinations.toLocaleString() + "</span></div>" +
        '<div class="row"><span class="grow">Counting slot values</span><span class="value stat">' + p.withSlots.toLocaleString() + "</span></div>";
    }
    return html;
  };

  UI.prototype.updatePoolStats = function () {
    var key = this.poolKeyNow(), self = this;
    if (this.poolKey === key) return; // already counted, or counting right now
    var token = ++this.poolToken;
    this.poolKey = key;
    this.pool = null;
    this.store.generator().poolStats({ isCancelled: function () { return token !== self.poolToken; } }).then(function (result) {
      if (!result || token !== self.poolToken) return;
      self.pool = result;
      var el = document.getElementById("pool-stats");
      if (el) el.innerHTML = self.poolStatsHTML();
    });
  };

  // ---------- gear ----------

  UI.prototype.gearView = function () {
    var s = this.store, g = s.gear;
    var html = '<section class="section"><h2>Sensor</h2><div class="group"><label class="row"><span class="grow">Sensor</span><select data-field="crop" data-key="sel-crop">' +
      Core.SENSORS.map(function (o) { return '<option value="' + o.crop + '"' + (o.crop === g.cropFactor ? " selected" : "") + ">" + esc(o.label) + "</option>"; }).join("") +
      "</select>" + icon("chevron-right", "chev") + '</label></div><p class="foot">Used to decide what counts as wide (28mm equivalent or less) and tele (100mm equivalent or more).</p></section>';

    html += '<section class="section"><h2>Lenses</h2><div class="group">';
    g.lenses.forEach(function (l) {
      html += '<a class="row" href="#/lens/' + encodeURIComponent(l.id) + '" data-key="lens-' + esc(l.id) + '"><span class="grow">' + esc(Core.lensDisplayName(l)) +
        '<span class="sub">' + esc(Core.lensSummary(l)) + "</span></span>" + icon("chevron-right", "chev") + "</a>";
    });
    html += '<button class="row" data-action="lens-add" data-key="lens-add">' + icon("plus", "lead") + '<span class="grow" style="color:var(--accent-strong)">Add lens</span></button></div></section>';

    html += '<section class="section"><h2>Accessories & camera features</h2><div class="group">';
    Core.ACCESSORIES.forEach(function (a) {
      var on = g.accessories.indexOf(a.id) >= 0;
      html += '<label class="row"><span class="grow">' + esc(a.label) + '<span class="sub">' + esc(a.detail) + '</span></span><span class="switch"><input type="checkbox" role="switch" data-field="accessory" data-id="' + a.id + '"' + (on ? " checked" : "") + ' data-key="acc-' + a.id + '"><span></span></span></label>';
    });
    html += "</div></section>";

    var caps = Object.keys(Core.capabilities(g)).sort();
    var focals = Core.focalOptions(g);
    html += '<section class="section"><h2>What the generator sees</h2><div class="group"><div class="row"><span class="grow" style="font-family:ui-monospace,Menlo,monospace;font-size:14px">' +
      esc(caps.length ? caps.join(", ") : "Nothing yet") + '</span></div><div class="row"><span class="grow">Focal lengths</span><span class="value">' +
      esc(focals.length ? focals.join(", ") + "mm" : "–") + "</span></div></div></section>";

    return topbar("My gear", backLink("#/settings", "Settings"), "") + '<main class="narrow">' + html + "</main>";
  };

  // ---------- lens editor ----------

  UI.prototype.findLens = function (id) {
    return this.store.gear.lenses.filter(function (l) { return l.id === id; })[0];
  };

  UI.prototype.lensKind = function (lens) {
    return this.lensKindOverride[lens.id] || (Core.lensIsZoom(lens) ? "zoom" : "prime");
  };

  UI.prototype.matchesDetected = function (lens) {
    var d = Core.parseLensName(lens.name);
    if (d.hasFocal && (d.minFocal !== Core.lensShortest(lens) || d.maxFocal !== Core.lensLongest(lens))) return false;
    if (d.maxAperture !== null && d.maxAperture !== lens.maxAperture) return false;
    return true;
  };

  UI.prototype.detectedHTML = function (lens) {
    var d = Core.parseLensName(lens.name);
    if (!d.foundAnything) return "";
    var useBtn = this.lensManual[lens.id] && !this.matchesDetected(lens)
      ? '<button class="text-btn" data-action="lens-use" data-id="' + esc(lens.id) + '" data-key="lens-use">Use</button>' : "";
    return '<div class="row">' + icon("scan-text", "lead") + '<span class="grow" style="color:var(--muted);font-size:15px">' + esc(d.summary) + "</span>" + useBtn + "</div>";
  };

  UI.prototype.lensView = function (id) {
    var lens = this.findLens(id);
    if (!lens) return topbar("Lens", backLink("#/gear", "My gear"), "") + '<main class="narrow"><div class="empty"><h2>Lens not found</h2></div></main>';
    if (this.lensManual[lens.id] === undefined) {
      this.lensManual[lens.id] = Core.parseLensName(lens.name).hasFocal && !this.matchesDetected(lens);
    }
    var kind = this.lensKind(lens);
    var apertures = Core.APERTURES.slice();
    if (apertures.indexOf(lens.maxAperture) < 0) apertures.push(lens.maxAperture);
    apertures.sort(function (a, b) { return a - b; });

    var html = '<section class="section"><h2>Lens description</h2><div class="group">' +
      '<div class="row"><input class="full" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="e.g. AF-S Nikkor 18-55mm f/3.5-5.6G" value="' + esc(lens.name) +
      '" data-field="lens-name" data-id="' + esc(lens.id) + '" data-key="lens-name" aria-label="Lens description"></div>' +
      '<div id="lens-detected">' + this.detectedHTML(lens) + "</div></div>" +
      '<p class="foot">Type the name as printed on the lens. Focal length, widest aperture and macro are read from it, and you can adjust them below.</p></section>';

    html += '<section class="section"><h2>Type</h2><div class="group"><div class="row"><div class="segmented" role="group" aria-label="Lens type">' +
      '<button data-action="lens-kind" data-id="' + esc(lens.id) + '" data-kind="prime" aria-pressed="' + (kind === "prime") + '" data-key="kind-prime">Prime</button>' +
      '<button data-action="lens-kind" data-id="' + esc(lens.id) + '" data-kind="zoom" aria-pressed="' + (kind === "zoom") + '" data-key="kind-zoom">Zoom</button>' +
      '</div></div></div><p class="foot">' + (kind === "prime"
        ? "Primes unlock prime-only challenges, and the focal length cards use this exact length."
        : "Zooms unlock challenges like zoom bursts and taping the zoom ring, and focal length cards pick from this range.") + "</p></section>";

    html += '<section class="section"><h2>Focal length (mm)</h2><div class="group">' +
      '<label class="row"><span class="grow">' + (kind === "prime" ? "Focal length" : "Shortest") + '</span><input type="number" inputmode="numeric" min="1" max="2000" value="' + lens.minFocal +
      '" data-field="lens-min" data-id="' + esc(lens.id) + '" data-key="lens-min"></label>' +
      (kind === "zoom" ? '<label class="row"><span class="grow">Longest</span><input type="number" inputmode="numeric" min="1" max="2000" value="' + lens.maxFocal +
        '" data-field="lens-max" data-id="' + esc(lens.id) + '" data-key="lens-max"></label>' : "") +
      "</div></section>";

    html += '<section class="section"><div class="group">' +
      '<label class="row"><span class="grow">Widest aperture</span><select data-field="lens-aperture" data-id="' + esc(lens.id) + '" data-key="lens-aperture">' +
      apertures.map(function (a) { return '<option value="' + a + '"' + (a === lens.maxAperture ? " selected" : "") + ">f/" + Core.formatAperture(a) + "</option>"; }).join("") +
      "</select>" + icon("chevron-right", "chev") + "</label>" +
      '<label class="row"><span class="grow">Macro</span><span class="switch"><input type="checkbox" role="switch" data-field="lens-macro" data-id="' + esc(lens.id) + '"' + (lens.isMacro ? " checked" : "") + ' data-key="lens-macro"><span></span></span></label>' +
      '</div><p class="foot">For a variable-aperture zoom, use the widest value (f/3.5 on an 18–55mm f/3.5–5.6).</p></section>';

    html += '<section class="section"><div class="group"><button class="row" data-action="lens-delete" data-id="' + esc(lens.id) + '" data-key="lens-delete" style="color:var(--danger)">' +
      icon("trash-2") + '<span class="grow">Delete this lens</span></button></div></section>';

    return topbar(Core.lensDisplayName(lens), backLink("#/gear", "My gear"), "") + '<main class="narrow">' + html + "</main>";
  };

  UI.prototype.applyDetected = function (lens, force) {
    if (!force && this.lensManual[lens.id]) return false;
    var d = Core.parseLensName(lens.name);
    var changed = false;
    if (d.hasFocal) { lens.minFocal = d.minFocal; lens.maxFocal = d.maxFocal; delete this.lensKindOverride[lens.id]; changed = true; }
    if (d.maxAperture !== null) { lens.maxAperture = d.maxAperture; changed = true; }
    if (d.isMacro) { lens.isMacro = true; changed = true; }
    if (force) this.lensManual[lens.id] = false;
    return changed;
  };

  // ---------- events ----------

  UI.prototype.onClick = function (e) {
    var el = e.target.closest("[data-action]");
    if (!el || !this.root.contains(el) || el.disabled) return;
    var s = this.store, a = el.getAttribute("data-action"), id = el.getAttribute("data-id");
    var self = this;
    switch (a) {
      case "deal": s.deal(); break;
      case "accept": s.accept(); break;
      case "reroll": s.reroll(+el.getAttribute("data-index")); break;
      case "lock": s.toggleLock(+el.getAttribute("data-index")); break;
      case "why": this.showWhy[id] = !this.showWhy[id]; this.render(); break;
      case "dismiss-note": s.dismissNote(); break;
      case "focus-random": s.setFocus([]); break;
      case "focus-toggle": s.toggleFocus(id); break;
      case "step": {
        var name = el.getAttribute("data-name"), delta = +el.getAttribute("data-delta");
        if (name === "card-count") s.setCardCount(s.settings.cardCount + delta);
        else if (name === "cooldown") s.updateSettings({ cooldownDays: Math.min(60, Math.max(0, s.settings.cooldownDays + delta)) });
        else if (name === "welcome-count") { this.welcomeCount = Math.min(Core.MAX_CARDS, Math.max(1, this.welcomeCount + delta)); this.render(); }
        break;
      }
      case "difficulty":
        s.updateSettings({ difficulty: id });
        if (isHome(el)) s.deal(); // on the main screen, show the effect straight away
        break;
      case "welcome-random": this.welcomePicked = []; this.render(); break;
      case "welcome-toggle": {
        var i = this.welcomePicked.indexOf(id);
        if (i >= 0) this.welcomePicked.splice(i, 1); else this.welcomePicked.push(id);
        this.render();
        break;
      }
      case "welcome-done": s.finishWelcome(this.welcomePicked, this.welcomeCount); break;
      case "show-welcome":
        this.welcomePicked = s.settings.focusGroups.slice();
        this.welcomeCount = s.settings.cardCount;
        root.location.hash = "#/";
        s.showWelcomeAgain();
        break;
      case "tick": s.toggleDone(el.getAttribute("data-entry"), el.getAttribute("data-card")); break;
      case "entry-done": s.setDone(el.getAttribute("data-entry"), el.getAttribute("data-done") === "true"); break;
      case "entry-delete":
        if (root.confirm("Delete this accepted challenge?")) s.deleteEntry(el.getAttribute("data-entry"));
        break;
      case "history-clear":
        if (root.confirm("Clear all accepted challenges? This also resets the repeat cooldown.")) s.clearHistory();
        break;
      case "export": this.exportBackup(); break;
      case "lens-add": {
        var lens = Core.newLens();
        s.updateGear(function (g) { g.lenses.push(lens); }, true);
        this.lensManual[lens.id] = false;
        root.location.hash = "#/lens/" + encodeURIComponent(lens.id);
        break;
      }
      case "lens-kind": {
        var l = this.findLens(id), kind = el.getAttribute("data-kind");
        if (!l) break;
        this.lensKindOverride[l.id] = kind;
        this.lensManual[l.id] = true;
        s.updateGear(function () {
          if (kind === "prime") l.maxFocal = l.minFocal;
          else if (l.maxFocal <= l.minFocal) l.maxFocal = l.minFocal * 2;
        });
        break;
      }
      case "lens-use": {
        var lu = this.findLens(id);
        if (lu) s.updateGear(function () { self.applyDetected(lu, true); });
        break;
      }
      case "lens-delete": {
        var ld = this.findLens(id);
        if (ld && root.confirm('Delete "' + Core.lensDisplayName(ld) + '"?')) {
          s.updateGear(function (g) { g.lenses = g.lenses.filter(function (x) { return x.id !== id; }); }, true);
          root.location.hash = "#/gear";
        }
        break;
      }
    }
  };

  UI.prototype.onChange = function (e) {
    var el = e.target, f = el.getAttribute && el.getAttribute("data-field");
    if (!f) return;
    var s = this.store, id = el.getAttribute("data-id"), self = this;
    switch (f) {
      case "axis": s.toggleAxis(id); break;
      case "time": s.updateSettings({ time: el.value }); if (isHome(el)) s.deal(); break;
      case "place": s.updateSettings({ place: el.value }); if (isHome(el)) s.deal(); break;
      case "crop": s.updateGear(function (g) { g.cropFactor = parseFloat(el.value); }); break;
      case "accessory": s.updateGear(function (g) {
        var i = g.accessories.indexOf(id);
        if (el.checked && i < 0) g.accessories.push(id);
        if (!el.checked && i >= 0) g.accessories.splice(i, 1);
      }); break;
      case "lens-name": s.updateGear(function () {}); break; // re-render with the final name
      case "lens-min":
      case "lens-max": {
        var lens = this.findLens(id), v = parseInt(el.value, 10);
        if (!lens || !(v >= 1 && v <= 2000)) { this.render(); break; }
        this.lensManual[lens.id] = true;
        s.updateGear(function () {
          if (f === "lens-min") {
            lens.minFocal = v;
            if (self.lensKind(lens) === "prime") lens.maxFocal = v;
          } else lens.maxFocal = v;
        });
        break;
      }
      case "lens-aperture": {
        var la = this.findLens(id);
        if (la) { this.lensManual[la.id] = true; s.updateGear(function () { la.maxAperture = parseFloat(el.value); }); }
        break;
      }
      case "lens-macro": {
        var lm = this.findLens(id);
        if (lm) s.updateGear(function () { lm.isMacro = el.checked; });
        break;
      }
      case "import": this.importBackup(el); break;
    }
  };

  /** Typing a lens description updates the parsed values live without rebuilding the page. */
  UI.prototype.onInput = function (e) {
    var el = e.target;
    if (!el.getAttribute || el.getAttribute("data-field") !== "lens-name") return;
    var lens = this.findLens(el.getAttribute("data-id"));
    if (!lens) return;
    var self = this;
    this.store.updateGear(function () {
      lens.name = el.value;
      self.applyDetected(lens, false);
    }, true);
    var box = document.getElementById("lens-detected");
    if (box) box.innerHTML = this.detectedHTML(lens);
    var min = this.root.querySelector('[data-field="lens-min"]');
    var max = this.root.querySelector('[data-field="lens-max"]');
    var ap = this.root.querySelector('[data-field="lens-aperture"]');
    var mac = this.root.querySelector('[data-field="lens-macro"]');
    var kindChanged = (this.lensKind(lens) === "zoom") !== !!max;
    if (kindChanged) {
      // Prime/zoom flipped: rebuild, keeping the cursor in the description field.
      var pos = el.selectionStart;
      this.render();
      var again = this.root.querySelector('[data-field="lens-name"]');
      if (again) { again.focus(); try { again.setSelectionRange(pos, pos); } catch (err) { /* ignore */ } }
      return;
    }
    if (min) min.value = lens.minFocal;
    if (max) max.value = lens.maxFocal;
    if (mac) mac.checked = lens.isMacro;
    if (ap && String(lens.maxAperture) !== ap.value) {
      if (![].some.call(ap.options, function (o) { return o.value === String(lens.maxAperture); })) {
        var opt = document.createElement("option");
        opt.value = String(lens.maxAperture);
        opt.textContent = "f/" + Core.formatAperture(lens.maxAperture);
        ap.appendChild(opt);
      }
      ap.value = String(lens.maxAperture);
    }
    var title = this.root.querySelector(".topbar h1");
    if (title) title.textContent = Core.lensDisplayName(lens);
  };

  // ---------- backup ----------

  UI.prototype.exportBackup = function () {
    var data = JSON.stringify(this.store.exportData(), null, 2);
    var blob = new Blob([data], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "stopdown-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  };

  UI.prototype.importBackup = function (input) {
    var file = input.files && input.files[0], s = this.store;
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        if (!root.confirm("Replace the gear, settings and accepted challenges on this device with this backup?")) return;
        s.importData(data);
        root.location.hash = "#/";
      } catch (err) {
        root.alert("Couldn't read that file: " + err.message);
      }
    };
    reader.readAsText(file);
    input.value = "";
  };

  root.SDUI = UI;
})(window);
