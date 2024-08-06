import { createGlobalTheme } from '@vanilla-extract/css';

import { vars } from './contract.css';

export const cubicBezier = [0.4, 0, 0.2, 1] satisfies [
  number,
  number,
  number,
  number,
];

export const ref = createGlobalTheme(':root', vars.ref, {
  color: {
    primary0: `#302c03`,
    primary10: `#302c03`,
    primary20: `#605906`,
    primary30: `#908509`,
    primary40: `#c0b20c`,
    primary50: `#f1de0e`,
    primary60: `#f3e53f`,
    primary72: `#f7ed7a`,
    primary80: `#f9f29f`,
    primary90: `#fcf8cf`,
    primary95: `#fefce7`,
    primary99: `#fffefa`,
    primary100: `#ffffff`,

    secondary0: `#000000`,
    secondary10: `#132112`,
    secondary20: `#274224`,
    secondary30: `#3a6237`,
    secondary40: `#4e8349`,
    secondary50: `#61a45b`,
    secondary60: `#81b67c`,
    secondary70: `#a0c89d`,
    secondary80: `#c0dbbd`,
    secondary92: `#e5f0e4`,
    secondary95: `#eff6ef`,
    secondary99: `#fcfdfc`,
    secondary100: `#ffffff`,

    neutral0: `#000000`,
    neutral10: `#1a1a1a`,
    neutral20: `#343432`,
    neutral30: `#4e4e4b`,
    neutral40: `#686864`,
    neutral50: `#82827d`,
    neutral60: `#9b9b97`,
    neutral70: `#b4b4b1`,
    neutral80: `#cdcdcb`,
    neutral87: `#dededd`,
    neutral90: `#e6e6e5`,
    neutral92: `#ebebea`,
    neutral94: `#f0f0ef`,
    neutral96: `#f5f5f5`,
    neutral98: `#fafafa`,
    neutral100: `#ffffff`,

    error0: `#000000`,
    error10: `#240a0e`,
    error20: `#44131b`,
    error30: `#641c27`,
    error40: `#822433`,
    error50: `#b43247`,
    error60: `#cf5367`,
    error70: `#dd8391`,
    error80: `#e9afb8`,
    error90: `#f4d7dc`,
    error95: `#f9ebed`,
    error99: `#fefbfb`,
    error100: `#ffffff`,
  },

  fontSize: {
    '2xs': '0.75rem', // 12px
    xs: '0.875rem', // 14px
    sm: '0.938rem', // 15px
    base: '1rem', // 16px
    md: '1.125rem', // 18px
    lg: '1.25rem', // 20px
    xl: '1.75rem', // 28px
    '2xl': '2rem', // 32px
    '3xl': '2.25rem', // 36px
    '4xl': '2.5rem', // 40px
    '5xl': '2.75rem', // 44px
    '6xl': '3rem', // 48px
    '7xl': '4rem', // 64px
    '8xl': '4.5rem', // 72px
    '9xl': '5rem', // 80px
  },

  fontWeight: {
    thin: '300',
    regular: '400',
  },

  spacing: {
    none: '0rem', // 0px
    '2xs': '0.125rem', // 2px
    xs: '0.25rem', // 4px
    sm: '0.5rem', // 8px
    base: '1rem', // 16px
    md: '1.5rem', // 24px
    lg: '2rem', // 32px
    xl: '2.5rem', // 40px
    '2xl': '3rem', // 48px
    '3xl': '3.5rem', // 56px
    '4xl': '4rem', // 64px'
    '5xl': '4.5rem', // 72px
    '6xl': '6rem', // 96px
    '7xl': '8rem', // 128px
    '8xl': '10rem', // 160px
    '9xl': '14rem', // 224px
  },

  screen: {
    xs: '376px',
    sm: '560px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1440px',
    '3xl': '1920px',
  },

  radius: {
    none: '0', // 0px
    sharp: '0.125rem', // 2px
    small: '0.25rem', // 4px
    default: '0.5rem', // 8px
    rounded: '0.75rem', // 12px
    circle: '50%',
  },

  elevation: {
    none: 'none',
    minimal:
      '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    low: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    moderate:
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    high: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    peak: '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  },

  duration: {
    swift: '150ms',
    short: '250ms',
    standard: '300ms',
    long: '400ms',
    extended: '500ms',
  },

  easing: {
    inOut: `cubic-bezier(${cubicBezier.join(', ')})`,
    linear: 'linear',
  },
});
