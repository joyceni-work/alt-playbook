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
let animating = false;

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

function updateMeta() {
  const card  = deck[currentCard];
  const n     = currentCard + 1;
  const total = deck.length;

  document.getElementById('fc-front-text').textContent = card.term;
  document.getElementById('fc-back-text').textContent  = card.definition;
  countEl.textContent = `${n} / ${total}`;
  countEl.setAttribute('aria-label', `Card ${n} of ${total}`);
  fillEl.style.width = `${(n / total) * 100}%`;
  trackEl.setAttribute('aria-valuenow', n);
  trackEl.setAttribute('aria-valuemax', total);
  scene.setAttribute('aria-label', `Card ${n} of ${total}: ${card.term}. Press Space or Enter to flip.`);
}

function renderCard() {
  flipped = false;
  cardEl.classList.remove('is-flipped');
  flipBtn.setAttribute('aria-pressed', 'false');
  scene.setAttribute('aria-pressed', 'false');
  updateMeta();
}

// ── Animated navigate (card flies off, new one rises from stack) ──
function navigateTo(nextIndex) {
  if (animating) return;
  if (nextIndex < 0 || nextIndex >= deck.length) return;
  animating = true;

  const direction = nextIndex > currentCard ? 'left' : 'right';
  const exitX     = direction === 'left' ? '-140%' : '140%';
  const exitRot   = direction === 'left' ? '-20deg' : '20deg';

  // Fly current card off
  cardEl.style.transition = 'transform 0.28s ease-in, opacity 0.28s ease-in';
  cardEl.style.transform  = `translateX(${exitX}) rotate(${exitRot})`;
  cardEl.style.opacity    = '0';

  setTimeout(() => {
    currentCard = nextIndex;

    // Reset inline styles before rise
    cardEl.style.transition = '';
    cardEl.style.transform  = '';
    cardEl.style.opacity    = '';

    renderCard();

    // Rise from stack
    cardEl.classList.add('fc-card--rise');
    setTimeout(() => {
      cardEl.classList.remove('fc-card--rise');
      animating = false;
    }, 420);
  }, 260);
}

function flipCard() {
  if (animating) return;
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
scene.addEventListener('keydown', function (e) {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
});

nextBtn.addEventListener('click', () => navigateTo(currentCard + 1));
prevBtn.addEventListener('click', () => navigateTo(currentCard - 1));

document.getElementById('fc-shuffle').addEventListener('click', () => {
  shuffle(deck);
  currentCard = 0;
  renderCard();
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') navigateTo(currentCard + 1);
  if (e.key === 'ArrowLeft')  navigateTo(currentCard - 1);
});

// ── Drag to navigate ──
const DRAG_THRESHOLD = 72;
let dragStartX  = null;
let dragCurrentX = null;
let isDragging  = false;
let wasDrag     = false;

function getDragX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
  if (animating) return;
  dragStartX   = getDragX(e);
  dragCurrentX = dragStartX;
  isDragging   = true;
  wasDrag      = false;
  cardEl.classList.add('is-dragging');
}

function onDragMove(e) {
  if (!isDragging) return;
  dragCurrentX = getDragX(e);
  const delta  = dragCurrentX - dragStartX;
  if (Math.abs(delta) > 6) wasDrag = true;
  const rotate = delta * 0.04;
  cardEl.style.transform = `translateX(${delta}px) rotate(${rotate}deg)`;
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  cardEl.classList.remove('is-dragging');

  const delta = dragCurrentX - dragStartX;

  if (wasDrag && delta < -DRAG_THRESHOLD && currentCard < deck.length - 1) {
    // Finish the throw left, then bring next
    cardEl.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
    cardEl.style.transform  = `translateX(-140%) rotate(-22deg)`;
    cardEl.style.opacity    = '0';
    animating = true;
    setTimeout(() => {
      cardEl.style.transition = '';
      cardEl.style.transform  = '';
      cardEl.style.opacity    = '';
      currentCard++;
      renderCard();
      cardEl.classList.add('fc-card--rise');
      setTimeout(() => { cardEl.classList.remove('fc-card--rise'); animating = false; }, 420);
    }, 200);

  } else if (wasDrag && delta > DRAG_THRESHOLD && currentCard > 0) {
    cardEl.style.transition = 'transform 0.22s ease-out, opacity 0.22s ease-out';
    cardEl.style.transform  = `translateX(140%) rotate(22deg)`;
    cardEl.style.opacity    = '0';
    animating = true;
    setTimeout(() => {
      cardEl.style.transition = '';
      cardEl.style.transform  = '';
      cardEl.style.opacity    = '';
      currentCard--;
      renderCard();
      cardEl.classList.add('fc-card--rise');
      setTimeout(() => { cardEl.classList.remove('fc-card--rise'); animating = false; }, 420);
    }, 200);

  } else if (wasDrag) {
    // Snap back after partial drag — spring feel
    cardEl.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    cardEl.style.transform  = '';
    setTimeout(() => { cardEl.style.transition = ''; }, 320);
  } else {
    // Pure tap/click — clear any inline styles so the CSS flip transition runs at full 2s
    cardEl.style.transition = '';
    cardEl.style.transform  = '';
  }

  dragStartX   = null;
  dragCurrentX = null;
}

scene.addEventListener('click', function (e) {
  if (!e.target.closest('button') && !wasDrag) flipCard();
});

scene.addEventListener('mousedown',  onDragStart);
window.addEventListener('mousemove', onDragMove);
window.addEventListener('mouseup',   onDragEnd);

scene.addEventListener('touchstart', onDragStart, { passive: true });
window.addEventListener('touchmove', onDragMove,  { passive: true });
window.addEventListener('touchend',  onDragEnd);

renderCard();
