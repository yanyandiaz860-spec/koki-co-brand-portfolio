import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type Tone = 'cream' | 'paper' | 'orange' | 'peach' | 'caramel' | 'choc' | 'white';

const EASE = [0.22, 1, 0.36, 1] as const;

export const reveal = {
  initial: { opacity: 0, y: 70, scale: 0.96 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, amount: 0.12 },
} as const;

interface TileProps {
  tone?: Tone;
  className?: string;
  children: ReactNode;
  delay?: number;
  as?: 'div' | 'article' | 'figure' | 'li' | 'aside';
  style?: CSSProperties;
  labelledBy?: string;
  label?: string;
}

/** A bento "compartment" of the cookie box. Fades/rises into view once. */
export function Tile({ tone = 'cream', className = '', children, delay = 0, as = 'div', style, labelledBy, label }: TileProps) {
  const M = motion[as];
  return (
    <M
      className={`tile tile--${tone} ${className}`}
      style={style}
      aria-labelledby={labelledBy}
      aria-label={label}
      {...reveal}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/** Small uppercase label used at the top of tiles. */
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

interface ChapterProps {
  id: string;
  n: string;
  code: string;
  title: ReactNode;
}

/** One-line chapter opener: number · rubric code · title — animates in on scroll. */
export function ChapterHead({ id, n, code, title }: ChapterProps) {
  return (
    <motion.header
      className="chapter-head"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.12 }}
    >
      <motion.span
        className="chapter-head__n"
        aria-hidden="true"
        variants={{ hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0 } }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        {n}
      </motion.span>
      <span className="chapter-head__mask">
        <motion.h2
          id={`${id}-title`}
          className="chapter-head__title"
          variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
          transition={{ duration: 1, ease: EASE }}
        >
          {title}
        </motion.h2>
      </span>
      <motion.span
        className="chapter-head__code"
        variants={{ hidden: { opacity: 0, scale: 0.4 }, show: { opacity: 1, scale: 1 } }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      >
        {code}
      </motion.span>
    </motion.header>
  );
}

/** Wipes an image block open from the centre as it scrolls into view. */
export function RevealMedia({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`reveal-media ${className}`}
      initial={reduced ? false : { clipPath: 'inset(14% 12% 14% 12% round 28px)', opacity: 0.2 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Image that drifts gently inside its frame while the page scrolls. */
export function ParallaxImg({ src, alt, width, height, className = '', strength = 8 }: { src: string; alt: string; width: number; height: number; className?: string; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  return (
    <div ref={ref} className={`px-frame ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={reduced ? undefined : { y, scale: 1 + strength / 50 }}
      />
    </div>
  );
}

/** "⤢" expand affordance on clickable images. */
export function ExpandHint({ text = 'View' }: { text?: string }) {
  return (
    <span className="expand-hint" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
      </svg>
      {text}
    </span>
  );
}
