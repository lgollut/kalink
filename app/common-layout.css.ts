import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const backgroundColor = createVar();

export const pageBackground = recipe({
  base: {
    backgroundColor,
  },

  variants: {
    tint: {
      primary: {
        backgroundColor: vars.ref.color.primary99,
      },
      secondary: {
        backgroundColor: vars.ref.color.secondary99,
      },
    },
  },
});
