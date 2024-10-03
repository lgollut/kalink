import { createVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { backgroundColor } from '@/app/common-layout.css';
import { vars } from '@/styles/contract.css';
import { transition } from '@/styles/transition';

const navbarLinkColor = createVar();

export const navbar = recipe({
  base: {
    paddingBlockStart: vars.ref.spacing.lg,
    paddingBlockEnd: vars.ref.spacing.base,

    position: 'fixed',
    insetBlockStart: 0,
    insetInline: 0,
    zIndex: 10,

    backgroundColor,
    borderBottom: `1px solid ${backgroundColor}`,

    transition: transition('border-bottom', {
      duration: 'short',
      easing: 'linear',
    }),

    '@media': {
      'screen and (min-width: 1024px)': {
        paddingBlock: vars.ref.spacing.lg,
      },
    },
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
          backgroundColor: navbarLinkColor,

          scale: 1,
        },
      },
    },
    color: {
      primary: {
        vars: {
          [navbarLinkColor]: vars.system.color.primary,
        },
      },

      secondary: {
        vars: {
          [navbarLinkColor]: vars.system.color.secondaryContainer,
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

export const navbarMenuLabel = style({
  width: vars.ref.spacing['8xl'],
  aspectRatio: '1',
});

export const navbarMenuLabelText = style({
  position: 'absolute',
  bottom: vars.ref.spacing.lg,
  insetInlineStart: vars.ref.spacing['5xl'],
  whiteSpace: 'nowrap',
});

const subMenuLinkColor = createVar();

export const subMenuLink = recipe({
  base: {
    position: 'relative',
    alignSelf: 'flex-start',

    '::before': {
      content: '""',

      position: 'absolute',
      zIndex: 0,
      insetBlock: calc.negate(vars.ref.spacing.xs),
      insetInline: calc.negate(vars.ref.spacing.sm),

      borderRadius: vars.ref.radius.small,

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
          backgroundColor: subMenuLinkColor,

          scale: 1,
        },
      },
    },

    color: {
      primary: {
        vars: {
          [subMenuLinkColor]: vars.system.color.primary,
        },
      },

      secondary: {
        vars: {
          [subMenuLinkColor]: vars.system.color.secondaryContainer,
        },
      },
    },
  },
});
