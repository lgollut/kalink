import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const introBlock = style({
  scrollMarginBlockStart: vars.ref.spacing['8xl'],
});

export const introBlockFigure = recipe({
  base: {
    '::before': {
      content: '""',

      flexShrink: 0,
      flexGrow: 0,

      display: 'block',
      width: vars.ref.spacing.base,

      borderStartEndRadius: vars.ref.radius.default,
      borderEndEndRadius: vars.ref.radius.default,
    },

    '@media': {
      'screen and (min-width: 768px)': {
        '::before': {
          width: vars.ref.spacing['6xl'],
        },
      },

      'screen and (min-width: 1024px)': {
        '::before': {
          width: '32rem',
          borderStartStartRadius: vars.ref.radius.default,
          borderEndStartRadius: vars.ref.radius.default,
        },
      },
    },
  },

  variants: {
    color: {
      primary: {
        '::before': {
          backgroundColor: vars.system.color.primary,
        },
      },
      secondaryContainer: {
        '::before': {
          backgroundColor: vars.system.color.secondaryContainer,
        },
      },
    },
  },
});
