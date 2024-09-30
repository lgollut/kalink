import { createVar, style } from '@vanilla-extract/css';

export const backgroundColor = createVar();

export const pageBackground = style({
  backgroundColor,
});
