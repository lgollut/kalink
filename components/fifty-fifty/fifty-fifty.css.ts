import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const fiftyFifty = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 0,

    width: '100%',

    position: 'relative',

    '@media': {
      'screen and (min-width: 768px)': {
        flexDirection: 'row',
        alignItems: 'stretch',
        minHeight: calc.add(vars.ref.spacing.lg, '567px'),
      },

      'screen and (min-width: 1024px)': {
        alignItems: 'flex-start',
        minHeight: '837px',
      },
    },
  },

  variants: {
    direction: {
      start: {},
      end: {
        '@media': {
          'screen and (min-width: 768px)': {
            alignSelf: 'flex-end',
            direction: 'rtl',
          },
        },
      },
    },
  },
});

export const fiftyFiftyImage = style({
  zIndex: 1,

  width: calc('100%')
    .subtract(calc.multiply(vars.ref.spacing.base, 2))
    .toString(),
  aspectRatio: '2 / 3',

  position: 'relative',
  overflow: 'hidden',

  borderRadius: vars.ref.radius.default,

  '@media': {
    'screen and (min-width: 768px)': {
      width: '378px',
      marginInlineStart: vars.ref.spacing.lg,
      marginInlineEnd: 'unset',

      position: 'absolute',
    },

    'screen and (min-width: 1024px)': {
      width: '558px',
    },
  },
});

export const fiftyFiftyContent = style({
  width: '100%',
  paddingBlockStart: vars.ref.spacing.lg,
  paddingBlockEnd: vars.ref.spacing.lg,
  paddingInline: vars.ref.spacing.lg,

  zIndex: 0,

  '@media': {
    'screen and (max-width: 767px)': {
      '::before': {
        content: '""',

        height: vars.ref.spacing['9xl'],

        position: 'absolute',
        top: calc.negate(vars.ref.spacing['9xl']),
        right: 0,
        left: 0,

        backgroundColor: vars.system.color.primary,
      },
    },
    'screen and (min-width: 768px)': {
      marginBlockStart: vars.ref.spacing['7xl'],
      marginInlineStart: vars.ref.spacing.none,

      paddingBlockStart: vars.ref.spacing.lg,
      paddingInlineStart: '450px',

      borderRadius: vars.ref.radius.default,
    },

    'screen and (min-width: 1024px)': {
      paddingInlineStart: '646px',
    },
  },
});

export const fiftyFiftyContentInner = style({
  selectors: {
    [`${fiftyFifty.classNames.variants.direction.end} &`]: {
      '@media': {
        'screen and (min-width: 768px)': {
          direction: 'ltr',
          textAlign: 'end',
        },
      },
    },
  },
});
