# CLAUDE MASTER BUILD PROMPT — kOKi.co BRAND PORTFOLIO WEBSITE

You are the LEAD CREATIVE DIRECTOR, senior product designer, UI/UX designer, motion designer, and senior frontend engineer. Your task is to DESIGN AND BUILD a fully working, polished, production-ready, responsive, SINGLE-PAGE brand portfolio website for **kOKi.co**, a youthful mobile cookie business in Nueva Ecija, Philippines. You own the art direction, UX, frontend architecture, accessibility, animation, asset integration, QA and deployment instructions. Do not just produce a wireframe or plan: implement the actual website in code.

## PROJECT ROOT — IMPORTANT (READ FIRST)
The user already has an existing Windows project folder named **`Koki`**. This is the ONLY project root. Work inside the `Koki` folder that is currently open in Claude Code / VS Code; do not assume an absolute Windows path or create a nested `Koki/Koki`, `koki-website`, or `app` project folder. Inspect existing files first and preserve them unless changes are necessary. The development kit may be extracted directly into `Koki` (its reference folders and markdown files should be at the root). Build the website source in this SAME root: `Koki/package.json`, `Koki/src/`, `Koki/public/assets/`, `Koki/index.html`, etc. Copy supplied images from the reference folders to `public/assets/` while keeping the originals. If the user opened a parent directory instead, locate the existing `Koki` directory and switch into it. Do not overwrite existing user work without checking. Verify asset paths and complete a production build. The final website is to be published separately and only its live URL submitted.

## MANDATORY SKILL WORKFLOW — UI UX PRO MAX
1. FIRST check your installed skills/tooling for a skill named **UI UX Pro Max** (may be called `ui-ux-pro-max`, `ui-ux-pro-max-skill`, or similar).
2. If installed, READ its SKILL.md and relevant design-system / search references and FOLLOW its workflow before choosing layout, typography, UX patterns, spacing, responsiveness, interaction, and visual QA. Invoke the actual skill tools where supported.
3. If it is not installed or not accessible, SAY SO BRIEFLY and implement an equivalent professional design-system workflow yourself; NEVER pretend the skill was used. Do not stop development solely because it is missing.
4. Review ALL provided assets and the original business concept document BEFORE coding. Use the exact assets supplied. Do not replace brand logos or posters with AI-generated substitutes.

## DESIGN AMBITION
Build a standout, premium, playful, editorial cookie-brand case-study site: bold oversized typographic hierarchy, unexpected but clean asymmetrical compositions, tasteful scroll-triggered reveals, strong imagery, delicious micro-interactions, rounded organic shapes inspired by bitten cookies, subtle grain / warm-paper texture, and exceptional visual rhythm. Think creative studio portfolio quality, NOT a generic e-commerce template, NOT a dashboard, NOT a corporate landing page. 'Medyo maangas' means high-impact and confident, not chaotic. Prioritize legibility, restraint, composition and polished details. The site should feel uniquely kOKi.co.

## NON-NEGOTIABLE BRAND PALETTE (FROM ORIGINAL PROMOTIONAL POSTER)
- #481C10 — dark chocolate brown, headings, primary text, primary CTA, dark sections
- #F6A762 — warm cookie orange, high-energy accents
- #EDAF7A — peach, secondary section accents
- #CE8F59 — caramel brown, decorative / muted accents
- #F7D5B4 — light cream, backgrounds and cards
White/off-white may be used for breathing room, but never switch to unrelated green, blue, neon or purple. Maintain sufficient text contrast. Use dark chocolate as the anchor and orange as the accent. Apply the palette consistently across EVERY section. Original uploaded brand graphics retain their existing colors.

## TYPOGRAPHY
Use Lilita One for expressive display headings, Poppins for readable body/navigation/buttons, and Playfair Display sparingly for editorial accents. For design-analysis typography labels only: logo = custom kOKi.co lettering; first brand post = visually matched Lilita One / Anton / Fredoka Bold; promo poster = visually matched Cooper Black / Anton / Poppins; supporting posts may include serif styles similar to Playfair Display. These are selected approximate matches, NOT confirmed fonts from original editable artwork. Load actual web fonts responsibly with fallbacks; optimize font loading. Preserve text embedded in poster images rather than recreating it inaccurately.

## SITE CONTENT / REQUIRED RUBRIC (100 POINTS)
A. PT#1 BUSINESS CONCEPT DEVELOPMENT: mission, vision, history, owners with photo containers, products and services. The original `05_documents/business_concept_original.docx` is the SOURCE OF TRUTH. Summarize lengthy passages accurately; no fabricated business claims.
B. CT#1 LOGO DESIGN: show original primary and secondary logos, a four-step logo development process, brand palette, typography.
C. CT#2 FIRST EVER BRAND POST: show main post full and un-cropped, palette, typography, the full original Facebook caption (read more/less allowed), and SIX additional supporting brand posts in a continuous, seamless, infinite horizontal marquee/carousel. Do NOT analyze or caption the six supporting images individually.
D. CT#3 PROMOTIONAL EVENT POSTER: show the supplied promotional poster and its palette and typography; NO explanatory essay. Poster asset already includes a palette panel. Preserve the original image without distorting or cropping away content.
E. Single page with logical design flow, excellent layout and cohesive branding. Grading: PT/CT integration 30, layout 25, visual appeal 25, design flow 20. All required content must be accessible on one scrolling page.

## EXACT BRAND FACTS
Brand: kOKi.co. Tagline: "It's okay not to be kOKi" (brand posts also say "But it's okay to have a kOKi"). Began in 2026 as a rolling store selling one cookie flavor; expanded offerings and mobile presence. Unique concept: rolling store / mobile vendors bring freshly baked, affordable cookies closer to students, communities and events in Nueva Ecija. Vision: become a recognized local cookie brand in Nueva Ecija known for fresh, delicious, affordable and accessible cookies. Mission: fresh, quality, affordable cookies via mobile vendors and rolling stores. Flavors from document: Classic Chocolate Chip, Matcha, Cookies 'n Cream, Pistachio, Dubai Cookie, Double Chocolate, Red Velvet, Biscoff Cookie. Services: Mobile Cookie Selling, Cookie Box Orders, Bulk Orders, Pre-Orders, Event Selling. Do not invent product prices or ordering integrations. Promo poster shows ₱99, October 12, 2026, NEUST Sumacab; present this as an archived campaign, NOT a current active promotion. The printed phone number and website on poster may be placeholders; do not make them functional contact links unless verified.
Owners: Harold James F. Delgado; Chynna Mae S. Lacsa; Chrizthell Joy A. Nicolas; Seigi R. Pascual. Show FOUR equal-sized elegant owner profile containers with names and neutral photo placeholders. Photos will be provided later. Do NOT generate fake portraits or invent job titles. Make swapping placeholders for real photos easy via a data array.

## REQUIRED SECTION ARCHITECTURE (FEEL FREE TO IMPROVE PRESENTATION, NOT REMOVE CONTENT)
1. Sticky minimal header: primary logo, anchor navigation, mobile menu, accessible focus states.
2. Jaw-dropping hero: expressive typography, prominent cookie-related visual sourced from supplied brand materials, tagline, compelling but truthful one-line brand promise, anchor CTA. Preserve the primary logo exactly; avoid embedding a poster with unrelated text as a fake hero background if it reduces legibility.
3. About / Our Story: origin story, why mobile cookies, mission + vision in engaging editorial cards.
4. Cookies & Services: display eight flavor names, with authentic available product imagery only; do not falsely label a photo as a specific flavor when ambiguous. Services presented as distinctive icons/cards.
5. Meet the Owners: four name cards with photo placeholders, responsive 4/2/1 columns.
6. Brand Identity: showcase PRIMARY and SECONDARY logo clearly on contrasting clean backdrops; palette with exact five HEX values and copyable swatches; typography specimen blocks.
7. Logo Development: four interactive stages, individually presented, using the provided four images, with a left-side stepper on desktop or accessible tabs on mobile, next/prev or direct navigation, and an optional full-screen/lightbox view. Stage 1 original hand sketch must be acknowledged. IMPORTANT: concept 01–04 graphics contain reconstructed visual explorations; label them 'illustrative reconstruction / concept exploration' rather than claiming each was an original historical draft. Use separate image files, not a single collage.
8. First Ever Brand Post: original main square post, full caption with read-more toggle, palette and typography labels. Below it: six supporting images in a seamless auto-scrolling horizontal marquee moving LEFT TO RIGHT, infinite loop, manual swipe/drag, pause on hover/focus, keyboard accessibility, and prefers-reduced-motion handling. Use all six supplied images, original aspect ratios, no stretched content.
9. Promotional Event Poster: premium poster showcase plus color palette and typography, no extra explanatory paragraphs. Avoid redundant huge duplication of palette if image already contains palette, but fulfill explicit rubric.
10. Footer: tasteful closing brand statement, back-to-top, anchor links. Do not invent social profiles, phone numbers, live order forms, or active checkout.

## INTERACTION & QUALITY REQUIREMENTS
- Motion: tasteful Framer Motion or performant CSS transitions; use IntersectionObserver where useful. No excessive parallax that harms performance. Respect prefers-reduced-motion.
- Carousel: truly seamless left-to-right infinite motion; pause on hover, focus, drag/swipe, touch-friendly, no jumps. If library used, ensure correct direction and loop behavior.
- Logo process: polished interactive stepper; full-size image viewing, correct labels and accessible controls.
- Color chips: accurate HEX and optional copy-to-clipboard with feedback.
- Caption: original full text preserved, with collapsible long caption if needed.
- Mobile-first and responsive across 360px, 390px, 768px, 1024px, 1440px+. No horizontal overflow, clipped text or image distortion.
- Semantic HTML, logical heading order, descriptive alt text, keyboard operability, sufficient color contrast, skip link, visible focus rings, accessible buttons, no autoplay accessibility traps.
- Optimize images using appropriate object-fit, lazy loading below the fold, sensible sizes. Preserve posters full-frame.
- Maintain a single source of truth for site data and asset paths. No dead buttons. Every CTA must do something real (scroll, open image, copy color, toggle content).
- No generic placeholder stock photos when authentic assets are available. Owner photo placeholders are explicitly allowed.
- Prefer React + Vite + TypeScript + Tailwind CSS (or clean modular CSS) + motion library if available; adapt to actual workspace and avoid unnecessary dependencies. Produce a README with setup/build/deployment (Vercel, Netlify, or GitHub Pages) and exact commands. Do not claim the site is published unless it actually is.

## ASSET MAP — ALL RELATIVE TO ZIP ROOT
- `01_brand_identity/primary_logo.png`
- `01_brand_identity/secondary_logo.png`
- `02_logo_development/original_hand_sketch.png`
- `02_logo_development/concept_01_icon_exploration.png`
- `02_logo_development/concept_02_refined_sketch.png`
- `02_logo_development/concept_03_digital_draft.png`
- `02_logo_development/concept_04_final_refinement.png`
- `03_first_brand_post/first_ever_brand_post.png`
- `03_first_brand_post/original_caption.txt`
- `03_first_brand_post/supporting_01.png` through `supporting_06.png` (check actual names in folder)
- `04_promotional_event/promotional_poster_and_palette.jpg`
- `05_documents/business_concept_original.docx` and `business_concept_extracted.txt`
Read `ASSET_MANIFEST.md` for precise names and purpose. Copy assets into app `public/assets` or import appropriately. Do not rely on absolute paths from someone else's computer.

## REQUIRED DELIVERABLES FROM YOU, CLAUDE
1. A short visual direction / mini design system (tokens, grid, typography, spacing, motion principles), based on UI UX Pro Max if available.
2. The ACTUAL complete working frontend source code and all integrated assets, not mockups only.
3. Working desktop/mobile navigation, all required content, stepper, infinite carousel, image viewing and caption toggle.
4. Run project checks (install, build, lint if configured), fix errors, and verify visually in browser if available. Report any checks not run honestly.
5. Deployment-ready instructions to publish the one-page site and submit only the live public URL. Do not invent a deployed URL.

## EXECUTION INSTRUCTION
Begin by inspecting the asset folders and original business concept. Then invoke UI UX Pro Max if available and make decisive professional design choices. Implement end-to-end, don't ask repeated aesthetic questions. Only ask if a genuinely blocking piece of information is missing. Owner photos are NOT blocking: use named placeholders. The brand identity and supplied assets are non-negotiable. Build a creative studio-quality kOKi.co brand portfolio that can score highly against the rubric.
