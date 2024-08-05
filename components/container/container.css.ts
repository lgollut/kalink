import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const container = recipe({
  variants: {
    size: {
      xs: {
        maxWidth: vars.ref.screen.xs,
      },
      sm: {
        maxWidth: vars.ref.screen.sm,
      },
      md: {
        maxWidth: vars.ref.screen.md,
      },
      lg: {
        maxWidth: vars.ref.screen.lg,
      },
      xl: {
        maxWidth: vars.ref.screen.xl,
      },
      '2xl': {
        maxWidth: vars.ref.screen['2xl'],
      },
      '3xl': {
        maxWidth: vars.ref.screen['3xl'],
      },
    },
  },
});
