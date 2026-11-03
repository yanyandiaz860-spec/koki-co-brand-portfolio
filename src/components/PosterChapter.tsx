import { posterPalette, posterTypography, promoPoster } from '../data/site';
import { useLightbox } from './Lightbox';
import { PaletteBars } from './Palette';
import { ChapterHead, ExpandHint, RevealMedia, Tile } from './ui';

export function PosterChapter() {
  const open = useLightbox();
  const im = promoPoster.image;
  return (
    <section id="poster" className="chapter band band--peach" aria-labelledby="poster-title">
      <ChapterHead id="poster" n="04" code="CT#3" title={<>Promotional <em>Poster</em></>} />

      <div className="bento bento--poster">
        <Tile tone="choc" className="poster-stage" as="figure">
          <ul className="chips poster-stage__chips" aria-label="Campaign details">
            <li className="chip chip--accent">Archived</li>
            <li className="chip chip--light">{promoPoster.event.date}</li>
            <li className="chip chip--light">{promoPoster.event.venue}</li>
          </ul>
          <RevealMedia className="poster-stage__reveal">
          <button type="button" className="img-btn poster-stage__frame" onClick={() => open({ ...im, caption: 'kOKi.co promotional event poster with its color scheme' })} aria-label="View the promotional poster full size">
            <img src={im.src} alt={im.alt} width={im.width} height={im.height} loading="lazy" decoding="async" />
            <ExpandHint text="Full view" />
          </button>
          </RevealMedia>
        </Tile>

        <Tile tone="paper" className="poster-palette" delay={0.06} labelledBy="poster-pal-h">
          <h3 id="poster-pal-h" className="tile-h">Color Palette</h3>
          <div className="pbars-wrap--compact"><PaletteBars swatches={posterPalette} label="Promotional poster color palette" /></div>
        </Tile>

        <Tile tone="cream" className="poster-type" delay={0.1} labelledBy="poster-type-h">
          <h3 id="poster-type-h" className="tile-h">Typography</h3>
          <ul className="type-list">
            {posterTypography.map((t) => (
              <li key={t}>
                <span className="type-list__name">{t}</span>
              </li>
            ))}
          </ul>
        </Tile>
      </div>
    </section>
  );
}
