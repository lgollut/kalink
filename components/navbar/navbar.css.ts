import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { transition } from '@/styles/transition';

export const navbar = recipe({
  base: {
    paddingBlock: vars.ref.spacing.lg,

    position: 'fixed',
    insetBlockStart: 0,
    insetInline: 0,
    zIndex: 10,

    backgroundColor: vars.ref.color.primary99,
    borderBottom: `1px solid ${vars.ref.color.primary99}`,

    transition: transition('border-bottom', {
      duration: 'standard',
      easing: 'linear',
      delay: vars.ref.duration.standard,
    }),
  },

  variants: {
    state: {
      idle: {},
      visible: {
        borderBottom: `1px solid ${vars.ref.color.neutral90}`,
      },
      hidden: {},
    },
  },
});

export const navbarLogo = style({
  width: vars.ref.spacing['9xl'],
  height: 'auto',
});

export const navbarLink = recipe({
  base: {
    '::before': {
      content: '""',

      width: vars.ref.spacing.base,
      height: vars.ref.spacing.base,

      position: 'absolute',
      insetBlockEnd: 0,
      insetInlineStart: calc.negate(vars.ref.spacing.md),

      backgroundColor: 'transparent',

      scale: 0.85,

      transition: transition(['background-color', 'scale'], {
        duration: 'swift',
        easing: 'linear',
      }),
    },
  },

  variants: {
    active: {
      true: {
        '::before': {
          backgroundColor: vars.system.color.primary,

          scale: 1,
        },
      },
    },
  },
});

export const navbarMenuMobile = style({
  position: 'absolute',
  insetInlineStart: vars.ref.spacing.lg,

  '@media': {
    'screen and (min-width: 768px)': {
      display: 'none',
    },
  },
});
