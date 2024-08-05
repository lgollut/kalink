import { createVar, keyframes, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { transition } from '@/styles/transition';

const size = createVar();
const moonSize = createVar();

const loaderAnimation = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
});

export const loaderWrapper = recipe({
  base: {
    overflow: 'hidden',
    width: size,
    height: size,

    animationName: loaderAnimation,
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationFillMode: 'forwards',

    transition: transition(['opacity', 'visibility']),
    pointerEvents: 'none',

    vars: {
      [moonSize]: calc.divide(size, 7),
    },
  },

  variants: {
    size: {
      base: {
        vars: {
          [size]: vars.ref.spacing.base,
        },
      },
      md: {
        vars: {
          [size]: vars.ref.spacing.md,
        },
      },
      lg: {
        vars: {
          [size]: vars.ref.spacing.lg,
        },
      },
      xl: {
        vars: {
          [size]: vars.ref.spacing.xl,
        },
      },
    },
  },
});

export const ellipse = style({
  width: size,
  height: size,

  position: 'absolute',
  insetBlockStart: 0,
  insetInlineStart: 0,

  borderRadius: '100%',
  borderWidth: moonSize,
  borderStyle: 'solid',
  borderColor: `color(from ${vars.system.color.primary} srgb r g b / 0.3)`,
});

export const moon = style({
  width: moonSize,
  height: moonSize,

  position: 'absolute',
  insetBlockStart: calc.subtract(
    calc.divide(size, 2),
    calc.divide(moonSize, 2),
  ),
  insetInlineStart: 0,

  backgroundColor: vars.system.color.primary,

  borderRadius: '100%',
});
