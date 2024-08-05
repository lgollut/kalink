import { style } from '@vanilla-extract/css';

export const pageContent = style({
  paddingBlockStart: 150,

  '@media': {
    'screen and (min-width: 768px)': {
      paddingBlockStart: 250,
    },

    'screen and (min-width: 1024px)': {
      paddingBlockStart: 325,
    },
  },
});
