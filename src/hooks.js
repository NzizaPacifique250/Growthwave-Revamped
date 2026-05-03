import { useEffect, useRef, useState } from 'react';

export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    el.querySelectorAll('.reveal').forEach((node) => obs.observe(node));
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now) => {
              const t = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(target * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return [ref, display];
}

export function useScrollSolid(scrollY = 24) {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > scrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollY]);
  return solid;
}
