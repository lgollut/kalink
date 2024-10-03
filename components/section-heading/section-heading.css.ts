import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const sectionHeading = style({
  scrollMarginBlockStart: vars.ref.spacing['8xl'],
});
