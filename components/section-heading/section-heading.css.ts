import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const dotColorVar = createVar();

export const sectionHeading = style({
  scrollMarginTop: vars.ref.spacing['2xl'],
});

export const sectionHeadingDot = recipe({
  variants: {
    size: {
      base: {
        width: vars.ref.spacing.base,
        height: vars.ref.spacing.base,
      },
      md: {
        width: vars.ref.spacing.md,
        height: vars.ref.spacing.md,
      },
    },
  },
});
