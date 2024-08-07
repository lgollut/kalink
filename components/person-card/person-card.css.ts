import { style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const personCard = recipe({
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
        alignItems: 'stretch',
        minHeight: calc(vars.ref.spacing.lg)
          .multiply(2)
          .add('384px')
          .toString(),
      },

      'screen and (min-width: 1024px)': {
        alignItems: 'flex-end',
        width: 'calc(100% * 5 / 6)',
        minHeight: '512px',
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

export const personCardImage = style({
  zIndex: 1,

  width: '216px',
  aspectRatio: '3 / 4',

  position: 'absolute',
  overflow: 'hidden',

  '@media': {
    'screen and (min-width: 768px)': {
      width: '288px',

      position: 'absolute',
      insetBlockStart: vars.ref.spacing.lg,
    },

    'screen and (min-width: 1024px)': {
      marginInlineStart: vars.ref.spacing.lg,
      marginInlineEnd: 'unset',
      width: '384px',
    },
  },
});

export const personCardContent = style({
  width: '100%',
  paddingBlockStart: '288px',
  paddingBlockEnd: vars.ref.spacing.lg,
  paddingInline: vars.ref.spacing.lg,
  marginBlockStart: vars.ref.spacing.lg,

  zIndex: 0,

  borderRadius: vars.ref.radius.default,

  contain: 'content',

  '@media': {
    'screen and (min-width: 768px)': {
      marginBlockStart: 'unset',
      marginInlineStart: vars.ref.spacing.lg,
      paddingBlockStart: vars.ref.spacing.lg,
      paddingInlineStart: '304px',
    },

    'screen and (min-width: 1024px)': {
      marginInlineStart: vars.ref.spacing.none,
      paddingInlineStart: '448px',
    },
  },
});

export const personCardContentInner = style({
  selectors: {
    [`${personCard.classNames.variants.direction.end} &`]: {
      '@media': {
        'screen and (min-width: 768px)': {
          direction: 'ltr',
          textAlign: 'end',
        },
      },
    },
  },
});
