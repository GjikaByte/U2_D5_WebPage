document.addEventListener('DOMContentLoaded', () => {
  const nav  = document.querySelector('nav');
  const hero = document.querySelector('header');
  if (!nav || !hero) return;

  // place a sentinel a bit above the bottom of the hero
  const sentry = document.createElement('div');
  Object.assign(sentry.style, {
    position: 'absolute',
    left: '0',
    bottom: '56px',
    width: '1px',
    height: '1px'
  });
  hero.appendChild(sentry);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(([e]) => {
      nav.classList.toggle('scrolled', !e.isIntersecting);
    }, { threshold: 0 });
    io.observe(sentry);
  } else {
    // Fallback without IO
    const check = () => {
      const bottom = hero.getBoundingClientRect().bottom;
      nav.classList.toggle('scrolled', bottom <= 56);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
  }
});
