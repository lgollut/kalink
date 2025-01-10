import { createVar } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

import { vars } from '@/styles/contract.css';
import { components } from '@/styles/layers.css';
import { tintVar } from '@/styles/sprinkles.css';
import { transition } from '@/styles/transition';

const size = createVar();

export const button = recipe({
  base: {
    '@layer': {
      [components]: {
        height: size,
        overflow: 'hidden',

        textTransform: 'uppercase',
        whiteSpace: 'nowrap',

        transition: transition(['background-color', 'box-shadow', 'color']),

        ':disabled': {
          cursor: 'not-allowed',
        },

        '::before': {
          content: '""',

          width: '100%',
          height: '100%',

          position: 'absolute',
          top: 0,
          left: 0,

          backgroundColor: `hsl(${tintVar})`,
          opacity: 0,
          borderRadius: 'inherit',

          transition: `opacity ${vars.ref.duration.swift} ${vars.ref.easing.inOut}`,
          pointerEvents: 'none',
        },

        selectors: {
          '&:disabled': {
            color: `hsl(${tintVar} / 0.58)`,
          },

          '&:focus, &:focus-visible': {
            outline: 'none',
          },

          '&:not(:disabled):hover::before': {
            opacity: vars.system.state.hovered.opacity,
          },

          '&:not(:disabled):focus::before, &:not(:disabled):focus-visible::before':
            {
              opacity: vars.system.state.focused.opacity,
            },

          '&:not(:disabled)[aria-pressed="true"]::before, &:not(:disabled)[aria-checked="true"]::before':
            {
              opacity: vars.system.state.pressed.opacity,
            },

          '&:not(:disabled, :hover)[aria-pressed="false"]::before, &:not(:disabled, :hover)[aria-checked="false"]::before':
            {
              opacity: 0,
            },

          '&:not(:disabled):active::before': {
            opacity: vars.system.state.pressed.opacity,
          },
        },

        vars: {
          [size]: vars.ref.spacing.xl,
        },
      },
    },
  },

  variants: {
    variant: {
      bare: {
        '@layer': {
          [components]: {
            height: 'unset',

            color: `unset`,

            backgroundColor: 'unset',

            '::before': {
              content: 'initial',
            },

            vars: {
              [size]: vars.ref.spacing.none,
            },
          },
        },
      },
      filled: {
        '@layer': {
          [components]: {
            selectors: {
              '&:disabled': {
                backgroundColor: `hsl(${tintVar} / 0.12)`,
              },

              '&:hover:not(:disabled)': {
                boxShadow: vars.ref.elevation.low,
              },
            },
          },
        },
      },
      outlined: {
        '@layer': {
          [components]: {
            color: `hsl(${tintVar})`,

            backgroundColor: 'transparent',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: `hsl(${tintVar})`,

            selectors: {
              '&:disabled': {
                borderColor: `hsl(${tintVar} / 0.12)`,
              },
            },
          },
        },
      },
      ghost: {
        '@layer': {
          [components]: {
            color: `hsl(${tintVar})`,

            backgroundColor: 'transparent',
          },
        },
      },
    },

    size: {
      sm: {
        '@layer': {
          [components]: {
            vars: {
              [size]: vars.ref.spacing.lg,
            },
          },
        },
      },
      base: {},
      md: {
        '@layer': {
          [components]: {
            vars: {
              [size]: vars.ref.spacing.lg,
            },
          },
        },
      },
    },

    flow: {
      reverse: {
        '@layer': {
          [components]: {
            flexDirection: 'row-reverse',
          },
        },
      },
    },

    iconOnly: {
      true: {
        '@layer': {
          [components]: {
            paddingInline: 'unset',
            width: size,
          },
        },
      },
    },
  },
});
