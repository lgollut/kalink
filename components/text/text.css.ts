import { recipe } from '@vanilla-extract/recipes';

export const text = recipe({
  variants: {
    ellipsis: {
      true: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
    },
  },
});
