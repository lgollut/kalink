import { createVar, keyframes } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

const translateX = createVar();
const offsetX = createVar();
const translateY = createVar();
const offsetY = createVar();
const scale = createVar();

const enter = keyframes({
  '100%': {
    opacity: 1,
    transform: `translateX(${offsetX}) translateY(${offsetY})`,
    pointerEvents: 'auto',
  },
});

const leave = keyframes({
  '0%': {
    opacity: 1,
    transform: `translateX(${offsetX}) translateY(${offsetY})`,
    pointerEvents: 'auto',
  },
});

export const popoverContent = recipe({
  base: {
    boxShadow: vars.ref.elevation.moderate,

    animationDuration: vars.ref.duration.short,
    animationTimingFunction: vars.ref.easing.inOut,
    animationFillMode: 'forwards',

    opacity: 0,
    transform: `translate3d(${translateX}, ${translateY}, 0) scale3d(${scale}, ${scale}, ${scale})`,

    selectors: {
      '&[data-state="open"]': {
        animationName: enter,
      },

      '&[data-state="closed"]': {
        animationName: leave,
      },

      '&[data-side*="top"]': {
        vars: {
          [translateY]: vars.ref.spacing.sm,
          [offsetY]: calc.negate(vars.ref.spacing['2xs']),
        },
      },

      '&[data-side*="right"]': {
        vars: {
          [translateX]: calc.negate(vars.ref.spacing['2xs']),
          [offsetX]: vars.ref.spacing.xs,
        },
      },

      '&[data-side*="bottom"]': {
        vars: {
          [translateY]: calc.negate(vars.ref.spacing['2xs']),
          [offsetY]: vars.ref.spacing.xs,
        },
      },

      '&[data-side*="left"]': {
        vars: {
          [translateX]: vars.ref.spacing.sm,
          [offsetY]: calc.negate(vars.ref.spacing['2xs']),
        },
      },
    },

    vars: {
      [translateX]: '0',
      [translateY]: '0',
      [offsetX]: '0',
      [offsetY]: '0',
      [scale]: '0.98',
      '--popover-trigger-width': 'var(--radix-popover-trigger-width)',
    },
  },

  variants: {
    width: {
      trigger: {
        minWidth: 'var(--popover-trigger-width)',
      },
    },

    scrollable: {
      true: {
        overflow: 'hidden',
      },
    },
  },
});
