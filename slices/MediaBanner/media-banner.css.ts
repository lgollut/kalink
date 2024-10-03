import { createVar, style } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const mediaBanner = style({
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  aspectRatio: '2 / 3',

  '@media': {
    'screen and (min-width: 768px)': {
      aspectRatio: '16 / 9',
    },
  },
});

const contentSpacing = createVar();

export const mediaBannerContent = recipe({
  base: {
    inlineSize: '100%',
    maxInlineSize: calc('100%')
      .subtract(calc.multiply(contentSpacing, 2))
      .toString(),
    paddingBlock: vars.ref.spacing.xl,
    paddingInline: vars.ref.spacing.lg,

    position: 'absolute',
    insetBlockEnd: contentSpacing,

    backgroundColor: vars.ref.color.primary99,
    borderRadius: vars.ref.radius.default,

    '@media': {
      'screen and (min-width: 768px)': {
        inlineSize: 600,
      },

      'screen and (min-width: 1024px)': {
        insetBlockStart: '50%',
        insetBlockEnd: 'unset',
        transform: 'translateY(-50%)',
      },
    },

    vars: {
      [contentSpacing]: vars.ref.spacing.lg,
    },
  },

  variants: {
    direction: {
      start: {
        insetInlineStart: contentSpacing,
      },
      end: {
        insetInlineEnd: contentSpacing,
      },
    },
  },
});
