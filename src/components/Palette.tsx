import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import type { Swatch } from '../data/site';

export function inkOn(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55 ? '#481C10' : '#FFF4E6';
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const t = useRef(0);
  useEffect(() => () => window.clearTimeout(t.current), []);
  const copy = async (hex: string) => {
    const ok = await copyText(hex);
    setCopied(ok ? hex : null);
    window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setCopied(null), 1600);
  };
  return { copied, copy };
}

/** Big paint-chip bars — hover/focus expands a bar; click copies the HEX. */
export function PaletteBars({ swatches, label }: { swatches: Swatch[]; label: string }) {
  const { copied, copy } = useCopy();
  return (
    <>
      <ul className="pbars" aria-label={label}>
        {swatches.map((s, i) => (
          <motion.li
            key={s.hex}
            className="pbars__item"
            style={{ ['--sw' as string]: s.hex, ['--ink' as string]: inkOn(s.hex), originY: 1 }}
            initial={{ opacity: 0, scaleY: 0.3, y: 30 }}
            whileInView={{ opacity: 1, scaleY: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <button type="button" className="pbars__btn" onClick={() => copy(s.hex)} aria-label={`${s.name}, ${s.hex}. Copy HEX code`}>
              <span className="pbars__hex">{s.hex}</span>
              <span className="pbars__name">{s.name}</span>
              <span className="pbars__copy" aria-hidden="true">{copied === s.hex ? 'Copied ✓' : 'Copy'}</span>
            </button>
          </motion.li>
        ))}
      </ul>
      <p className="sr-only" role="status" aria-live="polite">{copied ? `${copied} copied to clipboard` : ''}</p>
    </>
  );
}

/** Compact round chips for the post / poster palettes. */
export function PaletteChips({ swatches, label, tone = 'dark' }: { swatches: Swatch[]; label: string; tone?: 'dark' | 'light' }) {
  const { copied, copy } = useCopy();
  return (
    <>
      <ul className={`pchips pchips--${tone}`} aria-label={label}>
        {swatches.map((s) => (
          <li key={s.hex}>
            <button type="button" className="pchip" onClick={() => copy(s.hex)} aria-label={`${s.name}, ${s.hex}. Copy HEX code`}>
              <span className="pchip__dot" style={{ background: s.hex, color: inkOn(s.hex) }} aria-hidden="true">
                {copied === s.hex ? '✓' : ''}
              </span>
              <span className="pchip__hex">{s.hex}</span>
              <span className="pchip__name">{s.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="sr-only" role="status" aria-live="polite">{copied ? `${copied} copied to clipboard` : ''}</p>
    </>
  );
}
