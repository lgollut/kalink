import { style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const contactsGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.ref.spacing['3xl'],

  '@media': {
    'screen and (min-width: 768px)': {
      gridTemplateColumns: '1fr 1.5fr',
    },

    'screen and (min-width: 1024px)': {
      gridTemplateColumns: '1fr 0.75fr 1fr',
    },
  },
});

export const contactForm = style({
  '@media': {
    'screen and (max-width: 1023px)': {
      gridColumn: '1 / -1',
    },
  },
});

export const contactInformation = style({
  '@media': {
    'screen and (min-width: 1024px)': {
      textAlign: 'end',
    },
  },
});

export const contactMap = style({
  '@media': {
    'screen and (max-width: 767px)': {
      gridRowStart: 2,
      aspectRatio: '16/9',
    },

    'screen and (min-width: 1024px)': {
      aspectRatio: '4/5',
    },
  },
});
