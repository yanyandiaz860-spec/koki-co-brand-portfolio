import { AnimatePresence, motion } from 'motion/react';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { brand, heroCookie, logos } from '../data/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

const IntroCtx = createContext(false);
/** true once the preloader has finished — used to start the hero entrance. */
export const useIntroDone = () => useContext(IntroCtx);

const MIN_MS = 1600; // keep the intro long enough to read, short enough not to annoy
const MAX_MS = 7000; // never trap the user behind a slow network

function loadImage(src: string) {
  return new Promise<void>((res) => {
    const img = new Image();
    img.onload = img.onerror = () => res();
    img.src = src;
  });
}

/** Real progress: fonts + hero image + logos + window load (minimum time is enforced by pacing). */
function useLoadProgress() {
  const [target, setTarget] = useState(0);
  useEffect(() => {
    const tasks: Promise<unknown>[] = [
      document.fonts?.ready ?? Promise.resolve(),
      loadImage(heroCookie.src),
      loadImage(logos.primaryTrim),
      loadImage(logos.secondaryTrim),
      document.readyState === 'complete' ? Promise.resolve() : new Promise((r) => window.addEventListener('load', r, { once: true })),
    ];
    let done = 0;
    let alive = true;
    tasks.forEach((t) => t.then(() => alive && setTarget(++done / tasks.length)));
    const bail = setTimeout(() => alive && setTarget(1), MAX_MS);
    return () => {
      alive = false;
      clearTimeout(bail);
    };
  }, []);
  return target;
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const target = useLoadProgress();
  const [shown, setShown] = useState(0); // eased percentage actually displayed
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const shownRef = useRef(0);
  const startRef = useRef(performance.now());

  // ease the counter toward the real target
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // never build faster than a steady pace over MIN_MS, so the cookie visibly assembles
      const paced = ((performance.now() - startRef.current) / MIN_MS) * 100;
      const goal = Math.min(target * 100, paced);
      const next = shownRef.current + (goal - shownRef.current) * 0.18 + 0.2;
      shownRef.current = Math.min(next, goal, 100);
      setShown(shownRef.current);
      if (shownRef.current < target * 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  useEffect(() => {
    if (shown >= 100 && loading) {
      const t = setTimeout(() => setLoading(false), 250);
      return () => clearTimeout(t);
    }
  }, [shown, loading]);

  // Block scrolling while loading WITHOUT hiding the scrollbar (hiding it shifts the whole layout).
  useEffect(() => {
    if (!loading) return;
    const stop = (e: Event) => e.preventDefault();
    const keys = (e: KeyboardEvent) => {
      if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) e.preventDefault();
    };
    window.addEventListener('wheel', stop, { passive: false });
    window.addEventListener('touchmove', stop, { passive: false });
    window.addEventListener('keydown', keys);
    return () => {
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchmove', stop);
      window.removeEventListener('keydown', keys);
    };
  }, [loading]);

  const pct = Math.round(shown);

  return (
    <IntroCtx.Provider value={done}>
      {children}
      <AnimatePresence onExitComplete={() => setDone(true)}>
        {loading && (
          <motion.div
            key="loader"
            className="loader"
            role="status"
            aria-live="polite"
            aria-label={`Loading ${brand.name}, ${pct} percent`}
            initial={false}
            exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: reduced ? 0.2 : 0.95, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="loader__top">
              <span className="loader__logo">
                <img src={logos.primaryTrim} alt="" width={479} height={196} />
              </span>
            </div>

            <div className="loader__center">
              <p className="loader__tag">
                {brand.tagline.split(' ').map((w, n) => (
                  <span key={n} className="loader__word" style={{ animationDelay: `${120 + n * 90}ms` }}>
                    {w}
                  </span>
                ))}
              </p>
            </div>

            <div className="loader__bottom">
              <span className="loader__count" aria-hidden="true">
                {String(pct).padStart(3, '0')}
                <small>%</small>
              </span>
            </div>
            <span className="loader__bar" aria-hidden="true" style={{ transform: `scaleX(${shown / 100})` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </IntroCtx.Provider>
  );
}
