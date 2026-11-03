import type { ReactElement } from 'react';
import type { ServiceIcon } from '../data/site';

const paths: Record<ServiceIcon, ReactElement> = {
  // rolling cart
  cart: (
    <>
      <path d="M4 10h5l4 20h24l4-14H12" />
      <circle cx="16" cy="38" r="3.5" />
      <circle cx="33" cy="38" r="3.5" />
      <path d="M19 16a5 5 0 0 1 10 0" />
    </>
  ),
  // gift box
  box: (
    <>
      <path d="M8 19h32v21H8z" />
      <path d="M5 13h38v6H5z" />
      <path d="M24 13v27" />
      <path d="M24 13c-3-7-11-6-9-1 1 2 5 1 9 1zM24 13c3-7 11-6 9-1-1 2-5 1-9 1z" />
    </>
  ),
  // stacked cookies
  stack: (
    <>
      <ellipse cx="24" cy="36" rx="16" ry="5" />
      <ellipse cx="24" cy="26" rx="16" ry="5" />
      <ellipse cx="24" cy="16" rx="16" ry="5" />
      <path d="M8 16v20M40 16v20" />
    </>
  ),
  // calendar + clock
  calendar: (
    <>
      <rect x="6" y="9" width="36" height="32" rx="5" />
      <path d="M6 18h36M15 5v8M33 5v8" />
      <circle cx="24" cy="30" r="6" />
      <path d="M24 27v3l2 2" />
    </>
  ),
  // booth with awning
  booth: (
    <>
      <path d="M5 18 10 7h28l5 11" />
      <path d="M5 18c0 3 3 5 6.5 5S18 21 18 18c0 3 3 5 6 5s6-2 6-5c0 3 3 5 6.5 5S43 21 43 18" />
      <path d="M9 23v18h30V23M19 41V30h10v11" />
    </>
  ),
};

export function ServiceGlyph({ name }: { name: ServiceIcon }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
