import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const sectionHeading = style({
  scrollMarginTop: vars.ref.spacing['2xl'],
});
