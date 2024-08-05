import { createVar, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { transition } from '@/styles/transition';

export const viewportMaxHeight = createVar();

export const scrollArea = style({
  overflow: 'hidden',
  height: '100%',

  position: 'relative',
});

export const scrollAreaViewport = style({
  height: '100%',
  maxHeight: viewportMaxHeight,
  width: '100%',

  borderRadius: 'inherit',

  vars: {
    [viewportMaxHeight]: 'initial',
  },
});

export const scrollAreaScrollbar = recipe({
  base: {
    display: 'flex',

    padding: 1,

    transition: transition(['color', 'background-color', 'border-color'], {
      duration: 'standard',
    }),
    userSelect: 'none',
  },

  variants: {
    orientation: {
      vertical: {
        height: '100%',
        width: 10,

        borderInlineStartWidth: 1,
        borderInlineStartColor: 'transparent',
      },

      horizontal: {
        height: 10,
        width: '100%',

        borderBlockStartWidth: 1,
        borderBlockStartColor: 'transparent',
      },
    },
  },
});

export const scrollAreaThumb = style({
  flexGrow: 1,

  position: 'relative',

  borderRadius: vars.ref.radius.small,

  backgroundColor: vars.system.color.outline,
});
