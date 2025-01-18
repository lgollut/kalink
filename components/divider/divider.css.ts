import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const divider = recipe({
  base: {
    borderWidth: 1,
    borderColor: vars.system.color.surfaceContainer,
  },

  variants: {
    borderStyle: {
      solid: {
        borderStyle: 'solid',
      },
      dashed: {
        borderStyle: 'dashed',
      },
      dotted: {
        borderStyle: 'dotted',
      },
    },
  },
});

export type DividerVariants = NonNullable<RecipeVariants<typeof divider>>;
