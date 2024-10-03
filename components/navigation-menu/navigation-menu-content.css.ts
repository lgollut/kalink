import { style, keyframes } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

const slideInFromRight = keyframes({
  from: { transform: 'translateX(13rem)' },
  to: { transform: 'translateX(0)' },
});

const slideInFromLeft = keyframes({
  from: { transform: 'translateX(-13rem)' },
  to: { transform: 'translateX(0)' },
});

const slideOutToRight = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(13rem)' },
});

const slideOutToLeft = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-13rem)' },
});

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const fadeOut = keyframes({
  from: { opacity: 1 },
  to: { opacity: 0 },
});

export const navigationMenuContent = style({
  display: 'flex',
  alignItems: 'flex-start',
  padding: vars.ref.spacing.lg,
  gap: vars.ref.spacing['3xl'],

  selectors: {
    '&[data-motion^="from-"]': {
      animationName: fadeIn,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
    '&[data-motion^="to-"]': {
      animationName: fadeOut,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
    '&[data-motion="from-end"]': {
      animationName: `${slideInFromRight}, ${fadeIn}`,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
    '&[data-motion="from-start"]': {
      animationName: `${slideInFromLeft}, ${fadeIn}`,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
    '&[data-motion="to-end"]': {
      animationName: `${slideOutToRight}, ${fadeOut}`,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
    '&[data-motion="to-start"]': {
      animationName: `${slideOutToLeft}, ${fadeOut}`,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
  },

  '@media': {
    '(min-width: 768px)': {
      position: 'absolute',
      width: 'auto',
    },
  },
});
