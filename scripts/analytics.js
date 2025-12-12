const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

const getStoredUtms = () => {
  try {
    const saved = localStorage.getItem('teacherbot_utms');
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

const persistUtms = (utms) => {
  try {
    localStorage.setItem('teacherbot_utms', JSON.stringify(utms));
  } catch (e) {
    // ignore
  }
};

export const collectUtms = () => {
  const params = new URLSearchParams(window.location.search);
  const stored = getStoredUtms();
  let hasNew = false;
  UTM_KEYS.forEach((key) => {
    if (params.get(key)) {
      stored[key] = params.get(key);
      hasNew = true;
    }
  });
  if (hasNew) {
    persistUtms(stored);
  }
  return stored;
};

export const trackEvent = (name, payload = {}) => {
  const utms = getStoredUtms();
  const event = { event: name, timestamp: Date.now(), ...utms, ...payload };
  if (window?.dataLayer) {
    window.dataLayer.push(event);
  }
  if (window?.gtag) {
    window.gtag('event', name, event);
  }
  console.debug('[analytics]', event);
};

const firedSections = new Set();
export const registerSectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = entry.target.getAttribute('id');
          if (section && !firedSections.has(section)) {
            firedSections.add(section);
            trackEvent('section_view', { section });
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  document.querySelectorAll('section[data-track]')?.forEach((section) => observer.observe(section));
};

let depthSent = new Set();
export const registerScrollDepth = () => {
  const thresholds = [25, 50, 75, 90];
  const handler = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.round((scrollTop / docHeight) * 100);
    thresholds.forEach((threshold) => {
      if (progress >= threshold && !depthSent.has(threshold)) {
        depthSent.add(threshold);
        trackEvent('scroll_depth', { depth: threshold });
      }
    });
  };
  window.addEventListener('scroll', handler, { passive: true });
};
