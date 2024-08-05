import { createVar, style } from '@vanilla-extract/css';

export const cols = createVar();

export const grid = style({
  gridTemplateColumns: cols,
});
