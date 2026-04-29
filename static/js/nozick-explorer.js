// nozick-explorer.js — Possible Worlds Explorer
// Blob visualization, world info panel, and MCQ engine.

// ─────────────────────────────────────────────────────────────────────────────
//  SEEDED RNG (deterministic blob shapes per world)
// ─────────────────────────────────────────────────────────────────────────────

function seededRng(seed) {
  let s = Math.abs(seed * 2654435761) >>> 0;
  if (s === 0) s = 1;
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5;
    return (s >>> 0) / 0xffffffff;
  };
}

function hashStr(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h);
}

// ─────────────────────────────────────────────────────────────────────────────
//  BLOB PATH GENERATOR (organic shape from Catmull-Rom spline)
// ─────────────────────────────────────────────────────────────────────────────

function blobPath(cx, cy, r, seedStr, numPts = 9) {
  const rng = seededRng(hashStr(seedStr));
  const pts = Array.from({ length: numPts }, (_, i) => {
    const angle = (i / numPts) * 2 * Math.PI - Math.PI / 2;
    const jitter = 0.78 + rng() * 0.44;
    return { x: cx + r * jitter * Math.cos(angle), y: cy + r * jitter * Math.sin(angle) };
  });
  return catmullRom(pts);
}

function catmullRom(pts) {
  const n = pts.length;
  let d = `M ${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${f(cp1x)} ${f(cp1y)}, ${f(cp2x)} ${f(cp2y)}, ${f(p2.x)} ${f(p2.y)}`;
  }
  return d + " Z";
}

function f(n) { return n.toFixed(2); }

// ─────────────────────────────────────────────────────────────────────────────
//  PROPOSITION DATA
// ─────────────────────────────────────────────────────────────────────────────

const PROPOSITIONS = [
  {
    id: "hands",
    statement: "I have hands",
    emoji: "🖐",
    method: "Method of belief: Direct visual perception",
    verdict: "knowledge",
    verdictSummary: "Both sensitivity and adherence are satisfied. This belief constitutes knowledge.",
    actualWorld: {
      description: "You look down at your hands right now. Everything is perfectly ordinary.",
    },
    nearbyWorlds: [
      {
        id: "h-n1", label: "Lost hands in accident", emoji: "🏥",
        pTrue: false, believesP: false, angle: -90,
        description: "A recent accident resulted in the loss of both hands. You are fully aware of this and have adjusted to your new circumstances.",
        nozickNote: "P is false and you do NOT believe P — exactly what sensitivity requires. In this nearby not-P world, your belief correctly turns off."
      },
      {
        id: "h-n2", label: "Born without hands", emoji: "🧬",
        pTrue: false, believesP: false, angle: 0,
        description: "In this world, you were born without hands. This has always been your reality and you have never believed otherwise.",
        nozickNote: "Another nearby world where P is false and the belief is absent. Sensitivity is further supported."
      },
      {
        id: "h-n3", label: "Wearing thick gloves", emoji: "🧤",
        pTrue: true, believesP: true, angle: 90,
        description: "You have hands but cannot see them — they're in thick winter gloves. You believe you have hands because you can feel them and remember putting the gloves on.",
        nozickNote: "P is true and you believe P. This supports adherence — even when perception is slightly impeded, the belief reliably tracks the fact."
      },
      {
        id: "h-n4", label: "Hands behind back", emoji: "🙈",
        pTrue: true, believesP: true, angle: 180,
        description: "Your hands are clasped behind your back and out of sight. You still know you have them through proprioception and recent memory.",
        nozickNote: "P is true and you believe P via multiple reliable channels. Adherence holds across different epistemic circumstances."
      },
    ],
    distantWorlds: [
      {
        id: "h-d1", label: "Brain in a vat", emoji: "🧠",
        pTrue: false, believesP: true, angle: -45,
        description: "You are a disembodied brain in a vat, fed perfectly simulated hand-experiences by scientists. You have no hands, yet the simulation is indistinguishable from reality.",
        nozickNote: "This is a DISTANT world — very different from actuality. Nozick's key insight: sensitivity only requires nearby worlds. Since BIV worlds are distant, this doesn't threaten your knowledge that you have hands."
      },
      {
        id: "h-d2", label: "Descartes' evil demon", emoji: "👹",
        pTrue: false, believesP: true, angle: 135,
        description: "An omnipotent evil demon creates a perfect illusion of having hands. Your entire experiential world is a systematic deception.",
        nozickNote: "Also a DISTANT world. Nozick rejects the skeptical demand that we must rule out all possible not-P worlds. Only nearby worlds matter for tracking."
      },
    ],
    mcq: [
      {
        q: "In Nozick's framework, why are the 'brain in a vat' and 'evil demon' worlds labeled as DISTANT rather than nearby?",
        options: [
          "Because they are logically impossible scenarios",
          "Because they require radical differences from actuality — they are not minimally different from the actual world",
          "Because Nozick considers them irrelevant to epistemology",
          "Because they only matter for Descartes, not Nozick"
        ],
        correct: 1,
        explanation: "Nozick uses a 'closeness' metric for possible worlds. A nearby world is one minimally different from actuality. BIV and demon scenarios require massive, deep changes to the actual world — the entire causal order must be different. That makes them distant. Sensitivity is only evaluated at the nearest not-P worlds."
      },
      {
        q: "In the world where you 'lost hands in an accident,' you do NOT believe you have hands. What does this establish for Nozick?",
        options: [
          "The belief fails sensitivity",
          "The belief satisfies sensitivity — it correctly turns off when P turns off",
          "This world is irrelevant since it involves an accident",
          "The belief fails adherence"
        ],
        correct: 1,
        explanation: "Sensitivity asks: in the nearest not-P worlds, does S refrain from believing P? Yes — in this nearby world where P is false, you don't believe P. The belief responds correctly to the change in fact. Sensitivity is satisfied, which is one reason 'I have hands' qualifies as knowledge."
      },
      {
        q: "Why does 'I have hands' constitute knowledge on Nozick's account while 'I am not a brain in a vat' does not?",
        options: [
          "Because the hands claim is more certain than the BIV claim",
          "Because 'I have hands' is verified by science but BIV is speculative",
          "Because 'I have hands' is sensitive via nearby worlds, while 'not a BIV' fails sensitivity — in the nearest BIV worlds, you'd still believe you're not a BIV",
          "Because Nozick ignores skeptical scenarios entirely"
        ],
        correct: 2,
        explanation: "The two beliefs use different methods. 'I have hands' is formed via direct perception — and in nearby worlds without hands, perception would immediately correct the belief. 'Not a BIV' is a background assumption — and in nearby BIV worlds, everything seems identical. Only 'I have hands' passes sensitivity. Crucially, Nozick shows these two propositions can have different knowledge-statuses simultaneously."
      }
    ]
  },

  {
    id: "coffee",
    statement: "My coffee is still hot",
    emoji: "☕",
    method: "Method of belief: Memory of initial state (made it 2 hours ago)",
    verdict: "not-knowledge",
    verdictSummary: "Sensitivity fails. Your belief doesn't track the current fact — it's anchored to stale evidence.",
    actualWorld: {
      description: "You made coffee 2 hours ago and left it on your desk. You believe it's still hot, based solely on the memory of making it.",
    },
    nearbyWorlds: [
      {
        id: "c-n1", label: "Coffee went cold", emoji: "🥶",
        pTrue: false, believesP: true, angle: -90,
        description: "The coffee cooled down 90 minutes ago. Yet you still believe it's hot — because you haven't checked since making it.",
        nozickNote: "P is false but you still believe P. This is a nearby world (coffee simply cooling is minimally different from actuality). Sensitivity FAILS here."
      },
      {
        id: "c-n2", label: "Thermos kept it hot", emoji: "🌡️",
        pTrue: true, believesP: true, angle: 0,
        description: "The coffee is in a thermos and is genuinely still hot 2 hours later. Your belief happens to be correct.",
        nozickNote: "P is true and you believe P. Adherence holds — but note that your belief isn't well-calibrated to the actual reason it's hot."
      },
      {
        id: "c-n3", label: "Someone reheated it", emoji: "🫙",
        pTrue: true, believesP: true, angle: 180,
        description: "A housemate reheated your coffee while you were away. It's hot, and you believe it's hot — but for the wrong causal reason.",
        nozickNote: "P is true and you believe P, but the causal path is broken. Compare to Gettier: truth is restored by coincidence. Nozick's method-sensitivity would flag this."
      },
      {
        id: "c-n4", label: "You checked just now", emoji: "👆",
        pTrue: true, believesP: true, angle: 90,
        description: "You just touched the cup a moment ago and confirmed it was hot. Now the belief is formed via current perception, not stale memory.",
        nozickNote: "A critical contrast world: the same proposition, but now the METHOD is direct perception. This belief would be sensitive. Nozick's theory is method-relative."
      },
    ],
    distantWorlds: [
      {
        id: "c-d1", label: "Time stopped for 2 hours", emoji: "⏸️",
        pTrue: true, believesP: true, angle: -45,
        description: "A distant world where physics is radically different and time paused, preserving the coffee's temperature perfectly.",
        nozickNote: "A distant world requiring radical changes to physics. Irrelevant to evaluating whether your current belief tracks the ordinary fact."
      },
      {
        id: "c-d2", label: "Coffee never cools here", emoji: "🔥",
        pTrue: true, believesP: true, angle: 135,
        description: "A distant world with different thermodynamic laws where hot liquids never lose heat.",
        nozickNote: "This world is distant — it requires fundamentally different physical laws. Not part of the sensitivity evaluation."
      },
    ],
    mcq: [
      {
        q: "Your belief that 'my coffee is still hot' is based on a 2-hour-old memory. Why does this cause sensitivity to fail?",
        options: [
          "Because memory is always unreliable",
          "Because in nearby worlds where the coffee is cold, you would still believe it's hot — the memory doesn't update",
          "Because coffee can't be known about without direct contact",
          "Because the belief is unjustified"
        ],
        correct: 1,
        explanation: "Sensitivity requires that if P were false, you would not believe P. But your evidence (the memory of making coffee) doesn't respond to current temperature changes. In the nearby world where the coffee is cold, that 2-hour-old memory still says 'it's hot.' The belief is anchored to the past, not the present fact."
      },
      {
        q: "The world where 'you just checked the cup' shows the belief IS sensitive. What changed?",
        options: [
          "The proposition changed",
          "The method of belief formation changed — from stale memory to current direct perception",
          "The justification became stronger",
          "The possible worlds changed"
        ],
        correct: 1,
        explanation: "Nozick's tracking is method-relative. The same proposition 'my coffee is hot' can be knowledge or not depending on HOW the belief is formed. Formed via direct perception just now? Sensitive — if it were cold, you'd feel it and not believe it's hot. Formed via 2-hour-old memory? Not sensitive — the memory doesn't track current temperature."
      },
      {
        q: "How does this case compare to Nozick's 'bank open Saturday' scenario?",
        options: [
          "They are completely different — one is about coffee, one is about banks",
          "Both involve beliefs formed from stale evidence that doesn't track current facts — sensitivity fails for the same structural reason",
          "The bank case is worse because financial stakes are higher",
          "The coffee case fails adherence; the bank case fails sensitivity"
        ],
        correct: 1,
        explanation: "Structurally identical: in both cases, the believer uses past evidence (a week-old memory of bank hours; a 2-hour-old memory of making coffee) that doesn't track whether the proposition is currently true. In both cases, nearby worlds exist where P is false but the believer still holds P. Sensitivity fails for the same reason: stale evidence doesn't covary with present facts."
      }
    ]
  },

  {
    id: "keys",
    statement: "My keys are on the counter",
    emoji: "🔑",
    method: "Method of belief: Memory of placing them there this morning",
    verdict: "not-knowledge",
    verdictSummary: "Sensitivity fails. Multiple nearby worlds have the keys elsewhere, yet the belief persists unchanged.",
    actualWorld: {
      description: "You placed your keys on the kitchen counter this morning. It is now evening and you believe they are still there, based only on memory.",
    },
    nearbyWorlds: [
      {
        id: "k-n1", label: "Partner moved them to shelf", emoji: "👤",
        pTrue: false, believesP: true, angle: -90,
        description: "Your partner moved the keys to the entryway shelf while cleaning. You don't know this and still believe they're on the counter.",
        nozickNote: "P is false but you still believe P. A very nearby world — someone simply moving keys is minimally different from actuality. Sensitivity FAILS."
      },
      {
        id: "k-n2", label: "You put them in your bag", emoji: "🎒",
        pTrue: false, believesP: true, angle: 0,
        description: "You actually put the keys in your bag when leaving, not on the counter. Your memory is mistaken.",
        nozickNote: "P is false and you believe P — you have a false memory. Another nearby sensitivity failure. Your memory-based belief doesn't track where the keys actually are."
      },
      {
        id: "k-n3", label: "Keys still on counter", emoji: "✅",
        pTrue: true, believesP: true, angle: 90,
        description: "The keys are exactly where you left them. No one has disturbed them. Your belief is correct and happens to track the fact in this case.",
        nozickNote: "P is true and you believe P. Adherence holds in this easy case — but adherence alone cannot save the belief from being non-knowledge."
      },
      {
        id: "k-n4", label: "You just checked them", emoji: "👀",
        pTrue: true, believesP: true, angle: 180,
        description: "You just walked into the kitchen, saw the keys, and formed the belief from direct perception. The keys are there.",
        nozickNote: "Same proposition, new method. Direct perception NOW would be sensitive — if they weren't there, you'd look and see their absence. Method matters for tracking."
      },
    ],
    distantWorlds: [
      {
        id: "k-d1", label: "Keys teleported away", emoji: "⚡",
        pTrue: false, believesP: true, angle: -45,
        description: "A fantastical world where objects can teleport spontaneously. The keys vanished to a random location.",
        nozickNote: "A distant world requiring radically different physics. Not relevant to evaluating everyday sensitivity about key placement."
      },
      {
        id: "k-d2", label: "You're in a memory implant simulation", emoji: "💉",
        pTrue: false, believesP: true, angle: 135,
        description: "Scientists have implanted false memories of placing keys. You never placed them, but the memory feels perfectly real.",
        nozickNote: "A distant skeptical scenario. Nozick notes that distant worlds like this don't threaten ordinary knowledge — but this belief already fails sensitivity on ordinary nearby grounds."
      },
    ],
    mcq: [
      {
        q: "Two nearby worlds show the keys NOT on the counter, yet you still believe they are. What does this demonstrate?",
        options: [
          "The belief is irrational",
          "You should always check your keys",
          "The belief fails sensitivity — in multiple nearby not-P worlds, the belief persists unchanged",
          "The belief fails adherence"
        ],
        correct: 2,
        explanation: "Sensitivity asks: in the nearest not-P worlds, would you not believe P? Here, keys being moved (by a partner, or by yourself to your bag) are nearby worlds. In these worlds, your memory still says 'keys on counter.' The belief fails to track the fact — it's frozen to a past state rather than the current one."
      },
      {
        q: "The world where 'you just checked them' shows the belief would be sensitive. Why is this significant for Nozick?",
        options: [
          "It proves that all memory is unreliable",
          "It shows that sensitivity is proposition-relative, not method-relative",
          "It demonstrates that the same proposition can be known via one method but not another — tracking depends on the method of belief formation",
          "It shows that adherence is more important than sensitivity"
        ],
        correct: 2,
        explanation: "Nozick's tracking theory is method-sensitive. 'Keys on the counter' is not known when believed via 8-hour-old memory — that method doesn't track current location. But the same proposition CAN be known when believed via direct current perception. Knowledge attribution is relative to the method by which the belief is formed."
      },
      {
        q: "This case and the 'coffee is hot' case share the same structural failure. Which of these ALSO shares this structure?",
        options: [
          "The brain-in-a-vat case (not knowing you're not a BIV)",
          "The fake barn case (looking at the one real barn in fake barn county)",
          "The bank case (believing the bank is open based on a week-old visit)",
          "The 'I have hands' case"
        ],
        correct: 2,
        explanation: "All three — coffee, keys, and bank — share the same structure: a belief formed from past evidence that doesn't track the current fact. In each case, nearby worlds exist where the fact has changed but the belief hasn't. This contrasts with the fake barn case, which fails sensitivity for a different reason: an epistemically hostile environment in the present, not stale evidence."
      }
    ]
  },

  {
    id: "tree",
    statement: "There is a tree outside my window",
    emoji: "🌳",
    method: "Method of belief: Direct visual perception (looking at it right now)",
    verdict: "not-knowledge",
    verdictSummary: "Sensitivity fails. The 'realistic painting' world is a nearby world where P is false but you still believe P — your perception cannot distinguish tree from trompe-l'oeil. This mirrors the Fake Barn case: an epistemically hostile environment poisons nearby modal space even when you happen to be looking at the real thing.",
    actualWorld: {
      description: "You look out your window and see a large oak tree. The belief is formed by direct, current visual perception.",
    },
    nearbyWorlds: [
      {
        id: "t-n1", label: "Tree was cut down yesterday", emoji: "🪚",
        pTrue: false, believesP: false, angle: -90,
        description: "The tree was felled by a crew yesterday. Looking out the window, you see only a stump and open sky. You do NOT believe there is a tree.",
        nozickNote: "P is false and you do NOT believe P. Direct perception immediately reveals the absence. Sensitivity is satisfied — the belief correctly turns off."
      },
      {
        id: "t-n2", label: "Window is frosted over", emoji: "❄️",
        pTrue: true, believesP: true, angle: 0,
        description: "The tree is there, but frost obscures your view. You can make out a dark shape and still form the belief, though less confidently.",
        nozickNote: "P is true and you believe P. Adherence holds even when perception is partially obstructed — the belief is robust across slight variations in viewing conditions."
      },
      {
        id: "t-n3", label: "Different tree, same spot", emoji: "🌲",
        pTrue: true, believesP: true, angle: 90,
        description: "A different species of tree stands in the same location — the oak was replaced with a pine. You form the belief 'there is a tree outside my window.'",
        nozickNote: "P is true (there is still a tree) and you believe P. Adherence holds across variations in which tree is there."
      },
      {
        id: "t-n4", label: "Realistic painting of tree", emoji: "🖼️",
        pTrue: false, believesP: true, angle: 180,
        description: "Unknown to you, the tree was replaced with an enormously convincing trompe-l'oeil painting on the wall outside your window. You still believe you see a real tree.",
        nozickNote: "This is the crucial test! P is false but you believe P — this nearby world breaks sensitivity. Compare to Fake Barn County. If such paintings were rare, this world might be DISTANT; if common, it's nearby. Environment matters."
      },
    ],
    distantWorlds: [
      {
        id: "t-d1", label: "Simulation without trees", emoji: "💻",
        pTrue: false, believesP: true, angle: -45,
        description: "A simulated world where there are no physical trees — only rendered images. Your visual experience is identical.",
        nozickNote: "A distant world requiring a radically different metaphysical situation. Not part of the standard sensitivity evaluation for ordinary perceptual knowledge."
      },
      {
        id: "t-d2", label: "All trees are holograms", emoji: "🔆",
        pTrue: false, believesP: true, angle: 135,
        description: "An unusual world where all apparent trees are sophisticated holograms. Advanced technology produces perfect tree-experiences.",
        nozickNote: "Also a distant world. Unless hologram-trees are common in your environment (making this nearby), this doesn't affect whether you know there's a tree."
      },
    ],
    mcq: [
      {
        q: "The 'realistic painting' world is crucial. What determines whether it is NEARBY or DISTANT for your sensitivity evaluation?",
        options: [
          "How realistic the painting is",
          "Whether such paintings are common in your actual environment — a rare painting is distant, a common one is nearby",
          "Whether the painting is inside or outside",
          "Whether you are an art expert"
        ],
        correct: 1,
        explanation: "This is the Fake Barn insight applied here. The closeness of a possible world depends on the actual environment. If trompe-l'oeil window paintings are extremely rare, that world is distant — your belief is sensitive and you have knowledge. If they're common in your building, nearby worlds include many paintings, sensitivity fails, and you don't know. This is why Nozick's theory makes knowledge environment-relative."
      },
      {
        q: "Both 'there is a tree outside my window' and 'my keys are on the counter' fail sensitivity, but for different reasons. What is the structural difference?",
        options: [
          "There is no difference — both fail for the same reason",
          "The tree case fails because of a hostile epistemic environment (fake nearby), while the keys case fails because of stale evidence that doesn't track current facts",
          "The tree case fails adherence; the keys case fails sensitivity",
          "The keys case is worse because financial stakes are higher"
        ],
        correct: 1,
        explanation: "Both fail sensitivity, but the mechanism differs. The keys case fails because the belief-forming method (8-hour-old memory) is anchored to the past — in nearby worlds where the keys moved, the memory hasn't updated. The tree case fails because the environment contains a convincing fake nearby — even though you're using current perception, a nearby world swaps tree for painting. One is a method problem; the other is an environment problem. Nozick's theory captures both."
      },
      {
        q: "If trompe-l'oeil paintings are rare in your area, this belief constitutes knowledge. What principle does this illustrate?",
        options: [
          "Knowledge requires certainty about nearby worlds",
          "Nozick's sensitivity condition is evaluated relative to the subject's actual environment — epistemic luck depends on what's nearby in modal space, which depends on what's typical in one's world",
          "Rare events cannot threaten knowledge claims",
          "Only present-tense beliefs can constitute knowledge"
        ],
        correct: 1,
        explanation: "Nozick's account makes knowledge environment-sensitive. What counts as a 'nearby' world is partly determined by the actual environment — rare scenarios are modally distant even if physically possible. This parallels Goldman's reliabilism: the reliability of perception depends on the proportion of fakes in the environment. Knowledge attribution is not purely a feature of the belief itself but of how the belief relates to its modal environment."
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────────────────────

let currentProp   = null;
let selectedWorld = null;
let mcqIndex      = 0;
let mcqAnswered   = false;
let usedPropIds   = [];

// ─────────────────────────────────────────────────────────────────────────────
//  GENERATE / CYCLE PROPOSITIONS
// ─────────────────────────────────────────────────────────────────────────────

function generateProp() {
  if (usedPropIds.length === PROPOSITIONS.length) usedPropIds = [];
  const available = PROPOSITIONS.filter(p => !usedPropIds.includes(p.id));
  const next = available[Math.floor(Math.random() * available.length)];
  usedPropIds.push(next.id);
  loadProp(next.id);
}

function loadProp(id) {
  const prop = PROPOSITIONS.find(p => p.id === id);
  if (!prop) return;
  currentProp   = prop;
  selectedWorld = null;
  mcqIndex      = 0;
  mcqAnswered   = false;

  // Reset to full-width canvas (no world selected yet)
  const layout = document.querySelector('.worlds-layout');
  if (layout) layout.classList.remove('has-selection');

  renderStatementBanner(prop);
  renderCanvas(prop);
  renderInfoPanel(null);
  renderMCQ(prop);
}

// ─────────────────────────────────────────────────────────────────────────────
//  STATEMENT BANNER
// ─────────────────────────────────────────────────────────────────────────────

function renderStatementBanner(prop) {
  const el = document.getElementById("statementBanner");
  if (!el) return;
  el.innerHTML = `
    <div class="sb-inner fade-in">
      <span class="sb-emoji">${prop.emoji}</span>
      <div class="sb-text">
        <div class="sb-proposition">"${prop.statement}"</div>
        <div class="sb-method">${prop.method}</div>
      </div>
      <div class="sb-verdict ${prop.verdict}">
        <span class="sv-dot"></span>
        ${prop.verdict === "knowledge" ? "Constitutes Knowledge" : "Does Not Constitute Knowledge"}
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SVG CANVAS
// ─────────────────────────────────────────────────────────────────────────────

const CX = 450, CY = 250;
const NEARBY_R = 120;
const DISTANT_R = 290;

function worldCenter(world) {
  // Fix: check actual arrays, not id prefix (h-d1 does NOT start with "d")
  const isNearby = currentProp.nearbyWorlds.some(w => w.id === world.id);
  const r = isNearby ? NEARBY_R : DISTANT_R;
  // Distant worlds: override angle to push them far left/right for clear visual separation
  let angle = world.angle;
  if (!isNearby) angle = world.angle < 0 ? -18 : 162;
  const rad = (angle * Math.PI) / 180;
  const rng = seededRng(hashStr(world.id + "pos"));
  const rOff = 1 + (rng() - 0.5) * 0.07;
  return {
    x: CX + r * rOff * Math.cos(rad),
    y: CY + r * rOff * Math.sin(rad),
  };
}

function renderCanvas(prop) {
  const svg = document.getElementById("worldsCanvas");
  if (!svg) return;

  let html = buildDefs();

  // Background
  html += `<circle cx="${CX}" cy="${CY}" r="320" fill="url(#explorerBg)"/>`;

  // Only draw nearby ring guide — distant ring would be mostly off-canvas
  html += `<circle cx="${CX}" cy="${CY}" r="${NEARBY_R}" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1" stroke-dasharray="4 6"/>`;
  html += svgText(CX, CY - NEARBY_R - 7, "NEARBY WORLDS", 7.5, "rgba(255,255,255,0.22)");

  // Spoke lines from center to nearby worlds only
  for (const w of prop.nearbyWorlds) {
    const p = worldCenter(w);
    html += `<line x1="${CX}" y1="${CY}" x2="${f(p.x)}" y2="${f(p.y)}" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>`;
  }

  // Distant world blobs (with faint dashed spoke)
  for (const w of prop.distantWorlds) {
    const p = worldCenter(w);
    html += `<line x1="${CX}" y1="${CY}" x2="${f(p.x)}" y2="${f(p.y)}" stroke="rgba(255,255,255,0.025)" stroke-width="1" stroke-dasharray="4 6"/>`;
    html += renderBlob(w, false);
    html += svgText(p.x, p.y - 28, "DISTANT", 6.5, "rgba(120,115,160,0.7)");
  }

  // Nearby world blobs
  for (const w of prop.nearbyWorlds) {
    html += renderBlob(w, true);
  }

  // Actual world (center)
  html += renderActualBlob(prop);

  svg.innerHTML = html;

  // Attach click handlers
  svg.querySelectorAll("[data-world-id]").forEach(el => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => {
      const id = el.dataset.worldId;
      const world = [...prop.nearbyWorlds, ...prop.distantWorlds].find(w => w.id === id);
      if (world) selectWorld(world);
    });
  });
}

function renderBlob(world, isNearby) {
  const p = worldCenter(world);
  const r = isNearby ? 28 : 18;
  const isSelected = selectedWorld && selectedWorld.id === world.id;

  // Color logic
  let strokeColor, fillColor;
  if (!isNearby) {
    strokeColor = "rgba(100,95,140,0.7)";
    fillColor   = "rgba(30,28,55,0.8)";
  } else if (world.pTrue) {
    strokeColor = isSelected ? "#52b788" : "rgba(82,183,136,0.7)";
    fillColor   = isSelected ? "rgba(82,183,136,0.18)" : "rgba(82,183,136,0.1)";
  } else {
    strokeColor = isSelected ? "#e05c68" : "rgba(224,92,104,0.7)";
    fillColor   = isSelected ? "rgba(224,92,104,0.18)" : "rgba(224,92,104,0.1)";
  }

  const path = blobPath(p.x, p.y, r, world.id);
  const filter = isSelected ? ' filter="url(#blobGlow)"' : "";
  const strokeW = isSelected ? "2" : "1.4";

  let html = `<g data-world-id="${world.id}" class="world-blob-group">`;
  html += `<path d="${path}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="${strokeW}"${filter}/>`;
  html += `<text x="${f(p.x)}" y="${f(p.y + (isNearby ? 5 : 4))}" text-anchor="middle" font-size="${isNearby ? 14 : 10}" pointer-events="none">${world.emoji}</text>`;

  // Belief badge
  const badgeR = isNearby ? 6 : 4.5;
  const badgeY = p.y + r - badgeR + 1;
  const badgeCol = world.believesP ? "#52b788" : "#e05c68";
  html += `<circle cx="${f(p.x)}" cy="${f(badgeY)}" r="${badgeR}" fill="${badgeCol}" stroke="#0b0a18" stroke-width="1.5" pointer-events="none"/>`;
  html += `<text x="${f(p.x)}" y="${f(badgeY + badgeR * 0.45)}" text-anchor="middle" font-size="${badgeR * 1.1}" fill="#0b0a18" font-weight="bold" pointer-events="none">${world.believesP ? "✓" : "✗"}</text>`;

  // Label below
  const labelY = p.y + r + (isNearby ? 14 : 10);
  html += svgText(p.x, labelY, world.label, isNearby ? 8.5 : 7, "rgba(200,195,220,0.65)");

  html += `</g>`;
  return html;
}

function renderActualBlob(prop) {
  const path = blobPath(CX, CY, 40, prop.id + "-actual");
  return `<g class="actual-world-blob">
    <path d="${path}" fill="rgba(200,168,76,0.14)" stroke="#c8a84c" stroke-width="2" filter="url(#blobGlow)"/>
    <text x="${CX}" y="${CY + 6}" text-anchor="middle" font-size="18">${prop.emoji}</text>
    <text x="${CX}" y="${CY + 56}" text-anchor="middle" fill="rgba(200,168,76,0.7)" font-size="8" font-family="DM Sans, sans-serif" letter-spacing="1">ACTUAL WORLD</text>
  </g>`;
}

function buildDefs() {
  return `<defs>
    <radialGradient id="explorerBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1c1a36" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#0b0a18" stop-opacity="0"/>
    </radialGradient>
    <filter id="blobGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;
}

function svgText(x, y, text, size, fill) {
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" fill="${fill}" font-size="${size}" font-family="DM Sans, sans-serif" letter-spacing="0.8" pointer-events="none">${text}</text>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  WORLD SELECTION
// ─────────────────────────────────────────────────────────────────────────────

function selectWorld(world) {
  selectedWorld = world;
  // Expand to 2-column layout on first click
  document.querySelector('.worlds-layout').classList.add('has-selection');
  renderCanvas(currentProp);
  renderInfoPanel(world);
}

function renderInfoPanel(world) {
  const el = document.getElementById("worldInfoPanel");
  if (!el) return;

  if (!world) {
    el.innerHTML = `<div class="info-placeholder">
      <span class="info-ph-icon">◎</span>
      <span>Click any world to explore it</span>
    </div>`;
    return;
  }

  // Correctly detect nearby vs distant by checking which array the world lives in
  const isNearby  = currentProp.nearbyWorlds.some(w => w.id === world.id);
  const distLabel = isNearby ? "Nearby World" : "Distant World";
  const distClass = isNearby ? "nearby" : "distant";
  const pClass    = world.pTrue ? "p-true" : "p-false";
  const pLabel    = world.pTrue ? "P is True" : "P is False";
  const bClass    = world.believesP ? "b-yes" : "b-no";
  const bLabel    = world.believesP ? "Agent Believes P" : "Agent Does Not Believe P";

  // Determine if this world is "problematic"
  const bad = (isNearby && !world.pTrue && world.believesP) ||
              (isNearby && world.pTrue  && !world.believesP);

  el.innerHTML = `<div class="info-card fade-in">
    <div class="info-top">
      <span class="info-emoji">${world.emoji}</span>
      <div class="info-title-col">
        <div class="info-world-name">${world.label}</div>
        <div class="info-badges">
          <span class="info-badge ${distClass}">${distLabel}</span>
          <span class="info-badge ${pClass}">${pLabel}</span>
        </div>
      </div>
    </div>
    <p class="info-desc">${world.description}</p>
    <div class="info-status-row">
      <div class="info-status ${world.pTrue ? 'pass' : 'fail'}">
        <span class="is-label">P (proposition)</span>
        <span class="is-value">${world.pTrue ? 'True ✓' : 'False ✗'}</span>
      </div>
      <div class="info-status ${world.believesP ? 'pass' : 'fail'}">
        <span class="is-label">Belief</span>
        <span class="is-value">${world.believesP ? 'Believes P ✓' : 'Doesn\'t Believe P ✗'}</span>
      </div>
    </div>
    ${bad ? `<div class="info-problem-flag">⚠ This world undermines tracking — P and belief are misaligned</div>` : ""}
    <div class="info-nozick">
      <div class="info-nozick-label">Nozick's Analysis</div>
      <p>${world.nozickNote}</p>
    </div>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function renderMCQ(prop) {
  const el = document.getElementById("mcqSection");
  if (!el) return;

  const q   = prop.mcq[mcqIndex];
  const num = mcqIndex + 1;
  const tot = prop.mcq.length;

  el.innerHTML = `
    <div class="mcq-header">
      <div class="mcq-title-row">
        <span class="mcq-title">Test Your Understanding</span>
        <span class="mcq-progress">${num} / ${tot}</span>
      </div>
      <div class="mcq-progress-bar">
        <div class="mcq-progress-fill" style="width:${((num-1)/tot)*100}%"></div>
      </div>
    </div>
    <div class="mcq-body fade-in">
      <p class="mcq-question">${q.q}</p>
      <div class="mcq-options" id="mcqOptions">
        ${q.options.map((opt, i) => `
          <button class="mcq-option" data-index="${i}" onclick="answerMCQ(${i})">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt}</span>
          </button>`).join("")}
      </div>
      <div class="mcq-feedback" id="mcqFeedback"></div>
    </div>`;
}

function answerMCQ(chosen) {
  if (mcqAnswered) return;
  mcqAnswered = true;

  const q    = currentProp.mcq[mcqIndex];
  const opts = document.querySelectorAll(".mcq-option");
  const fb   = document.getElementById("mcqFeedback");
  const isCorrect = chosen === q.correct;

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === chosen && !isCorrect) btn.classList.add("wrong");
  });

  fb.innerHTML = `
    <div class="feedback-card ${isCorrect ? 'correct' : 'incorrect'} fade-in">
      <div class="fb-header">
        <span class="fb-icon">${isCorrect ? '✓' : '✗'}</span>
        <span class="fb-label">${isCorrect ? 'Correct' : 'Incorrect'}</span>
      </div>
      <p class="fb-explanation">${q.explanation}</p>
      ${mcqIndex < currentProp.mcq.length - 1
        ? `<button class="fb-next-btn" onclick="nextMCQ()">Next Question →</button>`
        : `<button class="fb-next-btn" onclick="showMCQResult()">See Results →</button>`}
    </div>`;
}

function nextMCQ() {
  mcqIndex++;
  mcqAnswered = false;
  renderMCQ(currentProp);
}

function showMCQResult() {
  const el = document.getElementById("mcqSection");
  if (!el) return;
  el.innerHTML = `
    <div class="mcq-header">
      <div class="mcq-title-row">
        <span class="mcq-title">Test Your Understanding</span>
        <span class="mcq-progress">Complete</span>
      </div>
      <div class="mcq-progress-bar">
        <div class="mcq-progress-fill" style="width:100%"></div>
      </div>
    </div>
    <div class="mcq-complete fade-in">
      <div class="complete-icon">✓</div>
      <div class="complete-title">Questions complete for this proposition</div>
      <p class="complete-desc">Generate a new statement to explore more possible worlds, or continue to the next module.</p>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.4rem;">
        <button class="generate-btn-inline" onclick="generateProp()">↻ Generate New Statement</button>
        <a href="/contextualism" style="text-decoration:none; padding:0.6rem 1.3rem; background:var(--gold-dim); border:1px solid rgba(200,168,76,0.4); border-radius:3px; color:var(--gold); font-size:0.84rem; cursor:pointer;">Contextualism →</a>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("generateBtn");
  if (btn) btn.addEventListener("click", generateProp);
  generateProp();
});
