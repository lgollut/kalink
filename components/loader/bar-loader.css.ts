import { createVar, keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { transition } from '@/styles/transition';

const loaderHeight = createVar();

const loaderAnimationLong = keyframes({
  '0%': {
    left: '-35%',
    right: '100%',
  },
  '60%': {
    left: '100%',
    right: '-90%',
  },
  '100%': {
    left: '100%',
    right: '-90%',
  },
});

const loaderAnimationShort = keyframes({
  '0%': {
    left: '-200%',
    right: '100%',
  },
  '60%': {
    left: '107%',
    right: '-8%',
  },
  '100%': {
    left: '107%',
    right: '-8%',
  },
});

export const loaderWrapper = style({
  overflow: 'hidden',
  width: '100%',
  height: loaderHeight,

  position: 'relative',

  backgroundColor: vars.system.color.surfaceContainer,
  backgroundClip: 'padding-box',
  borderRadius: vars.ref.radius.default,

  transition: transition(['opacity', 'visibility']),

  vars: {
    [loaderHeight]: vars.ref.spacing.xs,
  },
});

export const bars = recipe({
  base: {
    display: 'block',
    height: loaderHeight,

    position: 'absolute',

    backgroundColor: vars.system.color.secondary,
    backgroundClip: 'padding-box',
    borderRadius: vars.ref.radius.default,

    willChange: 'left, right',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationDuration: '2.1s',
  },

  variants: {
    active: {
      true: {
        animationPlayState: 'running',
      },
      false: {
        animationPlayState: 'paused',
      },
    },
  },
});

export const barOne = style({
  animationName: loaderAnimationLong,
  animationTimingFunction: 'cubic-bezier(0.65, 0.815, 0.735, 0.395)',
});

export const barTwo = style({
  animationName: loaderAnimationShort,
  animationTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  animationDelay: '1.15s',
});
