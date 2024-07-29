import { createVar } from '@vanilla-extract/css';
import { defineProperties } from '@vanilla-extract/sprinkles';

import { vars } from '@/styles/contract.css';
import { utilities } from '@/styles/layers.css';

export const tintVar = createVar();
export const onTintVar = createVar();

export const unconditionalProperties = defineProperties({
  '@layer': utilities,

  properties: {
    tintScheme: {
      none: {
        vars: {
          [tintVar]: 'initial',
          [onTintVar]: 'initial',
        },
      },
      surface: {
        vars: {
          [tintVar]: vars.system.color.surface,
          [onTintVar]: vars.system.color.onSurface,
        },
      },
      surfaceInverted: {
        vars: {
          [tintVar]: vars.system.color.onSurface,
          [onTintVar]: vars.system.color.surface,
        },
      },
      surfaceContainerLowest: {
        vars: {
          [tintVar]: vars.system.color.surfaceContainerLowest,
          [onTintVar]: vars.system.color.onSurface,
        },
      },
      surfaceContainerLowestInverted: {
        vars: {
          [tintVar]: vars.system.color.onSurface,
          [onTintVar]: vars.system.color.surfaceContainerLowest,
        },
      },
      surfaceContainerLow: {
        vars: {
          [tintVar]: vars.system.color.surfaceContainerLow,
          [onTintVar]: vars.system.color.onSurface,
        },
      },
      surfaceContainerLowInverted: {
        vars: {
          [tintVar]: vars.system.color.onSurface,
          [onTintVar]: vars.system.color.surfaceContainerLow,
        },
      },
      surfaceContainer: {
        vars: {
          [tintVar]: vars.system.color.surfaceContainer,
          [onTintVar]: vars.system.color.onSurface,
        },
      },
      surfaceContainerInverted: {
        vars: {
          [tintVar]: vars.system.color.onSurface,
          [onTintVar]: vars.system.color.surfaceContainer,
        },
      },
      surfaceContainerHigh: {
        vars: {
          [tintVar]: vars.system.color.surfaceContainerHigh,
          [onTintVar]: vars.system.color.onSurface,
        },
      },
      surfaceContainerHighInverted: {
        vars: {
          [tintVar]: vars.system.color.onSurface,
          [onTintVar]: vars.system.color.surfaceContainerHigh,
        },
      },
      surfaceContainerHighest: {
        vars: {
          [tintVar]: vars.system.color.surfaceContainerHighest,
          [onTintVar]: vars.system.color.onSurface,
        },
      },
      surfaceContainerHighestInverted: {
        vars: {
          [tintVar]: vars.system.color.onSurface,
          [onTintVar]: vars.system.color.surfaceContainerHighest,
        },
      },
      primary: {
        vars: {
          [tintVar]: vars.system.color.primary,
          [onTintVar]: vars.system.color.onPrimary,
        },
      },
      primaryInverted: {
        vars: {
          [tintVar]: vars.system.color.onPrimary,
          [onTintVar]: vars.system.color.primary,
        },
      },
      secondary: {
        vars: {
          [tintVar]: vars.system.color.secondary,
          [onTintVar]: vars.system.color.onSecondary,
        },
      },
      secondaryInverted: {
        vars: {
          [tintVar]: vars.system.color.onSecondary,
          [onTintVar]: vars.system.color.secondary,
        },
      },
      error: {
        vars: {
          [tintVar]: vars.system.color.error,
          [onTintVar]: vars.system.color.onError,
        },
      },
      errorInverted: {
        vars: {
          [tintVar]: vars.system.color.onError,
          [onTintVar]: vars.system.color.error,
        },
      },
    },

    backgroundColor: {
      tint: {
        backgroundColor: tintVar,
      },
      currentColor: {
        backgroundColor: 'currentColor',
      },
      transparent: {
        backgroundColor: 'transparent',
      },
      ...vars.system.color,
    },

    color: {
      tint: {
        color: onTintVar,
      },
      currentColor: {
        color: 'currentColor',
      },
      ...vars.system.color,
    },

    boxShadow: {
      none: {
        boxShadow: vars.ref.elevation.none,
      },
      minimal: {
        boxShadow: vars.ref.elevation.minimal,
      },
      low: {
        boxShadow: vars.ref.elevation.low,
      },
      moderate: {
        boxShadow: vars.ref.elevation.moderate,
      },
      high: {
        boxShadow: vars.ref.elevation.high,
      },
      peak: {
        boxShadow: vars.ref.elevation.peak,
      },
    },

    borderBlockStart: {
      0: {
        borderBlockStart: 'none',
      },
      1: {
        borderBlockStartWidth: 1,
        borderBlockStartStyle: 'solid',
        borderBlockStartColor: vars.system.color.outline,
      },
    },

    borderInlineEnd: {
      0: {
        borderInlineEnd: 'none',
      },
      1: {
        borderInlineEndWidth: 1,
        borderInlineEndStyle: 'solid',
        borderInlineEndColor: vars.system.color.outline,
      },
    },

    borderBlockEnd: {
      0: {
        borderBlockEnd: 'none',
      },
      1: {
        borderBlockEndWidth: 1,
        borderBlockEndStyle: 'solid',
        borderBlockEndColor: vars.system.color.outline,
      },
    },

    borderInlineStart: {
      0: {
        borderInlineStart: 'none',
      },
      1: {
        borderInlineStartWidth: 1,
        borderInlineStartStyle: 'solid',
        borderInlineStartColor: vars.system.color.outline,
      },
    },

    borderDashed: {
      0: {
        border: 'none',
      },
      1: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: vars.system.color.outline,
      },
    },

    link: {
      expandTarget: {
        '::after': {
          content: '',

          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
    },

    overflow: {
      hidden: {
        overflow: 'hidden',
      },
      scroll: {
        overflow: 'scroll',
      },
    },

    overflowWrap: {
      anywhere: {
        overflowWrap: 'anywhere',
      },

      breakWord: {
        overflowWrap: 'break-word',
      },
    },

    textOverflow: {
      ellipsis: {
        overflow: 'hidden',

        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      },
    },

    textDecoration: {
      underline: {
        textDecoration: 'underline',
      },
      none: {
        textDecoration: 'none',
      },
    },
  },

  shorthands: {
    border: [
      'borderBlockStart',
      'borderInlineEnd',
      'borderBlockEnd',
      'borderInlineStart',
    ],
    borderBlock: ['borderBlockStart', 'borderBlockEnd'],
    borderInline: ['borderInlineEnd', 'borderInlineStart'],
  },
});

export type TintSchemeValues =
  | 'none'
  | 'surface'
  | 'surfaceInverted'
  | 'surfaceContainerLowest'
  | 'surfaceContainerLowestInverted'
  | 'surfaceContainerLow'
  | 'surfaceContainerLowInverted'
  | 'surfaceContainer'
  | 'surfaceContainerInverted'
  | 'surfaceContainerHigh'
  | 'surfaceContainerHighInverted'
  | 'surfaceContainerHighest'
  | 'surfaceContainerHighestInverted'
  | 'primary'
  | 'primaryInverted'
  | 'secondary'
  | 'secondaryInverted'
  | 'error'
  | 'errorInverted';

export type BoxShadowValues =
  | 'none'
  | 'minimal'
  | 'low'
  | 'moderate'
  | 'high'
  | 'peak';
export type BorderValues = 0 | 1;

export type ColorValues =
  | keyof typeof vars.system.color
  | 'currentColor'
  | 'tint';
export type TransparentColorValues = ColorValues | 'transparent';

export type Borders = {
  /** Mapped to `border` css property */
  border?: BorderValues;
  /** Mapped to `border-block` css property */
  borderBlock?: BorderValues;
  /** Mapped to `border-inline` css property */
  borderInline?: BorderValues;
  /** Mapped to `border-block-start` css property */
  borderBlockStart?: BorderValues;
  /** Mapped to `border-inline-end` css property */
  borderInlineEnd?: BorderValues;
  /** Mapped to `border-block-end` css property */
  borderBlockEnd?: BorderValues;
  /** Mapped to `border-inline-start` css property */
  borderInlineStart?: BorderValues;
  /** Mapped to `border-style` css property */
  borderDashed?: BorderValues;
};

export type LinkValues = 'expandTarget';

export type Overflow = 'hidden' | 'scroll';

export type OverflowWrap = 'anywhere' | 'breakWord';

export type TextOverflow = 'ellipsis';

export type textDecoration = 'underline' | 'none';

export type UnconditionalProperties = {
  tintScheme?: TintSchemeValues;
  boxShadow?: BoxShadowValues;
  backgroundColor?: TransparentColorValues;
  color?: ColorValues;
  link?: LinkValues;
  overflow?: Overflow;
  overflowWrap?: OverflowWrap;
  textOverflow?: TextOverflow;
  textDecoration?: textDecoration;
} & Borders;
