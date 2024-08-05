import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';

export const servicesGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.ref.spacing.base,

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: vars.ref.spacing.lg,
    },

    'screen and (min-width: 1024px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
});

export const servicesGridCell = recipe({
  variants: {
    type: {
      service: {
        aspectRatio: '4/3',
      },
      serviceDescription: {
        '@media': {
          'screen and (min-width: 768px)': {
            aspectRatio: '4/3',
          },
        },
      },
    },
  },
});
