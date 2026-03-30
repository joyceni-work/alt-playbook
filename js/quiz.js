// ================================
// Quiz Logic
// ================================

// ── State ──
let currentIndex = 0;
let answered = false;
let scores = {};

// ── Init ──
function init() {
  const isQuizPage = document.getElementById('question-text') !== null;
  const isResultsPage = document.getElementById('score-number') !== null;

  if (isQuizPage) {
    // Set up per-section score tracking
    questions.forEach(q => {
      if (!scores[q.section]) {
        scores[q.section] = { correct: 0, total: 0 };
      }
    });

    renderQuestion();
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
  }

  if (isResultsPage) {
    renderResults();
  }
}

// ── Render current question ──
function renderQuestion() {
  const q = questions[currentIndex];
  answered = false;

  // Constellation progress
  renderConstellation();

  // Retro progress bar
  const retroFill = document.getElementById('retro-progress-fill');
  const retroLabel = document.getElementById('retro-progress-label');
  if (retroFill) {
    const pct = questions.length > 1 ? (currentIndex / (questions.length - 1)) * 100 : 0;
    retroFill.style.width = pct + '%';
  }
  if (retroLabel) {
    retroLabel.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${questions.length}`;
  }

  // Counter + labels
  document.getElementById('question-counter').textContent =
    `${String(currentIndex + 1).padStart(2, '0')} / ${questions.length}`;
  document.getElementById('section-label').textContent = q.section;
  if (document.getElementById('sidebar-section')) {
    document.getElementById('sidebar-section').textContent = q.section;
  }
  if (document.getElementById('sidebar-number')) {
    document.getElementById('sidebar-number').textContent =
      String(currentIndex + 1).padStart(2, '0');
  }
  document.getElementById('question-text').textContent = q.question;

  // Build option buttons
  const container = document.getElementById('options');
  container.innerHTML = '';
  q.options.forEach((option, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + i)}</span>
      <span class="option-text">${option}</span>
    `;
    btn.addEventListener('click', () => selectAnswer(i));
    container.appendChild(btn);
  });

  // Reset explanation and next button
  document.getElementById('explanation').classList.remove('visible');
  const nextBtn = document.getElementById('next-btn');
  nextBtn.classList.remove('visible');
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? 'See Results →' : 'Next →';
}

// ── Handle answer selection ──
function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = questions[currentIndex];
  const optionBtns = document.querySelectorAll('.option-btn');

  // Track score
  scores[q.section].total++;
  if (selectedIndex === q.answer) {
    scores[q.section].correct++;
  }

  const isCorrect = selectedIndex === q.answer;

  // Apply correct / incorrect styles
  optionBtns.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) {
      btn.classList.add('correct');
    } else if (i === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    // Auto-advance after a brief pause so user sees the green state
    setTimeout(nextQuestion, 1000);
  } else {
    // Show playbook excerpt and require user to click Next
    document.getElementById('explanation-text').textContent = q.explanation;
    document.getElementById('explanation').classList.add('visible');
    document.getElementById('next-btn').classList.add('visible');
  }
}

// ── Navigate to next question or results ──
function nextQuestion() {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    localStorage.setItem('alt-scores', JSON.stringify(scores));
    localStorage.setItem('alt-total', questions.length);
    window.location.href = 'results.html';
  }
}

// ── Render results page ──
function renderResults() {
  const scores = JSON.parse(localStorage.getItem('alt-scores'));

  if (!scores) {
    document.getElementById('score-number').textContent = '—';
    document.getElementById('results-tier').textContent = '—';
    document.getElementById('score-message').textContent =
      'No quiz data found. Take the quiz first!';
    return;
  }

  // Total score
  let totalCorrect = 0;
  Object.values(scores).forEach(s => (totalCorrect += s.correct));
  const total = parseInt(localStorage.getItem('alt-total')) || 27;
  const pct = (totalCorrect / total) * 100;

  // Tier
  const tier = pct >= 80 ? 'ALT Champion' : pct >= 55 ? 'ALT Ready' : 'ALT Curious';
  document.getElementById('results-tier').textContent = tier;
  const eyebrow = document.getElementById('results-eyebrow');
  if (eyebrow) eyebrow.textContent = tier === 'ALT Champion' ? "You're an" : "You're";
  document.getElementById('score-number').textContent = totalCorrect;
  document.getElementById('score-message').textContent = getScoreMessage(totalCorrect, total);

  // Section breakdown — find weakest section
  const container = document.getElementById('section-breakdown');
  container.innerHTML = '';
  let weakestSection = null, weakestPct = 101;

  Object.entries(scores).forEach(([section, data]) => {
    const sPct = data.total > 0 ? (data.correct / data.total) * 100 : 0;
    if (sPct < weakestPct) { weakestPct = sPct; weakestSection = section; }
    const row = document.createElement('div');
    row.className = 'section-row';
    row.innerHTML = `
      <span class="section-row-name">${section}</span>
      <div class="section-row-bar">
        <div class="section-row-fill" style="width: 0%" data-target="${sPct}"></div>
      </div>
      <span class="section-row-score">${data.correct}/${data.total}</span>
    `;
    container.appendChild(row);
  });

  // Animate bars in after paint
  requestAnimationFrame(() => {
    document.querySelectorAll('.section-row-fill').forEach(el => {
      el.style.width = el.dataset.target + '%';
    });
  });

  // Constellation
  renderResultsConstellation();

  // Next steps
  const stepsContainer = document.getElementById('next-steps');
  const universalSteps = [
    { icon: '✦', text: 'Add ALT as a skill in Salesforce to be considered for ALT projects.' }
  ];
  const tierSteps = {
    'ALT Curious': [
      { icon: '→', text: 'Read the ALT Playbook from start to finish — it\'s a quick, worthwhile read.' },
      { icon: '→', text: `Focus especially on "${weakestSection}" — that\'s your biggest opportunity area.` },
      { icon: '→', text: 'Shadow an active ALT team in a sprint to see the principles in practice.' }
    ],
    'ALT Ready': [
      { icon: '→', text: `Revisit "${weakestSection}" — a focused re-read of that section will sharpen your score.` },
      { icon: '→', text: 'Pair with a senior ALT practitioner for a working session to deepen your understanding.' },
      { icon: '→', text: 'Propose applying ALT principles on your next project.' }
    ],
    'ALT Champion': [
      { icon: '→', text: 'Mentor a colleague through the ALT Playbook — teaching is the best test of mastery.' },
      { icon: '→', text: 'Champion ALT adoption in your practice area and help build a community of practitioners.' },
      { icon: '→', text: 'Propose an ALT pilot for an upcoming engagement.' }
    ]
  };

  [...universalSteps, ...tierSteps[tier]].forEach(step => {
    const card = document.createElement('div');
    card.className = 'next-step-card';
    card.innerHTML = `
      <span class="next-step-icon">${step.icon}</span>
      <span class="next-step-text">${step.text}</span>
    `;
    stepsContainer.appendChild(card);
  });
}

// ── Score message based on percentage ──
function getScoreMessage(correct, total) {
  const pct = (correct / total) * 100;
  if (pct === 100) return 'Perfect score. You know ALT inside out.';
  if (pct >= 80) return 'Strong result. You have a solid grasp of ALT principles.';
  if (pct >= 60) return 'Good foundation. Worth revisiting a few sections.';
  if (pct >= 40) return 'Getting there. Spend some time with the playbook.';
  return "Time to dig into the playbook. The good news — it's a great read.";
}

// ── Constellation progress ──
const CONSTELLATION_Y = [
  14, 8, 24, 18, 34, 10, 28, 20, 6, 32,
  16, 36, 10, 26, 20, 8, 30, 14, 38, 22,
  10, 34, 18, 6, 28, 16, 22
];

function renderConstellation() {
  const svg = document.getElementById('constellation-svg');
  if (!svg) return;

  const total = questions.length;
  const W = 600, margin = 18;
  const step = (W - margin * 2) / (total - 1);
  const dots = CONSTELLATION_Y.map((y, i) => ({ x: margin + i * step, y }));

  let html = '';

  // Lines between dots
  for (let i = 0; i < total - 1; i++) {
    const lit = i < currentIndex;
    html += `<line x1="${dots[i].x}" y1="${dots[i].y}" x2="${dots[i+1].x}" y2="${dots[i+1].y}"
      stroke="${lit ? 'rgba(10,10,10,0.7)' : 'rgba(10,10,10,0.2)'}"
      stroke-width="${lit ? 1.5 : 0.8}" stroke-linecap="round"/>`;
  }

  // Dots
  for (let i = 0; i < total; i++) {
    const completed = i < currentIndex;
    const current = i === currentIndex;

    if (current) {
      html += `<circle cx="${dots[i].x}" cy="${dots[i].y}" r="7" fill="rgba(10,10,10,0.1)"/>`;
      html += `<circle cx="${dots[i].x}" cy="${dots[i].y}" r="4" fill="rgba(10,10,10,0.85)"/>`;
    } else if (completed) {
      html += `<circle cx="${dots[i].x}" cy="${dots[i].y}" r="2.8" fill="rgba(10,10,10,0.65)"/>`;
    } else {
      html += `<circle cx="${dots[i].x}" cy="${dots[i].y}" r="2" fill="rgba(10,10,10,0.22)"/>`;
    }
  }

  svg.innerHTML = html;
}

// ── Results constellation (all lit, sequential reveal) ──
function renderResultsConstellation() {
  const svg = document.getElementById('results-constellation-svg');
  if (!svg) return;

  const total = questions.length;
  const W = 600, margin = 18;
  const step = (W - margin * 2) / (total - 1);
  const dots = CONSTELLATION_Y.map((y, i) => ({ x: margin + i * step, y }));

  let html = '';

  for (let i = 0; i < total - 1; i++) {
    const delay = (i * 0.055).toFixed(3);
    html += `<line x1="${dots[i].x}" y1="${dots[i].y}" x2="${dots[i+1].x}" y2="${dots[i+1].y}"
      stroke="rgba(255,255,255,0.6)" stroke-width="1.2" stroke-linecap="round"
      style="opacity:0;animation:constReveal 0.35s ease-out ${delay}s forwards"/>`;
  }

  for (let i = 0; i < total; i++) {
    const delay = (0.08 + i * 0.055).toFixed(3);
    const isFirst = i === 0;
    html += `<circle cx="${dots[i].x}" cy="${dots[i].y}" r="${isFirst ? 4 : 2.5}"
      fill="${isFirst ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.75)'}"
      style="opacity:0;animation:constReveal 0.35s ease-out ${delay}s forwards"/>`;
    if (isFirst) {
      html += `<circle cx="${dots[i].x}" cy="${dots[i].y}" r="7"
        fill="rgba(255,255,255,0.15)"
        style="opacity:0;animation:constReveal 0.35s ease-out ${delay}s forwards"/>`;
    }
  }

  svg.innerHTML = html;
}

// ── Start ──
init();
