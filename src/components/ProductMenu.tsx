import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { products, type Product } from '../data/site';

const EASE = [0.22, 1, 0.36, 1] as const;
const CARD_W = 300;
const CARD_H = 370;
const GAP = 26; // distance between the pointer and the card

/** true on devices with a real hover pointer and enough room for the side card */
function useHoverCard() {
  const q = '(hover: hover) and (pointer: fine) and (min-width: 900px)';
  const [ok, setOk] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  useEffect(() => {
    const mq = window.matchMedia(q);
    const on = () => setOk(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return ok;
}

function ProductPhoto({ p, n }: { p: Product; n: number }) {
  return p.image ? (
    <img className="pcard__img" src={p.image} alt={`${p.name} cookie`} loading="lazy" decoding="async" />
  ) : (
    <div className="pcard__ph" role="img" aria-label={`Photo placeholder for ${p.name}`}>
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="5 6" />
        <circle cx="24" cy="26" r="3.5" fill="currentColor" />
        <circle cx="38" cy="36" r="4" fill="currentColor" />
        <circle cx="26" cy="41" r="3" fill="currentColor" />
        <circle cx="40" cy="22" r="2.5" fill="currentColor" />
      </svg>
      <span>Photo coming soon</span>
      <span className="pcard__ph-n" aria-hidden="true">{String(n + 1).padStart(2, '0')}</span>
    </div>
  );
}

function CardBody({ p, n }: { p: Product; n: number }) {
  return (
    <>
      <div className="pcard__photo">
        <ProductPhoto p={p} n={n} />
      </div>
      <div className="pcard__body">
        <p className="pcard__n">No. {String(n + 1).padStart(2, '0')} · Freshly baked</p>
        <h4 className="pcard__name">{p.name}</h4>
        <p className="pcard__detail">{p.detail}</p>
      </div>
    </>
  );
}

export function ProductMenu() {
  const hoverCard = useHoverCard();
  const [active, setActive] = useState<number | null>(null);
  const [modal, setModal] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);

  // card position (relative to the menu), smoothed with a spring so it trails the pointer
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 520, damping: 42, mass: 0.6 });
  const y = useSpring(my, { stiffness: 520, damping: 42, mass: 0.6 });

  /** place the card beside a viewport point; flips left near the right edge, stays on screen */
  const place = (clientX: number, clientY: number, snap: boolean) => {
    const m = menuRef.current?.getBoundingClientRect();
    if (!m) return;
    let vx = clientX + GAP;
    if (vx + CARD_W > window.innerWidth - 12) vx = clientX - GAP - CARD_W;
    const top = 90; // keep clear of the floating nav
    const vy = Math.max(top, Math.min(clientY - CARD_H / 2, window.innerHeight - CARD_H - 12));
    mx.set(vx - m.left);
    my.set(vy - m.top);
    if (snap) {
      x.jump(vx - m.left);
      y.jump(vy - m.top);
    }
  };

  const showAtPointer = (i: number, e: React.MouseEvent) => {
    const wasHidden = active === null;
    setActive(i);
    place(e.clientX, e.clientY, wasHidden);
  };

  /** keyboard focus has no pointer: put the card beside the focused row */
  const showAtRow = (i: number) => {
    const wasHidden = active === null;
    setActive(i);
    const r = rowRefs.current[i]?.getBoundingClientRect();
    if (r) place(r.left + Math.min(r.width * 0.5, 420), r.top + r.height / 2, wasHidden);
  };

  const openModal = (i: number) => {
    returnFocus.current = rowRefs.current[i];
    setModal(i);
  };

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (modal !== null && !d.open) {
      d.showModal();
      document.documentElement.classList.add('no-scroll');
    }
  }, [modal]);

  return (
    <div
      ref={menuRef}
      className="pmenu"
      onMouseLeave={() => setActive(null)}
      onMouseMove={(e) => {
        if (hoverCard && active !== null) place(e.clientX, e.clientY, false);
      }}
    >
      <ol ref={listRef} className="menu__list" aria-label="Cookie flavors">
        {products.map((p, i) => (
          <motion.li
            key={p.name}
            className={`menu__item${active === i ? ' is-active' : ''}`}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.07 }}
          >
            <button
              ref={(el) => { rowRefs.current[i] = el; }}
              type="button"
              className="menu__btn"
              onMouseEnter={(e) => hoverCard && showAtPointer(i, e)}
              onFocus={(e) => hoverCard && !e.currentTarget.matches(':hover') && showAtRow(i)}
              onBlur={() => setActive(null)}
              onClick={() => openModal(i)}
              aria-haspopup="dialog"
              aria-label={`${p.name} — view details`}
            >
              <span className="menu__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="menu__name">{p.name}</span>
              <span className="menu__go" aria-hidden="true">View ↗</span>
            </button>
          </motion.li>
        ))}
      </ol>

      {/* desktop hover card — follows the hovered row */}
      <AnimatePresence>
        {hoverCard && active !== null && (
          <motion.div
            key="hover-card"
            className="pcard pcard--float"
            aria-hidden="true"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active}
                className="pcard__inner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <CardBody p={products[active]} n={active} />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* tap / click modal */}
      <dialog
        ref={dialogRef}
        className="pmodal"
        aria-label={modal !== null ? `${products[modal].name} details` : 'Product details'}
        onClose={() => {
          setModal(null);
          document.documentElement.classList.remove('no-scroll');
          returnFocus.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close();
        }}
      >
        {modal !== null && (
          <div className="pcard pcard--modal">
            <CardBody p={products[modal]} n={modal} />
            <div className="pmodal__bar">
              <button type="button" className="btn btn--ghost" disabled={modal === 0} onClick={() => setModal(modal - 1)}>
                <span aria-hidden="true">←</span> Prev
              </button>
              <button type="button" className="btn btn--choc" onClick={() => dialogRef.current?.close()} autoFocus>
                Close <span aria-hidden="true">✕</span>
              </button>
              <button type="button" className="btn btn--ghost" disabled={modal === products.length - 1} onClick={() => setModal(modal + 1)}>
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
