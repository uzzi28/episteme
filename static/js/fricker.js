// fricker.js — Epistemic Injustice (Fricker, 2007)

// ─────────────────────────────────────────────────────────────────────────────
//  SCENARIO DATA
// ─────────────────────────────────────────────────────────────────────────────

const SCENARIOS = [
  {
    id: "s1",
    type: "testimonial",
    typeLabel: "Testimonial Injustice",
    title: "The Ignored Warning",
    emoji: "⚠️",
    setup: "A young Black woman reports to her supervisor that a colleague has been harassing her. The supervisor listens but privately thinks: 'She's probably being oversensitive — this is a rough industry.' He dismisses her account without investigation, later telling others 'it was just a misunderstanding.'",
    speaker: { name: "Employee", identity: "Black woman, junior position", credibility: 2 },
    hearer:  { name: "Supervisor", attitude: "Unconscious racial and gender bias" },
    injustice: "testimonial",
    credibilityDeficit: true,
    explanation: "The supervisor deflates her credibility due to identity prejudice — specifically, implicit bias associating her gender and race with 'oversensitivity.' Her testimony is sincere, accurate, and important, but receives less credibility than it deserves. This is a paradigm case of testimonial injustice: a credibility deficit caused by identity-based prejudice.",
    fricker: "Fricker defines testimonial injustice as occurring when a speaker receives a credibility deficit owing to identity prejudice in the hearer. The wrong is epistemic — she is wronged in her capacity as a knower — but also ethical: she is harmed by having her knowledge contribution dismissed.",
    harms: ["Her testimony goes unheeded, allowing harm to continue", "She is wronged as an epistemic agent — her knowledge contribution is dismissed", "Systematic: the same pattern repeats across similar speakers"],
    identityPrejudice: "Gender + racial stereotypes associating the speaker with emotional unreliability"
  },
  {
    id: "s2",
    type: "testimonial",
    typeLabel: "Testimonial Injustice",
    title: "The Disbelieved Patient",
    emoji: "🏥",
    setup: "A middle-aged woman visits her doctor with symptoms of fatigue, pain, and cognitive difficulties. The doctor, noting she is a woman in her 40s, concludes she is likely anxious and suggests therapy. Years later, she is diagnosed with an autoimmune condition. Her descriptions of her symptoms were accurate all along.",
    speaker: { name: "Patient", identity: "Woman, middle-aged", credibility: 2 },
    hearer:  { name: "Physician", attitude: "Bias associating women with hypochondria/anxiety" },
    injustice: "testimonial",
    credibilityDeficit: true,
    explanation: "The physician deflates the patient's testimonial credibility due to gender-based prejudice. Her testimony about her own bodily experience — the domain she is best placed to report on — is dismissed. She receives less credibility than she deserves as an informant about her own symptoms.",
    fricker: "This case illustrates how testimonial injustice is especially harmful when the subject-matter is one the speaker has privileged access to. A patient testifying about her own symptoms is in a uniquely authoritative epistemic position. Dismissing this testimony compounds the injustice.",
    harms: ["Medical harm: delayed diagnosis and treatment", "Epistemic harm: her first-person authority over her own experience is denied", "Trust erosion: she may stop reporting symptoms, compounding harm"],
    identityPrejudice: "Gender stereotypes associating women with emotional over-reporting of symptoms"
  },
  {
    id: "s3",
    type: "hermeneutical",
    typeLabel: "Hermeneutical Injustice",
    title: "No Words for the Experience",
    emoji: "🔇",
    setup: "In the 1970s, a woman is subjected to repeated unwanted sexual pressure at work by her superior. She finds it deeply distressing and wrong, but when she tries to describe her experience to friends or HR, she lacks the vocabulary. 'Sexual harassment' does not yet exist as a concept. She is told she is 'being difficult' or 'can't take a joke.' She begins to doubt her own perception.",
    speaker: { name: "Worker", identity: "Woman in male-dominated workplace", credibility: null },
    hearer:  { name: "Society / HR / peers", attitude: "Gap in collective hermeneutical resources" },
    injustice: "hermeneutical",
    credibilityDeficit: false,
    explanation: "This is hermeneutical injustice — not a credibility deficit, but a gap in the shared interpretive resources needed to make sense of one's own experience. Because 'sexual harassment' had no conceptual currency, the woman could not articulate, understand, or communicate what was happening to her. The gap wasn't personal — it was social.",
    fricker: "Fricker defines hermeneutical injustice as the injustice of having a significant area of one's social experience obscured from collective understanding due to a hermeneutical lacuna — a gap in collective interpretive resources — that is itself the result of structural inequality. The marginalized group is doubly disadvantaged: harmed by the practice AND lacking the tools to understand or report the harm.",
    harms: ["Cannot name or articulate the experience", "Doubts her own perceptions — epistemic self-harm", "No recourse: without a concept, no complaint is possible"],
    identityPrejudice: "Structural: hermeneutical resources were developed by those in power, who had no interest in naming this experience"
  },
  {
    id: "s4",
    type: "hermeneutical",
    typeLabel: "Hermeneutical Injustice",
    title: "The Unnamed Condition",
    emoji: "🧩",
    setup: "A gay man in the 1950s experiences persistent feelings he cannot name or understand within the available interpretive framework. The dominant vocabulary classifies his experience as 'deviance,' 'sin,' or 'illness.' He internalizes these framings, leading to profound distress. The concept of sexual orientation as a neutral identity category does not exist.",
    speaker: { name: "Individual", identity: "Gay man, mid-20th century", credibility: null },
    hearer:  { name: "Society / medicine / church", attitude: "Hermeneutical resources dominated by heteronormative framework" },
    injustice: "hermeneutical",
    credibilityDeficit: false,
    explanation: "A hermeneutical lacuna prevents him from understanding his own experience in accurate, non-harmful terms. The available interpretive resources — shaped by groups with structural power — systematically misrepresent his experience. This is not a failure of individual testimony but a structural failure of collective understanding.",
    fricker: "Fricker emphasizes that hermeneutical injustice is structural and non-agential — there is no individual perpetrator. The injustice inheres in social arrangements that produce hermeneutical gaps in areas of social experience that matter to marginalized groups. The remedy requires conceptual change — developing new vocabulary — not just individual attitudinal change.",
    harms: ["Self-misunderstanding: internalizes harmful framings", "Cannot seek appropriate support — the support doesn't exist", "Epistemic isolation: experiences cannot be shared or validated"],
    identityPrejudice: "Structural: hermeneutical frameworks shaped by dominant groups exclude minority experiences"
  }
];

const FRICKER_MCQ = [
  {
    q: "What is the key difference between testimonial injustice and hermeneutical injustice?",
    options: [
      "Testimonial injustice is worse than hermeneutical injustice",
      "Testimonial injustice involves a credibility deficit caused by identity prejudice in a hearer; hermeneutical injustice involves a gap in collective interpretive resources that prevents understanding or articulating one's experience",
      "Testimonial injustice affects women; hermeneutical injustice affects racial minorities",
      "Testimonial injustice is about speaking; hermeneutical injustice is about listening"
    ],
    correct: 1,
    explanation: "Fricker distinguishes two types: In testimonial injustice, the problem is interpersonal — a specific hearer deflates a speaker's credibility due to identity prejudice. There is a creditor (hearer) and a wronged party (speaker). In hermeneutical injustice, the problem is structural — society lacks the conceptual resources to understand a type of experience, and this gap is itself produced by marginalization. There is no individual perpetrator; the injustice is in the social arrangement itself."
  },
  {
    q: "Fricker says testimonial injustice wrongs the victim in their capacity as a 'knower.' What does this mean?",
    options: [
      "It means the victim literally loses knowledge they had before",
      "It means the wrong is specifically epistemic — the victim is wronged not just practically but as an epistemic agent, someone whose contributions to collective knowledge are unjustly discounted",
      "It means only intellectuals can suffer testimonial injustice",
      "It means the wrong can only occur during academic discussions"
    ],
    correct: 1,
    explanation: "Fricker's innovation is to identify a distinctively epistemic dimension to these wrongs. Being dismissed as a knower — having one's testimony deflated not because of poor evidence but because of who you are — wrongs you in a fundamental way. Humans are essentially knowers and testimony-givers; social life depends on testimonial exchange. To be systematically excluded from this practice by prejudice is to be harmed in a capacity central to personhood."
  },
  {
    q: "Why is hermeneutical injustice described as 'non-agential' — without a perpetrator?",
    options: [
      "Because it happens accidentally and no one is at fault",
      "Because the injustice inheres in structural gaps in collective interpretive resources — produced by historical marginalization — rather than in any individual's prejudiced act",
      "Because it only affects groups, not individuals",
      "Because Fricker believes structural injustice is not real injustice"
    ],
    correct: 1,
    explanation: "In testimonial injustice, there is an agent — the prejudiced hearer — whose act wrongs the speaker. In hermeneutical injustice, no individual act constitutes the injustice. The wrong is that social structures have failed to develop interpretive resources for certain kinds of experience — because those who control concept-generation have had no interest in naming those experiences. The injustice is distributed across a whole social structure, not locatable in any single act or agent. This makes it harder to remedy: attitudinal change in individuals is insufficient; the remedy requires structural conceptual change."
  }
];

// ─────────────────────────────────────────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────────────────────────────────────────

let activeScenario = "s1";
let mcqIndex       = 0;
let mcqAnswered    = false;

// ─────────────────────────────────────────────────────────────────────────────
//  SCENARIO SELECTION
// ─────────────────────────────────────────────────────────────────────────────

function selectScenario(id) {
  activeScenario = id;
  document.querySelectorAll(".scenario-grid-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.scenarioId === id));
  renderScenarioPanel();
}

function renderScenarioPanel() {
  const sc = SCENARIOS.find(s => s.id === activeScenario);
  const el = document.getElementById("scenarioPanel");
  if (!el || !sc) return;

  const isTestimonial = sc.type === "testimonial";

  el.innerHTML = `
    <div class="scenario-panel-inner fade-in">

      <div class="sc-header">
        <span class="sc-emoji">${sc.emoji}</span>
        <div>
          <div class="sc-type-badge ${sc.type}">${sc.typeLabel}</div>
          <div class="sc-title">${sc.title}</div>
        </div>
      </div>

      <div class="sc-setup">
        <div class="sc-setup-label">Case</div>
        <p>${sc.setup}</p>
      </div>

      ${isTestimonial ? `
      <div class="sc-credibility-display">
        <div class="sc-cred-label">Credibility Assessment</div>
        <div class="sc-cred-bar-wrap">
          <span class="sc-cred-min">None</span>
          <div class="sc-cred-bar">
            <div class="sc-cred-fill" style="width:${sc.speaker.credibility * 20}%"></div>
            <div class="sc-cred-marker" style="left:${sc.speaker.credibility * 20}%"></div>
          </div>
          <span class="sc-cred-max">Full</span>
        </div>
        <div class="sc-cred-note">
          Credibility received: <strong style="color:var(--fail)">${['None','Very Low','Low','Moderate','High','Full'][sc.speaker.credibility]}</strong>
          — deserved: <strong style="color:var(--pass)">Moderate to High</strong>
          <span class="sc-deficit-badge">Credibility Deficit ✗</span>
        </div>
      </div>` : `
      <div class="sc-hermeneutical-display">
        <div class="sc-herm-label">Hermeneutical Resources Available</div>
        <div class="sc-herm-gap">
          <span class="sc-herm-icon">⬚</span>
          <span class="sc-herm-text">No adequate concept exists to name or understand this experience</span>
          <span class="sc-deficit-badge">Hermeneutical Gap ✗</span>
        </div>
      </div>`}

      <div class="sc-analysis">
        <div class="sc-analysis-label">Analysis</div>
        <p>${sc.explanation}</p>
      </div>

      <div class="sc-fricker">
        <span class="sc-fricker-icon">◈</span>
        <p>${sc.fricker}</p>
      </div>

      <div class="sc-harms">
        <div class="sc-harms-label">Harms</div>
        <div class="sc-harms-list">
          ${sc.harms.map(h => `<div class="sc-harm-item"><span class="sc-harm-dot"></span>${h}</div>`).join("")}
        </div>
      </div>

      <div class="sc-identity">
        <span class="sc-id-label">Identity Prejudice / Structural Factor:</span>
        <span class="sc-id-text">${sc.identityPrejudice}</span>
      </div>

    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  MCQ ENGINE
// ─────────────────────────────────────────────────────────────────────────────

function renderFrickerMCQ() {
  const el = document.getElementById("frickerMCQ");
  if (!el) return;
  if (mcqIndex >= FRICKER_MCQ.length) { showFrickerComplete(); return; }

  const q = FRICKER_MCQ[mcqIndex];
  const num = mcqIndex + 1, tot = FRICKER_MCQ.length;

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
          <button class="mcq-option" data-index="${i}" onclick="answerFrickerMCQ(${i})">
            <span class="opt-letter">${String.fromCharCode(65+i)}</span>
            <span class="opt-text">${opt}</span>
          </button>`).join("")}
      </div>
      <div id="frickerFeedback"></div>
    </div>`;
}

function answerFrickerMCQ(chosen) {
  if (mcqAnswered) return;
  mcqAnswered = true;
  const q  = FRICKER_MCQ[mcqIndex];
  const ok = chosen === q.correct;
  document.querySelectorAll(".mcq-option").forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) btn.classList.add("correct");
    else if (i === chosen && !ok) btn.classList.add("wrong");
  });
  document.getElementById("frickerFeedback").innerHTML = `
    <div class="feedback-card ${ok ? 'correct' : 'incorrect'} fade-in">
      <div class="fb-header">
        <span class="fb-icon">${ok ? '✓' : '✗'}</span>
        <span class="fb-label">${ok ? 'Correct' : 'Incorrect'}</span>
      </div>
      <p class="fb-explanation">${q.explanation}</p>
      ${mcqIndex < FRICKER_MCQ.length - 1
        ? `<button class="fb-next-btn" onclick="nextFrickerMCQ()">Next Question →</button>`
        : `<button class="fb-next-btn" onclick="showFrickerComplete()">See Results →</button>`}
    </div>`;
}

function nextFrickerMCQ() { mcqIndex++; mcqAnswered = false; renderFrickerMCQ(); }

function showFrickerComplete() {
  const el = document.getElementById("frickerMCQ");
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
      <div class="complete-title">All modules complete</div>
      <p class="complete-desc">You've completed the full Episteme curriculum — from Descartes' foundational doubt to the social dimensions of epistemic injustice.</p>
      <a href="/" class="wn-btn primary" style="text-decoration:none">Back to Home →</a>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {
  selectScenario("s1");
  renderFrickerMCQ();
});