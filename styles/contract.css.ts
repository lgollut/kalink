import { createThemeContract } from '@vanilla-extract/css';

const typeContract = {
  font: null,
  size: null,
  weight: null,
  lineHeight: null,
  tracking: null,
};

export const vars = createThemeContract({
  ref: {
    color: {
      primary0: null,
      primary10: null,
      primary20: null,
      primary30: null,
      primary40: null,
      primary50: null,
      primary60: null,
      primary72: null,
      primary80: null,
      primary90: null,
      primary95: null,
      primary99: null,
      primary100: null,

      secondary0: null,
      secondary10: null,
      secondary20: null,
      secondary30: null,
      secondary40: null,
      secondary50: null,
      secondary60: null,
      secondary70: null,
      secondary80: null,
      secondary92: null,
      secondary95: null,
      secondary99: null,
      secondary100: null,

      neutral0: null,
      neutral10: null,
      neutral20: null,
      neutral30: null,
      neutral40: null,
      neutral50: null,
      neutral60: null,
      neutral70: null,
      neutral80: null,
      neutral87: null,
      neutral90: null,
      neutral92: null,
      neutral94: null,
      neutral96: null,
      neutral98: null,
      neutral100: null,

      error0: null,
      error10: null,
      error20: null,
      error30: null,
      error40: null,
      error50: null,
      error60: null,
      error70: null,
      error80: null,
      error90: null,
      error95: null,
      error99: null,
      error100: null,
    },

    fontSize: {
      '2xs': null,
      xs: null,
      sm: null,
      base: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      '4xl': null,
      '5xl': null,
      '6xl': null,
      '7xl': null,
      '8xl': null,
      '9xl': null,
    },

    fontWeight: {
      thin: null,
      regular: null,
    },

    spacing: {
      none: null,
      '2xs': null,
      xs: null,
      sm: null,
      base: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
      '4xl': null,
      '5xl': null,
      '6xl': null,
      '7xl': null,
      '8xl': null,
      '9xl': null,
    },

    screen: {
      xs: null,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      '2xl': null,
      '3xl': null,
    },

    radius: {
      none: null,
      sharp: null,
      small: null,
      default: null,
      rounded: null,
      circle: null,
    },

    elevation: {
      none: null,
      minimal: null,
      low: null,
      moderate: null,
      high: null,
      peak: null,
    },

    duration: {
      swift: null,
      short: null,
      standard: null,
      long: null,
      extended: null,
    },

    easing: {
      inOut: null,
      linear: null,
    },
  },

  system: {
    layout: {
      measure: null,
    },
    color: {
      primary: null,
      onPrimary: null,
      primaryContainer: null,
      onPrimaryContainer: null,

      secondary: null,
      onSecondary: null,
      secondaryContainer: null,
      onSecondaryContainer: null,

      error: null,
      onError: null,
      errorContainer: null,
      onErrorContainer: null,

      surfaceDim: null,
      surface: null,
      surfaceBright: null,
      onSurface: null,

      surfaceContainerLowest: null,
      surfaceContainerLow: null,
      surfaceContainer: null,
      surfaceContainerHigh: null,
      surfaceContainerHighest: null,

      outline: null,
    },

    state: {
      hovered: {
        opacity: null,
      },
      focused: {
        opacity: null,
      },
      pressed: {
        opacity: null,
      },
    },

    typeface: {
      brand: null,
      plain: null,
    },

    type: {
      display: {
        large: typeContract,
        medium: typeContract,
        small: typeContract,
      },

      headline: {
        large: typeContract,
        medium: typeContract,
        small: typeContract,
      },

      title: {
        large: typeContract,
        medium: typeContract,
        small: typeContract,
      },

      label: {
        large: typeContract,
        medium: typeContract,
        small: typeContract,
      },

      body: {
        large: typeContract,
        medium: typeContract,
        small: typeContract,
      },
    },
  },
});
