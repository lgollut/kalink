import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';
import { sprinkles } from '@/styles/sprinkles.css';

export const toastViewport = style([
  sprinkles({
    insetBlockStart: ['auto', 'auto'],
    insetInlineEnd: ['auto', 'base'],
    insetBlockEnd: ['none', 'base'],
    insetInlineStart: ['none', 'auto'],
    rowGap: ['sm', 'base'],
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
      'screen and (min-width: 640px)': {
        maxWidth: '420px',
      },
    },
  },
]);
