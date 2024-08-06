import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const introBlockFigure = style({
  '::before': {
    content: '""',

    flexShrink: 0,
    flexGrow: 0,

    display: 'block',
    width: vars.ref.spacing.base,

    backgroundColor: vars.system.color.primary,
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
});
