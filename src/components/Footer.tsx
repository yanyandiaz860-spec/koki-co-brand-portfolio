import { brand, nav, owners } from '../data/site';
import { Tile } from './ui';

export function Footer() {
  return (
    <footer className="footer">
      <Tile tone="orange" className="footer__tile">
        <div className="footer__top">
          <p className="footer__statement">
            It’s okay not to be <em>kOKi.</em>
          </p>
          <a href="#top" className="btn btn--choc">
            Back to top <span className="btn__icon" aria-hidden="true">↑</span>
          </a>
        </div>

        <div className="footer__grid">
          <nav aria-label="Footer">
            <p className="mini-label">Chapters</p>
            <ul className="footer__links">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`}><span>{n.chapter}</span> {n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="mini-label">Owners</p>
            <ul className="footer__owners">{owners.map((o) => <li key={o.name}>{o.name}</li>)}</ul>
          </div>
        </div>

        <p className="footer__legal">© {brand.founded} {brand.name} · Brand portfolio project</p>
        <p className="footer__giant" aria-hidden="true">kOKi.co</p>
      </Tile>
    </footer>
  );
}
