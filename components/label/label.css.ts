import { style, createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { typography } from '@/styles/typography.css';

const labelColor = createVar();

export const baseLabel = style([
  typography.labelMedium,
  {
    color: labelColor,

    vars: {
      [labelColor]: vars.system.color.onSurface,
    },
  },
]);

export const label = recipe({
  base: baseLabel,

  variants: {
    disabled: {
      true: {
        vars: {
          [labelColor]: `color(from ${vars.system.color.onSurface} srgb r g b / 0.38)`,
        },
      },
    },
    error: {
      true: {
        vars: {
          [labelColor]: vars.system.color.error,
        },
      },
    },
  },
});
