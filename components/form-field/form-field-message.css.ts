import { style, createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { typography } from '@/styles/typography.css';

const colorVar = createVar();

export const baseFormFieldMessage = style([
  typography.bodySmall,
  {
    display: 'block',

    color: colorVar,

    vars: {
      [colorVar]: vars.system.color.onSurface,
    },
  },
]);

export const formFieldMessage = recipe({
  base: baseFormFieldMessage,

  variants: {
    error: {
      true: {
        vars: {
          [colorVar]: vars.system.color.error,
        },
      },
    },

    disabled: {
      true: {
        vars: {
          [colorVar]: `color(from ${vars.system.color.onSurface} srgb r g b / 0.38)`,
        },
      },
    },
  },
});
