// gettier.js — Gettier Problem Explorer
// Case walkthrough, solution tester, verdict grid, MCQ engine.

// ─────────────────────────────────────────────────────────────────────────────
//  CASE DATA
// ─────────────────────────────────────────────────────────────────────────────

const CASES = [
  {
    id: "case1",
    title: "Case I — The Job and the Coins",
    tag: "Smith & Jones",
    emoji: "💼",
    steps: [
      {
        label: "Setup",
        heading: "Smith has strong evidence about Jones",
        content: "Smith and Jones have both applied for the same job. Smith has strong evidence — based on what the company president told him directly — that Jones will get the job.",
        annotation: "Smith's belief about Jones is well-justified — it comes from a reliable, authoritative source.",
        pTrue: null, believesP: null
      },
      {
        label: "Evidence",
        heading: "Smith also notices Jones has ten coins",
        content: "Smith has counted the coins in Jones's pocket and knows Jones has exactly ten coins. This is a firm, verified fact.",
        annotation: "Smith has two independent justified beliefs: (1) Jones will get the job, and (2) Jones has ten coins in his pocket.",
        pTrue: null, believesP: null
      },
      {
        label: "Inference",
        heading: "Smith forms a justified belief via valid inference",
        content: "Smith infers: \"The man who will get the job has ten coins in his pocket.\" This follows validly from his two justified beliefs. Smith is fully justified in believing proposition P.",
        annotation: "JTB condition (3) is satisfied — Smith is justified via valid deductive inference from justified premises.",
        pTrue: null, believesP: true
      },
      {
        label: "The Twist",
        heading: "Smith — not Jones — gets the job",
        content: "Unknown to Smith, the company president changed his mind. Smith gets the job. And it turns out Smith himself also has ten coins in his pocket — a fact he had no idea about.",
        annotation: "The false lemma 'Jones will get the job' is broken. But P — 'the man who will get the job has ten coins' — remains true, because Smith (the job-getter) has ten coins.",
        pTrue: true, believesP: true
      },
      {
        label: "The Intuition",
        heading: "Smith has JTB — but not knowledge",
        content: "P is true ✓. Smith believes P ✓. Smith is justified ✓. Yet intuitively, Smith does not know P. He believed it for entirely the wrong reasons — his evidence was about Jones, not himself.",
        annotation: "Gettier's verdict: justified true belief is not sufficient for knowledge. Smith got lucky. The JTB account fails to screen out this kind of epistemic accident.",
        pTrue: true, believesP: true
      }
    ]
  },
  {
    id: "case2",
    title: "Case II — The Car and the Disjunction",
    tag: "Smith & Ford",
    emoji: "🚗",
    steps: [
      {
        label: "Setup",
        heading: "Smith has strong evidence Jones owns a Ford",
        content: "Smith has known Jones for years. Jones has always owned a Ford, always driven a Ford, and has just offered Smith a ride in a Ford. Smith's evidence that Jones owns a Ford is as strong as it could reasonably be.",
        annotation: "A perfectly ordinary, well-justified belief based on repeated observation and current experience.",
        pTrue: null, believesP: null
      },
      {
        label: "Evidence",
        heading: "Smith knows nothing about Brown's location",
        content: "Smith has a friend named Brown, but has no idea where Brown currently is. Brown's location is completely unknown to Smith — it could be anywhere.",
        annotation: "This detail matters: Smith has no evidence whatsoever about Brown's location.",
        pTrue: null, believesP: null
      },
      {
        label: "Inference",
        heading: "Smith infers three disjunctions",
        content: "From 'Jones owns a Ford,' Smith validly infers three disjunctions: (a) Jones owns a Ford OR Brown is in Boston, (b) Jones owns a Ford OR Brown is in Barcelona, (c) Jones owns a Ford OR Brown is in Brest-Litovsk. Each follows validly. Smith is justified in believing all three.",
        annotation: "Disjunction introduction: if you know P, you are justified in believing P∨Q for any Q. Smith's inference is logically impeccable.",
        pTrue: null, believesP: true
      },
      {
        label: "The Twist",
        heading: "Jones does NOT own a Ford — but Brown is in Barcelona",
        content: "Unknown to Smith, Jones is currently driving a rented car. Jones sold his Ford months ago. So the left disjunct 'Jones owns a Ford' is false. But — entirely by coincidence — Brown happens to be in Barcelona right now.",
        annotation: "Proposition (b) — 'Jones owns a Ford OR Brown is in Barcelona' — is true. But it's true for a reason completely disconnected from Smith's evidence.",
        pTrue: true, believesP: true
      },
      {
        label: "The Intuition",
        heading: "Smith has JTB for (b) — but not knowledge",
        content: "P = 'Jones owns a Ford OR Brown is in Barcelona.' P is true ✓. Smith believes P ✓. Smith is justified ✓. Yet Smith does not know P. His evidence supports a false disjunct; the true disjunct is true by pure coincidence.",
        annotation: "The structure is the same as Case I: justified true belief that's accidentally true. The disjunction case is more striking because Smith's evidence has no connection whatsoever to the truth-maker.",
        pTrue: true, believesP: true
      }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  SOLUTION DATA
// ─────────────────────────────────────────────────────────────────────────────

const SOLUTIONS = [
  {
    id: "nfl",
    name: "No False Lemmas",
    author: "Harman (1973)",
    emoji: "🚫",
    claim: "Knowledge requires that the belief not be inferred through any false intermediate step. If S's justification essentially depends on a false lemma, S does not know.",
    case1: {
      verdict: "pass",
      explanation: "Case I is correctly handled. Smith's inference essentially relied on the false lemma 'Jones will get the job.' Remove that step and the inference collapses. NFL correctly diagnoses the failure."
    },
    case2: {
      verdict: "pass",
      explanation: "Case II is also handled. Smith's inference relied on 'Jones owns a Ford,' which is false. NFL correctly blocks this too — the false disjunct was the essential step in the reasoning."
    },
    stressTest: {
      title: "The Nogot Variant",
      emoji: "🎭",
      setup: "In the classroom, Smith observes Nogot — someone Smith knows — driving a Ferrari, showing Ferrari ownership papers, and claiming to own a Ferrari. Smith infers: 'Someone in this room owns a Ferrari.' In fact, Nogot owns no Ferrari (he was lying). But Havit, unbeknownst to Smith, does own a Ferrari and happens to be sitting in the back of the room.",
      verdict: "fail",
      explanation: "P is true (Havit owns a Ferrari). Smith believes P. Smith is justified (via Nogot's evidence). But Smith doesn't know P — he got lucky. Crucially, Smith's belief 'someone in this room owns a Ferrari' involves no false lemma Smith used in the inference — the existential claim was derived directly. NFL fails to block this variant because the path to the existential conclusion doesn't require asserting the false particular claim as a lemma."
    }
  },
  {
    id: "causal",
    name: "Causal Theory",
    author: "Goldman (1967)",
    emoji: "🔗",
    claim: "S knows P iff P's being true is appropriately causally connected to S's belief that P. The fact must be part of the causal history of the belief.",
    case1: {
      verdict: "pass",
      explanation: "Case I is handled. Smith's belief that 'the man who will get the job has ten coins' was caused by facts about Jones, not facts about Smith. The actual truth-maker (Smith having ten coins and getting the job) played no causal role in Smith's belief. No appropriate causal connection — no knowledge."
    },
    case2: {
      verdict: "pass",
      explanation: "Case II is handled. Smith's belief was caused by evidence about Jones's Ford. Brown's actual presence in Barcelona — the truth-maker — had zero causal influence on Smith's belief. The causal chain is broken. No knowledge."
    },
    stressTest: {
      title: "Abraham Lincoln's Skull",
      emoji: "💀",
      setup: "A historian knows, via documentary evidence, that Abraham Lincoln had a skull. The historian has never seen Lincoln's skull, and Lincoln's skull has had no causal interaction with the historian's belief. But the historian's belief is obviously knowledge. Additionally: consider someone who knows a mathematical truth — '2+2=4' has no causal power over anything, yet we clearly know it.",
      verdict: "fail",
      explanation: "The causal theory struggles with knowledge of the past, knowledge of abstract objects, and mathematical/logical knowledge. Lincoln's skull cannot causally influence a present belief — it's buried, decayed, or dispersed. Yet we clearly know things about Lincoln. Mathematical facts are causally inert entirely. The causal theory over-restricts the domain of knowledge, ruling out vast amounts of what we ordinarily take to be knowledge."
    }
  },
  {
    id: "reliabilism",
    name: "Reliabilism",
    author: "Goldman (1979)",
    emoji: "⚙️",
    claim: "A belief constitutes knowledge iff it is produced by a reliable cognitive process — one that tends to produce true beliefs across a wide range of cases. Gettier cases involve unreliable or locally broken processes.",
    case1: {
      verdict: "pass",
      explanation: "Case I is handled. The process that produced Smith's belief — inference from testimony about who will be hired — is not reliably truth-conducive for propositions about coin counts in pockets. The specific process used was not reliable for the specific content of the conclusion."
    },
    case2: {
      verdict: "pass",
      explanation: "Case II is handled. Smith's process — disjunction introduction from an observation about a specific person's car ownership — is not reliable for producing true beliefs about Brown's location. The process that generated the belief had no sensitivity to the truth-maker."
    },
    stressTest: {
      title: "The Generality Problem",
      emoji: "🔬",
      setup: "Mary forms a belief by looking at a red apple in normal conditions. Is this process reliable? It depends on how you describe it: 'visual perception' — very reliable. 'Visual perception of red things under fluorescent lighting at 10pm while tired' — less reliable. 'Visual perception of red things in an art gallery full of trick lighting' — unreliable. The process that produced the belief can be described at many levels of generality, and reliability varies dramatically depending on which description you pick.",
      verdict: "fail",
      explanation: "Reliabilism has no principled way to individuate the 'relevant process type.' Any token belief event can be described under infinitely many type descriptions with different reliability scores. Without a solution to the generality problem, reliabilism cannot give determinate verdicts about particular beliefs. This isn't just a technical problem — it reveals that 'reliability' is not a property of belief-forming events themselves but of descriptions of those events."
    }
  },
  {
    id: "tracking",
    name: "Tracking Theory",
    author: "Nozick (1981)",
    emoji: "🌐",
    claim: "S knows P iff (1) P is true, (2) S believes P, (3) Sensitivity: if P were false, S would not believe P, (4) Adherence: if P were true, S would believe P. Knowledge requires the belief to track the truth across nearby possible worlds.",
    case1: {
      verdict: "pass",
      explanation: "Case I is handled. Sensitivity test: if it were false that 'the man who will get the job has ten coins,' would Smith not believe it? No — Smith would still believe it, since his evidence was about Jones regardless. The nearest not-P world still has Smith believing P. Sensitivity fails → no knowledge."
    },
    case2: {
      verdict: "pass",
      explanation: "Case II is handled. Sensitivity test: if Brown were not in Barcelona (and Jones still had no Ford), Smith would still believe the disjunction — his evidence about Jones's Ford would still lead him to infer it. In the nearest not-P world, the belief persists. Sensitivity fails → no knowledge."
    },
    stressTest: {
      title: "The Closure Problem",
      emoji: "🔒",
      setup: "You know you have hands (via direct perception — sensitive belief). You also know that if you have hands, you are not a brain in a vat. By modus ponens, you can infer: you are not a brain in a vat. But Nozick's own theory says you do NOT know you're not a BIV — that belief fails sensitivity. So Nozick must deny that knowledge is closed under known entailment: you can know P, know P→Q, yet fail to know Q.",
      verdict: "fail",
      explanation: "Nozick bites the bullet and rejects epistemic closure — the principle that if you know P and know P entails Q, you know Q. Most epistemologists find this deeply counterintuitive. It means knowledge cannot be freely 'transmitted' through valid inference. Critics argue this is too high a price. If I know I have hands but don't know I'm not a BIV, how can my hand-knowledge be genuine? Nozick's response is that knowledge is method-relative and not closed under entailment — but this remains one of the most contested claims in post-Gettier epistemology."
    }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ DATA
// ─────────────────────────────────────────────────────────────────────────────

const GETTIER_MCQ = [
  {
    q: "What is the common structure shared by both Gettier cases?",
    options: [
      "The subject forms a belief without any justification",
      "The subject reasons validly from a justified false belief to a proposition that turns out to be true — but for entirely unrelated reasons",
      "The subject's belief is caused by the wrong kind of evidence",
      "The subject knows P but refuses to assert it"
    ],
    correct: 1,
    explanation: "Both cases have the same skeleton: (1) justified false belief F, (2) valid inference from F to P, (3) P is true — but not because of F. In Case I, 'Jones will get the job' is false; 'the job-getter has ten coins' is true because of Smith, not Jones. In Case II, 'Jones owns a Ford' is false; the disjunction is true because of Brown's coincidental location. The truth and the justification are connected through different objects."
  },
  {
    q: "Why does the No False Lemmas solution fail against the Nogot variant?",
    options: [
      "Because Nogot is a fictional character",
      "Because Smith's belief 'someone in this room owns a Ferrari' can be reached without explicitly asserting the false particular 'Nogot owns a Ferrari' as a lemma",
      "Because No False Lemmas only applies to deductive inferences",
      "Because the variant involves perception, not testimony"
    ],
    correct: 1,
    explanation: "NFL targets false intermediate steps in an inference chain. But in the Nogot variant, Smith's conclusion is an existential claim — 'someone owns a Ferrari' — which follows from Nogot's behavior without Smith needing to assert the false 'Nogot owns a Ferrari' as an explicit premise. The existential claim can be seen as derived directly from the perceptual evidence. NFL has no grip on cases where the false particular belief is implicit rather than a stated lemma."
  },
  {
    q: "Nozick rejects epistemic closure to save his tracking theory. What does rejecting closure mean, and why do critics find it problematic?",
    options: [
      "It means knowledge cannot be transferred through testimony — critics say this is too restrictive",
      "It means you can know P and know P entails Q, yet fail to know Q — critics say this severs the link between knowledge and rational inference",
      "It means knowledge is only possible for empirical claims — critics say this excludes mathematics",
      "It means justified belief is always sufficient for knowledge — critics say this is too permissive"
    ],
    correct: 1,
    explanation: "Epistemic closure is the principle: if S knows P, and S knows P→Q, then S knows Q. Nozick must deny this because you can know 'I have hands' (sensitive belief via perception) without knowing 'I'm not a BIV' (insensitive — BIV worlds are nearby enough for sensitivity to fail). Critics argue this is devastating: it means knowledge cannot be 'used' in inference without potentially losing it. If I genuinely know I have hands, shouldn't I be able to conclude I'm not handless-in-a-vat? Nozick says no — knowledge is method-relative, not inference-transmissible."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────────────────────

let activeCaseId   = "case1";
let caseSteps      = { case1: 0, case2: 0 };
let activeSolution = "nfl";
let mcqIndex       = 0;
let mcqAnswered    = false;

// ─────────────────────────────────────────────────────────────────────────────
//  CASE WALKTHROUGH
// ─────────────────────────────────────────────────────────────────────────────

function selectCase(id) {
  activeCaseId = id;
  document.querySelectorAll(".case-tab-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.caseId === id));
  renderCaseWalkthrough();
}

function renderCaseWalkthrough() {
  const c    = CASES.find(c => c.id === activeCaseId);
  const step = caseSteps[activeCaseId];
  const el   = document.getElementById("caseWalkthrough");
  if (!el || !c) return;

  const totalSteps = c.steps.length;
  const s = c.steps[step];
  const pct = ((step + 1) / totalSteps) * 100;

  // Build step pip indicators
  const pips = c.steps.map((st, i) => {
    const cls = i < step ? "done" : i === step ? "active" : "future";
    return `<div class="step-pip ${cls}" title="${st.label}"></div>`;
  }).join("");

  el.innerHTML = `
    <div class="walkthrough-progress">
      <div class="wp-pips">${pips}</div>
      <div class="wp-label">${step + 1} of ${totalSteps} — ${s.label}</div>
    </div>

    <div class="walkthrough-card fade-in">
      <div class="wc-step-label">${s.label}</div>
      <h3 class="wc-heading">${s.heading}</h3>
      <p class="wc-content">${s.content}</p>
      <div class="wc-annotation">
        <span class="wc-ann-icon">◈</span>
        <span>${s.annotation}</span>
      </div>
      ${s.pTrue !== null ? `
      <div class="wc-status-row">
        <div class="wc-status ${s.pTrue ? 'pass' : 'fail'}">
          <span class="wcs-label">P (proposition)</span>
          <span class="wcs-value">${s.pTrue ? 'True ✓' : 'False ✗'}</span>
        </div>
        <div class="wc-status ${s.believesP ? 'pass' : 'fail'}">
          <span class="wcs-label">Smith believes P</span>
          <span class="wcs-value">${s.believesP ? 'Yes ✓' : 'No ✗'}</span>
        </div>
        <div class="wc-status pass">
          <span class="wcs-label">Justified</span>
          <span class="wcs-value">Yes ✓</span>
        </div>
      </div>` : ""}
    </div>

    <div class="walkthrough-nav">
      <button class="wn-btn secondary" onclick="prevStep()" ${step === 0 ? "disabled" : ""}>← Back</button>
      <div class="wn-progress-bar">
        <div class="wn-fill" style="width:${pct}%"></div>
      </div>
      ${step < totalSteps - 1
        ? `<button class="wn-btn primary" onclick="nextStep()">Next →</button>`
        : `<button class="wn-btn complete" onclick="caseComplete()">Complete ✓</button>`}
    </div>`;
}

function nextStep() {
  const c = CASES.find(c => c.id === activeCaseId);
  if (caseSteps[activeCaseId] < c.steps.length - 1) {
    caseSteps[activeCaseId]++;
    renderCaseWalkthrough();
  }
}

function prevStep() {
  if (caseSteps[activeCaseId] > 0) {
    caseSteps[activeCaseId]--;
    renderCaseWalkthrough();
  }
}

function caseComplete() {
  // Mark tab as done and suggest switching
  const tab = document.querySelector(`.case-tab-btn[data-case-id="${activeCaseId}"]`);
  if (tab) tab.classList.add("done");

  const otherId  = activeCaseId === "case1" ? "case2" : "case1";
  const otherTab = document.querySelector(`.case-tab-btn[data-case-id="${otherId}"]`);
  const otherDone = otherTab && otherTab.classList.contains("done");

  const el = document.getElementById("caseWalkthrough");
  if (!el) return;
  const c = CASES.find(c => c.id === activeCaseId);

  el.innerHTML = `
    <div class="case-complete-card fade-in">
      <div class="cc-icon">✓</div>
      <div class="cc-title">${c.title} — Complete</div>
      <p class="cc-desc">You've stepped through the full structure of this Gettier case. Both JTB conditions are satisfied, yet knowledge is absent.</p>
      ${!otherDone
        ? `<button class="wn-btn primary" onclick="selectCase('${otherId}')">Explore ${otherId === 'case1' ? 'Case I' : 'Case II'} →</button>`
        : `<p class="cc-next">Both cases complete — scroll down to test the proposed solutions.</p>`}
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  SOLUTION TESTER
// ─────────────────────────────────────────────────────────────────────────────

function selectSolution(id) {
  activeSolution = id;
  document.querySelectorAll(".sol-tab-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.solId === id));
  renderSolutionPanel();
}

function renderSolutionPanel() {
  const sol = SOLUTIONS.find(s => s.id === activeSolution);
  const el  = document.getElementById("solutionPanel");
  if (!el || !sol) return;

  el.innerHTML = `
    <div class="sol-panel-inner fade-in">

      <div class="sol-claim-card">
        <div class="sol-claim-header">
          <span class="sol-emoji">${sol.emoji}</span>
          <div>
            <div class="sol-name">${sol.name}</div>
            <div class="sol-author">${sol.author}</div>
          </div>
        </div>
        <p class="sol-claim-text">${sol.claim}</p>
      </div>

      <div class="sol-cases-grid">
        ${renderSolCase(sol.case1, "Case I")}
        ${renderSolCase(sol.case2, "Case II")}
      </div>

      <div class="stress-test-card">
        <div class="st-header">
          <span class="st-emoji">${sol.stressTest.emoji}</span>
          <div>
            <div class="st-label">Stress Test</div>
            <div class="st-title">${sol.stressTest.title}</div>
          </div>
          <span class="verdict-badge fail">Fails ✗</span>
        </div>
        <p class="st-setup">${sol.stressTest.setup}</p>
        <div class="st-explanation">
          <span class="st-exp-icon">◈</span>
          <p>${sol.stressTest.explanation}</p>
        </div>
      </div>

    </div>`;

  renderVerdictGrid();
}

function renderSolCase(caseData, label) {
  const isPass = caseData.verdict === "pass";
  return `
    <div class="sol-case-card ${isPass ? 'pass' : 'fail'}">
      <div class="scc-header">
        <span class="scc-label">${label}</span>
        <span class="verdict-badge ${isPass ? 'pass' : 'fail'}">${isPass ? 'Handles ✓' : 'Fails ✗'}</span>
      </div>
      <p class="scc-explanation">${caseData.explanation}</p>
    </div>`;
}

function renderVerdictGrid() {
  const el = document.getElementById("verdictGrid");
  if (!el) return;

  const headers = ["Solution", "Case I", "Case II", "Stress Test"];
  const rows = SOLUTIONS.map(sol => {
    const c1 = sol.case1.verdict === "pass";
    const c2 = sol.case2.verdict === "pass";
    const isActive = sol.id === activeSolution;
    return `<div class="vg-row ${isActive ? 'active' : ''}" onclick="selectSolution('${sol.id}')">
      <div class="vg-cell name">${sol.emoji} ${sol.name}</div>
      <div class="vg-cell">${badge(c1)}</div>
      <div class="vg-cell">${badge(c2)}</div>
      <div class="vg-cell">${badge(false)}</div>
    </div>`;
  }).join("");

  el.innerHTML = `
    <div class="vg-header">
      ${headers.map(h => `<div class="vg-head">${h}</div>`).join("")}
    </div>
    ${rows}`;
}

function badge(pass) {
  return pass
    ? `<span class="verdict-badge pass">✓</span>`
    : `<span class="verdict-badge fail">✗</span>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ ENGINE (shared pattern with Nozick)
// ─────────────────────────────────────────────────────────────────────────────

function renderGettierMCQ() {
  const el = document.getElementById("gettierMCQ");
  if (!el) return;

  if (mcqIndex >= GETTIER_MCQ.length) { showMCQComplete(); return; }

  const q   = GETTIER_MCQ[mcqIndex];
  const num = mcqIndex + 1;
  const tot = GETTIER_MCQ.length;

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
      <div class="mcq-options" id="gMcqOptions">
        ${q.options.map((opt, i) => `
          <button class="mcq-option" data-index="${i}" onclick="answerGettierMCQ(${i})">
            <span class="opt-letter">${String.fromCharCode(65 + i)}</span>
            <span class="opt-text">${opt}</span>
          </button>`).join("")}
      </div>
      <div id="gMcqFeedback"></div>
    </div>`;
}

function answerGettierMCQ(chosen) {
  if (mcqAnswered) return;
  mcqAnswered = true;

  const q         = GETTIER_MCQ[mcqIndex];
  const opts      = document.querySelectorAll(".mcq-option");
  const fb        = document.getElementById("gMcqFeedback");
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
      ${mcqIndex < GETTIER_MCQ.length - 1
        ? `<button class="fb-next-btn" onclick="nextGettierMCQ()">Next Question →</button>`
        : `<button class="fb-next-btn" onclick="showMCQComplete()">See Results →</button>`}
    </div>`;
}

function nextGettierMCQ() {
  mcqIndex++;
  mcqAnswered = false;
  renderGettierMCQ();
}

function showMCQComplete() {
  const el = document.getElementById("gettierMCQ");
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
      <div class="complete-title">Gettier module complete</div>
      <p class="complete-desc">You've worked through both cases and all four proposed solutions. Head to the Tracking Theory module to see Nozick's approach in an interactive possible worlds visualizer.</p>
      <a href="/nozick" class="wn-btn primary" style="text-decoration:none; margin-top:0.5rem;">Explore Tracking Theory →</a>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  renderCaseWalkthrough();
  renderSolutionPanel();
  renderGettierMCQ();
});