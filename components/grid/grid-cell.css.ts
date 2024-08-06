import { createVar, style } from '@vanilla-extract/css';

import { components } from '@/styles/layers.css';

export const gridColumnStartVar = createVar();
export const gridColumnEndVar = createVar();
export const gridRowStartVar = createVar();
export const gridRowEndVar = createVar();

export const gridCell = style({
  '@layer': {
    [components]: {
      gridColumnStart: gridColumnStartVar,
      gridColumnEnd: gridColumnEndVar,
      gridRowStart: gridRowStartVar,
      gridRowEnd: gridRowEndVar,

      /**
       * Fix issue with cell overflowing its container
       */
      minWidth: '1px',

      vars: {
        [gridColumnStartVar]: 'auto',
        [gridColumnEndVar]: 'auto',
        [gridRowStartVar]: 'auto',
        [gridRowEndVar]: 'auto',
      },
    },
  },
});
