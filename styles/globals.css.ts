/**
 * Minimal reset based on Josh's Custom CSS Reset
 * https://www.joshwcomeau.com/css/custom-css-reset/
 */

import { globalStyle } from '@vanilla-extract/css';

import { base } from '@/styles/layers.css';

globalStyle('*, *::before, *::after', {
  '@layer': {
    [base]: {
      boxSizing: 'border-box',
    },
  },
});

globalStyle('*', {
  '@layer': {
    [base]: {
      margin: 0,
    },
  },
});

/**
 * Fluidly scale typography based on the following calculator:
 * https://websemantics.uk/tools/responsive-font-calculator/
 */
globalStyle(':root', {
  '@layer': {
    [base]: {
      fontSize:
        'clamp(0.75rem, calc(0.75rem + ((1vw - 0.35rem) * 0.2941)), 1rem)',
      minHeight: '0vw',
      scrollBehavior: 'smooth',
    },
  },
});

globalStyle('img, picture, video, canvas, svg', {
  '@layer': {
    [base]: {
      display: 'block',
      maxWidth: '100%',
    },
  },
});

globalStyle('input, button, textarea, select', {
  '@layer': {
    [base]: {
      font: 'inherit',
    },
  },
});

globalStyle('p, h1, h2, h3, h4, h5, h6', {
  '@layer': {
    [base]: {
      overflowWrap: 'break-word',
    },
  },
});

globalStyle('button', {
  '@layer': {
    [base]: {
      border: 'none',

      cursor: 'pointer',
    },
  },
});

globalStyle('a', {
  '@layer': {
    [base]: {
      textDecoration: 'none',
    },
  },
});

globalStyle('fieldset', {
  '@layer': {
    [base]: {
      padding: 0,
      border: 'none',
    },
  },
});

globalStyle('legend', {
  '@layer': {
    [base]: {
      width: '100%',
    },
  },
});

globalStyle('pre', {
  '@layer': {
    [base]: {
      whiteSpace: 'pre-wrap',
    },
  },
});
