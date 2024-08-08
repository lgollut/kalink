import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';
import { sprinkles } from '@/styles/sprinkles.css';

export const toastViewport = style([
  sprinkles({
    rowGap: { xs: 'sm', md: 'base' },

    insetBlockStart: { xs: 'auto', md: 'lg' },
    insetInlineEnd: { xs: 'auto', md: 'lg' },
    insetBlockEnd: { xs: 'none', md: 'auto' },
    insetInlineStart: { xs: 'none', md: 'auto' },
  }),
  {
    display: 'flex',
    flexDirection: 'column',

    maxHeight: '100vh',
    width: '100%',
    padding: vars.ref.spacing.none,
    zIndex: 100,

    position: 'fixed',

    pointerEvents: 'none',
    listStyle: 'none',

    '@media': {
      'screen and (min-width: 768px)': {
        maxWidth: '420px',
      },
    },
  },
]);
