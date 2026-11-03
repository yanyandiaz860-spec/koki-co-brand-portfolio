import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState, type KeyboardEvent } from 'react';
import { logoAnatomy, logoStages, logoTypography, logos, palette, siteTypography } from '../data/site';
import { useLightbox } from './Lightbox';
import { PaletteBars } from './Palette';
import { ChapterHead, ExpandHint, Tile } from './ui';

const EASE = [0.22, 1, 0.36, 1] as const;

function PrimaryLogo() {
  const [active, setActive] = useState<string>('cookie');
  const open = useLightbox();
  const current = logoAnatomy.find((a) => a.id === active)!;

  return (
    <Tile tone="white" className="logo-primary" as="figure">
      <div className="logo-primary__top">
        <span className="tag">Primary logo</span>
        <button type="button" className="link-btn" onClick={() => open({ ...logos.primary, caption: 'kOKi.co primary logo' })}>
          Full view ⤢
        </button>
      </div>
      <div className="anatomy">
        <img src={logos.primary.src} alt={logos.primary.alt} width={logos.primary.width} height={logos.primary.height} loading="lazy" />
        {logoAnatomy.map((a, i) => (
          <button
            key={a.id}
            type="button"
            className={`hotspot${active === a.id ? ' is-active' : ''}`}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            onClick={() => setActive(a.id)}
            aria-pressed={active === a.id}
            aria-label={`Logo anatomy ${i + 1}: ${a.label}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <figcaption className="anatomy__legend">
        <ul className="anatomy__tabs" aria-label="Logo anatomy">
          {logoAnatomy.map((a, i) => (
            <li key={a.id}>
              <button type="button" aria-pressed={active === a.id} onClick={() => setActive(a.id)}>
                <span>{i + 1}</span> {a.label}
              </button>
            </li>
          ))}
        </ul>
        <p className="anatomy__text" aria-live="polite">{current.text}</p>
      </figcaption>
    </Tile>
  );
}

function Process() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const open = useLightbox();
  const last = logoStages.length - 1;
  const stage = logoStages[i];

  const go = (n: number, focus = false) => {
    const next = Math.max(0, Math.min(last, n));
    setI(next);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: last };
    if (e.key in map) {
      e.preventDefault();
      go(map[e.key], true);
    }
  };

  return (
    <Tile tone="cream" className="process" labelledBy="process-h">
      <div className="process__head">
        <h3 id="process-h" className="tile-h tile-h--xl">Logo Development</h3>
        <p className="process__count" aria-hidden="true">
          <span>{stage.step}</span>/0{logoStages.length}
        </p>
      </div>

      <div className="ptabs" role="tablist" aria-label="Logo development stages" onKeyDown={onKey}>
        {logoStages.map((s, n) => (
          <button
            key={s.step}
            ref={(el) => { tabs.current[n] = el; }}
            role="tab"
            id={`ptab-${n}`}
            aria-selected={i === n}
            aria-controls="ppanel"
            tabIndex={i === n ? 0 : -1}
            className={`ptab${i === n ? ' is-active' : ''}${n < i ? ' is-done' : ''}`}
            onClick={() => go(n)}
          >
            {i === n && <motion.span layoutId="ptab-bg" className="ptab__bg" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />}
            <span className="ptab__n">{s.step}</span>
            <span className="ptab__t">{s.title}</span>
          </button>
        ))}
      </div>

      <div id="ppanel" role="tabpanel" aria-labelledby={`ptab-${i}`} className="ppanel">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            className="ppanel__inner"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className={`ppanel__media ppanel__media--${stage.images.length}`}>
              {stage.images.map((im) => (
                <figure key={im.src} className={`pfig${im.authentic ? ' pfig--authentic' : ''}`}>
                  <button
                    type="button"
                    className="img-btn"
                    onClick={() => open({ ...im, caption: `Step ${stage.step} · ${im.label}` })}
                    aria-label={`View full screen: ${im.alt}`}
                  >
                    <img src={im.src} alt={im.alt} width={im.width} height={im.height} loading="lazy" decoding="async" />
                    <ExpandHint text="Full view" />
                  </button>
                  <figcaption className={`plabel${im.authentic ? ' plabel--authentic' : ''}`}>
                    {im.authentic ? '✎ ' : ''}{im.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="ppanel__body">
              <h4 className="ppanel__title">{stage.title}</h4>
              <p className="ppanel__text">{stage.summary}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="process__nav">
        <button type="button" className="btn btn--ghost" onClick={() => go(i - 1)} disabled={i === 0}>
          <span aria-hidden="true">←</span> Previous
        </button>
        <div className="process__bar" aria-hidden="true">
          <motion.span animate={{ width: `${((i + 1) / logoStages.length) * 100}%` }} transition={{ duration: 0.6, ease: EASE }} />
        </div>
        <button type="button" className="btn btn--choc" onClick={() => go(i + 1)} disabled={i === last}>
          Next <span aria-hidden="true">→</span>
        </button>
      </div>
      <p className="process__note">
        Only the <strong>hand sketch</strong> is original; concept panels are illustrative reconstructions.
      </p>
    </Tile>
  );
}

export function LogoChapter() {
  const open = useLightbox();
  return (
    <section id="logo" className="chapter band band--orange" aria-labelledby="logo-title">
      <ChapterHead
        id="logo"
        n="02"
        code="CT#1"
        title={<>Logo <em>Design</em></>}
      />

      <div className="bento bento--logo">
        <PrimaryLogo />

        <Tile tone="cream" className="logo-secondary" as="figure" delay={0.08}>
          <div className="logo-primary__top">
            <span className="tag">Secondary logo</span>
            <button type="button" className="link-btn" onClick={() => open({ ...logos.secondary, caption: 'kOKi.co secondary logo' })}>
              Full view ⤢
            </button>
          </div>
          <img src={logos.secondary.src} alt={logos.secondary.alt} width={logos.secondary.width} height={logos.secondary.height} loading="lazy" />
        </Tile>

        <Tile tone="paper" className="logo-palette" labelledBy="palette-h">
          <h3 id="palette-h" className="tile-h">Color Palette</h3>
          <PaletteBars swatches={palette} label="kOKi.co brand palette" />
        </Tile>

        <Tile tone="choc" className="logo-type" labelledBy="type-h" delay={0.08}>
          <h3 id="type-h" className="tile-h">Typography</h3>
          <ul className="specimens">
            {siteTypography.map((t, n) => (
              <li key={t.family} className="specimen">
                <span className={`specimen__aa specimen__aa--${n}`} style={{ fontFamily: t.css }} aria-hidden="true">Aa</span>
                <span>
                  <span className="specimen__name">{t.family}</span>
                  <span className="specimen__use">{t.use}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="logo-type__lettering">
            <span>Logo</span> {logoTypography.join(' · ')}
          </p>
        </Tile>
      </div>

      <div className="bento bento--single">
        <Process />
      </div>
    </section>
  );
}
