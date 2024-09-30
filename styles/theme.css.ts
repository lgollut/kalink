import { createTheme } from '@vanilla-extract/css';

import { vars } from './contract.css';

const typeface = {
  brand: 'var(--font-brand)',
  plain: 'var(--font-plain)',
};

export const themeClass = createTheme(vars.system, {
  layout: {
    measure: '75ch',
  },
  color: {
    primary: vars.ref.color.primary72,
    onPrimary: vars.ref.color.primary10,
    primaryContainer: vars.ref.color.primary95,
    onPrimaryContainer: vars.ref.color.primary10,

    secondary: vars.ref.color.secondary40,
    onSecondary: vars.ref.color.secondary99,
    secondaryContainer: vars.ref.color.secondary92,
    onSecondaryContainer: vars.ref.color.secondary10,

    error: vars.ref.color.error40,
    onError: vars.ref.color.error99,
    errorContainer: vars.ref.color.error90,
    onErrorContainer: vars.ref.color.error10,

    surfaceDim: vars.ref.color.neutral87,
    surface: vars.ref.color.neutral98,
    surfaceBright: vars.ref.color.neutral98,
    onSurface: vars.ref.color.neutral20,

    surfaceContainerLowest: vars.ref.color.neutral100,
    surfaceContainerLow: vars.ref.color.neutral96,
    surfaceContainer: vars.ref.color.neutral94,
    surfaceContainerHigh: vars.ref.color.neutral92,
    surfaceContainerHighest: vars.ref.color.neutral90,

    outline: vars.ref.color.neutral70,
  },

  state: {
    hovered: {
      opacity: '0.08',
    },
    focused: {
      opacity: '0.12',
    },
    pressed: {
      opacity: '0.2',
    },
  },

  typeface,

  type: {
    display: {
      large: {
        font: typeface.brand,
        size: vars.ref.fontSize['9xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      medium: {
        font: typeface.brand,
        size: vars.ref.fontSize['8xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      small: {
        font: typeface.brand,
        size: vars.ref.fontSize['7xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
    },

    headline: {
      large: {
        font: typeface.brand,
        size: vars.ref.fontSize['6xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      medium: {
        font: typeface.brand,
        size: vars.ref.fontSize['4xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      small: {
        font: typeface.brand,
        size: vars.ref.fontSize['2xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
    },

    title: {
      large: {
        font: typeface.plain,
        size: vars.ref.fontSize['3xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: '1.2',
      },
      medium: {
        font: typeface.plain,
        size: vars.ref.fontSize['2xl'],
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: '1.2',
      },
      small: {
        font: typeface.plain,
        size: vars.ref.fontSize.xl,
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: '1.2',
      },
    },

    label: {
      large: {
        font: typeface.plain,
        size: vars.ref.fontSize.md,
        weight: vars.ref.fontWeight.regular,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      medium: {
        font: typeface.plain,
        size: vars.ref.fontSize.sm,
        weight: vars.ref.fontWeight.regular,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      small: {
        font: typeface.plain,
        size: vars.ref.fontSize['2xs'],
        weight: vars.ref.fontWeight.regular,
        tracking: 'normal',
        lineHeight: 'normal',
      },
    },

    body: {
      large: {
        font: typeface.plain,
        size: vars.ref.fontSize.lg,
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: '1.4',
      },
      medium: {
        font: typeface.plain,
        size: vars.ref.fontSize.base,
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
      small: {
        font: typeface.plain,
        size: vars.ref.fontSize.xs,
        weight: vars.ref.fontWeight.thin,
        tracking: 'normal',
        lineHeight: 'normal',
      },
    },
  },
});
