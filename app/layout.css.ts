import { style } from '@vanilla-extract/css';

import '@/styles/ref.css';
import '@/styles/globals.css';

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
  },
]);
