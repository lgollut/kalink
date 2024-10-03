import { createVar, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

const from = createVar();
const to = createVar();
const size = createVar();

const enter = keyframes({
  '0%': {
    opacity: 0,
    transform: from,
  },

  '100%': {
    opacity: 1,
    transform: to,
  },
});

const leave = keyframes({
  '0%': {
    opacity: 1,
    transform: to,
  },

  '100%': {
    opacity: 0,
    transform: from,
  },
});

export const sheetContent = recipe({
  base: {
    zIndex: 50,
    overflow: 'hidden',
    maxWidth: '100vw',
    maxHeight: '100vh',

    position: 'fixed',

    boxShadow: vars.ref.elevation.high,

    animationDuration: vars.ref.duration.short,
    animationTimingFunction: vars.ref.easing.inOut,
    animationFillMode: 'both',

    selectors: {
      '&[data-state="open"]': {
        animationName: enter,

        pointerEvents: 'auto',
      },

      '&[data-state="closed"]': {
        animationName: leave,

        pointerEvents: 'none',
      },
    },
  },

  variants: {
    side: {
      top: {
        height: size,
        width: '100vw',

        insetBlockStart: 0,
        insetInline: 0,

        vars: {
          [from]: 'translateY(-100%)',
          [to]: 'translateY(0)',
        },
      },
      right: {
        height: '100vh',
        width: size,

        insetBlock: 0,
        insetInlineEnd: 0,

        vars: {
          [from]: 'translateX(100%)',
          [to]: 'translateX(0)',
        },
      },
      bottom: {
        height: size,
        width: '100vw',

        insetBlockEnd: 0,
        insetInline: 0,

        vars: {
          [from]: 'translateY(100%)',
          [to]: 'translateY(0)',
        },
      },
      left: {
        height: '100vh',
        width: size,

        insetBlock: 0,
        insetInlineStart: 0,

        vars: {
          [from]: 'translateX(-100%)',
          [to]: 'translateX(0)',
        },
      },
    },

    size: {
      sm: {
        vars: {
          [size]: '300px',
        },
      },
      base: {
        vars: {
          [size]: '400px',
        },
      },
      md: {
        vars: {
          [size]: '500px',
        },
      },
      lg: {
        vars: {
          [size]: '600px',
        },
      },
    },
  },

  defaultVariants: {
    side: 'right',
    size: 'base',
  },
});
