import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const input = style({
  appearance: 'none',

  flexGrow: 1,
  flexBasis: 1,

  minWidth: vars.ref.spacing['3xl'],
  paddingTop: 0,
  paddingBottom: 0,

  border: 'none',

  backgroundColor: 'transparent',
});
