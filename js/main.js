// ── Navigation scroll ──────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial check
}

// ── Active nav link ────────────────────────────────────
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.href === location.href) a.classList.add('active');
});

// ── Hamburger / mobile menu ────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMobile = document.getElementById('navMobile');
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    navMobile.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  navMobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ── Parallax hero ──────────────────────────────────────
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `translateY(${window.scrollY * 0.38}px)`;
  }, { passive: true });
}

// ── Fade-up on scroll ──────────────────────────────────
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });
  fadeEls.forEach(el => obs.observe(el));
}

// ── Contact form → mailto fallback ─────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]')?.value    || '';
    const company = form.querySelector('[name="company"]')?.value || '';
    const email   = form.querySelector('[name="email"]')?.value   || '';
    const subject = form.querySelector('[name="subject"]')?.value || 'お問い合わせ';
    const message = form.querySelector('[name="message"]')?.value || '';
    const body = `お名前：${name}\n会社・団体名：${company}\nメールアドレス：${email}\n\n${message}`;
    window.location.href =
      `mailto:k.shirai@setouchi-miraso.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;
  });
}
