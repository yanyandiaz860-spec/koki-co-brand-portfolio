import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { brand, flavors, heroCookie, logos, services } from '../data/site';
import { Tile } from './ui';
import { useIntroDone } from './Preloader';

const EASE = [0.22, 1, 0.36, 1] as const;

function RotatingBadge() {
  return (
    <div className="badge" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="badge__ring">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text>
          <textPath href="#badge-circle" startOffset="0" textLength="486" lengthAdjust="spacing">
            FRESHLY BAKED • ROLLING TO YOU • NUEVA ECIJA •
          </textPath>
        </text>
      </svg>
      <span className="badge__core">
        <img src={logos.secondaryTrim} alt="" width={452} height={346} />
      </span>
    </div>
  );
}

export function Hero() {
  const ready = useIntroDone();
  const media = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: media, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1.18]);

  return (
    <section className="hero band band--choc" aria-labelledby="hero-title">
      <div className="bento bento--hero">
        <Tile tone="cream" className="hero__main">
          <p className="chip chip--outline">
            <span className="chip__dot" aria-hidden="true" /> Nueva Ecija · Est. {brand.founded}
          </p>

          <h1 id="hero-title" className="hero__title">
            <motion.span className="hero__line" initial={{ y: '100%', opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : undefined} transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}>
              It’s okay
            </motion.span>
            <motion.span className="hero__line" initial={{ y: '100%', opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : undefined} transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}>
              not to be
              <motion.span
                className="hero__capsule"
                aria-hidden="true"
                initial={{ width: 0 }}
                animate={ready ? { width: '1.9em' } : undefined}
                transition={{ duration: 1, ease: EASE, delay: 0.6 }}
              >
                <img src={heroCookie.src} alt="" width={heroCookie.width} height={heroCookie.height} />
              </motion.span>
            </motion.span>
            <motion.span className="hero__line hero__line--brand" initial={{ y: '100%', opacity: 0 }} animate={ready ? { y: 0, opacity: 1 } : undefined} transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}>
              kOKi.
              <svg className="hero__swash" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  d="M4 20 C 60 6, 120 26, 180 14 S 270 8, 296 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={ready ? { pathLength: 1 } : undefined}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.9 }}
                />
              </svg>
            </motion.span>
          </h1>

          <div className="hero__foot">
            <div>
              <p className="hero__answer">{brand.taglineAnswer}.</p>
            </div>
            <div className="hero__ctas">
              <a className="btn btn--choc" href="#concept">
                Open the box
                <span className="btn__icon" aria-hidden="true">↓</span>
              </a>
              <a className="btn btn--ghost" href="#menu">See the menu</a>
            </div>
          </div>
        </Tile>

        <Tile tone="caramel" className="hero__media" delay={0.1}>
          <div ref={media} className="hero__media-inner">
            <motion.img
              src={heroCookie.src}
              alt={heroCookie.alt}
              width={heroCookie.width}
              height={heroCookie.height}
              fetchPriority="high"
              style={{ y, scale }}
            />
          </div>
          <RotatingBadge />
        </Tile>

        <a href="#concept" className="stat-link stat--a">
          <Tile tone="orange" className="stat" delay={0.15}>
            <span className="stat__big">2026</span>
            <span className="stat__text">One store, one flavor</span>
            <span className="stat__arrow" aria-hidden="true">↘</span>
          </Tile>
        </a>
        <a href="#menu" className="stat-link stat--b">
          <Tile tone="peach" className="stat" delay={0.2}>
            <span className="stat__big">0{flavors.length}</span>
            <span className="stat__text">Flavors</span>
            <span className="stat__arrow" aria-hidden="true">↘</span>
          </Tile>
        </a>
        <a href="#services" className="stat-link stat--c">
          <Tile tone="paper" className="stat" delay={0.25}>
            <span className="stat__big">0{services.length}</span>
            <span className="stat__text">Services</span>
            <span className="stat__arrow" aria-hidden="true">↘</span>
          </Tile>
        </a>
        <Tile tone="choc" className="stat stat--ticker" delay={0.3}>
          <span className="stat__label">On the move</span>
          <div className="mini-ticker" aria-hidden="true">
            <div className="mini-ticker__track">
              {[0, 1].map((k) => (
                <span key={k}>Schools · Communities · Events · Busy streets · </span>
              ))}
            </div>
          </div>
        </Tile>
      </div>
    </section>
  );
}
