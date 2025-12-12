import { TELEGRAM_BASE, DEMO_IMAGES } from './config.js';
import { collectUtms, trackEvent, registerSectionObserver, registerScrollDepth } from './analytics.js';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const utms = collectUtms();

const buildTelegramLink = (payload) => {
  const link = new URL(`${TELEGRAM_BASE}${payload}`);
  Object.entries(utms).forEach(([key, value]) => link.searchParams.append(key, value));
  return link.toString();
};

const updateCtaLinks = () => {
  document.querySelectorAll('[data-payload]').forEach((el) => {
    const payload = el.getAttribute('data-payload');
    el.setAttribute('href', buildTelegramLink(payload));
  });
};

const toggleHeaderState = () => {
  const header = document.querySelector('header');
  if (window.scrollY > 16) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

const setupReveal = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
};

const setupAccordion = () => {
  document.querySelectorAll('.faq-item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-item button').forEach((other) => {
        if (other !== btn) other.setAttribute('aria-expanded', 'false');
      });
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    });
  });
};

const setupLightbox = () => {
  const lightbox = document.querySelector('#lightbox');
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('.lightbox-caption');
  document.querySelectorAll('.demo-grid img').forEach((img) => {
    img.addEventListener('click', () => {
      image.src = img.src;
      caption.textContent = img.alt;
      lightbox.classList.add('open');
      trackEvent('section_view', { section: 'lightbox' });
    });
  });
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));
};

const setupNav = () => {
  const navToggle = document.querySelector('#nav-toggle');
  const drawer = document.querySelector('#mobile-drawer');
  navToggle?.addEventListener('click', () => drawer.classList.toggle('open'));
  drawer?.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => drawer.classList.remove('open'))
  );
};

const setupButtons = () => {
  document.querySelectorAll('.cta-link').forEach((button) => {
    button.addEventListener('click', () => {
      const source_block = button.dataset.payload;
      trackEvent('tg_click', { source_block });
    });
  });
};

const setupBadges = () => {
  const badges = document.querySelectorAll('.floating-badge');
  if (prefersReducedMotion) return;
  badges.forEach((badge, index) => {
    badge.animate(
      [
        { transform: 'translateY(0px)' },
        { transform: 'translateY(6px)' },
        { transform: 'translateY(0px)' },
      ],
      {
        duration: 4500 + index * 400,
        iterations: Infinity,
        easing: 'ease-in-out',
      }
    );
  });
};

const hydrateDemoGrid = () => {
  const grid = document.querySelector('.demo-grid');
  DEMO_IMAGES.forEach((src, idx) => {
    const card = document.createElement('div');
    card.className = 'demo-card reveal';
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.alt = `Demo ${idx + 1}`;
    card.appendChild(img);
    grid.appendChild(card);
  });
};

const setupReducedMotion = () => {
  if (prefersReducedMotion) {
    document.body.classList.add('reduced-motion');
  }
};

const init = () => {
  setupReducedMotion();
  hydrateDemoGrid();
  updateCtaLinks();
  setupReveal();
  setupAccordion();
  setupLightbox();
  setupNav();
  setupButtons();
  setupBadges();
  registerSectionObserver();
  registerScrollDepth();
  toggleHeaderState();
};

window.addEventListener('scroll', toggleHeaderState, { passive: true });
window.addEventListener('DOMContentLoaded', init);
