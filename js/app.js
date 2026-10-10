/* StopDown start-up: load the library, create the store and UI, deal the first cards. */
(function (root) {
  "use strict";
  var appEl = document.getElementById("app");

  if (!root.STOPDOWN_LIBRARY || !root.SDCore) {
    appEl.innerHTML = '<main><div class="empty"><h2>StopDown couldn\'t load</h2><p>The constraint library is missing. Check that data/constraints.js is next to index.html.</p></div></main>';
    return;
  }

  var library = root.SDCore.prepareLibrary(root.STOPDOWN_LIBRARY);
  var store = new root.SDStore(library);
  var ui = new root.SDUI(appEl, store);

  if (!store.cards.length) store.deal(); else ui.render();

  // Offline support. Service workers need http(s); opening index.html straight from disk still works, just without the install option.
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    root.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* offline caching unavailable */ });
    });
  }

  // Ask the browser not to clear our data when space runs low (honoured mainly once installed).
  if (navigator.storage && navigator.storage.persist) {
    navigator.storage.persist().catch(function () {});
  }
})(window);
