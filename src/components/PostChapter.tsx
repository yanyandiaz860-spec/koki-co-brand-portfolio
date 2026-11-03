import { useState } from 'react';
import { firstPost, firstPostPalette, firstPostTypography, logos, supportingPosts } from '../data/site';
import { useLightbox } from './Lightbox';
import { Marquee } from './Marquee';
import { PaletteBars } from './Palette';
import { ChapterHead, ExpandHint, RevealMedia, Tile } from './ui';

export function PostChapter() {
  const [expanded, setExpanded] = useState(false);
  const open = useLightbox();
  const im = firstPost.image;

  return (
    <section id="first-post" className="chapter band band--choc" aria-labelledby="first-post-title">
      <ChapterHead id="first-post" n="03" code="CT#2" title={<>First Brand <em>Post</em></>} />

      <div className="bento bento--post">
        <Tile tone="paper" className="feedcard" as="article" label="kOKi.co first ever brand post with its original caption">
          <header className="feedcard__head">
            <span className="feedcard__avatar"><img src={logos.secondaryTrim} alt="" width={452} height={346} /></span>
            <span className="feedcard__who">
              <strong>kOKi.co</strong>
              <span>Original caption</span>
            </span>
          </header>

          <div id="caption" className={`feedcard__caption${expanded ? ' is-open' : ''}`}>
            <p>{firstPost.caption}</p>
          </div>
          <button type="button" className="feedcard__more" aria-expanded={expanded} aria-controls="caption" onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'See less' : 'See more'}
          </button>

          <RevealMedia>
          <button type="button" className="img-btn feedcard__img" onClick={() => open({ ...im, caption: 'kOKi.co — first ever brand post' })} aria-label="View the first ever brand post full size">
            <img src={im.src} alt={im.alt} width={im.width} height={im.height} loading="lazy" decoding="async" />
            <ExpandHint text="Full view" />
          </button>
          </RevealMedia>
        </Tile>

        <Tile tone="cream" className="post-palette" delay={0.06} labelledBy="pp-h">
          <h3 id="pp-h" className="tile-h">Color Palette</h3>
          <div className="pbars-wrap--compact"><PaletteBars swatches={firstPostPalette} label="First brand post color palette" /></div>
        </Tile>

        <Tile tone="peach" className="post-type" delay={0.1} labelledBy="pt-h">
          <h3 id="pt-h" className="tile-h">Typography</h3>
          <ul className="type-list">
            {firstPostTypography.map((t) => (
              <li key={t}>
                <span className="type-list__name">{t}</span>
              </li>
            ))}
          </ul>
        </Tile>
      </div>

      <div className="feed">
        <h3 className="row-head row-head__title">Supporting Posts</h3>
        <Marquee items={supportingPosts} />
      </div>
    </section>
  );
}
