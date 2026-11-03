/**
 * kOKi.co — SINGLE SOURCE OF TRUTH for site content and asset paths.
 * Business facts are taken from 05_documents/business_concept_original.docx.
 * Edit this file to update copy, swap owner photos, or change images.
 */
import originalCaption from '../../03_first_brand_post/original_caption.txt?raw';

const BASE = import.meta.env.BASE_URL;
export const asset = (path: string) => `${BASE}assets/${path}`;

export interface Img {
  /** optimized WebP */
  src: string;
  /** original file, used as fallback + for lightbox "full quality" */
  original: string;
  alt: string;
  width: number;
  height: number;
}

const img = (dir: string, name: string, ext: 'png' | 'jpg', alt: string, width: number, height: number): Img => ({
  src: asset(`${dir}/${name}.webp`),
  original: asset(`${dir}/${name}.${ext}`),
  alt,
  width,
  height,
});

/* ------------------------------------------------------------------ */
/* Brand                                                              */
/* ------------------------------------------------------------------ */
export const brand = {
  name: 'kOKi.co',
  tagline: "It's okay not to be kOKi",
  taglineAnswer: "But it's okay to have a kOKi",
  promise: 'Freshly baked, affordable cookies — rolled right to you across Nueva Ecija.',
  location: 'Nueva Ecija, Philippines',
  founded: 2026,
};

export const logos = {
  primary: img('brand', 'primary_logo', 'png', 'kOKi.co primary logo: the word kOKi with a bitten chocolate-chip cookie as the O and a playful character reaching for crumbs, followed by .co', 627, 502),
  secondary: img('brand', 'secondary_logo', 'png', 'kOKi.co secondary logo: a compact chocolate-brown “ko” monogram with a bitten k and a pointing character cut out of the o, followed by .co', 592, 548),
  primaryTrim: asset('brand/primary_logo_trim.webp'),
  secondaryTrim: asset('brand/secondary_logo_trim.webp'),
};

export const heroCookie = {
  src: asset('brand/hero_cookie_crop.webp'),
  alt: 'Close-up of a freshly baked chocolate chunk cookie with a bite taken out, chocolate splashing around it — detail from kOKi.co’s first brand post',
  width: 700,
  height: 360,
};

/* ------------------------------------------------------------------ */
/* Palette                                                            */
/* ------------------------------------------------------------------ */
export interface Swatch {
  hex: string;
  name: string;
  role?: string;
}

/** Official brand palette — from the original promotional poster color scheme. */
export const palette: Swatch[] = [
  { hex: '#481C10', name: 'Dark Chocolate', role: 'Headings, text, primary CTA, dark sections' },
  { hex: '#F6A762', name: 'Cookie Orange', role: 'High-energy accents' },
  { hex: '#EDAF7A', name: 'Peach', role: 'Secondary section accents' },
  { hex: '#CE8F59', name: 'Caramel', role: 'Decorative, muted accents' },
  { hex: '#F7D5B4', name: 'Light Cream', role: 'Backgrounds and cards' },
];

/** Colors used in the logo artwork (see Concept 04 final refinement). */
export const logoPalette: Swatch[] = [
  { hex: '#481C10', name: 'Dark Chocolate' },
  { hex: '#F6A762', name: 'Cookie Orange' },
  { hex: '#F7D5B4', name: 'Light Cream' },
];

/** Sampled from the first brand post artwork (approximate, eyedropper-sampled). */
export const firstPostPalette: Swatch[] = [
  { hex: '#3B1E08', name: 'Espresso' },
  { hex: '#7B502C', name: 'Milk Chocolate' },
  { hex: '#B58856', name: 'Toasted Tan' },
  { hex: '#E3C49A', name: 'Biscuit' },
  { hex: '#F3DAB1', name: 'Paper Cream' },
];

/** The promo poster’s own color scheme (exact HEX printed on the artwork). */
export const posterPalette: Swatch[] = [
  { hex: '#EDAF7A', name: 'Peach' },
  { hex: '#F6A762', name: 'Cookie Orange' },
  { hex: '#481C10', name: 'Dark Chocolate' },
  { hex: '#CE8F59', name: 'Caramel' },
  { hex: '#F7D5B4', name: 'Light Cream' },
];

/* ------------------------------------------------------------------ */
/* Typography                                                         */
/* ------------------------------------------------------------------ */
export interface TypeSpec {
  family: string;
  css: string;
  use: string;
}

export const siteTypography: TypeSpec[] = [
  { family: 'Bricolage Grotesque', css: "'Bricolage Grotesque Variable', system-ui, sans-serif", use: 'Display' },
  { family: 'DM Sans', css: "'DM Sans Variable', system-ui, sans-serif", use: 'Body' },
  { family: 'Instrument Serif', css: "'Instrument Serif', Georgia, serif", use: 'Accent' },
];

/** Logo anatomy — wording follows the annotations on the Concept 03 digital draft. */
export const logoAnatomy = [
  { id: 'letterform', label: 'Letterform', text: 'Rounded, bold lettering.', x: 19, y: 46 },
  { id: 'cookie', label: 'Cookie', text: 'A bitten cookie for the product.', x: 40, y: 41 },
  { id: 'character', label: 'Character', text: 'A playful, friendly character.', x: 65, y: 33 },
];

/** Labels for analysis only — visually matched approximations, NOT confirmed source fonts. */
export const logoTypography = ['Custom rounded lettering'];
export const firstPostTypography = ['Lilita One', 'Anton', 'Fredoka Bold'];
export const posterTypography = ['Cooper Black', 'Anton', 'Poppins'];

/* ------------------------------------------------------------------ */
/* PT#1 — Business concept                                            */
/* ------------------------------------------------------------------ */
export const story = {
  history: [
    'kOKi.co started in 2026 as a small rolling store selling only one cookie flavor. As more customers enjoyed the cookies, new flavors were added and the recipes improved — growing into a mobile cookie business across Nueva Ecija.',
  ],
  nameOrigin:
    'The name kOKi.co came from the idea of a place where people can always find a cookie they’ll enjoy, no matter where they are.',
  uniqueAppeal:
    'Through our rolling stores and mobile vendors, customers can enjoy fresh cookies in different places around Nueva Ecija. With different flavors to choose from and prices that are easy on the budget, kOKi.co makes satisfying your cookie cravings simple, convenient and enjoyable.',
  vision:
    'To become a well-known local cookie brand in Nueva Ecija, known for fresh, delicious and affordable cookies that customers can easily enjoy wherever they are.',
  mission:
    'To provide freshly baked, good-quality cookies at an affordable price — and make them more accessible by bringing our rolling stores and mobile vendors closer to schools, communities, events and busy areas.',
  timeline: [
    { label: '2026', text: 'One store, one flavor' },
    { label: 'Then', text: 'More flavors' },
    { label: 'Now', text: 'All over Nueva Ecija' },
  ],
};

/* ------------------------------------------------------------------
   Products — shown in the hover card / modal of the Products list.
   `image`: set to asset('products/<file>.webp') once the photo is added
   to public/assets/products/. Leave null to show the placeholder.
   `detail`: short flavor description — edit freely.
   ------------------------------------------------------------------ */
export interface Product {
  name: string;
  detail: string;
  image: string | null;
}
export const products: Product[] = [
  { name: 'Classic Chocolate Chip', detail: 'The classic: a golden cookie loaded with chocolate chips.', image: null },
  { name: 'Matcha', detail: 'A green tea cookie with a smooth, earthy-sweet taste.', image: null },
  { name: 'Cookies ’n Cream', detail: 'A cookies-and-cream twist with crushed chocolate cookie bits.', image: null },
  { name: 'Pistachio', detail: 'A nutty pistachio cookie for something a little different.', image: null },
  { name: 'Dubai Cookie', detail: 'Inspired by the viral Dubai chocolate — pistachio meets chocolate.', image: null },
  { name: 'Double Chocolate', detail: 'Chocolate dough with even more chocolate for true chocoholics.', image: null },
  { name: 'Red Velvet', detail: 'A red velvet cookie with a hint of cocoa.', image: null },
  { name: 'Biscoff Cookie', detail: 'A caramelized-biscuit flavored cookie.', image: null },
];
/** flavor names (kept for counts and simple lists) */
export const flavors = products.map((p) => p.name);

export type ServiceIcon = 'cart' | 'box' | 'stack' | 'calendar' | 'booth';
export const services: { title: string; text: string; icon: ServiceIcon; image: string; alt: string }[] = [
  { title: 'Mobile Cookie Selling', text: 'Fresh cookies, brought around Nueva Ecija.', icon: 'cart', image: asset('services/mobile_cookie_selling.webp'), alt: 'Illustration of a cream and brown cookie truck with an awning, trays of cookies and a giant cookie on the roof' },
  { title: 'Cookie Box Orders', text: 'Assorted boxes for sharing and gifting.', icon: 'box', image: asset('services/cookie_box_orders.webp'), alt: 'Illustration of an open kOKi.co gift box with four assorted cookies and a ribbon' },
  { title: 'Bulk Orders', text: 'Big orders for parties and school events.', icon: 'stack', image: asset('services/bulk_orders.webp'), alt: 'Illustration of a tall stack of cookies tied with twine and a Bulk Order tag' },
  { title: 'Pre-Orders', text: 'Order ahead, pick your time.', icon: 'calendar', image: asset('services/pre_orders.webp'), alt: 'Illustration of a Pre-Order desk calendar with checked dates and a bitten cookie' },
  { title: 'Event Selling', text: 'Our booth or mobile store at your event.', icon: 'booth', image: asset('services/event_selling.webp'), alt: 'Illustration of a kOKi.co market booth with a striped awning, string lights and cookie jars' },
];

export const audience = [
  'Students & young adults',
  'Dessert lovers',
  'Teens on a budget',
  'Schools & communities',
];

/* ------------------------------------------------------------------ */
/* Owners — set `photo` to an image path (e.g. asset('owners/harold.jpg'))
   after adding the file to public/assets/owners/. Leave null to show
   the placeholder.                                                    */
/* ------------------------------------------------------------------ */
export interface Owner {
  name: string;
  initials: string;
  photo: string | null;
}
export const owners: Owner[] = [
  { name: 'Harold James F. Delgado', initials: 'HD', photo: null },
  { name: 'Chynna Mae S. Lacsa', initials: 'CL', photo: null },
  { name: 'Chrizthell Joy A. Nicolas', initials: 'CN', photo: null },
  { name: 'Seigi R. Pascual', initials: 'SP', photo: null },
];

/* ------------------------------------------------------------------ */
/* CT#1 — Logo development                                            */
/* ------------------------------------------------------------------ */
export interface StageImage extends Img {
  label: string;
  authentic: boolean;
}
export interface Stage {
  step: string;
  title: string;
  summary: string;
  images: StageImage[];
}

const RECON = 'Illustrative reconstruction';

export const logoStages: Stage[] = [
  {
    step: '01',
    title: 'Hand Sketch',
    summary: 'The original pencil sketch and first variations.',
    images: [
      { ...img('logo-dev', 'original_hand_sketch', 'png', 'Original pencil hand sketch of the kOKi.co logo with a bitten cookie as the O and a stick character', 267, 245), label: 'Original hand sketch', authentic: true },
      { ...img('logo-dev', 'concept_01_icon_exploration', 'png', 'Concept 01: four pencil variations of the kOKi.co wordmark exploring line weight', 836, 470), label: RECON, authentic: false },
    ],
  },
  {
    step: '02',
    title: 'Refined Sketch',
    summary: 'Rounder, bolder letters on a grid.',
    images: [
      { ...img('logo-dev', 'concept_02_refined_sketch', 'png', 'Concept 02: refined pencil sketch of the kOKi.co wordmark on a grid', 836, 470), label: RECON, authentic: false },
    ],
  },
  {
    step: '03',
    title: 'Digital Draft',
    summary: 'Clean digital lines for cookie, character and type.',
    images: [
      { ...img('logo-dev', 'concept_03_digital_draft', 'png', 'Concept 03: annotated digital draft of the kOKi.co logo in dark brown', 836, 471), label: RECON, authentic: false },
    ],
  },
  {
    step: '04',
    title: 'Final Logo',
    summary: 'Chocolate, cookie orange and cream.',
    images: [
      { ...img('logo-dev', 'concept_04_final_refinement', 'png', 'Concept 04: final colored kOKi.co logo with detail exploration and brand palette #481C10, #F6A762, #F7D5B4', 836, 471), label: RECON, authentic: false },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* CT#2 — First ever brand post                                       */
/* ------------------------------------------------------------------ */
export const firstPost = {
  image: img('first-post', 'first_ever_brand_post', 'png', 'kOKi.co first ever brand post: a bitten chocolate chunk cookie with chocolate splashes on a cream and tan paper background, with the headline “feeling a bit… CRUMBLED?” and “it’s okay not to be kOKi!”', 1080, 1080),
  caption: originalCaption.trim(),
};

export const supportingPosts: Img[] = [
  img('first-post', 'supporting_01', 'png', 'kOKi.co brand post: logo above “It’s ok not to be KOKi” with a stack of chocolate chunk cookies and “Freshly baked cookies”', 1080, 1080),
  img('first-post', 'supporting_02', 'png', 'kOKi.co brand post: stacked cookies with “It’s okay not to be kOKi” stickers and a lineup of flavor photo cards', 782, 785),
  img('first-post', 'supporting_03', 'png', 'kOKi.co brand post: “It’s okay not to be kOKi” in serif type over a red arch and a large chocolate chip cookie', 1080, 1080),
  img('first-post', 'supporting_04', 'png', 'kOKi.co brand post: picnic scene on grass with cookie baskets and “It’s Okay not to be kOKi” in yellow lettering', 813, 810),
  img('first-post', 'supporting_05', 'png', 'kOKi.co brand post: minimal layout where a cookie forms the O in “It’s ok, not to be kOKi!”', 646, 645),
  img('first-post', 'supporting_06', 'png', 'kOKi.co brand post: “It’s OK not to be kOKi” with a cookie as the O on an orange background with stacked cookies', 482, 637),
];

/* ------------------------------------------------------------------ */
/* CT#3 — Promotional event poster (archived campaign)                */
/* ------------------------------------------------------------------ */
export const promoPoster = {
  image: img('promo', 'promotional_poster_and_palette', 'jpg', 'kOKi.co promotional event poster: two chocolate chip cookies on orange with “It’s okay not to be kOKi!”, an “Only for ₱99!” badge, October 12, 2026 at NEUST Sumacab, shown beside its color scheme panel with HEX values #EDAF7A, #F6A762, #481C10, #CE8F59 and #F7D5B4', 1600, 1200),
  event: { date: 'October 12, 2026', venue: 'NEUST Sumacab', offer: '₱99' },
};

/* ------------------------------------------------------------------ */
/* Navigation                                                         */
/* ------------------------------------------------------------------ */
export const nav = [
  { id: 'concept', label: 'Concept', chapter: '01', code: 'PT#1' },
  { id: 'logo', label: 'Logo', chapter: '02', code: 'CT#1' },
  { id: 'first-post', label: 'First Post', chapter: '03', code: 'CT#2' },
  { id: 'poster', label: 'Poster', chapter: '04', code: 'CT#3' },
];
