import './src/styles/global.css';
import './src/styles/style.scss';

import "@fontsource/lora"

/*
 Two-tone overscroll (rubber-band) color for macOS. Chrome only paints a solid
 background-color in the rubber-band area and ignores gradients, so we can't get
 a different top vs. bottom color from CSS alone. Instead we swap the <html>
 background-color by scroll position: dark to match the hero when near the top,
 gray to match the footer otherwise. You can only bounce at an edge, so each end
 ends up with the right color. The opaque <body> hides this during normal scroll.
*/
// Midpoint of the hero's left-to-right gradient (gray-700/600 -> gray-800).
// Chrome only paints a solid overscroll color, so the midpoint minimizes the
// horizontal seam against the hero on both sides.
const HERO_COLOR = '#303a48';
const FOOTER_COLOR = '#f3f4f6';

const updateOverscrollColor = () => {
  document.documentElement.style.backgroundColor =
    window.scrollY < 100 ? HERO_COLOR : FOOTER_COLOR;
};

export const onClientEntry = () => {
  window.addEventListener('scroll', updateOverscrollColor, { passive: true });
  updateOverscrollColor();
};

export const onRouteUpdate = () => {
  updateOverscrollColor();
};
