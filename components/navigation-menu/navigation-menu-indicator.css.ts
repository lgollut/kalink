import { style, keyframes } from '@vanilla-extract/css';

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const navigationMenuIndicator = style({
  top: '100%',
  zIndex: 1,
  display: 'flex',
  height: '0.375rem', // h-1.5
  alignItems: 'flex-end',
  justifyContent: 'center',
  overflow: 'hidden',

  selectors: {
    '&[data-state="visible"]': {
      animation: `${fadeIn} 150ms ease`,
    },
    '&[data-state="hidden"]': {
      animation: `${fadeOut} 150ms ease`,
    },
  },
});

export const navigationMenuIndicatorArrow = style({
  position: 'relative',
  top: '60%',
  height: '0.5rem', // h-2
  width: '0.5rem', // w-2
  transform: 'rotate(45deg)',
  borderTopLeftRadius: '0.125rem', // rounded-tl-sm
  backgroundColor: 'var(--border)', // bg-border
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // shadow-md
});
