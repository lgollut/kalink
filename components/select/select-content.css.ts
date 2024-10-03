import { style } from '@vanilla-extract/css';

export const selectContentViewport = style({
  height: 'auto',
  maxHeight: 'var(--radix-select-content-available-height)',
  minWidth: 'var(--radix-select-trigger-width)',
});
