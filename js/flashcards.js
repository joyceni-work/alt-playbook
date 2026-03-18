// ================================
// Flashcard Logic
// ================================

const cards = questions.map(q => ({
  term: q.question,
  definition: q.explanation,
  section: q.section
}));

let deck = [...cards];
let currentCard = 0;
let flipped = false;

const scene    = document.getElementById('fc-scene');
const cardEl   = document.getElementById('fc-card');
const flipBtn  = document.getElementById('fc-flip');
const prevBtn  = document.getElementById('fc-prev');
const nextBtn  = document.getElementById('fc-next');
const countEl  = document.getElementById('fc-count');
const fillEl   = document.getElementById('fc-fill');
const trackEl  = fillEl.parentElement;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderCard() {
  const card = deck[currentCard];

  document.getElementById('fc-front-text').textContent = card.term;
  document.getElementById('fc-back-text').textContent  = card.definition;

  const n = currentCard + 1;
  const total = deck.length;

  countEl.textContent = `${n} / ${total}`;
  countEl.setAttribute('aria-label', `Card ${n} of ${total}`);
  fillEl.style.width = `${(n / total) * 100}%`;
  trackEl.setAttribute('aria-valuenow', n);
  trackEl.setAttribute('aria-valuemax', total);

  // Reset flip
  flipped = false;
  cardEl.classList.remove('is-flipped');
  flipBtn.setAttribute('aria-pressed', 'false');
  scene.setAttribute('aria-pressed', 'false');
  scene.setAttribute('aria-label', `Card ${n} of ${total}: ${card.term}. Press Space or Enter to flip.`);
}

function flipCard() {
  flipped = !flipped;
  cardEl.classList.toggle('is-flipped', flipped);
  flipBtn.setAttribute('aria-pressed', String(flipped));
  scene.setAttribute('aria-pressed', String(flipped));

  const card = deck[currentCard];
  scene.setAttribute('aria-label', flipped
    ? `Card flipped. Definition: ${card.definition}. Press Space to flip back.`
    : `Card ${currentCard + 1} of ${deck.length}: ${card.term}. Press Space to flip.`
  );
}

flipBtn.addEventListener('click', flipCard);
scene.addEventListener('click', function (e) {
  if (!e.target.closest('button')) flipCard();
});
scene.addEventListener('keydown', function (e) {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
});

nextBtn.addEventListener('click', () => {
  if (currentCard < deck.length - 1) { currentCard++; renderCard(); }
});

prevBtn.addEventListener('click', () => {
  if (currentCard > 0) { currentCard--; renderCard(); }
});

document.getElementById('fc-shuffle').addEventListener('click', () => {
  shuffle(deck);
  currentCard = 0;
  renderCard();
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' && currentCard < deck.length - 1) { currentCard++; renderCard(); }
  if (e.key === 'ArrowLeft'  && currentCard > 0)               { currentCard--; renderCard(); }
});

renderCard();
