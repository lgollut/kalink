import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const serviceCardScrollable = style({
  height: '100%',

  overflowX: 'hidden',
  overflowY: 'auto',
});

export const serviceCardDescription = style({
  // height: calc.subtract('100%', vars.ref.spacing.xl),

  '@media': {
    'screen and (min-width: 768px)': {
      '::after': {
        content: '""',

        display: 'block',
        height: vars.ref.spacing['2xl'],

        position: 'sticky',
        right: 0,
        bottom: 0,
        left: 0,

        backgroundImage: `linear-gradient(0deg, ${vars.system.color.primaryContainer} 75%, rgba(255,255,255,0) 100%);`,
      },
    },
  },
});
