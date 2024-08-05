import { recipe } from '@vanilla-extract/recipes';

export const loader = recipe({
  variants: {
    active: {
      true: {
        opacity: 1,
        visibility: 'visible',

        animationPlayState: 'running',
      },
      false: {
        opacity: 0,
        visibility: 'hidden',

        animationPlayState: 'paused',
      },
    },
  },
});
