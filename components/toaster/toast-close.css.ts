import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const toastClose = style({
  position: 'absolute',
  insetBlockStart: vars.ref.spacing.none,
  insetInlineEnd: vars.ref.spacing.none,
});
