import { audience, owners, services, story, supportingPosts } from '../data/site';
import { motion } from 'motion/react';
import { useLightbox } from './Lightbox';
import { ProductMenu } from './ProductMenu';
import { ChapterHead, ExpandHint, ParallaxImg, RevealMedia, Tile, type Tone } from './ui';

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (i: number, x = 0) => ({
  initial: { opacity: 0, y: x ? 0 : 24, x },
  whileInView: { opacity: 1, y: 0, x: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.7, ease: EASE, delay: i * 0.07 },
});

const lineup = supportingPosts[1]; // kOKi.co's own flavor-lineup post
const serviceTones: Tone[] = ['orange', 'paper', 'peach', 'choc', 'caramel'];

export function Concept() {
  const open = useLightbox();

  return (
    <section id="concept" className="chapter band band--cream" aria-labelledby="concept-title">
      <ChapterHead id="concept" n="01" code="PT#1" title={<>Business <em>Concept</em></>} />

      {/* ---------- Story ---------- */}
      <div className="bento bento--story">
        <Tile tone="paper" className="story__history" as="article" labelledBy="history-h">
          <h3 id="history-h" className="tile-h">History</h3>
          {story.history.map((p) => <p key={p} className="lead">{p}</p>)}
          <ol className="steps" aria-label="How kOKi.co grew">
            {story.timeline.map((t, i) => (
              <motion.li key={t.label} {...rise(i)}>
                <span className="steps__dot" aria-hidden="true">{i + 1}</span>
                <span className="steps__label">{t.label}</span>
                <span className="steps__text">{t.text}</span>
              </motion.li>
            ))}
          </ol>
        </Tile>

        <Tile tone="orange" className="story__mission" as="article" labelledBy="mission-h">
          <motion.h3 id="mission-h" className="mv-word" {...rise(0, -90)}>Mission</motion.h3>
          <p className="mv-text">{story.mission}</p>
        </Tile>

        <Tile tone="peach" className="story__vision" as="article" delay={0.08} labelledBy="vision-h">
          <motion.h3 id="vision-h" className="mv-word" {...rise(1, 90)}>Vision</motion.h3>
          <p className="mv-text">{story.vision}</p>
        </Tile>

        <Tile tone="choc" className="story__appeal" as="article" labelledBy="appeal-h">
          <h3 id="appeal-h" className="appeal-title">
            We bring the cookies <em>closer to you.</em>
          </h3>
          <ul className="chips" aria-label="Made for">
            {audience.map((a) => <li key={a} className="chip chip--light">{a}</li>)}
          </ul>
        </Tile>
      </div>

      {/* ---------- Menu ---------- */}
      <div id="menu" className="bento bento--menu">
        <Tile tone="paper" className="menu" labelledBy="menu-h">
          <h3 id="menu-h" className="tile-h">Products</h3>
          <ProductMenu />
        </Tile>

        <Tile tone="peach" className="menu__photo" as="figure" delay={0.08}>
          <RevealMedia>
            <button type="button" className="img-btn" onClick={() => open({ ...lineup, caption: 'kOKi.co flavor lineup post' })} aria-label="View the kOKi.co flavor lineup post full size">
              <img src={lineup.src} alt={lineup.alt} width={lineup.width} height={lineup.height} loading="lazy" decoding="async" />
              <ExpandHint />
            </button>
          </RevealMedia>
        </Tile>
      </div>

      {/* ---------- Services ---------- */}
      <div id="services" className="services-wrap">
        <h3 className="row-head row-head__title">Services</h3>
        <ul className="services">
          {services.map((s, i) => (
            <Tile key={s.title} as="li" tone={serviceTones[i]} className="service" delay={i * 0.06}>
              <RevealMedia className="service__media" delay={0.1 + i * 0.06}>
                <ParallaxImg src={s.image} alt={s.alt} width={400} height={360} strength={6} />
              </RevealMedia>
              <h4 className="service__title">{s.title}</h4>
              <p className="service__text">{s.text}</p>
            </Tile>
          ))}
        </ul>
      </div>

      {/* ---------- Owners ---------- */}
      <div id="owners" className="owners-wrap">
        <h3 className="row-head row-head__title">Owners</h3>
        <ul className="owners">
          {owners.map((o, i) => (
            <Tile key={o.name} as="li" tone={i % 2 ? 'peach' : 'paper'} className="owner" delay={i * 0.07}>
              <div className="owner__photo">
                {o.photo ? (
                  <img src={o.photo} alt={`Portrait of ${o.name}`} loading="lazy" decoding="async" />
                ) : (
                  <div className="owner__ph" role="img" aria-label={`Photo placeholder for ${o.name}`}>
                    <span aria-hidden="true">{o.initials}</span>
                  </div>
                )}
              </div>
              <h4 className="owner__name">{o.name}</h4>
            </Tile>
          ))}
        </ul>
      </div>
    </section>
  );
}
