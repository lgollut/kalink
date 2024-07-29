import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const headingWrapper = recipe({
  variants: {
    underline: {
      true: {
        paddingBottom: vars.ref.spacing.base,
        borderBottom: `1px solid ${vars.system.color.outline}`,
      },
    },
  },
});
