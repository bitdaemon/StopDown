# StopDown

Gear-aware photography challenges. StopDown deals random creative constraints (lens, light, composition, subject, session limits) that fit the camera gear you actually own. Lock the cards you like, reroll the rest, accept the challenge, then tick off each card once you've shot it.

It's a web app that runs on phones, tablets and computers, installs to the home screen, and works offline. There's no account, no tracking, and no server: everything stays in your browser.

## Features

- **167 constraints in 15 categories**, grouped as Camera & settings, Light, Composition, Subject & idea, and Limits & output.
- **Gear profile:** sensor size, lenses and accessories. Cards you can't do never come up, and `{focal}` cards only name focal lengths you own.
- **Lens descriptions:** type the name as printed on the lens ("AF-S Nikkor 35mm 1:1.8G") and the focal length, widest aperture and macro are filled in.
- **Random or focused:** pick one or more categories, and each is guaranteed a card. Remaining cards are random.
- **1 to 10 cards**, with lock and reroll for single cards or all unlocked cards.
- **Compatibility rules:** a challenge never pairs contradicting cards, such as "Silhouettes only" with "Flat front light".
- **Difficulty modes, time of day, indoors/outdoors**, and a no-repeat cooldown.
- **Accepted challenges:** Accept saves only the locked cards. The last 10 challenges are kept, with done ticks per card.
- **Idea pool counter**, showing how many different challenges your setup allows.
- **Backup:** export and import your gear, settings and challenges as a file.
- **Display:** light and dark mode, keyboard and screen-reader friendly.

## Run it

**On your computer:** double-click `index.html`. Everything works except installing and the offline cache, which need a web address.

**As a local web app:**

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

**On your phone:** publish it with GitHub Pages (below), open the address, then:

- **iPhone/iPad (Safari):** Share → Add to Home Screen
- **Android (Chrome):** menu → Install app

Once added, it opens full screen and works without signal.

## Publish with GitHub Pages

1. Create a new repository on GitHub, for example `stopdown`, without a README.
2. In this folder:
   ```sh
   git remote add origin https://github.com/<you>/stopdown.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages → Build and deployment**, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`.
4. After a minute the app is live at `https://<you>.github.io/stopdown/`.

There's no build step: the files in this folder are the app.

### Shipping an update

Edit the files, then **bump `VERSION` in `sw.js`** (for example `stopdown-v1` → `stopdown-v2`), commit and push. Installed copies download the new version next time they're opened online, and switch over on the following launch. Without the bump, phones keep the old cached copy.

## Edit the constraints

The library is `data/constraints.js`: JSON between `/*BEGIN-JSON*/` and `/*END-JSON*/`. It's wrapped in one line of JavaScript so the app also works when opened straight from disk.

Each constraint:

```json
{
  "id": "ss.long",                 // unique and permanent; prefix = category
  "axis": "shutter",               // one of the 15 categories
  "difficulty": 2,                 // 1-3
  "text": "Tripod, 10 seconds or longer.",
  "why": "Long exposures smooth water ...",
  "tags": ["slow-shutter"],        // what this card asserts
  "excludes": ["fast-shutter"],    // tags that can't appear on another card
  "requires": ["tripod"],          // gear capabilities
  "time": ["golden", "night"],     // optional: day | golden | night
  "place": ["outdoor"]             // optional: indoor | outdoor
}
```

- **Slots:** `{focal}` comes from your lenses. Any other `{name}` comes from `lists.name`.
- **Capabilities:** zoom, prime, wide, tele, fast-lens, macro, tripod, flash, off-camera-flash, nd, polariser, reflector, gels, multi-exposure.
- **IDs:** don't reuse or delete an id that people may have in their history. Retire it by removing the text from use instead.

Then check the library and see how big the pool is:

```sh
python3 tools/pool_report.py               # validates + pool size per gear profile
python3 tools/pool_report.py --sample 20   # read 20 random 3-card challenges
```

## Tests

The generator, gear and lens parsing run in plain Node with no dependencies:

```sh
node --test tests/core.test.js
```

The tests check, among other things, that the app's idea-pool count matches `tools/pool_report.py` exactly.

## Project layout

```
index.html              page shell + inline icon sprite
manifest.webmanifest    install metadata (name, icons, colours)
sw.js                   service worker: offline cache
css/app.css             all styling (phone → desktop, light/dark)
data/constraints.js     the constraint library
js/core.js              generator, gear, settings, lens parsing (no DOM; shared with tests)
js/store.js             app state + saving to localStorage, backup import/export
js/ui.js                screens and event handling
js/app.js               start-up
icons/                  app icons (+ Lucide licence)
tools/                  pool_report.py and test gear profiles
tests/                  Node tests for js/core.js
```

## Data and privacy

Gear, settings, current cards and accepted challenges are saved in the browser's `localStorage` on that device only. Nothing is sent anywhere.

- Clearing the browser's website data erases them. Use **Settings → Backup → Export** now and then.
- On iPhone, use StopDown from the Home Screen rather than a Safari tab, because Safari is stricter about keeping data for sites that aren't added.

## Browser support

Current Safari (iOS/iPadOS/macOS 16.4 or later), Chrome, Edge and Firefox.

## Credits and licence

- Icons: [Lucide](https://lucide.dev), ISC licence; see `icons/LUCIDE-LICENSE.txt`.
- StopDown: © 2026 Richard Takacs, released under the [MIT License](LICENSE). You're free to use, copy, modify and share it, as long as the copyright notice and licence text stay with every copy.
