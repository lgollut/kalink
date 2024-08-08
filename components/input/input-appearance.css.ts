import { createVar, globalStyle } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { components } from '@/styles/layers.css';
import { transition } from '@/styles/transition';
import { typography } from '@/styles/typography.css';

const inputTextColor = createVar();
const outlineColor = createVar();

export const inputAppearance = recipe({
  base: {
    '@layer': {
      [components]: {
        boxSizing: 'border-box',
        minHeight: 50,

        /**
         * Force the font size to 20px to avoid zooming on mobile
         */
        fontSize: 20,
        color: inputTextColor,

        backgroundColor: 'transparent',

        transition: transition(['border-color', 'box-shadow'], {
          duration: 'swift',
        }),

        selectors: {
          '&:disabled': {
            cursor: 'not-allowed',

            backgroundColor: `color(from ${vars.system.color.onSurface} srgb r g b / 0.3)`,

            vars: {
              [inputTextColor]: `color(from ${vars.system.color.onSurface} srgb r g b / 0.38)`,
            },
          },
        },

        vars: {
          [inputTextColor]: vars.system.color.onSurface,
        },
      },
    },
  },

  variants: {
    variant: {
      outlined: {
        '@layer': {
          [components]: {
            paddingInline: vars.ref.spacing.base,
            paddingBlock: vars.ref.spacing.sm,

            borderRadius: vars.ref.radius.small,
            borderColor: outlineColor,
            borderStyle: 'solid',
            borderWidth: 1,

            selectors: {
              '&:focus, &:focus-within, &:focus-visible': {
                boxShadow: `0 0 0 1px ${outlineColor} inset`,
                outline: 'none',

                vars: {
                  [outlineColor]: vars.ref.color.neutral60,
                },
              },

              '&:disabled, &:has(:disabled)': {
                vars: {
                  [outlineColor]: `color(from ${vars.system.color.onSurface} srgb r g b / 0.38)`,
                },
              },

              '&[aria-invalid], &:has([aria-invalid])': {
                vars: {
                  [outlineColor]: vars.system.color.error,
                },
              },
            },

            vars: {
              [outlineColor]: vars.system.color.outline,
            },
          },
        },
      },

      plain: {
        backgroundColor: vars.system.color.surfaceContainer,

        '@layer': {
          [components]: {
            paddingInline: vars.ref.spacing.base,
            paddingBlock: vars.ref.spacing.sm,

            borderRadius: vars.ref.radius.small,
          },
        },
      },

      bare: {},
    },

    size: {
      sm: [
        typography.bodyMedium,
        {
          '@layer': {
            [components]: {
              paddingInline: vars.ref.spacing.sm,
              paddingBlock: vars.ref.spacing.xs,
              minHeight: vars.ref.spacing.md,
            },
          },
        },
      ],

      base: [
        typography.bodyLarge,
        {
          '@layer': {
            [components]: {
              minHeight: 50,
            },
          },
        },
      ],
    },
  },

  defaultVariants: {
    variant: 'outlined',
    size: 'base',
  },
});

globalStyle(
  `${inputAppearance.classNames.base} input:is(:focus, :focus-visible)`,
  {
    outline: 'none',
  },
);
