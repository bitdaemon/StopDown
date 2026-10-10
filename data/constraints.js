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
      ]
    },
    {
      "id": "lens.five-distances",
      "axis": "lens",
      "difficulty": 2,
      "text": "Set {focal}mm and photograph one subject from five different distances.",
      "why": "Perspective comes from where you stand, not from the zoom ring. This makes that visible.",
      "tags": [
        "single-focal"
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
        "close-up"
      ],
      "excludes": [
        "distance"
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
        "distance"
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
        "wide-aperture"
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
      "why": "f/8 is most lenses' sharpest zone and gives forgiving depth of field. That frees you to focus on moments."
    },
    {
      "id": "ap.f16",
      "axis": "aperture",
      "difficulty": 2,
      "text": "Stop down to f/16 or smaller for every frame.",
      "why": "Small apertures give depth but cost light and some sharpness (diffraction). Watch your shutter speed.",
      "tags": [
        "narrow-aperture"
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
        "narrow-aperture"
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
      "why": "Comparing extremes side by side shows you what depth of field does for a particular subject."
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
        "wide-aperture"
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
      "why": "Cycling through the stops shows how each one changes depth of field and shutter speed."
    },
    {
      "id": "ap.near-far",
      "axis": "aperture",
      "difficulty": 3,
      "text": "Everything from 1 metre to infinity must be sharp.",
      "why": "This needs a small aperture and hyperfocal focusing: focus about a third into the scene, not at infinity.",
      "tags": [
        "deep-focus",
        "narrow-aperture"
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
        "motion-blur"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
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
        "long-exposure"
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
        "long-exposure"
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
        "people"
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
        "motion-blur"
      ],
      "excludes": [
        "fast-shutter",
        "freeze"
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
        "long-exposure"
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
        "defocus"
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
      "why": "Three versions of one frame show how focus directs attention."
    },
    {
      "id": "fo.infinity",
      "axis": "focus",
      "difficulty": 1,
      "text": "Set focus to infinity and leave it there.",
      "why": "Fixed focus makes you work with distance and depth of field, not with the AF.",
      "tags": [
        "manual-focus"
      ],
      "excludes": [
        "close-up"
      ],
      "place": [
        "outdoor"
      ]
    },
    {
      "id": "fo.eyes",
      "axis": "focus",
      "difficulty": 1,
      "text": "Portraits only, and the nearest eye must be tack sharp.",
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
      "why": "Setting all three yourself makes the exposure triangle something you feel, not just read about."
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
      "why": "Fixed settings make you look for light that fits them, rather than adjusting the camera to the light."
    },
    {
      "id": "ex.bracket",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Bracket every scene at -2, 0 and +2 EV. Choose later.",
      "why": "Seeing three exposures together teaches you which one the scene actually needed."
    },
    {
      "id": "ex.wrong-wb",
      "axis": "exposure",
      "difficulty": 1,
      "text": "Set the 'wrong' white balance, such as tungsten in daylight, and commit to it.",
      "why": "White balance is a creative tool as well as a correction.",
      "tags": [
        "colour-dependent"
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
        "hard-light"
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
        "low-sun"
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
        "hard-light"
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
        "backlight"
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
        "hard-light"
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
        "soft-light"
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
        "window-light"
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
        "mixed-light"
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
        "artificial-only"
      ],
      "excludes": [
        "natural-only",
        "window-light"
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
        "colour-dependent"
      ],
      "excludes": [
        "bw",
        "natural-only"
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
        "artificial-only"
      ],
      "excludes": [
        "natural-only",
        "fast-shutter"
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
        "colour-dependent"
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
        "window-light"
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
      "why": "Straight verticals feel calm and architectural. Level the camera."
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
      ]
    },
    {
      "id": "co.tilt",
      "axis": "composition",
      "difficulty": 1,
      "text": "Tilt the camera: every frame at a deliberate angle.",
      "why": "A tilted horizon is unsettling and energetic. It only works if it's clearly on purpose."
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
        "high-angle"
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
        "location-limit"
      ]
    },
    {
      "id": "vp.ten-angles",
      "axis": "viewpoint",
      "difficulty": 1,
      "text": "One subject from ten different angles.",
      "why": "The first angle is rarely the best. Working a subject is a habit."
    },
    {
      "id": "vp.low-high",
      "axis": "viewpoint",
      "difficulty": 2,
      "text": "One subject from the lowest and the highest point you can reach.",
      "why": "The extremes of height change the relationships in a scene more than anything else."
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
        "colour-dependent"
      ],
      "excludes": [
        "bw"
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
      "why": "The first ten frames are obvious. The last ten are where the ideas are."
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
      "why": "Doors suggest stories and give you ready-made frames."
    },
    {
      "id": "su.stranger",
      "axis": "subject",
      "difficulty": 3,
      "text": "Ask a stranger for a portrait.",
      "why": "Asking is a skill. Most people say yes more often than you'd expect.",
      "tags": [
        "people"
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
      ]
    },
    {
      "id": "su.at-work",
      "axis": "subject",
      "difficulty": 2,
      "text": "Someone at work, in their workspace.",
      "why": "Occupational portraits combine a person, their tools and their environment.",
      "tags": [
        "people"
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
        "no-people"
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
      "why": "Sequencing is a separate skill from single images: each frame has a job."
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
      "why": "Accidents often contain ideas you wouldn't have planned."
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
      ]
    },
    {
      "id": "li.one-take",
      "axis": "limits",
      "difficulty": 2,
      "text": "One frame per subject. No second takes.",
      "why": "One take makes you get it right before you press.",
      "tags": [
        "few-frames"
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
      "why": "Forced timing makes you find something in whatever is in front of you."
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
      "why": "Pairs create meaning through comparison."
    },
    {
      "id": "ou.five-set",
      "axis": "output",
      "difficulty": 2,
      "text": "End with a set of exactly five images that belong together.",
      "why": "Editing down to a set is where you find out what you were really photographing."
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
        "colour-dependent"
      ],
      "excludes": [
        "bw"
      ]
    }
  ]
}/*END-JSON*/;
