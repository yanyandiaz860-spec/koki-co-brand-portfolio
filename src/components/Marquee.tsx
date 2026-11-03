import { useEffect, useRef, useState, type FocusEvent } from 'react';
import type { Img } from '../data/site';
import { useLightbox } from './Lightbox';
import { useReducedMotion } from '../hooks/useReducedMotion';

const SPEED = 42; // px per second, moving LEFT → RIGHT
const COPIES = 3; // enough copies to cover ultra-wide screens seamlessly

/**
 * Seamless, infinite, left-to-right marquee.
 * - rAF-driven transform (no jumps: offset wraps by exactly one set width)
 * - drag / swipe with pointer events, pause on hover, focus, drag, off-screen
 * - prev/next + pause buttons, keyboard arrows; reduced-motion = no autoplay
 */
export function Marquee({ items }: { items: Img[] }) {
  const reduced = useReducedMotion();
  const open = useLightbox();
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);

  const s = useRef({ offset: 0, setW: 1, hover: false, focus: false, drag: false, onscreen: false, nudge: 0 });
  const dragInfo = useRef({ x: 0, start: 0, moved: 0, id: -1 });
  const [userPaused, setUserPaused] = useState(false);
  const pausedRef = useRef(false);
  pausedRef.current = userPaused || reduced;

  // measure one set width
  useEffect(() => {
    const el = firstSet.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const gap = parseFloat(getComputedStyle(track.current!).columnGap) || 0;
      s.current.setW = el.offsetWidth + gap;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // only animate when visible
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => (s.current.onscreen = e.isIntersecting));
    if (viewport.current) io.observe(viewport.current);
    return () => io.disconnect();
  }, []);

  // animation loop
  useEffect(() => {
    let raf = 0;
    let prev = performance.now();
    let lastX = NaN;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      const st = s.current;
      if (st.nudge !== 0) {
        const step = st.nudge * Math.min(1, dt * 9);
        st.offset += step;
        st.nudge -= step;
        if (Math.abs(st.nudge) < 0.5) st.nudge = 0;
      }
      if (st.onscreen && !pausedRef.current && !st.hover && !st.focus && !st.drag) st.offset += SPEED * dt;
      const w = st.setW;
      st.offset = ((st.offset % w) + w) % w;
      const x = st.offset - w;
      if (track.current && x !== lastX) {
        track.current.style.transform = `translate3d(${x}px,0,0)`;
        lastX = x;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const itemStep = () => {
    const first = firstSet.current?.firstElementChild as HTMLElement | null;
    const gap = track.current ? parseFloat(getComputedStyle(track.current).columnGap) || 0 : 0;
    return (first?.offsetWidth ?? 300) + gap;
  };
  const nudge = (dir: 1 | -1) => {
    s.current.nudge += dir * itemStep();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragInfo.current = { x: e.clientX, start: s.current.offset, moved: 0, id: e.pointerId };
    s.current.drag = true;
    s.current.nudge = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!s.current.drag || e.pointerId !== dragInfo.current.id) return;
    const dx = e.clientX - dragInfo.current.x;
    dragInfo.current.moved = Math.max(dragInfo.current.moved, Math.abs(dx));
    if (dragInfo.current.moved > 4 && !viewport.current!.hasPointerCapture(e.pointerId)) {
      viewport.current!.setPointerCapture(e.pointerId);
      viewport.current!.classList.add('is-dragging');
    }
    s.current.offset = dragInfo.current.start + dx;
  };
  const endDrag = (e: React.PointerEvent) => {
    if (e.pointerId !== dragInfo.current.id) return;
    s.current.drag = false;
    viewport.current?.classList.remove('is-dragging');
  };

  // keep a keyboard-focused item fully in view
  const onFocusItem = (e: FocusEvent<HTMLButtonElement>) => {
    const vp = viewport.current!.getBoundingClientRect();
    const r = e.currentTarget.getBoundingClientRect();
    if (r.left < vp.left + 16) s.current.offset += vp.left + 16 - r.left;
    else if (r.right > vp.right - 16) s.current.offset -= r.right - (vp.right - 16);
  };

  const isPaused = userPaused || reduced;

  return (
    <div
      className="marquee"
      onFocus={() => (s.current.focus = true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) s.current.focus = false;
      }}
    >
      <div className="marquee__controls">
        <div className="marquee__buttons">
          <button type="button" className="icon-btn" onClick={() => nudge(-1)} aria-label="Show previous posts">←</button>
          {!reduced && (
            <button type="button" className="icon-btn icon-btn--wide" onClick={() => setUserPaused((v) => !v)} aria-pressed={userPaused}>
              {isPaused ? '▶ Play' : '❚❚ Pause'}
            </button>
          )}
          <button type="button" className="icon-btn" onClick={() => nudge(1)} aria-label="Show next posts">→</button>
        </div>
      </div>

      <div
        ref={viewport}
        className="marquee__viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Supporting kOKi.co brand posts"
        onPointerEnter={(e) => e.pointerType === 'mouse' && (s.current.hover = true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && (s.current.hover = false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); }
          if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); }
        }}
      >
        <div ref={track} className="marquee__track">
          {Array.from({ length: COPIES }, (_, c) => (
            <div
              key={c}
              ref={c === 0 ? firstSet : undefined}
              className="marquee__set"
              aria-hidden={c > 0 ? true : undefined}
              inert={c > 0 ? true : undefined}
            >
              {items.map((im, i) => (
                <button
                  key={im.src}
                  type="button"
                  className="marquee__item"
                  style={{ aspectRatio: `${im.width} / ${im.height}` }}
                  onFocus={onFocusItem}
                  onClick={(e) => {
                    if (dragInfo.current.moved > 6) { e.preventDefault(); return; }
                    open({ ...im, caption: `Supporting brand post ${i + 1} of ${items.length}` });
                  }}
                  aria-label={`Supporting post ${i + 1} of ${items.length} — view full size`}
                >
                  <img src={im.src} alt={c === 0 ? im.alt : ''} width={im.width} height={im.height} loading="lazy" decoding="async" draggable={false} />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
