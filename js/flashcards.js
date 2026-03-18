// ================================
// Flashcard Logic
// ================================

// Build cards from quiz questions — term = question, definition = explanation
const cards = questions.map(q => ({
  term: q.question,
  definition: q.explanation,
  section: q.section
}));

let deck = [...cards];
let currentCard = 0;
let flipped = false;

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
  document.getElementById('fc-back-text').textContent = card.definition;
  document.getElementById('fc-count').textContent = `${currentCard + 1} / ${deck.length}`;
  document.getElementById('fc-fill').style.width = `${((currentCard + 1) / deck.length) * 100}%`;

  // Reset flip
  flipped = false;
  document.getElementById('fc-card').classList.remove('is-flipped');

  // Prev button state
  document.getElementById('fc-prev').disabled = currentCard === 0;
}

function flipCard() {
  flipped = !flipped;
  document.getElementById('fc-card').classList.toggle('is-flipped', flipped);
}

document.getElementById('fc-flip').addEventListener('click', flipCard);
document.getElementById('fc-scene').addEventListener('click', function (e) {
  if (!e.target.closest('button')) flipCard();
});
document.getElementById('fc-scene').addEventListener('keydown', function (e) {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
});

document.getElementById('fc-next').addEventListener('click', () => {
  if (currentCard < deck.length - 1) { currentCard++; renderCard(); }
});

document.getElementById('fc-prev').addEventListener('click', () => {
  if (currentCard > 0) { currentCard--; renderCard(); }
});

document.getElementById('fc-shuffle').addEventListener('click', () => {
  shuffle(deck);
  currentCard = 0;
  renderCard();
});

// Keyboard nav
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' && currentCard < deck.length - 1) { currentCard++; renderCard(); }
  if (e.key === 'ArrowLeft' && currentCard > 0) { currentCard--; renderCard(); }
});

renderCard();
