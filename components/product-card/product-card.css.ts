import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const productCard = recipe({
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 0,

    width: '100%',

    position: 'relative',

    clear: 'both',

    '@media': {
      'screen and (min-width: 768px)': {
        flexDirection: 'row',
        alignItems: 'flex-end',
        minHeight: '288px',
      },

      'screen and (min-width: 1024px)': {
        width: 'calc(100% * 5 / 6)',
        minHeight: '384px',
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

export const productCardImage = style({
  zIndex: 1,

  width: '90%',
  maxInlineSize: '288px',
  aspectRatio: '1/1',

  position: 'absolute',
  overflow: 'hidden',

  borderRadius: vars.ref.radius.default,
  borderStyle: 'solid',
  borderWidth: 5,
  borderColor: vars.system.color.primary,

  '@media': {
    'screen and (min-width: 768px)': {
      marginInlineStart: vars.ref.spacing.lg,
      width: '288px',
      maxInlineSize: 'unset',

      insetBlockEnd: calc.multiply(vars.ref.spacing.lg, -1),
    },

    'screen and (min-width: 1024px)': {
      width: '384px',
    },
  },
});

export const productCardContent = style({
  width: '100%',
  paddingBlockStart: '288px',
  paddingBlockEnd: vars.ref.spacing.lg,
  paddingInline: vars.ref.spacing.lg,
  marginBlockStart: vars.ref.spacing['2xl'],

  zIndex: 0,

  borderRadius: vars.ref.radius.default,

  contain: 'content',

  '@media': {
    'screen and (min-width: 768px)': {
      marginBlockStart: 'unset',
      marginInlineStart: vars.ref.spacing.none,
      paddingBlockStart: vars.ref.spacing.lg,
      paddingInlineStart: '352px',
    },

    'screen and (min-width: 1024px)': {
      paddingInlineStart: '448px',
    },
  },
});

export const productCardContentInner = style({
  selectors: {
    [`${productCard.classNames.variants.direction.end} &`]: {
      '@media': {
        'screen and (min-width: 768px)': {
          direction: 'ltr',
          textAlign: 'end',
        },
      },
    },
  },
});

export const productCardCurrency = style({
  textTransform: 'uppercase',
});
