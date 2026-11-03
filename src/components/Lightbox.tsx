import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export interface LightboxItem {
  src: string;
  original?: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
}

const Ctx = createContext<(item: LightboxItem) => void>(() => {});
export const useLightbox = () => useContext(Ctx);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((next: LightboxItem) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setItem(next);
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (item && !d.open) {
      d.showModal();
      document.documentElement.classList.add('no-scroll');
    }
  }, [item]);

  const close = () => dialogRef.current?.close();

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={item ? `Full view: ${item.caption ?? item.alt}` : 'Image viewer'}
        onClose={() => {
          setItem(null);
          document.documentElement.classList.remove('no-scroll');
          returnFocus.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {item && (
          <figure className="lightbox__figure">
            <img src={item.src} alt={item.alt} width={item.width} height={item.height} />
            {item.caption && <figcaption>{item.caption}</figcaption>}
            <div className="lightbox__bar">
              {item.original && (
                <a className="btn btn--ghost-light" href={item.original} target="_blank" rel="noopener">
                  Open original file
                </a>
              )}
              <button type="button" className="btn btn--light" onClick={close} autoFocus>
                Close <span aria-hidden="true">✕</span>
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </Ctx.Provider>
  );
}
