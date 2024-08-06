import { recipe } from '@vanilla-extract/recipes';

export const imageWrapper = recipe({
  variants: {
    cover: {
      true: {
        width: '100%',
        height: '100%',
        position: 'relative',
      },
    },
  },

  defaultVariants: {
    cover: false,
  },
});

export const image = recipe({
  base: {
    maxWidth: '100%',
    height: 'auto',
  },

  variants: {
    cover: {
      true: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        insetInlineStart: 0,
        objectPosition: 'center',
        objectFit: 'cover',
      },
    },

    objectPosition: {
      topLeft: {
        objectPosition: 'top left',
      },
      topCenter: {
        objectPosition: 'top center',
      },
      topRight: {
        objectPosition: 'top right',
      },
      centerLeft: {
        objectPosition: 'center left',
      },
      center: {
        objectPosition: 'center',
      },
      centerRight: {
        objectPosition: 'center right',
      },
      bottomLeft: {
        objectPosition: 'bottom left',
      },
      bottomCenter: {
        objectPosition: 'bottom center',
      },
      bottomRight: {
        objectPosition: 'bottom right',
      },
    },
  },

  defaultVariants: {
    cover: false,
    objectPosition: 'center',
  },
});
