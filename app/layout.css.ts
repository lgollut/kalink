import { style } from '@vanilla-extract/css';

import '@/styles/ref.css';
import '@/styles/globals.css';

import { vars } from '@/styles/contract.css';
import { typography } from '@/styles/typography.css';

export const html = style({
  minHeight: '100vh',
});

export const body = style([
  typography.bodyLarge,
  {
    display: 'flex',
    flexDirection: 'column',

    minHeight: '100vh',

    backgroundColor: vars.ref.color.primary99,
  },
]);
