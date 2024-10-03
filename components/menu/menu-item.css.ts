import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { typography } from '@/styles/typography.css';

export const menuItem = recipe({
  base: [
    typography.bodyMedium,
    {
      display: 'flex',
      alignItems: 'center',
      gap: vars.ref.spacing.sm,

      paddingInline: vars.ref.spacing.sm,
      paddingBlock: vars.ref.spacing.xs,
      width: '100%',

      position: 'relative',

      textAlign: 'start',

      borderRadius: vars.ref.radius.small,

      cursor: 'pointer',
      userSelect: 'none',

      selectors: {
        '&[data-disabled="true"], &[aria-disabled="true"]': {
          pointerEvents: 'none',
          opacity: 0.5,
        },

        '&:before': {
          content: '""',

          width: '100%',
          height: '100%',

          position: 'absolute',
          top: 0,
          left: 0,

          backgroundColor: vars.system.color.outline,
          opacity: 0,
          borderRadius: 'inherit',

          pointerEvents: 'none',
        },

        '&:hover::before': {
          opacity: vars.system.state.hovered.opacity,
        },

        '&:is(:focus, :focus-visible, [aria-selected="true"])': {
          outline: 'none',
        },

        '&:focus::before, &:focus-visible::before, &[aria-selected="true"]::before':
          {
            opacity: vars.system.state.focused.opacity,
          },

        '&[data-state="unchecked"]': {
          paddingInlineStart: vars.ref.spacing.lg,
        },
      },
    },
  ],

  variants: {
    inset: {
      true: {
        paddingInlineStart: vars.ref.spacing.lg,
      },
    },
  },
});

export const menuItemIcon = style({
  color: vars.ref.color.neutral60,
});
