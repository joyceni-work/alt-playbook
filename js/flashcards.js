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
  if (!e.target.closest('button') && Math.abs((dragCurrentX ?? dragStartX ?? 0) - (dragStartX ?? 0)) < 8) {
    flipCard();
  }
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

// ── Drag to navigate ──
const DRAG_THRESHOLD = 80;
let dragStartX = null;
let dragCurrentX = null;
let isDragging = false;

function getDragX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
  dragStartX = getDragX(e);
  dragCurrentX = dragStartX;
  isDragging = true;
  cardEl.classList.add('is-dragging');
}

function onDragMove(e) {
  if (!isDragging) return;
  dragCurrentX = getDragX(e);
  const delta = dragCurrentX - dragStartX;
  const rotate = delta * 0.04;
  // Preserve the flip state while dragging
  const baseTransform = flipped ? 'rotateY(180deg)' : '';
  cardEl.style.transform = `${baseTransform} translateX(${delta}px) rotate(${rotate}deg)`;
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  cardEl.classList.remove('is-dragging');
  cardEl.style.transform = '';

  const delta = dragCurrentX - dragStartX;
  if (delta < -DRAG_THRESHOLD && currentCard < deck.length - 1) {
    currentCard++;
    renderCard();
  } else if (delta > DRAG_THRESHOLD && currentCard > 0) {
    currentCard--;
    renderCard();
  }

  dragStartX = null;
  dragCurrentX = null;
}

scene.addEventListener('mousedown',  onDragStart);
window.addEventListener('mousemove', onDragMove);
window.addEventListener('mouseup',   onDragEnd);

scene.addEventListener('touchstart', onDragStart, { passive: true });
window.addEventListener('touchmove', onDragMove,  { passive: true });
window.addEventListener('touchend',  onDragEnd);

renderCard();
