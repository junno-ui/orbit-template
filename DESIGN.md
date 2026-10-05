# Orbit design system

## Glass and interaction refinement

Floating navigation and the enquiry surface use static 10–16px frost, translucent dark fills, bright hairlines, and inset highlights. Destination cards use full-image compositions, large serif titles, and a directional scrim to keep the photography prominent. Touch devices retain direct scrolling and static layouts. Buttons have brief press compression and a single hover sheen. No looping refraction or animated backdrop filters.

The scroll sequence has three focal points: a large editorial heading whose words resolve into focus, destination cards that recede into a shallow stack, and an Earth image that opens from a smaller frame to full bleed. Closing copy appears near the bottom of the expanded image. Desktop motion uses the existing shared GSAP/Lenis clock; mobile, short viewports, and reduced-motion preferences get readable static compositions.

Lenis handles wheel and anchor scrolling with a 0.09 lerp; reduced motion, hidden tabs, and Radix modal scroll locks destroy the instance and restore native scrolling. CSS scroll padding reserves 112px for the fixed glass navigation. Reduced transparency and unsupported-backdrop-filter fallbacks use opaque dark surfaces. Inspiration: [React Bits Glass Surface](https://reactbits.dev/components/glass-surface); implementation is original and uses the existing Motion/shadcn stack.

User-provided direction takes precedence over the Junno publisher website: zinc-black canvas, Inter interface copy, Instrument Serif editorial headlines, atmospheric photography, glass navigation, hairline borders, and pill actions. Publisher branding is separate from the fictional Orbit product.

Tokens live in src/app/globals.css. Content lives in src/assets/data/. Container: 1200px; desktop gutter: 48px; mobile gutter: 20px. Sections: 112px desktop / 68px mobile. Breakpoints: 640, 900, 1100px. Accent: pale sage for small highlights only. No additional theme switcher is required by this visual direction.

Motion: 850ms initial hero sequence; 650ms section reveals at 18px travel; 180ms feedback. Only transform and opacity animate for entrances. Content is visible before JavaScript. One IntersectionObserver helper cleans itself up on unmount; matchMedia cancels running reveals if reduced motion changes. Reduced motion removes entrance/hover transforms and smooth scroll while preserving color feedback.
