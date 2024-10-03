import { keyframes, style } from '@vanilla-extract/css';

import { vars } from '@/styles/contract.css';

export const navigationMenuViewportContainer = style({
  position: 'absolute',
  insetBlockStart: vars.ref.spacing['3xl'],
  insetInlineStart: vars.ref.spacing['2xl'],
});

const zoomIn = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.95)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

const zoomOut = keyframes({
  '0%': { opacity: 1, transform: 'scale(1)' },
  '100%': { opacity: 0, transform: 'scale(0.95)' },
});

export const navigationMenuViewport = style({
  position: 'relative',

  height: 'var(--radix-navigation-menu-viewport-height)',
  width: 'max-content',
  overflow: 'hidden',

  color: vars.system.color.onSurface,

  backgroundColor: vars.system.color.surface,
  boxShadow: vars.ref.elevation.moderate,
  borderRadius: vars.ref.radius.default,
  borderWidth: 1,
  borderColor: vars.ref.color.neutral87,
  borderStyle: 'solid',

  '@media': {
    '(min-width: 768px)': {
      width: 'var(--radix-navigation-menu-viewport-width)',
    },
  },

  selectors: {
    '&[data-state="open"]': {
      animationName: zoomIn,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
    '&[data-state="closed"]': {
      animationName: zoomOut,
      animationDuration: vars.ref.duration.short,
      animationTimingFunction: vars.ref.easing.inOut,
    },
  },
});

/**
 * origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]
 */
