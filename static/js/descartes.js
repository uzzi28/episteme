// descartes.js — Stages of Doubt interactive module

// ─────────────────────────────────────────────────────────────────────────────
//  BELIEF DATA — the full set that gets filtered at each stage
// ─────────────────────────────────────────────────────────────────────────────

const ALL_BELIEFS = [
  // Sensory
  { id: "b1",  text: "There is a table in front of me",         category: "sensory",   survivesS1: false, survivesS2: false, survivesS3: false },
  { id: "b2",  text: "The sun is shining outside",              category: "sensory",   survivesS1: false, survivesS2: false, survivesS3: false },
  { id: "b3",  text: "I am sitting in a chair",                 category: "sensory",   survivesS1: false, survivesS2: false, survivesS3: false },
  { id: "b4",  text: "Fire is hot",                             category: "sensory",   survivesS1: true,  survivesS2: false, survivesS3: false },
  { id: "b5",  text: "The sky appears blue",                    category: "sensory",   survivesS1: false, survivesS2: false, survivesS3: false },
  // Perceptual
  { id: "b6",  text: "I have two hands",                        category: "perceptual",survivesS1: false, survivesS2: false, survivesS3: false },
  { id: "b7",  text: "I am awake right now",                    category: "perceptual",survivesS1: true,  survivesS2: false, survivesS3: false },
  { id: "b8",  text: "Other people exist",                      category: "perceptual",survivesS1: true,  survivesS2: false, survivesS3: false },
  // Mathematical
  { id: "b9",  text: "2 + 2 = 4",                              category: "math",      survivesS1: true,  survivesS2: true,  survivesS3: false },
  { id: "b10", text: "The angles of a triangle sum to 180°",   category: "math",      survivesS1: true,  survivesS2: true,  survivesS3: false },
  { id: "b11", text: "There are infinitely many prime numbers", category: "math",      survivesS1: true,  survivesS2: true,  survivesS3: false },
  // Logical
  { id: "b12", text: "If P and P→Q, then Q",                   category: "logic",     survivesS1: true,  survivesS2: true,  survivesS3: false },
  { id: "b13", text: "A thing cannot both be and not be",       category: "logic",     survivesS1: true,  survivesS2: true,  survivesS3: false },
  // Cogito
  { id: "b14", text: "I am currently thinking",                 category: "cogito",    survivesS1: true,  survivesS2: true,  survivesS3: true  },
  { id: "b15", text: "I exist (as a thinking thing)",          category: "cogito",    survivesS1: true,  survivesS2: true,  survivesS3: true  },
];

const STAGES = [
  {
    id: "s0",
    number: 0,
    title: "Starting Point",
    subtitle: "The Full Web of Belief",
    emoji: "🌐",
    color: "var(--gold)",
    description: "Descartes begins the <em>Meditations</em> (1641) with a radical project: find one thing that is absolutely certain, beyond any possible doubt. His method is not gradual — he will systematically doubt <em>everything</em> that can be doubted, no matter how seemingly obvious.",
    doubt: null,
    eliminated: [],
    annotation: "Descartes is not a skeptic — he uses doubt as a tool to find certainty, not as an endpoint."
  },
  {
    id: "s1",
    number: 1,
    title: "Stage 1",
    subtitle: "The Deception of the Senses",
    emoji: "👁",
    color: "var(--fail)",
    description: "The senses have deceived us before — mirages, optical illusions, the bent stick in water. If a source of belief has ever deceived us, it is not perfectly reliable. <em>Anything learned through perception could be false.</em>",
    doubt: "The senses sometimes deceive. It is prudent never to trust entirely what has deceived us even once.",
    eliminated: ALL_BELIEFS.filter(b => !b.survivesS1).map(b => b.id),
    annotation: "Most beliefs about the physical world fall here. But Descartes notes that some sensory beliefs seem too obvious to doubt — nearby, clear, distinct perceptions.",
    survivors: "Mathematical truths, logical truths, and basic facts about being awake seem to survive."
  },
  {
    id: "s2",
    number: 2,
    title: "Stage 2",
    subtitle: "The Dream Argument",
    emoji: "💭",
    color: "#a78bfa",
    description: "Even if the senses are sometimes reliable, how do you know you are awake right now? In dreams, everything feels equally real. You have no internal criterion to distinguish dreaming from waking. <em>Any experience could be a dream.</em>",
    doubt: "How often, asleep at night, am I convinced of such familiar events — that I am here, in my dressing-gown, sitting by the fire? Yet I am lying undressed in bed.",
    eliminated: ALL_BELIEFS.filter(b => b.survivesS1 && !b.survivesS2).map(b => b.id),
    annotation: "The dream argument is more powerful than sensory doubt. It undermines all beliefs about the external world — including clear, nearby perceptions.",
    survivors: "Mathematical and logical truths seem to survive — 2+2=4 whether dreaming or awake."
  },
  {
    id: "s3",
    number: 3,
    title: "Stage 3",
    subtitle: "The Evil Demon",
    emoji: "👹",
    color: "#e05c68",
    description: "Even if mathematics could survive dreaming, what if an all-powerful evil demon is deceiving you about logic and arithmetic itself? Perhaps every time you compute 2+2, the demon manipulates your mind to produce '4' when the truth is otherwise. <em>Nothing is safe.</em>",
    doubt: "I will suppose that some malicious demon of the utmost power and cunning has employed all his energies to deceive me.",
    eliminated: ALL_BELIEFS.filter(b => b.survivesS2 && !b.survivesS3).map(b => b.id),
    annotation: "This is Descartes' nuclear option — a purely philosophical device to show that even our most certain-seeming beliefs are not beyond conceivable doubt.",
    survivors: "Only one thing survives."
  },
  {
    id: "s4",
    number: 4,
    title: "The Cogito",
    subtitle: "Cogito Ergo Sum",
    emoji: "✦",
    color: "var(--pass)",
    description: "Even the evil demon cannot deceive a non-existent thinker. The very act of doubting is a form of thinking. And if I am thinking, I must exist — at least as a thinking thing. This one truth is immune to all doubt: <em>I think, therefore I am.</em>",
    doubt: null,
    eliminated: [],
    annotation: "The Cogito is not a deductive syllogism — it's a performative certainty. The act of asserting it verifies it. From this foundation, Descartes rebuilds knowledge.",
    survivors: "Cogito ergo sum — I think, therefore I am."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ
// ─────────────────────────────────────────────────────────────────────────────

const DESCARTES_MCQ = [
  {
    q: "Why does the dream argument eliminate more beliefs than the deception of the senses?",
    options: [
      "Because dreams are more common than illusions",
      "Because it removes the ability to distinguish any experience from a dream — including clear and nearby perceptions that survive sensory doubt",
      "Because Descartes was particularly afraid of sleeping",
      "Because mathematical beliefs are produced by dreams"
    ],
    correct: 1,
    explanation: "The deception of the senses only undermines beliefs formed by unreliable perception — but nearby, clear perceptions seemed safe. The dream argument removes the criterion of clarity itself: in dreams, everything seems clear. Since you have no internal mark that distinguishes waking from dreaming experience, all experience-based beliefs fall — including the ones that survived Stage 1."
  },
  {
    q: "Why does the Cogito survive even the evil demon?",
    options: [
      "Because the demon has limited power over mathematics",
      "Because the act of doubting is itself a form of thinking, and a thinking thing must exist — even a maximally powerful deceiver cannot deceive a non-existent being",
      "Because Descartes proved God exists first",
      "Because 'I exist' is a mathematical truth"
    ],
    correct: 1,
    explanation: "The Cogito has a self-verifying structure. To doubt is to think. To think is to exist (as a thinking thing). Even if the demon is deceiving you about everything else, he cannot deceive you about the fact that you are being deceived — for that requires a thinker being deceived. The demon's deception presupposes your existence. This is why the Cogito is uniquely immune to even the most radical doubt."
  },
  {
    q: "Descartes' method of doubt is a tool, not a conclusion. What does this mean for his epistemology?",
    options: [
      "He is ultimately a skeptic who believes nothing can be known",
      "He uses radical doubt instrumentally — to identify what cannot be doubted — and then rebuilds knowledge from the Cogito as an indubitable foundation",
      "He believes only mathematical knowledge is possible",
      "He thinks sensory beliefs are the most reliable"
    ],
    correct: 1,
    explanation: "Descartes is a foundationalist, not a skeptic. The doubt is methodological — a procedure to find the bedrock. Once the Cogito is established as certain, Descartes proceeds to argue for God's existence (from the idea of perfection) and then, via God's non-deception, rehabilitates clear and distinct perceptions. The Meditations end with more knowledge secured, not less — but on a firmer foundation than mere tradition or sensory habit."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────────────────────

let currentStage = 0;
let mcqIndex     = 0;
let mcqAnswered  = false;

// ─────────────────────────────────────────────────────────────────────────────
//  RENDER BELIEF GRID
// ─────────────────────────────────────────────────────────────────────────────

function getEliminatedUpTo(stageNum) {
  const eliminated = new Set();
  for (let i = 1; i <= stageNum; i++) {
    STAGES[i].eliminated.forEach(id => eliminated.add(id));
  }
  return eliminated;
}

function renderBeliefGrid(stageNum) {
  const eliminated = getEliminatedUpTo(stageNum);
  const el = document.getElementById("beliefGrid");
  if (!el) return;

  const categories = [
    { key: "sensory",    label: "Sensory Beliefs" },
    { key: "perceptual", label: "Perceptual Beliefs" },
    { key: "math",       label: "Mathematical Beliefs" },
    { key: "logic",      label: "Logical Beliefs" },
    { key: "cogito",     label: "The Cogito" },
  ];

  el.innerHTML = categories.map(cat => {
    const beliefs = ALL_BELIEFS.filter(b => b.category === cat.key);
    const cards = beliefs.map(b => {
      const isDead = eliminated.has(b.id);
      const isNew  = stageNum > 0 && STAGES[stageNum].eliminated.includes(b.id);
      return `<div class="belief-chip ${isDead ? 'eliminated' : 'alive'} ${isNew ? 'newly-eliminated' : ''}">
        <span class="bc-dot"></span>
        <span class="bc-text">${b.text}</span>
      </div>`;
    }).join("");
    return `<div class="belief-category">
      <div class="bc-label">${cat.label}</div>
      <div class="bc-chips">${cards}</div>
    </div>`;
  }).join("");
}

// ─────────────────────────────────────────────────────────────────────────────
//  RENDER STAGE
// ─────────────────────────────────────────────────────────────────────────────

function goToStage(n) {
  currentStage = n;
  document.querySelectorAll(".stage-step").forEach((el, i) => {
    el.classList.toggle("active",   i === n);
    el.classList.toggle("visited",  i < n);
  });
  renderStagePanel(n);
  renderBeliefGrid(n);
}

function renderStagePanel(n) {
  const stage = STAGES[n];
  const el    = document.getElementById("stagePanel");
  if (!el) return;

  const eliminated = getEliminatedUpTo(n);
  const surviving  = ALL_BELIEFS.length - eliminated.size;
  const pct        = Math.round((surviving / ALL_BELIEFS.length) * 100);

  el.innerHTML = `
    <div class="stage-panel-inner fade-in">
      <div class="sp-top">
        <span class="sp-emoji" style="color:${stage.color}">${stage.emoji}</span>
        <div>
          <div class="sp-stage-label">${stage.title}</div>
          <div class="sp-title">${stage.subtitle}</div>
        </div>
      </div>

      ${stage.doubt ? `
      <div class="sp-quote">
        <span class="sp-quote-mark">"</span>
        <p>${stage.doubt}</p>
      </div>` : ""}

      <p class="sp-description">${stage.description}</p>

      <div class="sp-annotation">
        <span class="sp-ann-icon">◈</span>
        <span>${stage.annotation}</span>
      </div>

      ${stage.survivors ? `
      <div class="sp-survivors">
        <span class="sp-surv-label">What survives:</span>
        <span class="sp-surv-text">${stage.survivors}</span>
      </div>` : ""}

      <div class="sp-meter">
        <div class="sp-meter-label">
          <span>Beliefs surviving doubt</span>
          <span style="color:${pct > 50 ? 'var(--pass)' : pct > 20 ? 'var(--gold)' : 'var(--fail)'}">${surviving} / ${ALL_BELIEFS.length}</span>
        </div>
        <div class="sp-meter-bar">
          <div class="sp-meter-fill" style="width:${pct}%; background:${stage.color}"></div>
        </div>
      </div>

      <div class="sp-nav">
        <button class="wn-btn secondary" onclick="goToStage(${n - 1})" ${n === 0 ? "disabled" : ""}>← Previous</button>
        ${n < STAGES.length - 1
          ? `<button class="wn-btn primary" onclick="goToStage(${n + 1})">Next Stage →</button>`
          : `<button class="wn-btn complete" onclick="scrollToMCQ()">Test Understanding →</button>`}
      </div>
    </div>`;
}

function scrollToMCQ() {
  document.getElementById("descartesMCQSection")?.scrollIntoView({ behavior: "smooth" });
}

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function renderDescMCQ() {
  const el = document.getElementById("descartesMCQ");
  if (!el) return;
  if (mcqIndex >= DESCARTES_MCQ.length) { showDescMCQComplete(); return; }

  const q   = DESCARTES_MCQ[mcqIndex];
  const num = mcqIndex + 1;
  const tot = DESCARTES_MCQ.length;

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
      <div class="mcq-options">
        ${q.options.map((opt, i) => `
          <button class="mcq-option" data-index="${i}" onclick="answerDescMCQ(${i})">
            <span class="opt-letter">${String.fromCharCode(65+i)}</span>
            <span class="opt-text">${opt}</span>
          </button>`).join("")}
      </div>
      <div id="descMCQFeedback"></div>
    </div>`;
}

function answerDescMCQ(chosen) {
  if (mcqAnswered) return;
  mcqAnswered = true;
  const q = DESCARTES_MCQ[mcqIndex];
  const opts = document.querySelectorAll(".mcq-option");
  const fb   = document.getElementById("descMCQFeedback");
  const ok   = chosen === q.correct;

  opts.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === chosen && !ok) btn.classList.add("wrong");
  });

  fb.innerHTML = `
    <div class="feedback-card ${ok ? 'correct' : 'incorrect'} fade-in">
      <div class="fb-header">
        <span class="fb-icon">${ok ? '✓' : '✗'}</span>
        <span class="fb-label">${ok ? 'Correct' : 'Incorrect'}</span>
      </div>
      <p class="fb-explanation">${q.explanation}</p>
      ${mcqIndex < DESCARTES_MCQ.length - 1
        ? `<button class="fb-next-btn" onclick="nextDescMCQ()">Next Question →</button>`
        : `<button class="fb-next-btn" onclick="showDescMCQComplete()">See Results →</button>`}
    </div>`;
}

function nextDescMCQ() {
  mcqIndex++; mcqAnswered = false; renderDescMCQ();
}

function showDescMCQComplete() {
  const el = document.getElementById("descartesMCQ");
  if (!el) return;
  el.innerHTML = `
    <div class="mcq-header">
      <div class="mcq-title-row">
        <span class="mcq-title">Test Your Understanding</span>
        <span class="mcq-progress">Complete</span>
      </div>
      <div class="mcq-progress-bar"><div class="mcq-progress-fill" style="width:100%"></div></div>
    </div>
    <div class="mcq-complete fade-in">
      <div class="complete-icon">✓</div>
      <div class="complete-title">Module complete</div>
      <p class="complete-desc">You've traced Descartes' full arc of doubt — from sensory deception to the Cogito. Continue to the Contextualism module.</p>
      <a href="/gettier" class="wn-btn primary" style="text-decoration:none">Explore Gettier Cases →</a>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  goToStage(0);
  renderDescMCQ();
});