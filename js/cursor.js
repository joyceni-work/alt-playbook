// ================================
// Shooting star cursor trail
// ================================
(function () {
  const STAR_SIZES = [3, 4, 5, 6];
  let lastX = 0, lastY = 0, ticking = false;

  function spawnStar(x, y) {
    const el = document.createElement('div');
    el.className = 'star-particle';
    const size = STAR_SIZES[Math.floor(Math.random() * STAR_SIZES.length)];
    const dx = (Math.random() - 0.5) * 8;
    const dy = (Math.random() - 0.5) * 8;
    el.style.cssText = `
      left: ${x}px; top: ${y}px;
      width: ${size}px; height: ${size}px;
      background: #ffffff;
      box-shadow: 0 0 ${size * 3}px ${size * 2}px rgba(255,255,255,0.9), 0 0 ${size * 6}px ${size * 3}px rgba(255,255,255,0.4);
    `;
    document.body.appendChild(el);
    el.animate([
      { transform: `translate(-50%, -50%) translate(0,0) scale(1)`, opacity: 1 },
      { transform: `translate(-50%, -50%) translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
    ], { duration: 500 + Math.random() * 200, easing: 'ease-out', fill: 'forwards' })
      .onfinish = () => el.remove();
  }

  document.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > 3 && !ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        spawnStar(e.clientX, e.clientY);
        spawnStar(e.clientX, e.clientY);
        lastX = e.clientX; lastY = e.clientY;
        ticking = false;
      });
    }
  });
})();
