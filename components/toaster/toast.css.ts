import { createVar, keyframes } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { onTintVar } from '@/styles/sprinkles.css';

export const durationVar = createVar();

const timer = keyframes({
  from: {
    transform: 'scale3d(1, 1, 1)',
  },

  to: {
    transform: 'scale3d(0, 1, 1)',
  },
});

export const toast = recipe({
  base: {
    overflow: 'hidden',

    pointerEvents: 'auto',

    '::after': {
      content: '""',

      display: 'block',
      height: vars.ref.spacing.xs,
      width: '100%',

      position: 'absolute',
      insetInlineEnd: 0,
      insetBlockEnd: 0,
      insetInlineStart: 0,

      background: onTintVar,

      animationName: timer,
      animationDuration: durationVar,
      animationTimingFunction: 'linear',
      animationPlayState: 'running',
      animationFillMode: 'forwards',

      transformOrigin: '0 100%',

      pointerEvents: 'none',
    },

    vars: {
      [durationVar]: '8000ms',
    },
  },

  variants: {
    running: {
      true: {
        '::after': {
          animationPlayState: 'running',
        },
      },

      false: {
        '::after': {
          animationPlayState: 'paused',
        },
      },
    },
  },
});
