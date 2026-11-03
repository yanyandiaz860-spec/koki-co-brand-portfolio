# kOKi.co — Brand Portfolio (single page)

A responsive one-page brand portfolio for **kOKi.co**, a mobile cookie business in Nueva Ecija, Philippines.
Built with **React 19 + Vite + TypeScript**, plain modular CSS, the [`motion`](https://motion.dev) animation library, and self-hosted fonts via Fontsource.

## Quick start

```bash
npm install
npm run dev        # local dev server → http://localhost:5173
npm run build      # type-check + production build → dist/
npm run preview    # serve the production build → http://localhost:4173
```

Requires Node 18+ (tested with Node 24).

## Working on this with a collaborator

Repo: https://github.com/yanyandiaz860-spec/koki-co-brand-portfolio (public: anyone can view and download. To push changes, ask the owner to add you as a collaborator.)

No Git? Download the project: **Code → Download ZIP**, unzip, then run `npm install` and `npm run dev` inside the folder.

First-time setup (needs [Git](https://git-scm.com) and [Node.js 18+](https://nodejs.org)):

```bash
git clone https://github.com/yanyandiaz860-spec/koki-co-brand-portfolio.git
cd koki-co-brand-portfolio
npm install
npm run dev          # open http://localhost:5173
```

Everyday flow:

```bash
git pull                          # get the latest changes first
# ...edit files...
npm run build                     # make sure it still builds
git add -A
git commit -m "Describe your change"
git push
```

Where to edit:
- **Text, flavors, services, owners and image paths:** `src/data/site.ts`
- **Owner and product photos:** `public/assets/owners/` and `public/assets/products/`, then set `photo:` / `image:` in `src/data/site.ts`
- **Section layouts:** `src/components/` · **Styles:** `src/styles/`

> Pushing to GitHub does **not** update the live Netlify site by itself (see Deploy below).

## Project layout

```
Koki/
├─ 01_brand_identity/ … 05_documents/   ← original reference kit (kept untouched)
├─ public/assets/                       ← copies of the supplied images (+ optimized .webp)
│  ├─ brand/        primary & secondary logo, trimmed header logo, hero cookie crop
│  ├─ logo-dev/     original hand sketch + concept 01–04
│  ├─ first-post/   first ever brand post + supporting_01–06
│  └─ promo/        promotional poster + palette
├─ src/
│  ├─ data/site.ts  ← SINGLE SOURCE OF TRUTH: all copy, palettes, owners, asset paths
│  ├─ components/   Nav, Hero, Concept (PT#1), LogoChapter (CT#1), PostChapter (CT#2),
│  │                PosterChapter (CT#3), Footer, Marquee, Palette, Lightbox, Icons, ui (Tile, ChapterHead)
│  ├─ hooks/        useReducedMotion
│  └─ styles/       tokens.css, base.css, layout.css (bento grids), components.css
└─ index.html
```

The first-post caption is imported **verbatim** from `03_first_brand_post/original_caption.txt`.

## Adding the owner photos

1. Put the photos in `public/assets/owners/` (e.g. `harold.jpg`; portrait 4:5 works best).
2. In `src/data/site.ts`, set each owner's `photo`:
   ```ts
   { name: 'Harold James F. Delgado', initials: 'HD', photo: asset('owners/harold.jpg') },
   ```
3. Rebuild. Owners with `photo: null` keep the neutral placeholder.

## Deploy (choose one), then submit only the live URL

`vite.config.ts` uses `base: './'`, so the same `dist/` works on any host or sub-path.

### Vercel
```bash
npm i -g vercel
vercel            # framework: Vite · build: npm run build · output: dist
vercel --prod
```
Or import the repo at vercel.com/new. Defaults are detected automatically.

### Netlify
```bash
npm i -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```
Or drag-and-drop the `dist/` folder at app.netlify.com/drop.

### GitHub Pages
```bash
npm run build
npx gh-pages -d dist      # publishes dist/ to the gh-pages branch
```
Then enable Pages → branch `gh-pages` in the repo settings. The URL will be `https://<user>.github.io/<repo>/`.

> **Live:** https://koki-co-brand-portfolio.netlify.app (Netlify project `koki-co-brand-portfolio`).
> To publish updates from this folder (already linked via `.netlify/state.json`): `npm run build` then `npx netlify-cli deploy --prod --dir=dist`.
> `netlify.toml` holds the build settings. Visitor protection (team login) was turned off for this site so the URL is public.

## Design system: "The Cookie Box"

- **Concept:** the page is a box of assorted cookies. A dark-chocolate canvas holds rounded bento "compartments"
  in cream, orange, peach and caramel. The four graded deliverables are numbered chapters: 01 PT#1 · 02 CT#1 · 03 CT#2 · 04 CT#3.
- **Palette:** `#481C10` dark chocolate (canvas/ink), `#F6A762` cookie orange (accent), `#EDAF7A` peach, `#CE8F59` caramel, `#F7D5B4` cream,
  plus a warm off-white `#FFF4E6`. Orange appears as text only on chocolate (≈6:1 contrast), never on light tiles.
- **Type:** Bricolage Grotesque (display, 700–800, tight tracking), DM Sans (body/UI), Instrument Serif italic (editorial accents).
  All fonts are self-hosted, with no third-party font requests.
- **Grid:** 12-column bento, 1680px max width, fluid 8–14px gutters. Breakpoints at 640 / 760 / 900 / 1100px.
  Owners are 4 / 2 / 1 columns and services 5 / 3+2 / 1.
- **Intro loader:** a branded preloader tracks real loading (fonts, hero image, logos, window load). The cookie gets "bitten" as the counter rises, then the page is revealed with a wipe. It shows for at least 1.6s and at most 7s, and is shortened under reduced motion.
- **Full-screen layout:** each chapter band spans the whole viewport, with only a small frame gutter.
- **Signature interactions:** inline cookie "capsule" and hand-drawn swash in the hero headline, rotating "Freshly baked" badge,
  hero parallax, nav with a sliding active pill and scroll-progress bar, clip-path reveal for the mobile menu, logo anatomy hotspots,
  expanding paint-chip palette (click to copy), animated tabs for the 4-step logo development, a social-card frame for the first post,
  and a seamless left-to-right carousel (drag/swipe, arrows, pause).
- **Accessibility:** skip link, visible focus rings tuned per surface, ARIA tabs with arrow/Home/End keys, native `<dialog>` lightbox,
  a pausable carousel, 44px+ targets, and `MotionConfig reducedMotion="user"` plus CSS fallbacks for `prefers-reduced-motion`.

## Content notes

- Business facts come only from `05_documents/business_concept_original.docx`. No prices, contact details, ordering or social links were invented.
- Logo concept panels 01–04 are labelled **"Illustrative reconstruction / concept exploration"**. Only the hand sketch is presented as original.
- The ₱99 / October 12, 2026 / NEUST Sumacab poster is presented as an **archived campaign**. Its printed phone number and website are not made into links.
- First-post palette swatches were eyedropper-sampled from the artwork (labelled approximate). Typography labels for the posts are visual matches, not confirmed source fonts.
