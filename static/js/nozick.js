// nozick.js — Tracking Theory visualizer
// All scenario data, SVG diagram builder, and render functions.

// ─────────────────────────────────────────────────────────────────────────────
//  SCENARIO DATA
// ─────────────────────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: "hands",
    emoji: "🖐",
    title: "I Have Hands",
    claim: '"I have hands"',
    context:
      "You look down at your hands right now. Ordinary perceptual knowledge based on direct, first-person visual experience.",
    method: "Method of belief: Direct visual perception",
    sensitivity: {
      passes: true,
      formula: "If I had no hands → I would NOT believe I have hands",
      worlds: [
        { emoji: "🏥", label: "Lost hands in accident", believesP: false },
        { emoji: "🧬", label: "Born without hands", believesP: false },
        { emoji: "🩺", label: "Hands amputated recently", believesP: false },
      ],
      explanation:
        "In every nearby world where you lack hands, perception immediately reveals the absence. You would not believe you have them. Sensitivity is satisfied ✓",
    },
    adherence: {
      passes: true,
      formula: "If I have hands → I would believe I have hands",
      worlds: [
        { emoji: "☀️", label: "Normal day, look at hands", believesP: true },
        { emoji: "🧤", label: "Wearing gloves, feel them", believesP: true },
        { emoji: "😴", label: "Tired, distracted — still not fooled", believesP: true },
      ],
      explanation:
        "In all nearby worlds where you have hands, perception reliably produces the belief. Adherence is satisfied ✓",
    },
    verdict: "knowledge",
    verdictText:
      "Your belief tracks the truth in both directions — it turns off when the fact changes, and stays on reliably when the fact holds. This is the paradigm case of knowledge. Simple, direct, sensitive.",
    distantWorlds: [
      { emoji: "🧠", label: "Brain-in-a-vat" },
      { emoji: "💭", label: "Elaborate dream" },
    ],
  },
  {
    id: "biv",
    emoji: "🧠",
    title: "Not a Brain-in-a-Vat",
    claim: '"I am not a brain in a vat"',
    context:
      "You believe you're a normal embodied person. In a nearby possible world, scientists have removed your brain and feed it identical electrochemical experiences.",
    method: "Method of belief: Background assumption / no contrary evidence",
    sensitivity: {
      passes: false,
      formula: "If I were a BIV → I would NOT believe I'm not a BIV",
      worlds: [
        { emoji: "🧠", label: "BIV fed identical experiences", believesP: true },
        { emoji: "💻", label: "Matrix-style simulation", believesP: true },
        { emoji: "🔬", label: "Indistinguishable vat scenario", believesP: true },
      ],
      explanation:
        "In the nearest worlds where you ARE a brain-in-a-vat, everything feels identical — you'd still believe you're not a BIV. Your belief does not turn off when the truth does. Sensitivity FAILS ✗",
    },
    adherence: {
      passes: true,
      formula: "If I'm not a BIV → I would believe I'm not a BIV",
      worlds: [
        { emoji: "🚶", label: "Normal embodied life", believesP: true },
        { emoji: "📅", label: "Same world, next week", believesP: true },
      ],
      explanation:
        "When you're genuinely not a BIV, you believe you're not. Adherence holds — but this alone cannot rescue the case.",
    },
    verdict: "not-knowledge",
    verdictText:
      "You do NOT know you're not a brain in a vat. If you were, you'd have no way to detect it. Crucially, Nozick argues this doesn't threaten your knowledge that you have hands — that belief tracks via perception, independently of whether the BIV scenario obtains. Nozick rejects epistemic closure to preserve this result.",
    distantWorlds: [],
  },
  {
    id: "bank",
    emoji: "🏦",
    title: "Bank Open Saturday",
    claim: '"The bank is open on Saturday"',
    context:
      "You drove past the bank last Saturday and saw it was open. Relying on this week-old memory, you plan to deposit a check this Saturday.",
    method: "Method of belief: Memory of past perceptual evidence",
    sensitivity: {
      passes: false,
      formula: "If the bank were closed → I would NOT believe it's open",
      worlds: [
        { emoji: "📅", label: "Bank changed hours last week", believesP: true },
        { emoji: "🏗️", label: "Bank under renovation, closed", believesP: true },
        { emoji: "📋", label: "New management, new schedule", believesP: true },
      ],
      explanation:
        "In nearby worlds where the bank is now closed, you'd still believe it's open — your stale memory hasn't updated. The belief doesn't track the current fact. Sensitivity FAILS ✗",
    },
    adherence: {
      passes: true,
      formula: "If the bank is open → I would believe it's open",
      worlds: [
        { emoji: "🏦", label: "Same hours as last week", believesP: true },
        { emoji: "📞", label: "Verified by call this morning", believesP: true },
      ],
      explanation:
        "If the bank is still open Saturdays, your belief says so. Adherence holds.",
    },
    verdict: "not-knowledge",
    verdictText:
      "Your belief is justified and happens to be true — but it doesn't reliably track the fact. If hours had changed, you'd still feel certain while being wrong. Contrast: if you called the bank this morning, that belief would be sensitive. The freshness and reliability of the evidence method determines whether tracking obtains.",
    distantWorlds: [],
  },
  {
    id: "barn",
    emoji: "🏚",
    title: "That Is a Barn",
    claim: '"That is a barn"',
    context:
      "Driving through Fake Barn County, dotted with convincing facades. You happen to look at the one real barn and form the belief "that is a barn."",
    method: "Method of belief: Visual perception (of the real barn)",
    sensitivity: {
      passes: false,
      formula: "If that were not a barn → I would NOT believe it's a barn",
      worlds: [
        { emoji: "🎭", label: "Looking at facade 50 feet earlier", believesP: true },
        { emoji: "🛣️", label: "Slightly different route — a facade", believesP: true },
        { emoji: "⏱️", label: "Looked one second sooner — facade", believesP: true },
      ],
      explanation:
        "In nearby worlds — just feet or seconds away — you'd be looking at a convincing facade and still believe \"that's a barn.\" The hostile epistemic environment floods nearby worlds with false positives. Sensitivity FAILS ✗",
    },
    adherence: {
      passes: true,
      formula: "If that is a barn → I would believe it's a barn",
      worlds: [
        { emoji: "🏚", label: "Same real barn, full view", believesP: true },
        { emoji: "📐", label: "Slightly different angle of real barn", believesP: true },
      ],
      explanation:
        "When you look at the real barn, perception correctly produces the belief. Adherence holds.",
    },
    verdict: "not-knowledge",
    verdictText:
      "You got lucky — you happened to look at the one real barn. But in nearby worlds you'd be systematically deceived by a facade. Your belief doesn't track the truth; it's accidentally true. Tracking theory correctly denies knowledge here, capturing the intuition that the Fake Barn environment has corrupted your epistemic situation even though you're looking at something real.",
    distantWorlds: [{ emoji: "🏙️", label: "Normal countryside" }],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  SVG DIAGRAM BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildDiagram(scenario) {
  const CX = 170, CY = 170;
  const INNER_R = 108;
  const OUTER_R = 155;
  const NODE_R  = 20;
  const DIST_R  = 12;

  // Combine sensitivity (P=false) and adherence (P=true) worlds into one ring
  const allNearby = [
    ...scenario.sensitivity.worlds.map((w) => ({ ...w, type: "sensitivity", pTrue: false })),
    ...scenario.adherence.worlds.map((w) => ({ ...w, type: "adherence", pTrue: true })),
  ];
  const total = allNearby.length;

  function pos(radius, index, n, offset = -Math.PI / 2) {
    const a = offset + (index / n) * 2 * Math.PI;
    return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
  }

  // A world is "problematic" if it provides evidence against the relevant test
  function isProblematic(w) {
    return (
      (w.type === "sensitivity" && w.believesP) ||
      (w.type === "adherence" && !w.believesP)
    );
  }

  let s = `<defs>
    <radialGradient id="bgG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1c1a36" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0b0a18" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>`;

  // Background
  s += `<circle cx="${CX}" cy="${CY}" r="168" fill="url(#bgG)"/>`;

  // Outer ring — distant worlds
  s += `<circle cx="${CX}" cy="${CY}" r="${OUTER_R}" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="4 7"/>`;
  s += `<text x="${CX}" y="${CY - OUTER_R - 5}" text-anchor="middle" fill="rgba(255,255,255,0.18)" font-size="7.5" font-family="DM Sans, sans-serif" letter-spacing="1.2">DISTANT WORLDS</text>`;

  // Inner ring — nearby worlds
  s += `<circle cx="${CX}" cy="${CY}" r="${INNER_R}" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="1" stroke-dasharray="3 5"/>`;
  s += `<text x="${CX}" y="${CY - INNER_R - 5}" text-anchor="middle" fill="rgba(255,255,255,0.28)" font-size="7.5" font-family="DM Sans, sans-serif" letter-spacing="1.2">NEARBY WORLDS</text>`;

  // Distant world nodes (outer ring)
  const dw = scenario.distantWorlds || [];
  dw.forEach((w, i) => {
    const p = pos(OUTER_R, i, Math.max(dw.length, 3), Math.PI / 5);
    s += `<circle cx="${p.x}" cy="${p.y}" r="${DIST_R}" fill="#14122a" stroke="#3a385a" stroke-width="1"/>`;
    s += `<text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-size="10">${w.emoji}</text>`;
  });

  // Spoke lines from centre to nearby worlds
  allNearby.forEach((w, i) => {
    const p = pos(INNER_R, i, total);
    s += `<line x1="${CX}" y1="${CY}" x2="${p.x}" y2="${p.y}" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>`;
  });

  // Nearby world nodes
  allNearby.forEach((w, i) => {
    const p   = pos(INNER_R, i, total);
    const bad = isProblematic(w);
    const fillC   = bad ? "rgba(224,92,104,0.14)"  : "rgba(82,183,136,0.11)";
    const strokeC = bad ? "#e05c68" : "#52b788";
    const badgeC  = w.believesP ? "#52b788" : "#e05c68";

    s += `<circle cx="${p.x}" cy="${p.y}" r="${NODE_R}" fill="${fillC}" stroke="${strokeC}" stroke-width="1.4"/>`;
    s += `<text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-size="13">${w.emoji}</text>`;

    // Small belief indicator dot at the bottom of each node
    const bx = p.x, by = p.y + NODE_R - 4;
    s += `<circle cx="${bx}" cy="${by}" r="5.5" fill="${badgeC}" stroke="#0b0a18" stroke-width="1.5"/>`;
    s += `<text x="${bx}" y="${by + 3.5}" text-anchor="middle" font-size="7" fill="#0b0a18" font-weight="bold">${w.believesP ? "✓" : "✗"}</text>`;
  });

  // Actual world (centre)
  s += `<circle cx="${CX}" cy="${CY}" r="24" fill="rgba(200,168,76,0.14)" stroke="#c8a84c" stroke-width="1.8" filter="url(#glow)"/>`;
  s += `<text x="${CX}" y="${CY + 6}" text-anchor="middle" font-size="15">⭐</text>`;
  s += `<text x="${CX}" y="${CY + 42}" text-anchor="middle" fill="rgba(200,168,76,0.7)" font-size="7.5" font-family="DM Sans, sans-serif" letter-spacing="1">ACTUAL WORLD</text>`;

  return s;
}

// ─────────────────────────────────────────────────────────────────────────────
//  RENDER HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function renderTest(test, type) {
  const name   = type === "sensitivity" ? "Sensitivity" : "Adherence";
  const passes = test.passes;

  const worldRows = test.worlds
    .map((w) => {
      const bad =
        (type === "sensitivity" && w.believesP) ||
        (type === "adherence" && !w.believesP);
      return `<div class="world-row ${bad ? "problem" : ""}">
        <span class="world-emoji">${w.emoji}</span>
        <span class="world-label">${w.label}</span>
        <span class="world-belief ${w.believesP ? "yes" : "no"}">${
          w.believesP ? "Believes P" : "Doesn't Believe P"
        }</span>
      </div>`;
    })
    .join("");

  return `<div class="test-card ${type} fade-in">
    <div class="test-header">
      <div class="test-name-row">
        <div class="test-dot"></div>
        <span class="test-name">${name}</span>
      </div>
      <span class="test-badge ${passes ? "pass" : "fail"}">${passes ? "Passes ✓" : "Fails ✗"}</span>
    </div>
    <div class="test-body">
      <div class="test-formula">${test.formula}</div>
      <div class="test-worlds">${worldRows}</div>
      <div class="test-explanation">${test.explanation}</div>
    </div>
  </div>`;
}

function renderVerdict(scenario) {
  const isK = scenario.verdict === "knowledge";
  return `<div class="verdict-card ${scenario.verdict} fade-in">
    <div class="verdict-head">
      <span class="verdict-icon">${isK ? "✓" : "✗"}</span>
      <span class="verdict-title">${isK ? "This constitutes Knowledge" : "This is not Knowledge"}</span>
    </div>
    <p class="verdict-text">${scenario.verdictText}</p>
  </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SELECT SCENARIO
// ─────────────────────────────────────────────────────────────────────────────

function selectScenario(id) {
  const sc = SCENARIOS.find((s) => s.id === id);
  if (!sc) return;

  // Update sidebar active state
  document.querySelectorAll(".scenario-btn").forEach((b) =>
    b.classList.toggle("active", b.dataset.id === id)
  );

  // Rebuild analysis panel
  document.getElementById("analysisPanel").innerHTML = `
    <div class="claim-header fade-in">
      <div class="claim-quote">${sc.claim}</div>
      <div class="claim-context">${sc.context}</div>
      <div class="claim-method">${sc.method}</div>
    </div>

    <div class="content-grid">
      <div class="diagram-wrapper fade-in">
        <p class="diagram-label">Possible Worlds Diagram</p>
        <svg id="worldsDiagram" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg">
          ${buildDiagram(sc)}
        </svg>
        <div class="diagram-legend">
          <span class="legend-item"><span class="legend-dot good"></span>Supports test</span>
          <span class="legend-item"><span class="legend-dot bad"></span>Breaks test</span>
          <span class="legend-item"><span class="legend-dot distant"></span>Distant world</span>
        </div>
      </div>

      <div class="tests-column">
        ${renderTest(sc.sensitivity, "sensitivity")}
        ${renderTest(sc.adherence,  "adherence")}
        ${renderVerdict(sc)}
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

const list = document.getElementById("scenarioList");

SCENARIOS.forEach((sc) => {
  const btn = document.createElement("button");
  btn.className = "scenario-btn";
  btn.dataset.id = sc.id;
  btn.innerHTML = `
    <span class="btn-emoji">${sc.emoji}</span>
    <span class="btn-info">
      <span class="btn-title">${sc.title}</span>
      <span class="btn-claim">${sc.claim}</span>
    </span>`;
  btn.addEventListener("click", () => selectScenario(sc.id));
  list.appendChild(btn);
});

// Auto-load first scenario on page ready
selectScenario("hands");
