import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

const enterAnimation = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

const exitAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
});

export const sheetOverlay = style({
  zIndex: 50,

  position: 'fixed',
  inset: 0,

  backgroundColor: `color(from ${vars.system.color.surfaceContainer} srgb r g b / 0.5)`,

  animationDuration: vars.ref.duration.standard,
  animationTimingFunction: vars.ref.easing.inOut,
  backdropFilter: 'blur(4px)',

  selectors: {
    '&[data-state="open"]': {
      animationName: enterAnimation,
    },
    '&[data-state="closed"]': {
      animationName: exitAnimation,
    },
  },
});
