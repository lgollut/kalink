import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const productPageHeader = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.ref.spacing.md,

  position: 'relative',

  '@media': {
    'screen and (min-width: 768px)': {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
  },
});

export const productPageImage = style({
  flex: '0 0 50%',
});

export const productPagePrice = style({
  textTransform: 'uppercase',
});

export const productSpecs = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: vars.ref.spacing.md,
  rowGap: vars.ref.spacing.sm,
});

export const productSpecsItem = style({
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  gridColumn: '1 / -1',
  alignItems: 'baseline',
});
