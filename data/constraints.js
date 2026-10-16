/* StopDown constraint library. Edit the JSON between the markers; run tools/pool_report.py to check it. */
window.STOPDOWN_LIBRARY = /*BEGIN-JSON*/{
  "version": 1,
  "groups": [
    {
      "id": "camera",
      "name": "Camera & settings",
      "short": "Camera",
      "symbol": "camera"
    },
    {
      "id": "light",
      "name": "Light",
      "short": "Light",
      "symbol": "sun.max"
    },
    {
      "id": "composition",
      "name": "Composition",
      "short": "Composition",
      "symbol": "viewfinder"
    },
    {
      "id": "subject",
      "name": "Subject & idea",
      "short": "Subject",
      "symbol": "sparkles"
    },
    {
      "id": "limits",
      "name": "Limits & output",
      "short": "Limits",
      "symbol": "hourglass"
    }
  ],
  "axes": [
    {
      "id": "lens",
      "name": "Lens & focal length",
      "group": "camera",
      "symbol": "camera"
    },
    {
      "id": "aperture",
      "name": "Aperture",
      "group": "camera",
      "symbol": "camera.aperture"
    },
    {
      "id": "shutter",
      "name": "Shutter & motion",
      "group": "camera",
      "symbol": "timer"
    },
    {
      "id": "focus",
      "name": "Focus",
      "group": "camera",
      "symbol": "scope"
    },
    {
      "id": "exposure",
      "name": "Exposure & ISO",
      "group": "camera",
      "symbol": "plusminus.circle"
    },
    {
      "id": "direction",
      "name": "Light direction",
      "group": "light",
      "symbol": "sun.max"
    },
    {
      "id": "source",
      "name": "Light source & quality",
      "group": "light",
      "symbol": "lightbulb"
    },
    {
      "id": "flash",
      "name": "Flash",
      "group": "light",
      "symbol": "bolt"
    },
    {
      "id": "shape",
      "name": "Shapes & lines",
      "group": "composition",
      "symbol": "triangle"
    },
    {
      "id": "composition",
      "name": "Framing",
      "group": "composition",
      "symbol": "square.grid.3x3"
    },
    {
      "id": "viewpoint",
      "name": "Viewpoint",
      "group": "composition",
      "symbol": "eye"
    },
    {
      "id": "subject",
      "name": "Subject",
      "group": "subject",
      "symbol": "person.crop.rectangle"
    },
    {
      "id": "concept",
      "name": "Concept",
      "group": "subject",
      "symbol": "sparkles"
    },
    {
      "id": "limits",
      "name": "Session limits",
      "group": "limits",
      "symbol": "hourglass"
    },
    {
      "id": "output",
      "name": "Output & edit",
      "group": "limits",
      "symbol": "photo"
    },
    {
      "id": "colour",
      "name": "Colour & tone",
      "group": "composition",
      "symbol": "paintpalette"
    }
  ],
  "lists": {
    "colour": [
      "red",
      "yellow",
      "blue",
      "green",
      "orange",
      "white",
      "black",
      "purple",
      "pink",
      "brown"
    ],
    "texture": [
      "rust",
      "peeling paint",
      "tree bark",
      "stone",
      "fabric",
      "water",
      "glass",
      "hair or fur",
      "paper",
      "concrete",
      "wood grain",
      "metal"
    ],
    "shape": [
      "arches",
      "spirals",
      "stars",
      "crosses",
      "squares",
      "ovals",
      "zigzags",
      "hexagons"
    ],
    "concept": [
      "waiting",
      "absence",
      "home",
      "quiet",
      "tension",
      "growth",
      "decay",
      "joy",
      "routine",
      "hidden",
      "between",
      "borrowed",
      "fragile",
      "heavy",
      "late",
      "threshold",
      "warmth",
      "distance",
      "noise",
      "leftover"
    ],
    "pair": [
      "old / new",
      "soft / hard",
      "big / small",
      "natural / man-made",
      "light / dark",
      "still / moving",
      "empty / full",
      "rough / smooth"
    ],
    "palette": [
      "teal and orange",
      "blue and yellow",
      "red and green",
      "purple and gold",
      "cool blues only"
    ],
    "frames": [
      "5",
      "8",
      "10",
      "12",
      "24",
      "36"
    ],
    "minutes": [
      "10",
      "15",
      "20",
      "30",
      "45"
    ],
    "metres": [
      "25",
      "50",
      "100",
      "200"
    ],
    "material": [
      "glass",
      "brick",
      "steel",
      "wood",
      "water",
      "paper",
      "stone",
      "plastic",
      "fabric",
      "rust"
    ]
  },
  "constraints": [
    {
      "id": "lens.one-focal",
      "axis": "lens",
      "difficulty": 1,
      "text": "Set {focal}mm and shoot the whole session there. No zooming.",
      "why": "A fixed field of view makes you move and find the frame instead of cropping with the zoom ring.",
      "tags": [
        "single-focal"
      ]
    },
    {
      "id": "lens.widest-close",
      "axis": "lens",
      "difficulty": 2,
      "text": "Zoom to your widest setting and get within arm's length of your subject.",
      "why": "Wide angles exaggerate distance: close up, the near subject dominates and pulls the viewer in.",
      "tags": [
        "wide",
        "close-up"
      ],
      "excludes": [
        "distance"
      ],
      "requires": [
        "wide"
      ]
    },
    {
      "id": "lens.longest",
      "axis": "lens",
      "difficulty": 1,
      "text": "Zoom all the way in and stay there.",
      "why": "Telephoto compresses depth, stacking the background against the subject and isolating details.",
      "tags": [
        "tele"
      ],
      "requires": [
        "tele"
      ],
      "excludes": [
        "close-up"
      ]
    },
    {
      "id": "lens.five-distances",
      "axis": "lens",
      "difficulty": 2,
      "text": "Set {focal}mm and photograph one subject from five different distances.",
      "why": "Perspective comes from where you stand, not from the zoom ring. This makes that visible.",
      "tags": [
        "single-focal",
        "moving-feet",
        "multi-frame"
      ]
    },
    {
      "id": "lens.tape-middle",
      "axis": "lens",
      "difficulty": 1,
      "text": "Tape your zoom ring at its middle setting and don't touch it.",
      "why": "The middle of a kit zoom sits near a 'normal' view. Learning to see at one angle builds instinct.",
      "tags": [
        "single-focal"
      ],
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "lens.prime-only",
      "axis": "lens",
      "difficulty": 1,
      "text": "Leave the zoom at home: prime lens only.",
      "why": "No zoom means every framing decision is made with your feet.",
      "tags": [
        "single-focal"
      ],
      "requires": [
        "prime",
        "zoom"
      ]
    },
    {
      "id": "lens.macro",
      "axis": "lens",
      "difficulty": 2,
      "text": "Macro lens only, and nothing you shoot may be bigger than your hand.",
      "why": "Magnification turns ordinary surfaces into landscapes and demands careful focus and stillness.",
      "tags": [
        "close-up",
        "hand-size"
      ],
      "excludes": [
        "distance",
        "large-subject",
        "hyperfocal"
      ],
      "requires": [
        "macro"
      ]
    },
    {
      "id": "lens.min-focus",
      "axis": "lens",
      "difficulty": 2,
      "text": "Every frame at your lens's minimum focusing distance.",
      "why": "Working at the closest focus forces you to find small subjects and see detail.",
      "tags": [
        "close-up"
      ],
      "excludes": [
        "distance",
        "hyperfocal"
      ]
    },
    {
      "id": "lens.wide-portrait",
      "axis": "lens",
      "difficulty": 3,
      "text": "Make a portrait at your widest focal length and make the distortion work for you.",
      "why": "Wide-angle portraits include the environment and can flatter or caricature. You have to control it.",
      "tags": [
        "wide",
        "people"
      ],
      "excludes": [
        "no-people"
      ],
      "requires": [
        "wide"
      ]
    },
    {
      "id": "lens.tele-landscape",
      "axis": "lens",
      "difficulty": 2,
      "text": "Shoot a landscape or streetscape at your longest focal length.",
      "why": "Long lenses pull distant layers together and help you pick one part of a big scene.",
      "tags": [
        "tele",
        "distance"
      ],
      "excludes": [
        "close-up"
      ],
      "requires": [
        "tele"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "lens.alternate",
      "axis": "lens",
      "difficulty": 2,
      "text": "Alternate every frame: widest, then longest, then widest again.",
      "why": "Switching extremes trains you to predict what each end of the lens will show before you raise the camera.",
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "ap.wide-open",
      "axis": "aperture",
      "difficulty": 1,
      "text": "Shoot every frame wide open.",
      "why": "Maximum aperture gives the shallowest depth of field. You must choose exactly one thing to be sharp.",
      "tags": [
        "wide-aperture",
        "fixed-aperture"
      ],
      "excludes": [
        "narrow-aperture",
        "deep-focus"
      ]
    },
    {
      "id": "ap.f8",
      "axis": "aperture",
      "difficulty": 1,
      "text": "Lock the aperture at f/8 for the whole session.",
      "why": "f/8 is most lenses' sharpest zone and gives forgiving depth of field. That frees you to focus on moments.",
      "tags": [
        "fixed-aperture"
      ]
    },
    {
      "id": "ap.f16",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Stop down to f/16 or smaller for every frame.",
      "why": "Small apertures give depth but cost light and some sharpness (diffraction). Watch your shutter speed.",
      "tags": [
        "narrow-aperture",
        "fixed-aperture"
      ],
      "excludes": [
        "wide-aperture",
        "defocus"
      ]
    },
    {
      "id": "ap.sunstar",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Find a point of light and turn it into a sunstar at f/16 or smaller.",
      "why": "Point lights turn into stars at small apertures because of the aperture blades' shape.",
      "tags": [
        "narrow-aperture",
        "fixed-aperture"
      ],
      "excludes": [
        "wide-aperture",
        "defocus"
      ]
    },
    {
      "id": "ap.pairs",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Shoot every scene twice: wide open and at f/16. Keep only the better one.",
      "why": "Comparing extremes side by side shows you what depth of field does for a particular subject.",
      "tags": [
        "fixed-aperture",
        "multi-frame",
        "varies-exposure"
      ]
    },
    {
      "id": "ap.bokeh-lights",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Shoot wide open with out-of-focus lights in the background.",
      "why": "Distant point lights become discs of bokeh. Their size depends on aperture and subject distance.",
      "tags": [
        "wide-aperture"
      ],
      "excludes": [
        "narrow-aperture",
        "deep-focus"
      ],
      "time": [
        "golden",
        "night"
      ]
    },
    {
      "id": "ap.f2",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Shoot at f/2 or wider.",
      "why": "Very fast apertures give a razor-thin plane of focus, so focus has to be exact.",
      "tags": [
        "wide-aperture",
        "fixed-aperture"
      ],
      "excludes": [
        "narrow-aperture",
        "deep-focus"
      ],
      "requires": [
        "fast-lens"
      ]
    },
    {
      "id": "ap.stop-walk",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Aperture priority: change the aperture by one full stop after every frame.",
      "why": "Cycling through the stops shows how each one changes depth of field and shutter speed.",
      "tags": [
        "fixed-aperture",
        "varies-exposure",
        "aperture-priority"
      ]
    },
    {
      "id": "ap.near-far",
      "axis": "aperture",
      "difficulty": 3,
      "text": "Everything from 1 metre to infinity must be sharp.",
      "why": "This needs a small aperture and hyperfocal focusing: focus about a third into the scene, not at infinity.",
      "tags": [
        "deep-focus",
        "narrow-aperture",
        "fixed-aperture",
        "hyperfocal"
      ],
      "excludes": [
        "wide-aperture",
        "defocus"
      ]
    },
    {
      "id": "ap.sliver",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Get so close with a wide aperture that only a sliver of your subject is sharp.",
      "why": "Depth of field shrinks fast as you get closer. The sharp line becomes the composition.",
      "tags": [
        "wide-aperture",
        "close-up"
      ],
      "excludes": [
        "narrow-aperture",
        "deep-focus",
        "distance"
      ]
    },
    {
      "id": "ss.slow-handheld",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Handheld at 1/4s or slower. Embrace the shake.",
      "why": "Deliberate blur records movement and mood instead of fact.",
      "tags": [
        "slow-shutter",
        "motion-blur",
        "handheld"
      ],
      "excludes": [
        "fast-shutter",
        "freeze",
        "on-tripod"
      ]
    },
    {
      "id": "ss.pan",
      "axis": "shutter",
      "difficulty": 3,
      "text": "Pan with a moving subject at 1/30s or slower.",
      "why": "Tracking the subject keeps it fairly sharp while the background streaks, which gives a sense of speed.",
      "tags": [
        "slow-shutter",
        "motion-blur"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
      ]
    },
    {
      "id": "ss.icm",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Intentional camera movement: move the camera during a 1/2s exposure.",
      "why": "ICM turns scenes into brushstrokes. Try moving along the dominant lines.",
      "tags": [
        "slow-shutter",
        "motion-blur"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
      ]
    },
    {
      "id": "ss.freeze",
      "axis": "shutter",
      "difficulty": 1,
      "text": "1/1000s or faster: freeze something that moves.",
      "why": "Fast shutter speeds stop moments the eye can't see: splashes, jumps, hair in the wind.",
      "tags": [
        "fast-shutter",
        "freeze"
      ],
      "excludes": [
        "slow-shutter",
        "motion-blur"
      ],
      "time": [
        "day"
      ]
    },
    {
      "id": "ss.long",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Tripod, 10 seconds or longer.",
      "why": "Long exposures smooth water and clouds and reveal light the eye can't gather.",
      "tags": [
        "slow-shutter",
        "long-exposure",
        "on-tripod"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
      ],
      "requires": [
        "tripod"
      ],
      "time": [
        "golden",
        "night"
      ]
    },
    {
      "id": "ss.long-day",
      "axis": "shutter",
      "difficulty": 3,
      "text": "Long exposure in daylight: at least 1 second, using an ND filter.",
      "why": "ND filters cut light so you can use slow shutters in bright conditions.",
      "tags": [
        "slow-shutter",
        "long-exposure",
        "on-tripod"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
      ],
      "requires": [
        "tripod",
        "nd"
      ],
      "time": [
        "day"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "ss.ghosts",
      "axis": "shutter",
      "difficulty": 3,
      "text": "Shoot a busy place with a long exposure so the people become ghosts.",
      "why": "Anything that moves during a long exposure fades. What stays still stays solid.",
      "tags": [
        "slow-shutter",
        "long-exposure",
        "people",
        "on-tripod",
        "large-subject"
      ],
      "excludes": [
        "fast-shutter",
        "freeze",
        "no-people"
      ],
      "requires": [
        "tripod"
      ]
    },
    {
      "id": "ss.water-twice",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Photograph moving water twice, once frozen and once silky. Keep one.",
      "why": "The same subject tells a different story at 1/1000s and at 1s.",
      "place": [
        "outdoor"
      ],
      "tags": [
        "varied-shutter",
        "multi-frame",
        "varies-exposure"
      ]
    },
    {
      "id": "ss.zoom-burst",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Zoom burst: turn the zoom ring during a 1/4s exposure.",
      "why": "Zooming during the exposure makes streaks that rush toward the centre.",
      "tags": [
        "slow-shutter",
        "motion-blur",
        "zoom-action"
      ],
      "excludes": [
        "fast-shutter",
        "freeze",
        "single-focal"
      ],
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "ss.trails",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Capture light trails from traffic or other moving lights.",
      "why": "Moving lights become lines in a long exposure. Look for curves and junctions.",
      "tags": [
        "slow-shutter",
        "long-exposure",
        "on-tripod"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
      ],
      "requires": [
        "tripod"
      ],
      "time": [
        "night"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "ss.half-blur",
      "axis": "shutter",
      "difficulty": 3,
      "text": "One element sharp and one blurred by motion, in the same frame.",
      "why": "Contrast between still and moving shows time passing within a single photograph.",
      "tags": [
        "motion-blur"
      ],
      "excludes": [
        "freeze"
      ]
    },
    {
      "id": "fo.manual",
      "axis": "focus",
      "difficulty": 1,
      "text": "Manual focus only.",
      "why": "Turning the ring yourself slows you down and makes focus a deliberate decision.",
      "tags": [
        "manual-focus"
      ]
    },
    {
      "id": "fo.zone",
      "axis": "focus",
      "difficulty": 2,
      "text": "Zone focus: set focus at 3 metres and don't touch it again.",
      "why": "Zone focusing is how street shooters work: stop down, pre-focus, and shoot the moment.",
      "tags": [
        "manual-focus"
      ],
      "excludes": [
        "close-up"
      ]
    },
    {
      "id": "fo.nothing-sharp",
      "axis": "focus",
      "difficulty": 2,
      "text": "Nothing may be in sharp focus.",
      "why": "Without detail to rely on, shape, colour and light have to carry the picture.",
      "tags": [
        "defocus"
      ],
      "excludes": [
        "deep-focus"
      ]
    },
    {
      "id": "fo.nearest",
      "axis": "focus",
      "difficulty": 2,
      "text": "Focus on the nearest object in the frame, whatever the 'subject' is.",
      "why": "Moving the focus point changes what the picture is about."
    },
    {
      "id": "fo.background",
      "axis": "focus",
      "difficulty": 2,
      "text": "Focus on the background and let the foreground blur.",
      "why": "A soft foreground frames the scene and gives depth.",
      "tags": [
        "defocus",
        "bg-sharp"
      ],
      "excludes": [
        "deep-focus"
      ]
    },
    {
      "id": "fo.foreground-blur",
      "axis": "focus",
      "difficulty": 2,
      "text": "Include a blurred foreground element in every frame.",
      "why": "Shooting past something close adds layers and a sense of being there.",
      "tags": [
        "layers"
      ],
      "excludes": [
        "deep-focus"
      ]
    },
    {
      "id": "fo.centre-point",
      "axis": "focus",
      "difficulty": 1,
      "text": "Use only the centre AF point, then recompose.",
      "why": "Focus-and-recompose separates focusing from composing, which is a core habit."
    },
    {
      "id": "fo.rack",
      "axis": "focus",
      "difficulty": 2,
      "text": "Shoot one scene three times, focusing near, then middle, then far.",
      "why": "Three versions of one frame show how focus directs attention.",
      "tags": [
        "multi-frame"
      ]
    },
    {
      "id": "fo.infinity",
      "axis": "focus",
      "difficulty": 1,
      "text": "Set focus to infinity and leave it there.",
      "why": "Fixed focus makes you work with distance and depth of field, not with the AF.",
      "tags": [
        "manual-focus",
        "bg-sharp"
      ],
      "excludes": [
        "close-up",
        "looking-down"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "fo.eyes",
      "axis": "focus",
      "difficulty": 1,
      "text": "Put a person in every frame, and make the nearest eye tack sharp.",
      "why": "The eye is where viewers look first. Getting it sharp is the basic test of a portrait.",
      "tags": [
        "people"
      ],
      "excludes": [
        "no-people"
      ]
    },
    {
      "id": "ex.high-key",
      "axis": "exposure",
      "difficulty": 1,
      "text": "+2 EV: shoot high key, bright and airy.",
      "why": "Overexposing on purpose simplifies the scene and changes its mood.",
      "tags": [
        "high-key"
      ],
      "excludes": [
        "low-key",
        "silhouette"
      ]
    },
    {
      "id": "ex.low-key",
      "axis": "exposure",
      "difficulty": 1,
      "text": "-2 EV: shoot low key and let the shadows be the subject.",
      "why": "Underexposing hides clutter and makes the light itself the subject.",
      "tags": [
        "low-key"
      ],
      "excludes": [
        "high-key"
      ]
    },
    {
      "id": "ex.silhouette",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Silhouettes only: expose for the bright background.",
      "why": "Silhouettes reduce subjects to shape. Clean outlines against bright light matter most.",
      "tags": [
        "silhouette"
      ],
      "excludes": [
        "high-key",
        "frontlight",
        "sidelight",
        "toplight",
        "flash"
      ]
    },
    {
      "id": "ex.manual",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Full manual mode, with no auto ISO.",
      "why": "Setting all three yourself makes the exposure triangle something you feel, not just read about.",
      "excludes": [
        "aperture-priority"
      ]
    },
    {
      "id": "ex.base-iso",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Lock ISO at its lowest setting.",
      "why": "Base ISO gives the cleanest files. You pay for it with aperture and shutter choices.",
      "tags": [
        "base-iso"
      ],
      "excludes": [
        "high-iso"
      ]
    },
    {
      "id": "ex.high-iso",
      "axis": "exposure",
      "difficulty": 1,
      "text": "ISO 3200 or higher. Use the grain.",
      "why": "High ISO opens up dim scenes and fast shutters. Noise can be part of the look.",
      "tags": [
        "high-iso"
      ],
      "excludes": [
        "base-iso"
      ]
    },
    {
      "id": "ex.spot-highlights",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Spot meter on the brightest thing in the frame.",
      "why": "Exposing for the highlights protects them and pushes everything else into shadow."
    },
    {
      "id": "ex.spot-shadows",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Spot meter on the darkest area and let the highlights blow.",
      "why": "Exposing for the shadows shows detail in the dark and a bright, washed feel elsewhere.",
      "excludes": [
        "low-key"
      ]
    },
    {
      "id": "ex.meter-once",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Meter once at the start and never change the exposure settings.",
      "why": "Fixed settings make you look for light that fits them, rather than adjusting the camera to the light.",
      "excludes": [
        "varies-exposure",
        "varied-shutter"
      ]
    },
    {
      "id": "ex.bracket",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Bracket every scene at -2, 0 and +2 EV. Choose later.",
      "why": "Seeing three exposures together teaches you which one the scene actually needed.",
      "tags": [
        "multi-frame",
        "varies-exposure"
      ]
    },
    {
      "id": "ex.wrong-wb",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Set the 'wrong' white balance, such as tungsten in daylight, and commit to it.",
      "why": "White balance is a creative tool as well as a correction.",
      "tags": [
        "colour-dependent",
        "hue-cast"
      ],
      "excludes": [
        "bw"
      ]
    },
    {
      "id": "di.backlight",
      "axis": "direction",
      "difficulty": 1,
      "text": "Backlight only: the light must be behind your subject.",
      "why": "Backlight separates subjects from the background and makes translucent things glow.",
      "tags": [
        "backlight"
      ],
      "excludes": [
        "frontlight"
      ]
    },
    {
      "id": "di.side",
      "axis": "direction",
      "difficulty": 1,
      "text": "Side light only, hitting your subject at about 90 degrees.",
      "why": "Side light reveals texture and form through shadow.",
      "tags": [
        "sidelight"
      ],
      "excludes": [
        "frontlight"
      ]
    },
    {
      "id": "di.rim",
      "axis": "direction",
      "difficulty": 2,
      "text": "Find a subject outlined by light against a darker background.",
      "why": "Rim light draws the edges. Look for it against shade.",
      "tags": [
        "backlight"
      ],
      "excludes": [
        "frontlight",
        "high-key"
      ]
    },
    {
      "id": "di.overhead",
      "axis": "direction",
      "difficulty": 2,
      "text": "Harsh overhead light: make midday sun work.",
      "why": "Midday light is hard to use. Look for shade edges, reflections and strong graphic shadows.",
      "tags": [
        "toplight",
        "hard-light",
        "sun"
      ],
      "excludes": [
        "soft-light"
      ],
      "time": [
        "day"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "di.flat-front",
      "axis": "direction",
      "difficulty": 2,
      "text": "Flat front light: find colour and texture without shadows to help.",
      "why": "Front light flattens form, so colour and pattern have to do the work.",
      "tags": [
        "frontlight"
      ],
      "excludes": [
        "backlight",
        "silhouette"
      ]
    },
    {
      "id": "di.low-sun",
      "axis": "direction",
      "difficulty": 1,
      "text": "Sun within 10 degrees of the horizon. Chase the long shadows.",
      "why": "Low sun rakes across surfaces and stretches shadows, adding warmth and depth.",
      "tags": [
        "low-sun",
        "sun"
      ],
      "time": [
        "golden"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "di.below",
      "axis": "direction",
      "difficulty": 3,
      "text": "Find or make light that comes from below.",
      "why": "Underlighting is unnatural, which makes it dramatic or unsettling.",
      "tags": [
        "underlight"
      ]
    },
    {
      "id": "di.dappled",
      "axis": "direction",
      "difficulty": 1,
      "text": "Dappled light through leaves or a screen.",
      "why": "Broken light adds pattern and can pick out one part of a scene.",
      "tags": [
        "hard-light",
        "sun"
      ],
      "excludes": [
        "soft-light"
      ],
      "time": [
        "day"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "di.into-light",
      "axis": "direction",
      "difficulty": 2,
      "text": "Point the lens at the light and use the flare.",
      "why": "Flare lowers contrast and adds atmosphere. Control it with small moves of the camera.",
      "tags": [
        "backlight",
        "bright-source"
      ],
      "excludes": [
        "frontlight"
      ]
    },
    {
      "id": "di.pool",
      "axis": "direction",
      "difficulty": 3,
      "text": "Find a pool of light and wait for someone to walk into it.",
      "why": "Choose the stage first and let the subject arrive. This is patient, classic street work.",
      "tags": [
        "people",
        "hard-light",
        "large-subject"
      ],
      "excludes": [
        "no-people",
        "soft-light"
      ]
    },
    {
      "id": "so.window",
      "axis": "source",
      "difficulty": 1,
      "text": "Window light only.",
      "why": "A window is a big, soft, directional light. Moving the subject toward or away from it changes everything.",
      "tags": [
        "window-light",
        "natural-only",
        "soft-light",
        "ambient-only",
        "fixed-light"
      ],
      "excludes": [
        "flash",
        "artificial-only",
        "hard-light"
      ],
      "time": [
        "day",
        "golden"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "so.artificial",
      "axis": "source",
      "difficulty": 1,
      "text": "Artificial light only: streetlights, lamps, screens, signs.",
      "why": "Man-made light has colour and falloff that daylight doesn't.",
      "tags": [
        "artificial-only"
      ],
      "excludes": [
        "natural-only",
        "window-light",
        "sun"
      ]
    },
    {
      "id": "so.one-source",
      "axis": "source",
      "difficulty": 2,
      "text": "Only one light source in the whole scene.",
      "why": "A single source gives clear direction and deep shadows.",
      "tags": [
        "single-source"
      ]
    },
    {
      "id": "so.reflected",
      "axis": "source",
      "difficulty": 2,
      "text": "Only reflected light: no direct light may hit your subject.",
      "why": "Bounced light off walls, pavements and water is soft and often coloured.",
      "tags": [
        "soft-light"
      ],
      "excludes": [
        "hard-light"
      ]
    },
    {
      "id": "so.hard",
      "axis": "source",
      "difficulty": 1,
      "text": "Hard light with crisp-edged shadows.",
      "why": "Hard light brings contrast, drama and graphic shapes.",
      "tags": [
        "hard-light"
      ],
      "excludes": [
        "soft-light"
      ]
    },
    {
      "id": "so.soft",
      "axis": "source",
      "difficulty": 1,
      "text": "Soft, near-shadowless light: open shade or cloud.",
      "why": "Soft light is flattering and shows colour well, but you need another way to add depth.",
      "tags": [
        "soft-light"
      ],
      "excludes": [
        "hard-light"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "so.mixed",
      "axis": "source",
      "difficulty": 2,
      "text": "Mix colour temperatures in one frame: warm tungsten and cool daylight.",
      "why": "Warm and cool light together make a natural colour contrast.",
      "tags": [
        "colour-dependent",
        "mixed-light",
        "warm-cool"
      ],
      "excludes": [
        "bw"
      ]
    },
    {
      "id": "so.torch",
      "axis": "source",
      "difficulty": 2,
      "text": "Light your subject with a phone torch.",
      "why": "A small moving light teaches you how distance and angle shape a subject.",
      "tags": [
        "artificial-only",
        "ambient-only",
        "phone"
      ],
      "excludes": [
        "natural-only",
        "window-light",
        "flash",
        "sun"
      ]
    },
    {
      "id": "so.reflector",
      "axis": "source",
      "difficulty": 2,
      "text": "Use a reflector to bounce light into the shadows.",
      "why": "Fill light controls contrast without changing the character of the key light.",
      "requires": [
        "reflector"
      ]
    },
    {
      "id": "so.coloured",
      "axis": "source",
      "difficulty": 2,
      "text": "Coloured light only: neon, LEDs, signs.",
      "why": "Coloured light changes the mood of a scene completely.",
      "tags": [
        "artificial-only",
        "colour-dependent",
        "ambient-only",
        "saturated",
        "fixed-light",
        "coloured-light"
      ],
      "excludes": [
        "bw",
        "natural-only",
        "flash",
        "sun"
      ],
      "time": [
        "night"
      ]
    },
    {
      "id": "so.flame",
      "axis": "source",
      "difficulty": 2,
      "text": "Candlelight or firelight only.",
      "why": "Flame is warm, low and flickering. It's a good test of handholding and ISO.",
      "tags": [
        "artificial-only",
        "ambient-only",
        "fixed-light",
        "warm-light"
      ],
      "excludes": [
        "natural-only",
        "fast-shutter",
        "flash",
        "sun"
      ]
    },
    {
      "id": "so.blue-hour",
      "axis": "source",
      "difficulty": 2,
      "text": "Blue hour only: after sunset, before full dark.",
      "why": "Twilight balances artificial lights with a deep blue sky for a short time.",
      "time": [
        "golden",
        "night"
      ],
      "place": [
        "outdoor"
      ],
      "excludes": [
        "sun"
      ]
    },
    {
      "id": "so.polariser",
      "axis": "source",
      "difficulty": 1,
      "text": "Use a polariser: cut the reflections or deepen the sky.",
      "why": "A polariser removes glare from water, glass and leaves. Its effect on the sky is strongest at 90 degrees to the sun.",
      "requires": [
        "polariser"
      ],
      "time": [
        "day",
        "golden"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "fl.bounce",
      "axis": "flash",
      "difficulty": 1,
      "text": "Bounce flash only, off the ceiling or a wall, never direct.",
      "why": "Bouncing turns a small, harsh flash into a large, soft source.",
      "tags": [
        "flash",
        "soft-light"
      ],
      "excludes": [
        "natural-only",
        "window-light",
        "silhouette",
        "hard-light"
      ],
      "requires": [
        "flash"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "fl.off-camera-side",
      "axis": "flash",
      "difficulty": 2,
      "text": "Off-camera flash from 90 degrees to the side.",
      "why": "Moving the flash off the axis of the lens gives shape and shadow.",
      "tags": [
        "flash",
        "sidelight"
      ],
      "excludes": [
        "natural-only",
        "frontlight"
      ],
      "requires": [
        "off-camera-flash"
      ]
    },
    {
      "id": "fl.fill",
      "axis": "flash",
      "difficulty": 2,
      "text": "Fill flash in daylight at -1.7 EV flash compensation.",
      "why": "Subtle fill opens up shadows while the ambient light stays in charge.",
      "tags": [
        "flash"
      ],
      "excludes": [
        "natural-only"
      ],
      "requires": [
        "flash"
      ],
      "time": [
        "day"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "fl.rear-curtain",
      "axis": "flash",
      "difficulty": 3,
      "text": "Rear-curtain sync with a slow shutter: a motion trail plus a frozen subject.",
      "why": "The flash fires at the end of the exposure, so the trail falls behind the movement.",
      "tags": [
        "flash",
        "slow-shutter",
        "motion-blur"
      ],
      "excludes": [
        "natural-only",
        "fast-shutter"
      ],
      "requires": [
        "flash"
      ]
    },
    {
      "id": "fl.overpower-sun",
      "axis": "flash",
      "difficulty": 3,
      "text": "Underexpose the sky by 2 stops and light your subject with flash.",
      "why": "Balancing flash against ambient light is the key skill with a speedlight.",
      "tags": [
        "flash"
      ],
      "excludes": [
        "natural-only"
      ],
      "requires": [
        "flash"
      ],
      "time": [
        "day",
        "golden"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "fl.gel",
      "axis": "flash",
      "difficulty": 3,
      "text": "Gel the flash orange and set the white balance to tungsten.",
      "why": "The subject comes out neutral while the background turns blue.",
      "tags": [
        "flash",
        "colour-dependent",
        "hue-cast",
        "warm-light"
      ],
      "excludes": [
        "bw",
        "natural-only"
      ],
      "requires": [
        "flash",
        "gels"
      ]
    },
    {
      "id": "fl.direct",
      "axis": "flash",
      "difficulty": 1,
      "text": "Direct on-camera flash: hard, bright and unapologetic.",
      "why": "Direct flash has a raw, snapshot look. Use its hard shadows on purpose.",
      "tags": [
        "flash",
        "hard-light",
        "frontlight"
      ],
      "excludes": [
        "soft-light",
        "natural-only"
      ],
      "requires": [
        "flash"
      ]
    },
    {
      "id": "fl.behind",
      "axis": "flash",
      "difficulty": 3,
      "text": "Put the flash behind your subject, pointing back at the camera.",
      "why": "A flash behind the subject gives a rim or halo and makes the scene look staged.",
      "tags": [
        "flash",
        "backlight"
      ],
      "excludes": [
        "frontlight",
        "natural-only"
      ],
      "requires": [
        "off-camera-flash"
      ]
    },
    {
      "id": "fl.low-power",
      "axis": "flash",
      "difficulty": 2,
      "text": "Manual flash at 1/16 power or less.",
      "why": "Low power recycles fast and forces you to control distance and ISO.",
      "tags": [
        "flash"
      ],
      "excludes": [
        "natural-only"
      ],
      "requires": [
        "flash"
      ]
    },
    {
      "id": "fl.dark-room",
      "axis": "flash",
      "difficulty": 2,
      "text": "Flash is the only light: shoot in a dark room.",
      "why": "When flash is the only light, every shadow comes from your choices.",
      "tags": [
        "flash",
        "single-source"
      ],
      "excludes": [
        "natural-only",
        "window-light",
        "artificial-only",
        "mixed-light"
      ],
      "requires": [
        "flash"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "sp.triangles",
      "axis": "shape",
      "difficulty": 1,
      "text": "Triangles: find three points or lines that form one.",
      "why": "Triangles bring stability or tension and lead the eye around the frame."
    },
    {
      "id": "sp.circles",
      "axis": "shape",
      "difficulty": 1,
      "text": "Circles and curves only.",
      "why": "Circles hold the eye and soften hard environments."
    },
    {
      "id": "sp.diagonals",
      "axis": "shape",
      "difficulty": 1,
      "text": "Strong diagonals in every frame.",
      "why": "Diagonals add energy and movement."
    },
    {
      "id": "sp.leading-lines",
      "axis": "shape",
      "difficulty": 1,
      "text": "Leading lines that pull the eye to your subject.",
      "why": "Lines are directions for the eye. Make sure they end somewhere worth looking at."
    },
    {
      "id": "sp.s-curve",
      "axis": "shape",
      "difficulty": 2,
      "text": "Find an S-curve.",
      "why": "S-curves lead the eye slowly through the depth of a scene."
    },
    {
      "id": "sp.repetition",
      "axis": "shape",
      "difficulty": 1,
      "text": "Repeat one shape at least five times in the frame.",
      "why": "Repetition makes rhythm, the visual equivalent of a beat."
    },
    {
      "id": "sp.grid",
      "axis": "shape",
      "difficulty": 1,
      "text": "Grids and rectangles.",
      "why": "Grids show order in man-made places and work well with a straight, square-on viewpoint."
    },
    {
      "id": "sp.list",
      "axis": "shape",
      "difficulty": 1,
      "text": "Only {shape}.",
      "why": "Searching for one shape changes what you notice as you walk."
    },
    {
      "id": "sp.verticals",
      "axis": "shape",
      "difficulty": 1,
      "text": "Only vertical lines. Keep them perfectly straight.",
      "why": "Straight verticals feel calm and architectural. Level the camera.",
      "tags": [
        "level-lines",
        "vertical-lines"
      ],
      "excludes": [
        "tilted",
        "steep-angle"
      ]
    },
    {
      "id": "sp.curve-vs-straight",
      "axis": "shape",
      "difficulty": 2,
      "text": "One curve set against straight lines.",
      "why": "Contrasting shapes show a single element that doesn't fit, and that's where tension comes from."
    },
    {
      "id": "sp.break-pattern",
      "axis": "shape",
      "difficulty": 2,
      "text": "Repetition with one exception: break the pattern.",
      "why": "A broken pattern gives the eye an obvious place to land."
    },
    {
      "id": "co.centre",
      "axis": "composition",
      "difficulty": 1,
      "text": "Dead centre: put your subject exactly in the middle.",
      "why": "Centred compositions feel direct and formal, and work well with symmetry.",
      "tags": [
        "centered"
      ],
      "excludes": [
        "off-center"
      ]
    },
    {
      "id": "co.corner",
      "axis": "composition",
      "difficulty": 2,
      "text": "Subject in a corner, within the outer 10% of the frame.",
      "why": "Extreme placement creates tension and makes use of empty space.",
      "tags": [
        "off-center"
      ],
      "excludes": [
        "centered"
      ]
    },
    {
      "id": "co.negative",
      "axis": "composition",
      "difficulty": 1,
      "text": "At least 70% negative space.",
      "why": "Empty space isolates the subject and gives the image room to breathe.",
      "tags": [
        "negative-space"
      ],
      "excludes": [
        "filled-frame"
      ]
    },
    {
      "id": "co.fill",
      "axis": "composition",
      "difficulty": 1,
      "text": "Fill the frame: no background visible.",
      "why": "Filling the frame removes context and makes the details the story.",
      "tags": [
        "filled-frame",
        "close-up"
      ],
      "excludes": [
        "negative-space",
        "distance"
      ]
    },
    {
      "id": "co.frame-in-frame",
      "axis": "composition",
      "difficulty": 1,
      "text": "Frame within a frame: a door, window, arch or branches.",
      "why": "Inner frames focus attention and add depth."
    },
    {
      "id": "co.three-layers",
      "axis": "composition",
      "difficulty": 2,
      "text": "Three layers: something in the foreground, middle ground and background.",
      "why": "Layering builds depth in a flat image and rewards a longer look.",
      "tags": [
        "layers"
      ]
    },
    {
      "id": "co.symmetry",
      "axis": "composition",
      "difficulty": 1,
      "text": "Perfect symmetry.",
      "why": "Symmetry is calming and graphic, and it makes any imperfection stand out.",
      "tags": [
        "symmetry",
        "centered"
      ],
      "excludes": [
        "off-center"
      ]
    },
    {
      "id": "co.horizon-edge",
      "axis": "composition",
      "difficulty": 1,
      "text": "Put the horizon at the very top or the very bottom of the frame.",
      "why": "Moving the horizon to an edge shifts the weight to sky or ground.",
      "place": [
        "outdoor"
      ],
      "excludes": [
        "steep-angle"
      ]
    },
    {
      "id": "co.tilt",
      "axis": "composition",
      "difficulty": 1,
      "text": "Tilt the camera: every frame at a deliberate angle.",
      "why": "A tilted horizon is unsettling and energetic. It only works if it's clearly on purpose.",
      "tags": [
        "tilted"
      ]
    },
    {
      "id": "co.vertical",
      "axis": "composition",
      "difficulty": 1,
      "text": "Vertical orientation only.",
      "why": "Portrait orientation favours height and layers stacked from front to back.",
      "tags": [
        "vertical"
      ],
      "excludes": [
        "pano"
      ]
    },
    {
      "id": "co.cut-off",
      "axis": "composition",
      "difficulty": 2,
      "text": "Cut your subject off at the edge of the frame, on purpose.",
      "why": "Cropping into the subject suggests a world beyond the frame."
    },
    {
      "id": "co.tiny",
      "axis": "composition",
      "difficulty": 2,
      "text": "Make the subject tiny: less than 5% of the frame.",
      "why": "A small subject in a big space shows scale and can feel isolated.",
      "tags": [
        "distance",
        "negative-space"
      ],
      "excludes": [
        "close-up",
        "filled-frame"
      ]
    },
    {
      "id": "vp.ground",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "Camera on the ground.",
      "why": "Ground level makes small things monumental and makes the most of foreground.",
      "tags": [
        "low-angle"
      ],
      "excludes": [
        "high-angle"
      ]
    },
    {
      "id": "vp.top-down",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "Shoot straight down from above.",
      "why": "Top-down views flatten the scene into graphic patterns.",
      "tags": [
        "high-angle",
        "steep-angle",
        "looking-down"
      ],
      "excludes": [
        "low-angle"
      ]
    },
    {
      "id": "vp.child-height",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "Shoot from a child's eye height, about 1 metre.",
      "why": "A lower eye level makes familiar places look strange.",
      "tags": [
        "low-angle"
      ],
      "excludes": [
        "high-angle"
      ]
    },
    {
      "id": "vp.reflections",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "Reflections only: puddles, glass, mirrors, chrome.",
      "why": "Reflections double, distort and layer a scene.",
      "tags": [
        "reflection"
      ]
    },
    {
      "id": "vp.through",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "Shoot through something: glass, a gap, a hole.",
      "why": "A barrier between you and the subject adds texture and a feeling of watching."
    },
    {
      "id": "vp.from-behind",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "Photograph everything from behind: people, objects, buildings.",
      "why": "The back of things is unexpected and often more honest."
    },
    {
      "id": "vp.one-spot",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "Don't move your feet. Shoot everything from one spot.",
      "why": "With your position fixed, you can only change focal length, angle and timing.",
      "tags": [
        "location-limit",
        "one-spot"
      ],
      "excludes": [
        "moving-feet"
      ]
    },
    {
      "id": "vp.ten-angles",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "One subject from ten different angles.",
      "why": "The first angle is rarely the best. Working a subject is a habit.",
      "tags": [
        "multi-frame",
        "many-frames"
      ]
    },
    {
      "id": "vp.low-high",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "One subject from the lowest and the highest point you can reach.",
      "why": "The extremes of height change the relationships in a scene more than anything else.",
      "tags": [
        "multi-frame"
      ]
    },
    {
      "id": "vp.hip",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "Shoot from the hip without using the viewfinder.",
      "why": "Not looking loosens your framing and helps you get closer to people without being noticed.",
      "tags": [
        "no-viewfinder"
      ]
    },
    {
      "id": "vp.closer",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "Get closer than feels comfortable: within 50 cm.",
      "why": "Robert Capa said that if your pictures aren't good enough, you aren't close enough.",
      "tags": [
        "close-up"
      ],
      "excludes": [
        "distance"
      ]
    },
    {
      "id": "su.colour",
      "axis": "subject",
      "difficulty": 1,
      "text": "Only {colour}: every frame must feature it.",
      "why": "Hunting one colour trains your eye to see colour before objects.",
      "tags": [
        "colour-dependent",
        "hue-subject"
      ],
      "excludes": [
        "bw",
        "hue-grade"
      ]
    },
    {
      "id": "su.texture",
      "axis": "subject",
      "difficulty": 1,
      "text": "Texture: {texture}.",
      "why": "Texture shows up with raking light. Try to make it feel touchable."
    },
    {
      "id": "su.hands",
      "axis": "subject",
      "difficulty": 2,
      "text": "Hands at work.",
      "why": "Hands tell you about work and character without showing a face.",
      "tags": [
        "people"
      ],
      "excludes": [
        "no-people"
      ]
    },
    {
      "id": "su.letters",
      "axis": "subject",
      "difficulty": 2,
      "text": "Find the letters of a five-letter word in signs, shapes or cracks.",
      "why": "Looking for letters makes you examine a place at every scale."
    },
    {
      "id": "su.one-object",
      "axis": "subject",
      "difficulty": 2,
      "text": "One object, twenty frames.",
      "why": "The first ten frames are obvious. The last ten are where the ideas are.",
      "tags": [
        "multi-frame",
        "many-frames"
      ]
    },
    {
      "id": "su.shadows",
      "axis": "subject",
      "difficulty": 1,
      "text": "Shadows are the subject, not the things that cast them.",
      "why": "Shadows abstract the world into shape.",
      "tags": [
        "shadow",
        "hard-light"
      ],
      "excludes": [
        "soft-light"
      ]
    },
    {
      "id": "su.boring",
      "axis": "subject",
      "difficulty": 2,
      "text": "The most boring object in your home, made interesting.",
      "why": "When the subject is dull, light and composition have to do the work.",
      "place": [
        "indoor"
      ]
    },
    {
      "id": "su.doors",
      "axis": "subject",
      "difficulty": 1,
      "text": "Doors and thresholds.",
      "why": "Doors suggest stories and give you ready-made frames.",
      "tags": [
        "large-subject"
      ]
    },
    {
      "id": "su.stranger",
      "axis": "subject",
      "difficulty": 3,
      "text": "Ask a stranger for a portrait.",
      "why": "Asking is a skill. Most people say yes more often than you'd expect.",
      "tags": [
        "people",
        "large-subject"
      ],
      "excludes": [
        "no-people"
      ]
    },
    {
      "id": "su.food",
      "axis": "subject",
      "difficulty": 1,
      "text": "Food, before anyone eats it.",
      "why": "Food photography is about light direction, texture and timing."
    },
    {
      "id": "su.numbers",
      "axis": "subject",
      "difficulty": 2,
      "text": "Find the numbers 1 to 5, in order.",
      "why": "A sequence gives the walk a structure and makes you look closely."
    },
    {
      "id": "su.weather",
      "axis": "subject",
      "difficulty": 2,
      "text": "Photograph the weather, not the scene.",
      "why": "Rain, wind, fog and heat are hard to show directly. Look for what they do to things.",
      "place": [
        "outdoor"
      ],
      "tags": [
        "large-subject"
      ]
    },
    {
      "id": "su.at-work",
      "axis": "subject",
      "difficulty": 2,
      "text": "Someone at work, in their workspace.",
      "why": "Occupational portraits combine a person, their tools and their environment.",
      "tags": [
        "people",
        "large-subject"
      ],
      "excludes": [
        "no-people"
      ]
    },
    {
      "id": "su.empty-places",
      "axis": "subject",
      "difficulty": 2,
      "text": "Places that are normally busy, photographed empty.",
      "why": "Absence changes how a familiar place feels.",
      "tags": [
        "no-people",
        "large-subject"
      ],
      "excludes": [
        "people"
      ]
    },
    {
      "id": "su.traces",
      "axis": "subject",
      "difficulty": 2,
      "text": "Traces of people who've left: footprints, cups, chairs.",
      "why": "Showing people without people invites the viewer to imagine them.",
      "tags": [
        "no-people"
      ],
      "excludes": [
        "people"
      ]
    },
    {
      "id": "cn.word",
      "axis": "concept",
      "difficulty": 2,
      "text": "Photograph the word '{concept}'.",
      "why": "Abstract words push you toward metaphor and away from literal records."
    },
    {
      "id": "cn.opposites",
      "axis": "concept",
      "difficulty": 2,
      "text": "Opposites in one frame: {pair}.",
      "why": "Contrast gives a picture a built-in story."
    },
    {
      "id": "cn.three-frames",
      "axis": "concept",
      "difficulty": 3,
      "text": "Tell a story in three frames: beginning, middle and end.",
      "why": "Sequencing is a separate skill from single images: each frame has a job.",
      "tags": [
        "set"
      ]
    },
    {
      "id": "cn.song",
      "axis": "concept",
      "difficulty": 2,
      "text": "Photograph the title of the last song you heard.",
      "why": "A random prompt gets you out of your usual subjects."
    },
    {
      "id": "cn.memory",
      "axis": "concept",
      "difficulty": 3,
      "text": "Photograph a place as it felt in a memory.",
      "why": "Mood comes from choices of light, exposure and focus, not from the subject alone."
    },
    {
      "id": "cn.self",
      "axis": "concept",
      "difficulty": 2,
      "text": "A self-portrait without your face.",
      "why": "Your possessions, shadow or hands can say more about you than your face."
    },
    {
      "id": "cn.sound",
      "axis": "concept",
      "difficulty": 3,
      "text": "Make a photo that shows a sound.",
      "why": "Photographing something invisible forces you to show what it does or what causes it."
    },
    {
      "id": "cn.time",
      "axis": "concept",
      "difficulty": 3,
      "text": "Show the passage of time in a single frame.",
      "why": "Time appears as wear, blur, shadows, or old and new side by side."
    },
    {
      "id": "cn.unnoticed",
      "axis": "concept",
      "difficulty": 2,
      "text": "Something you walk past every day and never noticed.",
      "why": "Familiar places are the hardest to see. That's why they're worth practising on."
    },
    {
      "id": "cn.mistake",
      "axis": "concept",
      "difficulty": 1,
      "text": "Honour the mistake: keep and develop your 'worst' frame of the day.",
      "why": "Accidents often contain ideas you wouldn't have planned.",
      "tags": [
        "worst-frame"
      ]
    },
    {
      "id": "cn.question",
      "axis": "concept",
      "difficulty": 3,
      "text": "Make a photo that asks a question instead of answering one.",
      "why": "Ambiguity keeps viewers looking."
    },
    {
      "id": "li.frames",
      "axis": "limits",
      "difficulty": 2,
      "text": "Only {frames} frames for the whole session.",
      "why": "A limited frame count makes every press of the shutter a decision, as with film.",
      "tags": [
        "few-frames"
      ],
      "excludes": [
        "many-frames"
      ]
    },
    {
      "id": "li.one-take",
      "axis": "limits",
      "difficulty": 2,
      "text": "One frame per subject. No second takes.",
      "why": "One take makes you get it right before you press.",
      "tags": [
        "few-frames",
        "single-take"
      ],
      "excludes": [
        "multi-frame"
      ]
    },
    {
      "id": "li.minutes",
      "axis": "limits",
      "difficulty": 1,
      "text": "You have {minutes} minutes.",
      "why": "Time pressure cuts out overthinking and makes you commit.",
      "tags": [
        "time-limit"
      ]
    },
    {
      "id": "li.radius",
      "axis": "limits",
      "difficulty": 2,
      "text": "Stay within {metres} metres of your front door.",
      "why": "A small radius forces you to find pictures in places you already know.",
      "tags": [
        "location-limit"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "li.no-review",
      "axis": "limits",
      "difficulty": 1,
      "text": "Turn off image review. No looking at the screen until you're home.",
      "why": "Not checking every frame keeps your eye on the scene."
    },
    {
      "id": "li.one-room",
      "axis": "limits",
      "difficulty": 2,
      "text": "One room only.",
      "why": "A single room, examined properly, has more pictures in it than you think.",
      "tags": [
        "location-limit"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "li.walk-stop",
      "axis": "limits",
      "difficulty": 2,
      "text": "Walk for {minutes} minutes, stop, and shoot only what's around you there.",
      "why": "A random stopping point gets rid of your favourite spots.",
      "tags": [
        "location-limit"
      ]
    },
    {
      "id": "li.100-steps",
      "axis": "limits",
      "difficulty": 2,
      "text": "Take a photo every 100 steps, whatever is in front of you.",
      "why": "Forced timing makes you find something in whatever is in front of you.",
      "tags": [
        "moving-feet"
      ]
    },
    {
      "id": "li.waiting",
      "axis": "limits",
      "difficulty": 2,
      "text": "Shoot only while you're waiting: queues, bus stops, the kettle.",
      "why": "Dead time is still usable time, and waiting places have their own mood."
    },
    {
      "id": "li.routine",
      "axis": "limits",
      "difficulty": 1,
      "text": "Only on your commute or a routine errand.",
      "why": "Adding photography to routine journeys builds a daily habit."
    },
    {
      "id": "ou.bw",
      "axis": "output",
      "difficulty": 1,
      "text": "Black and white only. Set the camera to monochrome so you see it that way.",
      "why": "Without colour you have to see tone, contrast and shape.",
      "tags": [
        "bw"
      ],
      "excludes": [
        "colour-dependent"
      ]
    },
    {
      "id": "ou.square",
      "axis": "output",
      "difficulty": 1,
      "text": "Square crop only: compose for 1:1.",
      "why": "The square is balanced and static. It suits centred and graphic compositions.",
      "tags": [
        "square"
      ],
      "excludes": [
        "vertical",
        "pano"
      ]
    },
    {
      "id": "ou.no-crop",
      "axis": "output",
      "difficulty": 1,
      "text": "No cropping in the edit.",
      "why": "No cropping means framing has to happen in the camera.",
      "tags": [
        "no-crop"
      ]
    },
    {
      "id": "ou.one-slider",
      "axis": "output",
      "difficulty": 2,
      "text": "Edit with one adjustment only.",
      "why": "Picking a single adjustment shows you what the image needs most."
    },
    {
      "id": "ou.jpeg",
      "axis": "output",
      "difficulty": 2,
      "text": "JPEG only, with the camera's look. No RAW safety net.",
      "why": "Without RAW you must get exposure and white balance right in the camera."
    },
    {
      "id": "ou.pano",
      "axis": "output",
      "difficulty": 2,
      "text": "Letterbox 3:1 crop: compose for a panorama.",
      "why": "A very wide frame makes you arrange things left to right.",
      "tags": [
        "pano"
      ],
      "excludes": [
        "vertical",
        "square"
      ]
    },
    {
      "id": "ou.diptych",
      "axis": "output",
      "difficulty": 2,
      "text": "Make a diptych: two frames that only work together.",
      "why": "Pairs create meaning through comparison.",
      "tags": [
        "set"
      ]
    },
    {
      "id": "ou.five-set",
      "axis": "output",
      "difficulty": 2,
      "text": "End with a set of exactly five images that belong together.",
      "why": "Editing down to a set is where you find out what you were really photographing.",
      "tags": [
        "set",
        "needs-five"
      ]
    },
    {
      "id": "ou.grain",
      "axis": "output",
      "difficulty": 1,
      "text": "Heavy grain and pushed contrast in the edit.",
      "why": "A strong, gritty look suits some subjects. It helps to know which ones."
    },
    {
      "id": "ou.multi-exposure",
      "axis": "output",
      "difficulty": 3,
      "text": "In-camera multiple exposure.",
      "why": "Layering two frames in the camera creates something that didn't exist in front of the lens.",
      "tags": [
        "multiple-exposure"
      ],
      "requires": [
        "multi-exposure"
      ]
    },
    {
      "id": "ou.palette",
      "axis": "output",
      "difficulty": 2,
      "text": "Grade to a two-colour palette: {palette}.",
      "why": "A limited palette unifies a set and sets its mood.",
      "tags": [
        "colour-dependent",
        "hue-grade"
      ],
      "excludes": [
        "bw"
      ]
    },
    {
      "id": "lens.extremes",
      "axis": "lens",
      "difficulty": 1,
      "text": "Only your widest and longest focal lengths, nothing in between.",
      "why": "Working at the extremes shows you what each end of the zoom is really for.",
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "lens.never-repeat",
      "axis": "lens",
      "difficulty": 2,
      "text": "Change the focal length after every frame, and never use the same one twice.",
      "why": "It breaks the habit of leaving the zoom wherever it happened to be.",
      "tags": [
        "zoom-action"
      ],
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "lens.compare",
      "axis": "lens",
      "difficulty": 2,
      "text": "Photograph one subject at {focal}mm, then at your widest, keeping it the same size in the frame.",
      "why": "Moving to keep the subject the same size shows how focal length changes the background.",
      "tags": [
        "moving-feet",
        "multi-frame"
      ],
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "lens.fake-fifty",
      "axis": "lens",
      "difficulty": 1,
      "text": "Pretend you own a 50mm prime: set the zoom as close to 50mm as it goes and walk.",
      "why": "A 'normal' view with no zoom to lean on makes you move your feet and choose your distance.",
      "tags": [
        "single-focal",
        "moving-feet"
      ],
      "requires": [
        "zoom"
      ]
    },
    {
      "id": "lens.step-back",
      "axis": "lens",
      "difficulty": 2,
      "text": "Make a wide scene with your longest focal length by stepping far back.",
      "why": "Distance plus a long lens flattens a scene into layers instead of stretching it out.",
      "tags": [
        "tele",
        "distance",
        "moving-feet"
      ],
      "excludes": [
        "close-up"
      ],
      "requires": [
        "tele"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "ap.two-stops",
      "axis": "aperture",
      "difficulty": 1,
      "text": "Two apertures only, wide open and f/11, alternating every frame.",
      "why": "Switching back and forth makes the change in depth of field impossible to ignore.",
      "tags": [
        "fixed-aperture",
        "varies-exposure"
      ]
    },
    {
      "id": "ap.mush-bg",
      "axis": "aperture",
      "difficulty": 2,
      "text": "The background must be an unrecognisable blur.",
      "why": "Aperture, subject distance and background distance all matter. You'll learn to use all three.",
      "tags": [
        "defocus-bg"
      ],
      "excludes": [
        "deep-focus",
        "narrow-aperture",
        "bg-sharp"
      ]
    },
    {
      "id": "ap.f56",
      "axis": "aperture",
      "difficulty": 1,
      "text": "f/5.6 for the whole session.",
      "why": "A middle aperture is forgiving, which moves your attention from settings to seeing.",
      "tags": [
        "fixed-aperture"
      ]
    },
    {
      "id": "ap.two-sharp",
      "axis": "aperture",
      "difficulty": 3,
      "text": "Two subjects at different distances, both sharp.",
      "why": "It takes a small aperture, careful focus placement or a viewpoint that lines them up.",
      "tags": [
        "deep-focus",
        "two-subjects",
        "fixed-aperture"
      ],
      "excludes": [
        "wide-aperture",
        "defocus",
        "defocus-bg"
      ]
    },
    {
      "id": "ss.fifteenth",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Handheld at exactly 1/15s, with no camera shake or motion blur.",
      "why": "Bracing, breathing out and a gentle shutter press matter more than you'd think.",
      "tags": [
        "slow-shutter",
        "handheld",
        "sharp-all"
      ],
      "excludes": [
        "fast-shutter",
        "motion-blur",
        "on-tripod"
      ]
    },
    {
      "id": "ss.wind",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Photograph the wind: blurred leaves or grass against sharp ground.",
      "why": "A steady stance and around 1/4s to 1s separates what moves from what doesn't.",
      "tags": [
        "slow-shutter",
        "motion-blur"
      ],
      "excludes": [
        "fast-shutter",
        "freeze",
        "sharp-all"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "ss.enter-frame",
      "axis": "shutter",
      "difficulty": 2,
      "text": "Compose an empty frame and wait for something to move into it.",
      "why": "Set the stage first and wait for the actor. Many classic street pictures happen this way."
    },
    {
      "id": "ss.burst",
      "axis": "shutter",
      "difficulty": 1,
      "text": "Burst mode only: shoot sequences of five and keep one from each.",
      "why": "Bursts let you pick the exact moment, and show how much changes in a fraction of a second.",
      "tags": [
        "burst",
        "multi-frame",
        "many-frames"
      ],
      "excludes": [
        "few-frames",
        "slow-pace",
        "long-exposure"
      ]
    },
    {
      "id": "ss.light-painting",
      "axis": "shutter",
      "difficulty": 3,
      "text": "Light painting: draw with a moving torch or lamp during a long exposure.",
      "why": "You become the light source, so every stroke and its speed is a decision.",
      "tags": [
        "slow-shutter",
        "long-exposure",
        "on-tripod",
        "light-painting"
      ],
      "excludes": [
        "fast-shutter",
        "freeze",
        "sharp-all",
        "fixed-light"
      ],
      "requires": [
        "tripod"
      ],
      "time": [
        "night"
      ]
    },
    {
      "id": "fo.reflections",
      "axis": "focus",
      "difficulty": 2,
      "text": "Focus on reflections, not on the surface they're in.",
      "why": "A reflection sits at the distance of the reflected object, not the glass. Autofocus often gets this wrong."
    },
    {
      "id": "fo.rain-window",
      "axis": "focus",
      "difficulty": 2,
      "text": "Shoot through rain on a window and focus on the drops.",
      "why": "Focusing on what's closest turns the world behind into soft colour.",
      "tags": [
        "rain",
        "close-up"
      ],
      "excludes": [
        "sun",
        "distance",
        "bg-sharp"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "fo.trap",
      "axis": "focus",
      "difficulty": 2,
      "text": "Prefocus on a spot and wait for something to arrive there.",
      "why": "Trap focus means you're ready before the moment instead of chasing it."
    },
    {
      "id": "fo.just-behind",
      "axis": "focus",
      "difficulty": 3,
      "text": "Put the focus slightly behind your subject, on purpose.",
      "why": "A deliberate near-miss looks dreamy rather than wrong, and shows how thin the focus plane is.",
      "tags": [
        "soft-subject"
      ],
      "excludes": [
        "deep-focus",
        "sharp-all"
      ]
    },
    {
      "id": "ex.sky",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Expose for the sky in every frame.",
      "why": "Protecting the sky usually darkens the land: a quick route to moody, graphic pictures.",
      "tags": [
        "sky"
      ],
      "excludes": [
        "high-key",
        "looking-down"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "ex.always-comp",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Use exposure compensation on every frame. Never leave it at 0.",
      "why": "The meter aims for average grey. Choosing brighter or darker each time makes you read the light."
    },
    {
      "id": "ex.shutter-250",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Shutter priority at 1/250 for the whole session.",
      "why": "A fixed, quick shutter frees you to think about timing while the camera handles the aperture.",
      "tags": [
        "fixed-shutter"
      ],
      "excludes": [
        "slow-shutter",
        "fast-shutter",
        "fixed-aperture",
        "varied-shutter",
        "motion-blur",
        "long-exposure",
        "aperture-priority",
        "varies-exposure"
      ]
    },
    {
      "id": "ex.choose-loss",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Only shoot scenes too contrasty for your camera, and decide what to lose.",
      "why": "Choosing between blown highlights and black shadows is a creative decision, not a failure.",
      "tags": [
        "high-contrast",
        "hard-light"
      ],
      "excludes": [
        "soft-light"
      ]
    },
    {
      "id": "ex.base-dusk",
      "axis": "exposure",
      "difficulty": 2,
      "text": "Base ISO, handheld, after sunset.",
      "why": "It forces wide apertures, slow shutters and a steady grip, or finding the brightest light around.",
      "tags": [
        "base-iso",
        "handheld"
      ],
      "excludes": [
        "high-iso",
        "on-tripod",
        "narrow-aperture",
        "fixed-shutter"
      ],
      "time": [
        "golden",
        "night"
      ]
    },
    {
      "id": "di.left",
      "axis": "direction",
      "difficulty": 1,
      "text": "Light falling from the left only.",
      "why": "Committing to one side makes you turn the subject, or yourself, until the light works.",
      "tags": [
        "sidelight"
      ],
      "excludes": [
        "frontlight"
      ]
    },
    {
      "id": "di.gap",
      "axis": "direction",
      "difficulty": 2,
      "text": "Light coming through a gap: a doorway, an alley, blinds.",
      "why": "Narrow light makes natural spotlights and strong shapes.",
      "tags": [
        "hard-light"
      ],
      "excludes": [
        "soft-light"
      ]
    },
    {
      "id": "di.sun-behind",
      "axis": "direction",
      "difficulty": 2,
      "text": "Sun directly behind you, with your own shadow in the frame.",
      "why": "Flat front light plus your shadow turns a classic 'mistake' into a self-portrait.",
      "tags": [
        "frontlight",
        "sun",
        "shadow"
      ],
      "excludes": [
        "backlight",
        "silhouette",
        "rain"
      ],
      "time": [
        "day",
        "golden"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "di.coloured-bounce",
      "axis": "direction",
      "difficulty": 2,
      "text": "Light bounced off a coloured wall onto your subject.",
      "why": "Reflected light takes on the colour of the surface, like a free coloured gel.",
      "tags": [
        "colour-dependent",
        "soft-light",
        "coloured-light"
      ],
      "excludes": [
        "bw",
        "hard-light"
      ]
    },
    {
      "id": "so.streetlights",
      "axis": "source",
      "difficulty": 1,
      "text": "Streetlights only.",
      "why": "Old orange lamps and new white LEDs give very different moods, and both say 'night'.",
      "tags": [
        "artificial-only",
        "ambient-only",
        "fixed-light"
      ],
      "excludes": [
        "natural-only",
        "flash",
        "sun"
      ],
      "time": [
        "night"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "so.screen",
      "axis": "source",
      "difficulty": 2,
      "text": "Screen light only: a phone, laptop or TV.",
      "why": "Screens are soft, cool and close: good for intimate, moody portraits and still lifes.",
      "tags": [
        "artificial-only",
        "ambient-only"
      ],
      "excludes": [
        "natural-only",
        "flash",
        "fast-shutter",
        "freeze",
        "sun"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "so.headlights",
      "axis": "source",
      "difficulty": 2,
      "text": "Car headlights only. Stay well off the road.",
      "why": "Hard, low, moving light makes long shadows and drama out of ordinary scenes.",
      "tags": [
        "artificial-only",
        "ambient-only",
        "hard-light",
        "fixed-light"
      ],
      "excludes": [
        "natural-only",
        "flash",
        "soft-light",
        "sun"
      ],
      "time": [
        "night"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "so.shopfront",
      "axis": "source",
      "difficulty": 2,
      "text": "Shop windows at night as your only light.",
      "why": "Shopfronts are big, soft light boxes that also frame whatever is inside them.",
      "tags": [
        "artificial-only",
        "ambient-only",
        "fixed-light"
      ],
      "excludes": [
        "natural-only",
        "flash",
        "sun"
      ],
      "time": [
        "night"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "so.overcast",
      "axis": "source",
      "difficulty": 1,
      "text": "Overcast only: find drama in flat light.",
      "why": "With no shadows to lean on, shape, colour and expression have to carry the picture.",
      "tags": [
        "soft-light",
        "natural-only",
        "overcast",
        "ambient-only",
        "fixed-light"
      ],
      "excludes": [
        "hard-light",
        "sun",
        "flash",
        "bright-source",
        "artificial-only"
      ],
      "time": [
        "day"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "fl.colour-bounce",
      "axis": "flash",
      "difficulty": 2,
      "text": "Bounce the flash off a coloured surface.",
      "why": "The bounce surface becomes the light, and its colour comes with it.",
      "tags": [
        "flash",
        "colour-dependent",
        "soft-light",
        "coloured-light"
      ],
      "excludes": [
        "bw",
        "hard-light",
        "natural-only"
      ],
      "requires": [
        "flash"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "fl.diffuse",
      "axis": "flash",
      "difficulty": 2,
      "text": "Fire the flash through something: frosted glass, paper or fabric.",
      "why": "A diffuser between flash and subject turns a harsh point into soft light.",
      "tags": [
        "flash",
        "soft-light"
      ],
      "excludes": [
        "hard-light",
        "natural-only"
      ],
      "requires": [
        "flash"
      ]
    },
    {
      "id": "fl.two-sources",
      "axis": "flash",
      "difficulty": 3,
      "text": "Two light sources: a flash plus a lamp, balanced against each other.",
      "why": "Balancing flash power against a continuous light is the core skill of mixing light.",
      "tags": [
        "flash",
        "mixed-light"
      ],
      "excludes": [
        "natural-only",
        "single-source"
      ],
      "requires": [
        "flash"
      ],
      "place": [
        "indoor"
      ]
    },
    {
      "id": "fl.freeze-drops",
      "axis": "flash",
      "difficulty": 1,
      "text": "Use flash in daylight to freeze water or raindrops.",
      "why": "A short flash burst freezes motion better than the shutter alone.",
      "tags": [
        "flash",
        "freeze"
      ],
      "excludes": [
        "slow-shutter",
        "motion-blur",
        "natural-only"
      ],
      "requires": [
        "flash"
      ],
      "time": [
        "day"
      ]
    },
    {
      "id": "fl.zoom-flash",
      "axis": "flash",
      "difficulty": 2,
      "text": "Slow shutter plus flash, zooming during the exposure.",
      "why": "The flash freezes the subject while the zoom streaks everything around it.",
      "tags": [
        "flash",
        "slow-shutter",
        "motion-blur",
        "zoom-action"
      ],
      "excludes": [
        "fast-shutter",
        "freeze",
        "natural-only",
        "single-focal"
      ],
      "requires": [
        "flash",
        "zoom"
      ]
    },
    {
      "id": "sp.horizontals",
      "axis": "shape",
      "difficulty": 1,
      "text": "Only horizontal lines. Keep them perfectly level.",
      "why": "Horizontals feel calm and wide. A level camera keeps them that way.",
      "tags": [
        "level-lines"
      ],
      "excludes": [
        "tilted"
      ]
    },
    {
      "id": "sp.negative",
      "axis": "shape",
      "difficulty": 2,
      "text": "Negative shapes: photograph the gaps between things.",
      "why": "Seeing the spaces instead of the objects is a classic drawing exercise that works for cameras too."
    },
    {
      "id": "sp.three-sizes",
      "axis": "shape",
      "difficulty": 2,
      "text": "One shape repeated at three different sizes.",
      "why": "Repetition at different scales creates depth and rhythm at the same time."
    },
    {
      "id": "sp.converge-out",
      "axis": "shape",
      "difficulty": 2,
      "text": "Lines that converge on a point outside the frame.",
      "why": "A vanishing point outside the frame pulls the eye out of the picture and makes it feel bigger."
    },
    {
      "id": "co.no-thirds",
      "axis": "composition",
      "difficulty": 1,
      "text": "Nothing important on the rule-of-thirds lines.",
      "why": "Breaking a habit makes you find your own sense of balance."
    },
    {
      "id": "co.opposite-corners",
      "axis": "composition",
      "difficulty": 2,
      "text": "Two subjects in opposite corners.",
      "why": "Diagonal tension between two points makes the eye travel across the frame.",
      "tags": [
        "two-subjects",
        "off-center"
      ],
      "excludes": [
        "centered"
      ]
    },
    {
      "id": "co.half-foreground",
      "axis": "composition",
      "difficulty": 2,
      "text": "The foreground takes up half the frame.",
      "why": "A strong foreground gives depth and a way into the picture.",
      "tags": [
        "layers"
      ],
      "excludes": [
        "filled-frame"
      ]
    },
    {
      "id": "co.odd",
      "axis": "composition",
      "difficulty": 2,
      "text": "An odd number of main elements in every frame: one, three or five.",
      "why": "Odd numbers feel more natural and less staged than pairs.",
      "tags": [
        "odd-count"
      ],
      "excludes": [
        "two-subjects",
        "pairs"
      ]
    },
    {
      "id": "vp.arms-up",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "Arms raised, camera above your head.",
      "why": "A few extra feet of height clears crowds and changes the geometry of a scene.",
      "tags": [
        "high-angle"
      ],
      "excludes": [
        "low-angle"
      ]
    },
    {
      "id": "vp.on-back",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "Lie on your back and shoot straight up.",
      "why": "Looking up turns ceilings, trees and buildings into abstract patterns.",
      "tags": [
        "low-angle",
        "steep-angle"
      ],
      "excludes": [
        "high-angle"
      ]
    },
    {
      "id": "vp.inside-out",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "From inside looking out: a car, a doorway, a tunnel.",
      "why": "The dark edges of the inside make a natural frame for the light outside."
    },
    {
      "id": "vp.three-heights",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "One scene from three heights: knee, eye and above your head.",
      "why": "Small changes in height change what overlaps what. You'll see a different picture each time.",
      "tags": [
        "multi-frame"
      ]
    },
    {
      "id": "su.stairs",
      "axis": "subject",
      "difficulty": 1,
      "text": "Stairs and steps.",
      "why": "Stairs are rhythm, perspective and light in one subject.",
      "tags": [
        "large-subject"
      ]
    },
    {
      "id": "su.wires",
      "axis": "subject",
      "difficulty": 1,
      "text": "Wires, cables and poles.",
      "why": "Overlooked lines in the sky make strong graphic pictures."
    },
    {
      "id": "su.bicycles",
      "axis": "subject",
      "difficulty": 1,
      "text": "Bicycles.",
      "why": "A familiar object with lots of shapes, angles and details to work with.",
      "tags": [
        "large-subject"
      ]
    },
    {
      "id": "su.broken",
      "axis": "subject",
      "difficulty": 2,
      "text": "Something broken.",
      "why": "Damage and decay have texture and stories built in."
    },
    {
      "id": "su.handwritten",
      "axis": "subject",
      "difficulty": 2,
      "text": "Handwritten signs.",
      "why": "Handwriting puts a person in the picture without showing them."
    },
    {
      "id": "su.pairs",
      "axis": "subject",
      "difficulty": 2,
      "text": "Things in pairs.",
      "why": "Pairs invite comparison: what's the same and what's different?",
      "tags": [
        "pairs"
      ]
    },
    {
      "id": "su.animals",
      "axis": "subject",
      "difficulty": 2,
      "text": "Animals, or the traces they leave.",
      "why": "Animals don't take direction, so you learn patience and anticipation."
    },
    {
      "id": "su.material",
      "axis": "subject",
      "difficulty": 1,
      "text": "Every frame must include {material}.",
      "why": "Hunting for one material makes you look at surfaces you normally walk past."
    },
    {
      "id": "cn.smell",
      "axis": "concept",
      "difficulty": 2,
      "text": "Photograph a smell.",
      "why": "Showing something invisible makes you think about cause and effect."
    },
    {
      "id": "cn.album",
      "axis": "concept",
      "difficulty": 2,
      "text": "Make a photo that would work as an album cover.",
      "why": "Album covers are square and leave room for a title: design, not just a snapshot.",
      "tags": [
        "square"
      ],
      "excludes": [
        "vertical",
        "pano",
        "crop-45",
        "no-crop"
      ]
    },
    {
      "id": "cn.edge-town",
      "axis": "concept",
      "difficulty": 2,
      "text": "The edge of town.",
      "why": "Edges are where places change character. They're good for in-between pictures.",
      "place": [
        "outdoor"
      ],
      "tags": [
        "large-subject"
      ]
    },
    {
      "id": "cn.too-much",
      "axis": "concept",
      "difficulty": 2,
      "text": "Too much.",
      "why": "Excess, clutter or abundance: how do you show 'more than enough' clearly?"
    },
    {
      "id": "cn.only-you",
      "axis": "concept",
      "difficulty": 2,
      "text": "Something only you would notice.",
      "why": "Personal observations are what make a photographer's work recognisable."
    },
    {
      "id": "li.no-phone",
      "axis": "limits",
      "difficulty": 1,
      "text": "Leave your phone at home.",
      "why": "No maps, no messages, no second camera: just you, the camera and what's in front of you.",
      "tags": [
        "no-phone"
      ],
      "excludes": [
        "phone"
      ]
    },
    {
      "id": "li.slow-pace",
      "axis": "limits",
      "difficulty": 2,
      "text": "One frame every 10 minutes, no more.",
      "why": "Rationing time makes you look much longer before you press the shutter.",
      "tags": [
        "slow-pace"
      ],
      "excludes": [
        "burst",
        "multi-frame"
      ]
    },
    {
      "id": "li.one-street",
      "axis": "limits",
      "difficulty": 2,
      "text": "One street, end to end.",
      "why": "One street, walked slowly, holds more pictures than you'd expect.",
      "tags": [
        "moving-feet",
        "location-limit",
        "large-subject"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "li.rain",
      "axis": "limits",
      "difficulty": 2,
      "text": "Shoot in the rain.",
      "why": "Rain brings reflections, umbrellas, shine and mood. Protect the camera and go.",
      "tags": [
        "rain"
      ],
      "excludes": [
        "sun"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "li.three-set",
      "axis": "limits",
      "difficulty": 2,
      "text": "Three frames, and all three must work as a set.",
      "why": "Planning a set before shooting is how picture stories begin.",
      "tags": [
        "few-frames",
        "set",
        "three-only"
      ],
      "excludes": [
        "burst",
        "needs-five",
        "multi-frame"
      ]
    },
    {
      "id": "ou.crop45",
      "axis": "output",
      "difficulty": 1,
      "text": "4:5 portrait crop only.",
      "why": "The tall 4:5 frame suits people and phones, and makes you compose upward.",
      "tags": [
        "crop-45"
      ],
      "excludes": [
        "square",
        "pano"
      ]
    },
    {
      "id": "ou.mono-tone",
      "axis": "output",
      "difficulty": 1,
      "text": "Tone everything with a single colour: sepia, blue or green.",
      "why": "Toning keeps the simplicity of black and white with a mood of its own.",
      "tags": [
        "monotone"
      ],
      "excludes": [
        "colour-dependent"
      ]
    },
    {
      "id": "ou.two-sliders",
      "axis": "output",
      "difficulty": 2,
      "text": "Edit with white balance and exposure only.",
      "why": "Getting those two right is most of what editing is."
    },
    {
      "id": "ou.triptych",
      "axis": "output",
      "difficulty": 2,
      "text": "Make a triptych: three frames that only work together.",
      "why": "Three images can show sequence, contrast or a whole place.",
      "tags": [
        "set"
      ]
    },
    {
      "id": "ou.one-winner",
      "axis": "output",
      "difficulty": 2,
      "text": "Pick one winner before editing anything, and edit only that one.",
      "why": "Choosing first is the hardest and most useful editing skill.",
      "tags": [
        "single-winner"
      ],
      "excludes": [
        "set",
        "worst-frame"
      ]
    },
    {
      "id": "ct.complementary",
      "axis": "colour",
      "difficulty": 1,
      "text": "Complementary colours only: blue with orange, or red with green.",
      "why": "Opposites on the colour wheel make each other look stronger.",
      "tags": [
        "colour-dependent",
        "hue-rule"
      ],
      "excludes": [
        "bw",
        "monotone",
        "hue-subject",
        "hue-grade",
        "hue-cast"
      ]
    },
    {
      "id": "ct.pastel",
      "axis": "colour",
      "difficulty": 1,
      "text": "Pastels only.",
      "why": "Soft, light colours need bright, gentle exposure and careful framing.",
      "tags": [
        "colour-dependent",
        "pastel"
      ],
      "excludes": [
        "bw",
        "monotone",
        "saturated",
        "low-key"
      ]
    },
    {
      "id": "ct.one-pop",
      "axis": "colour",
      "difficulty": 2,
      "text": "One saturated colour in an otherwise grey frame.",
      "why": "A single strong colour against neutral surroundings is an instant point of focus.",
      "tags": [
        "colour-dependent",
        "saturated",
        "grey-frame"
      ],
      "excludes": [
        "bw",
        "monotone",
        "hue-grade",
        "pastel",
        "coloured-light",
        "hue-cast"
      ]
    },
    {
      "id": "ct.warm",
      "axis": "colour",
      "difficulty": 1,
      "text": "Warm colours only: reds, oranges and yellows.",
      "why": "Limiting the palette gives a set of pictures a clear mood.",
      "tags": [
        "colour-dependent",
        "hue-rule",
        "single-temperature"
      ],
      "excludes": [
        "bw",
        "monotone",
        "hue-subject",
        "hue-grade",
        "hue-cast",
        "warm-cool"
      ]
    },
    {
      "id": "ct.cool",
      "axis": "colour",
      "difficulty": 1,
      "text": "Cool colours only: blues, greens and purples.",
      "why": "Cool palettes feel calm, distant or cold. It's a strong way to set a mood.",
      "tags": [
        "colour-dependent",
        "hue-rule",
        "single-temperature",
        "cool-palette"
      ],
      "excludes": [
        "bw",
        "monotone",
        "hue-subject",
        "hue-grade",
        "hue-cast",
        "warm-cool",
        "warm-light"
      ]
    },
    {
      "id": "ct.black-white",
      "axis": "colour",
      "difficulty": 1,
      "text": "Black on white, or white on black.",
      "why": "Pure tonal contrast strips a scene to shape and line.",
      "tags": [
        "tonal-only"
      ],
      "excludes": [
        "colour-dependent"
      ]
    },
    {
      "id": "ct.analogous",
      "axis": "colour",
      "difficulty": 2,
      "text": "Neighbouring colours only: next to each other on the colour wheel.",
      "why": "Analogous colours feel harmonious and quiet: the opposite of a clash.",
      "tags": [
        "colour-dependent",
        "hue-rule",
        "single-temperature"
      ],
      "excludes": [
        "bw",
        "monotone",
        "hue-subject",
        "hue-grade",
        "hue-cast",
        "warm-cool"
      ]
    },
    {
      "id": "ct.new-colour",
      "axis": "colour",
      "difficulty": 2,
      "text": "A colour you've never photographed on purpose.",
      "why": "Your eye has habits too. This one breaks them.",
      "tags": [
        "colour-dependent",
        "hue-rule"
      ],
      "excludes": [
        "bw",
        "monotone",
        "hue-subject",
        "hue-grade",
        "hue-cast"
      ]
    }
  ]
}/*END-JSON*/;
