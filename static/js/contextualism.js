// contextualism.js — Contextualism & the Bank Cases

// ─────────────────────────────────────────────────────────────────────────────
//  BANK CASES DATA
// ─────────────────────────────────────────────────────────────────────────────

const BANK_CASES = [
  {
    id: "low",
    label: "Case A — Low Stakes",
    emoji: "😌",
    stakeLevel: 1,
    scenario: "It is Friday afternoon. You and your partner drive past the bank. You plan to deposit your paycheck but notice a long line. You say: \"I'll come back Saturday morning — I was here two Saturdays ago and it was open.\" Your partner says \"okay.\"",
    context: "There is nothing particularly important riding on the bank being open. If it's closed, you'll just come back Monday.",
    stakes: "Low — minor inconvenience if wrong",
    verdict: "knows",
    verdictLabel: "S knows the bank is open Saturday",
    explanation: "In a low-stakes context, your week-old memory is sufficient. The standard for 'knowing' is low — you have adequate evidence for the purposes at hand. We'd ordinarily say: yes, you know the bank is open.",
    attributorContext: "Ordinary conversational context. No special demands on the knowledge claim."
  },
  {
    id: "high",
    label: "Case B — High Stakes",
    emoji: "😰",
    stakeLevel: 4,
    scenario: "Same Friday afternoon, same drive past the bank. But now: you and your partner have just discovered a serious error in your mortgage payment. If you don't deposit by Saturday, you'll face penalties and risk foreclosure. Your partner says: \"Are you sure? Do you know for certain it's open Saturday?\"",
    context: "Now the stakes are extremely high. Getting this wrong has serious, potentially life-altering consequences.",
    stakes: "High — financial catastrophe if wrong",
    verdict: "does-not-know",
    verdictLabel: "S does not know the bank is open Saturday",
    explanation: "In a high-stakes context, the same week-old memory is no longer sufficient. We'd say: you don't really know — you should call ahead, check the website, confirm. The standard for 'knowing' rises with the stakes. The very same evidence that sufficed before now falls short.",
    attributorContext: "High-stakes conversational context. The knowledge claim is subject to elevated scrutiny."
  }
];

const STAKES_LEVELS = [
  { level: 1, label: "Minimal",  desc: "Minor inconvenience if wrong",         verdict: "knows",          color: "var(--pass)" },
  { level: 2, label: "Moderate", desc: "Some cost, easily recovered",           verdict: "knows",          color: "#7ac97a" },
  { level: 3, label: "Significant", desc: "Real cost, difficult to recover",    verdict: "borderline",     color: "var(--gold)" },
  { level: 4, label: "High",     desc: "Serious consequences if wrong",         verdict: "does-not-know",  color: "#e09a4a" },
  { level: 5, label: "Critical", desc: "Catastrophic, irreversible consequences", verdict: "does-not-know", color: "var(--fail)" },
];

const THEORIES = [
  {
    id: "subject",
    name: "Subject Sensitive Invariantism",
    author: "Stanley / Hawthorne",
    claim: "Whether S knows P depends on the practical stakes facing S — not just the evidence. High stakes raise the epistemic bar for the subject's knowledge state itself.",
    bankResponse: "In Case A, you know (stakes are low, evidence is sufficient). In Case B, you literally don't know — the high stakes mean your epistemic position has changed, not just how we talk about it.",
    objection: "This seems odd: how can the stakes change your epistemic state? Your evidence is identical in both cases. Most find it counterintuitive that winning the lottery would destroy knowledge.",
  },
  {
    id: "context",
    name: "Attributor Contextualism",
    author: "DeRose / Cohen",
    claim: "The truth conditions of 'S knows P' vary with the context of the attributor — the person making the knowledge claim. High-stakes contexts raise the standard, but the subject's epistemic state doesn't change.",
    bankResponse: "In Case A, the attributor's context sets a low standard — 'knows' is true. In Case B, the attributor's context sets a high standard — 'knows' is false. Same evidence, same subject, different truth values for the knowledge attribution.",
    objection: "If the same sentence can be true and false depending on who says it, how can we have stable knowledge? Critics say this makes knowledge claims too relative.",
  },
  {
    id: "invariant",
    name: "Moderate Invariantism",
    author: "Bach / Brown",
    claim: "The standards for knowledge don't shift — 'knows' has stable truth conditions. What changes is pragmatic: in high stakes we require more evidence before asserting 'I know.' But the underlying knowledge relation is fixed.",
    bankResponse: "You either know or you don't — the stakes don't change this. In high-stakes contexts, we become more careful about asserting knowledge, but the underlying fact of the matter remains constant.",
    objection: "This struggles to explain why the verdicts in Cases A and B feel so different. If the standards are fixed, which one is the correct verdict — does the person know or not?",
  }
];

const CONTEXT_MCQ = [
  {
    q: "In Cases A and B, the subject has identical evidence. What changes between them on DeRose's attributor contextualism?",
    options: [
      "The subject's actual epistemic state — high stakes destroy knowledge",
      "The evidence the subject has — high stakes require more evidence",
      "The context of the attributor — high stakes raise the standards the word 'knows' must meet to be true",
      "Nothing — the verdict should be the same in both cases"
    ],
    correct: 2,
    explanation: "On attributor contextualism, 'knows' is an indexical — its truth conditions are fixed by the context of whoever is making the attribution. In Case A, the low-stakes context sets a low standard, and 'she knows' is true. In Case B, the high-stakes context sets a high standard, and the same sentence 'she knows' is false. The subject's evidence and epistemic state are identical; what changes is the semantic value of 'knows' in different contexts."
  },
  {
    q: "How do the Bank Cases challenge skepticism — and what is the contextualist's key move?",
    options: [
      "They show skepticism is self-refuting",
      "They show that skeptical scenarios (BIV etc.) are only relevant in high-stakes philosophical contexts — in ordinary low-stakes contexts, we genuinely know things, and the skeptic just raises the stakes artificially",
      "They prove that knowledge of the external world is impossible",
      "They show that evidence is always sufficient for knowledge"
    ],
    correct: 1,
    explanation: "The contextualist's anti-skeptical move is elegant: the skeptic's argument works by invoking high-standards contexts (philosophical inquiry, considering BIV scenarios), which make 'know' hard to satisfy. But in ordinary life, we operate in low-standards contexts where 'know' is easily satisfied. The skeptic hasn't shown we never know — she's just shifted to a demanding context. This dissolves rather than refutes the skeptical argument."
  },
  {
    q: "What is the main objection to attributor contextualism?",
    options: [
      "It makes knowledge too easy to achieve",
      "It cannot explain how stakes affect evidence",
      "It seems to make knowledge claims unstable — the same sentence 'S knows P' can be simultaneously true and false depending on who utters it, undermining the idea that knowledge is a stable real relation",
      "It requires knowing who the attributor is"
    ],
    correct: 2,
    explanation: "The core worry is semantic instability. If 'S knows P' can be true when uttered in a low-stakes context and false when uttered in a high-stakes context, then knowledge attributions don't track a single underlying fact about the world. Critics (like Bach) argue that knowledge is a real relation between a subject and a proposition — it can't be 'made true' by context. The contextualist must either bite the bullet on this or explain why the instability is acceptable."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────────────────────

let activeCase     = "low";
let stakeLevel     = 1;
let activeTheory   = "subject";
let mcqIndex       = 0;
let mcqAnswered    = false;

// ─────────────────────────────────────────────────────────────────────────────
//  BANK CASE TABS
// ─────────────────────────────────────────────────────────────────────────────

function selectBankCase(id) {
  activeCase = id;
  const bc = BANK_CASES.find(c => c.id === id);
  stakeLevel = bc.stakeLevel;
  document.querySelectorAll(".bank-tab-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.caseId === id));
  renderCaseDisplay();
  updateSlider(stakeLevel);
}

function renderCaseDisplay() {
  const bc  = BANK_CASES.find(c => c.id === activeCase);
  const sl  = STAKES_LEVELS.find(s => s.level === stakeLevel);
  const el  = document.getElementById("caseDisplay");
  if (!el || !bc || !sl) return;

  const isKnows  = sl.verdict === "knows";
  const isBorder = sl.verdict === "borderline";

  el.innerHTML = `
    <div class="case-display-inner fade-in">
      <div class="cd-scenario">
        <div class="cd-scenario-label">Scenario</div>
        <p class="cd-scenario-text">${bc.scenario}</p>
        <div class="cd-context-row">
          <div class="cd-context-item">
            <span class="cdi-label">Stakes</span>
            <span class="cdi-value" style="color:${sl.color}">${sl.label} — ${sl.desc}</span>
          </div>
          <div class="cd-context-item">
            <span class="cdi-label">Attributor context</span>
            <span class="cdi-value">${bc.attributorContext}</span>
          </div>
        </div>
      </div>
      <div class="cd-verdict-card ${isKnows ? 'knows' : isBorder ? 'borderline' : 'not-knows'}">
        <div class="cdv-header">
          <span class="cdv-icon">${isKnows ? '✓' : isBorder ? '~' : '✗'}</span>
          <span class="cdv-label">${isKnows ? 'S knows the bank is open Saturday' : isBorder ? 'Borderline — context-dependent' : 'S does not know the bank is open Saturday'}</span>
        </div>
        <p class="cdv-explanation">${bc.explanation}</p>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  STAKES SLIDER
// ─────────────────────────────────────────────────────────────────────────────

function updateSlider(val) {
  stakeLevel = parseInt(val);
  const sl  = STAKES_LEVELS.find(s => s.level === stakeLevel);
  const inp = document.getElementById("stakesSlider");
  if (inp) inp.value = stakeLevel;

  const sd = document.getElementById("stakeDisplay");
  if (sd) sd.innerHTML = `
    <span class="sd-level" style="color:${sl.color}">${sl.label}</span>
    <span class="sd-desc">${sl.desc}</span>`;

  const vc = document.getElementById("verdictChip");
  if (vc) {
    const isKnows  = sl.verdict === "knows";
    const isBorder = sl.verdict === "borderline";
    vc.className   = `verdict-chip ${sl.verdict}`;
    vc.textContent = isKnows ? "Knows ✓" : isBorder ? "Borderline ~" : "Does Not Know ✗";
  }

  renderCaseDisplay();
}

// ─────────────────────────────────────────────────────────────────────────────
//  THEORY TABS
// ─────────────────────────────────────────────────────────────────────────────

function renderTheoriesGrid() {
  const el = document.getElementById("theoriesGrid");
  if (!el) return;

  el.innerHTML = THEORIES.map(th => `
    <div class="theory-grid-card">
      <div class="tgc-header">
        <div class="tgc-name">${th.name}</div>
        <div class="tgc-author">${th.author}</div>
      </div>
      <div class="tgc-claim">
        <div class="tgc-section-label">Core Claim</div>
        <p>${th.claim}</p>
      </div>
      <div class="tgc-bank">
        <div class="tgc-section-label">Applied to Bank Cases</div>
        <p>${th.bankResponse}</p>
      </div>
      <div class="tgc-objection">
        <span class="tgc-obj-icon">⚠</span>
        <p>${th.objection}</p>
      </div>
    </div>`).join("");
}

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function renderCtxMCQ() {
  const el = document.getElementById("contextMCQ");
  if (!el) return;
  if (mcqIndex >= CONTEXT_MCQ.length) { showCtxComplete(); return; }

  const q = CONTEXT_MCQ[mcqIndex];
  const num = mcqIndex + 1, tot = CONTEXT_MCQ.length;

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
          <button class="mcq-option" data-index="${i}" onclick="answerCtxMCQ(${i})">
            <span class="opt-letter">${String.fromCharCode(65+i)}</span>
            <span class="opt-text">${opt}</span>
          </button>`).join("")}
      </div>
      <div id="ctxFeedback"></div>
    </div>`;
}

function answerCtxMCQ(chosen) {
  if (mcqAnswered) return;
  mcqAnswered = true;
  const q  = CONTEXT_MCQ[mcqIndex];
  const ok = chosen === q.correct;
  document.querySelectorAll(".mcq-option").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === chosen && !ok) btn.classList.add("wrong");
  });
  document.getElementById("ctxFeedback").innerHTML = `
    <div class="feedback-card ${ok ? 'correct' : 'incorrect'} fade-in">
      <div class="fb-header">
        <span class="fb-icon">${ok ? '✓' : '✗'}</span>
        <span class="fb-label">${ok ? 'Correct' : 'Incorrect'}</span>
      </div>
      <p class="fb-explanation">${q.explanation}</p>
      ${mcqIndex < CONTEXT_MCQ.length - 1
        ? `<button class="fb-next-btn" onclick="nextCtxMCQ()">Next Question →</button>`
        : `<button class="fb-next-btn" onclick="showCtxComplete()">See Results →</button>`}
    </div>`;
}

function nextCtxMCQ() { mcqIndex++; mcqAnswered = false; renderCtxMCQ(); }

function showCtxComplete() {
  const el = document.getElementById("contextMCQ");
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
      <p class="complete-desc">You've explored how epistemic standards shift with context. Continue to Epistemic Injustice.</p>
      <a href="/fricker" class="wn-btn primary" style="text-decoration:none">Explore Epistemic Injustice →</a>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  selectBankCase("low");
  renderTheoriesGrid();
  renderCtxMCQ();

  const slider = document.getElementById("stakesSlider");
  if (slider) slider.addEventListener("input", e => updateSlider(e.target.value));
});