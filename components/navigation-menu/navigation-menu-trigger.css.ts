import { style, keyframes } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

const rotateAnimation = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(180deg)' },
});

export const navigationMenuTrigger = style({
  display: 'inline-flex',

  maxWidth: 'max-content',
  alignItems: 'center',
  justifyContent: 'center',

  paddingInline: vars.ref.spacing['2xl'],
  paddingBlock: vars.ref.spacing.sm,

  background: 'none',

  transition: 'colors 0.2s ease-in-out',

  ':hover': {
    // backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
  ':focus': {
    // backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
    outline: 'none',
  },
  ':disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  selectors: {
    '&[data-active]': {
      // backgroundColor: 'color-mix(in srgb, var(--accent) 50%, transparent)',
    },
    '&[data-state="open"]': {
      // backgroundColor: 'color-mix(in srgb, var(--accent) 50%, transparent)',
    },
  },
});

// export const navigationMenuChevronIcon = style({
//   position: 'relative',
//   top: '1px',
//   marginLeft: '0.25rem', // ml-1
//   height: '0.75rem', // h-3
//   width: '0.75rem', // w-3
//   transition: 'transform 0.2s ease-in-out',

//   selectors: {
//     [`${navigationMenuTrigger}[data-state="open"] &`]: {
//       animation: `${rotateAnimation} 0.2s ease-in-out forwards`,
//     },
//   },
// });
