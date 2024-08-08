import { styleVariants } from '@vanilla-extract/css';

import { vars } from './contract.css';
import { components } from './layers.css';

export const typography = styleVariants({
  displayLarge: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.display.large.font,
        fontWeight: vars.system.type.display.large.weight,
        fontSize: vars.system.type.display.large.size,
        lineHeight: vars.system.type.display.large.lineHeight,
        letterSpacing: vars.system.type.display.large.tracking,
      },
    },
  },
  displayMedium: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.display.medium.font,
        fontWeight: vars.system.type.display.medium.weight,
        fontSize: vars.system.type.display.medium.size,
        lineHeight: vars.system.type.display.medium.lineHeight,
        letterSpacing: vars.system.type.display.medium.tracking,
      },
    },
  },
  displaySmall: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.display.small.font,
        fontWeight: vars.system.type.display.small.weight,
        fontSize: vars.system.type.display.small.size,
        lineHeight: vars.system.type.display.small.lineHeight,
        letterSpacing: vars.system.type.display.small.tracking,
      },
    },
  },
  headlineLarge: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.headline.large.font,
        fontWeight: vars.system.type.headline.large.weight,
        fontSize: vars.system.type.headline.large.size,
        lineHeight: vars.system.type.headline.large.lineHeight,
        letterSpacing: vars.system.type.headline.large.tracking,
      },
    },
  },
  headlineMedium: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.headline.medium.font,
        fontWeight: vars.system.type.headline.medium.weight,
        fontSize: vars.system.type.headline.medium.size,
        lineHeight: vars.system.type.headline.medium.lineHeight,
        letterSpacing: vars.system.type.headline.medium.tracking,
      },
    },
  },
  headlineSmall: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.headline.small.font,
        fontWeight: vars.system.type.headline.small.weight,
        fontSize: vars.system.type.headline.small.size,
        lineHeight: vars.system.type.headline.small.lineHeight,
        letterSpacing: vars.system.type.headline.small.tracking,
      },
    },
  },
  titleLarge: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.title.large.font,
        fontWeight: vars.system.type.title.large.weight,
        fontSize: vars.system.type.title.large.size,
        lineHeight: vars.system.type.title.large.lineHeight,
        letterSpacing: vars.system.type.title.large.tracking,
      },
    },
  },
  titleMedium: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.title.medium.font,
        fontWeight: vars.system.type.title.medium.weight,
        fontSize: vars.system.type.title.medium.size,
        lineHeight: vars.system.type.title.medium.lineHeight,
        letterSpacing: vars.system.type.title.medium.tracking,
      },
    },
  },
  titleSmall: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.title.small.font,
        fontWeight: vars.system.type.title.small.weight,
        fontSize: vars.system.type.title.small.size,
        lineHeight: vars.system.type.title.small.lineHeight,
        letterSpacing: vars.system.type.title.small.tracking,
      },
    },
  },
  labelLarge: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.label.large.font,
        fontSize: vars.system.type.label.large.size,
        fontWeight: vars.system.type.label.large.weight,
        letterSpacing: vars.system.type.label.large.tracking,
        lineHeight: vars.system.type.label.large.lineHeight,
      },
    },
  },
  labelMedium: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.label.medium.font,
        fontSize: vars.system.type.label.medium.size,
        fontWeight: vars.system.type.label.medium.weight,
        lineHeight: vars.system.type.label.medium.lineHeight,
        letterSpacing: vars.system.type.label.medium.tracking,
      },
    },
  },
  labelSmall: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.label.small.font,
        fontSize: vars.system.type.label.small.size,
        fontWeight: vars.system.type.label.small.weight,
        lineHeight: vars.system.type.label.small.lineHeight,
        letterSpacing: vars.system.type.label.small.tracking,
      },
    },
  },
  bodyLarge: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.body.large.font,
        fontSize: vars.system.type.body.large.size,
        fontWeight: vars.system.type.body.large.weight,
        letterSpacing: vars.system.type.body.large.tracking,
        lineHeight: vars.system.type.body.large.lineHeight,
      },
    },
  },
  bodyMedium: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.body.medium.font,
        fontSize: vars.system.type.body.medium.size,
        fontWeight: vars.system.type.body.medium.weight,
        letterSpacing: vars.system.type.body.medium.tracking,
        lineHeight: vars.system.type.body.medium.lineHeight,
      },
    },
  },
  bodySmall: {
    '@layer': {
      [components]: {
        fontFamily: vars.system.type.body.small.font,
        fontSize: vars.system.type.body.small.size,
        fontWeight: vars.system.type.body.small.weight,
        letterSpacing: vars.system.type.body.small.tracking,
        lineHeight: vars.system.type.body.small.lineHeight,
      },
    },
  },
});
