import { createVar } from '@vanilla-extract/css';
import { calc } from '@vanilla-extract/css-utils';
import { ConditionalValue, defineProperties } from '@vanilla-extract/sprinkles';

import { vars } from '@/styles/contract.css';
import { utilities } from '@/styles/layers.css';
import { typography } from '@/styles/typography.css';

export const dividedSpace = createVar();

const displayValues = [
  'none',
  'block',
  'inline',
  'inline-block',
  'flex',
  'inline-flex',
  'grid',
  'list-item',
] as const;

const flexWrapValues = ['nowrap', 'wrap', 'wrap-reverse'] as const;
const flexDirectionValues = [
  'row',
  'column',
  'row-reverse',
  'column-reverse',
] as const;
const justifyContentValues = [
  'stretch',
  'flex-start',
  'center',
  'flex-end',
  'space-around',
  'space-between',
] as const;
const alignItemsValues = [
  'stretch',
  'flex-start',
  'center',
  'flex-end',
  'baseline',
] as const;
const alignSelfValues = [
  'auto',
  'stretch',
  'flex-start',
  'center',
  'flex-end',
  'baseline',
] as const;
const gapValues = vars.ref.spacing;
const flexGrowValues = [0, 1] as const;
const flexShrinkValues = [0, 1] as const;
const flexBasisValues = ['auto', '100%'] as const;

const alignContentValues = ['start', 'end', 'center'];
const justifySelfValues = ['start', 'end', 'center'];

const widthValues = ['auto', 'full', 'min-content', 'max-content'] as const;
const heightValues = ['auto', 'full'] as const;
const maxInlineSizeValues = [
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xl',
  'lg',
  'md',
  'base',
  'sm',
  'xs',
  'min-content',
  'max-content',
] as const;

const marginValues = { auto: 'auto', ...vars.ref.spacing } as const;
const paddingValues = { ...vars.ref.spacing } as const;
const insetValues = { auto: 'auto', ...vars.ref.spacing };

const borderRadiusValues = { inherit: 'inherit', ...vars.ref.radius };

const positionValues = [
  'static',
  'relative',
  'absolute',
  'fixed',
  'sticky',
] as const;

const textAlignValues = ['start', 'center', 'end'] as const;
const fontWeightValues = [300, 400] as const;

const dividedValues = [
  'none',
  '2xs',
  'xs',
  'sm',
  'base',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  '8xl',
  '9xl',
] as const;

export const responsiveProperties = defineProperties({
  '@layer': utilities,

  conditions: {
    xs: {},
    sm: {
      '@media': 'screen and (min-width: 568px)',
    },
    md: {
      '@media': 'screen and (min-width: 768px)',
    },
    lg: {
      '@media': 'screen and (min-width: 1024px)',
    },
    xl: {
      '@media': 'screen and (min-width: 1280px)',
    },
  },

  defaultCondition: 'xs',
  responsiveArray: ['xs', 'sm', 'md', 'lg', 'xl'],

  properties: {
    display: displayValues,

    flexWrap: flexWrapValues,
    flexDirection: flexDirectionValues,

    justifyContent: justifyContentValues,
    alignItems: alignItemsValues,
    alignSelf: alignSelfValues,

    alignContent: alignContentValues,
    justifySelf: justifySelfValues,

    columnGap: gapValues,
    rowGap: gapValues,

    flexGrow: flexGrowValues,
    flexShrink: flexShrinkValues,
    flexBasis: flexBasisValues,

    marginBlockStart: marginValues,
    marginInlineEnd: marginValues,
    marginBlockEnd: marginValues,
    marginInlineStart: marginValues,

    paddingBlockStart: paddingValues,
    paddingInlineEnd: paddingValues,
    paddingBlockEnd: paddingValues,
    paddingInlineStart: paddingValues,

    width: {
      auto: {
        width: 'auto',
      },
      full: {
        width: '100%',
      },
      'min-content': {
        width: 'min-content',
      },
      'max-content': {
        width: 'max-content',
      },
    },
    height: {
      auto: {
        height: 'auto',
      },
      full: {
        height: '100%',
      },
    },
    maxInlineSize: {
      '5xl': {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 100),
      },
      '4xl': {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 90),
      },
      '3xl': {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 80),
      },
      '2xl': {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 64),
      },
      xl: {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 48),
      },
      lg: {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 32),
      },
      md: {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 20),
      },
      base: {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 16),
      },
      sm: {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 12),
      },
      xs: {
        maxInlineSize: calc.multiply(vars.ref.spacing.base, 8),
      },
      'min-content': {
        maxInlineSize: 'min-content',
      },
      'max-content': {
        maxInlineSize: 'max-content',
      },
    },

    position: positionValues,

    insetBlockStart: insetValues,
    insetInlineEnd: insetValues,
    insetBlockEnd: insetValues,
    insetInlineStart: insetValues,

    borderStartEndRadius: borderRadiusValues,
    borderEndEndRadius: borderRadiusValues,
    borderEndStartRadius: borderRadiusValues,
    borderStartStartRadius: borderRadiusValues,

    textAlign: textAlignValues,
    typography: {
      displayLarge: {
        fontFamily: vars.system.type.display.large.font,
        fontWeight: vars.system.type.display.large.weight,
        fontSize: vars.system.type.display.large.size,
        lineHeight: vars.system.type.display.large.lineHeight,
        letterSpacing: vars.system.type.display.large.tracking,
      },
      displayMedium: {
        fontFamily: vars.system.type.display.medium.font,
        fontWeight: vars.system.type.display.medium.weight,
        fontSize: vars.system.type.display.medium.size,
        lineHeight: vars.system.type.display.medium.lineHeight,
        letterSpacing: vars.system.type.display.medium.tracking,
      },
      displaySmall: {
        fontFamily: vars.system.type.display.small.font,
        fontWeight: vars.system.type.display.small.weight,
        fontSize: vars.system.type.display.small.size,
        lineHeight: vars.system.type.display.small.lineHeight,
        letterSpacing: vars.system.type.display.small.tracking,
      },
      headlineLarge: {
        fontFamily: vars.system.type.headline.large.font,
        fontWeight: vars.system.type.headline.large.weight,
        fontSize: vars.system.type.headline.large.size,
        lineHeight: vars.system.type.headline.large.lineHeight,
        letterSpacing: vars.system.type.headline.large.tracking,
      },
      headlineMedium: {
        fontFamily: vars.system.type.headline.medium.font,
        fontWeight: vars.system.type.headline.medium.weight,
        fontSize: vars.system.type.headline.medium.size,
        lineHeight: vars.system.type.headline.medium.lineHeight,
        letterSpacing: vars.system.type.headline.medium.tracking,
      },
      headlineSmall: {
        fontFamily: vars.system.type.headline.small.font,
        fontWeight: vars.system.type.headline.small.weight,
        fontSize: vars.system.type.headline.small.size,
        lineHeight: vars.system.type.headline.small.lineHeight,
        letterSpacing: vars.system.type.headline.small.tracking,
      },
      titleLarge: {
        fontFamily: vars.system.type.title.large.font,
        fontWeight: vars.system.type.title.large.weight,
        fontSize: vars.system.type.title.large.size,
        lineHeight: vars.system.type.title.large.lineHeight,
        letterSpacing: vars.system.type.title.large.tracking,
      },
      titleMedium: {
        fontFamily: vars.system.type.title.medium.font,
        fontWeight: vars.system.type.title.medium.weight,
        fontSize: vars.system.type.title.medium.size,
        lineHeight: vars.system.type.title.medium.lineHeight,
        letterSpacing: vars.system.type.title.medium.tracking,
      },
      titleSmall: {
        fontFamily: vars.system.type.title.small.font,
        fontWeight: vars.system.type.title.small.weight,
        fontSize: vars.system.type.title.small.size,
        lineHeight: vars.system.type.title.small.lineHeight,
        letterSpacing: vars.system.type.title.small.tracking,
      },
      labelLarge: {
        fontFamily: vars.system.type.label.large.font,
        fontSize: vars.system.type.label.large.size,
        fontWeight: vars.system.type.label.large.weight,
        letterSpacing: vars.system.type.label.large.tracking,
        lineHeight: vars.system.type.label.large.lineHeight,
      },
      labelMedium: {
        fontFamily: vars.system.type.label.medium.font,
        fontSize: vars.system.type.label.medium.size,
        fontWeight: vars.system.type.label.medium.weight,
        lineHeight: vars.system.type.label.medium.lineHeight,
        letterSpacing: vars.system.type.label.medium.tracking,
      },
      labelSmall: {
        fontFamily: vars.system.type.label.small.font,
        fontSize: vars.system.type.label.small.size,
        fontWeight: vars.system.type.label.small.weight,
        lineHeight: vars.system.type.label.small.lineHeight,
        letterSpacing: vars.system.type.label.small.tracking,
      },
      bodyLarge: {
        fontFamily: vars.system.type.body.large.font,
        fontSize: vars.system.type.body.large.size,
        fontWeight: vars.system.type.body.large.weight,
        letterSpacing: vars.system.type.body.large.tracking,
        lineHeight: vars.system.type.body.large.lineHeight,
      },
      bodyMedium: {
        fontFamily: vars.system.type.body.medium.font,
        fontSize: vars.system.type.body.medium.size,
        fontWeight: vars.system.type.body.medium.weight,
        letterSpacing: vars.system.type.body.medium.tracking,
        lineHeight: vars.system.type.body.medium.lineHeight,
      },
      bodySmall: {
        fontFamily: vars.system.type.body.small.font,
        fontSize: vars.system.type.body.small.size,
        fontWeight: vars.system.type.body.small.weight,
        letterSpacing: vars.system.type.body.small.tracking,
        lineHeight: vars.system.type.body.small.lineHeight,
      },
    },
    fontWeight: fontWeightValues,

    divided: dividedValues.reduce<
      Partial<Record<(typeof dividedValues)[number], any>>
    >(
      (acc, value) => ({
        ...acc,
        [value]: {
          vars: {
            [dividedSpace]: calc(
              vars.ref.spacing[value as keyof typeof vars.ref.spacing],
            )
              .divide(-2)
              .toString(),
          },
        },
      }),
      {},
    ),
  },

  shorthands: {
    gap: ['columnGap', 'rowGap'],

    margin: [
      'marginBlockStart',
      'marginInlineEnd',
      'marginBlockEnd',
      'marginInlineStart',
    ],
    marginBlock: ['marginBlockStart', 'marginBlockEnd'],
    marginInline: ['marginInlineStart', 'marginInlineEnd'],

    padding: [
      'paddingBlockStart',
      'paddingInlineEnd',
      'paddingBlockEnd',
      'paddingInlineStart',
    ],
    paddingBlock: ['paddingBlockStart', 'paddingBlockEnd'],
    paddingInline: ['paddingInlineStart', 'paddingInlineEnd'],

    inset: [
      'insetBlockStart',
      'insetInlineEnd',
      'insetBlockEnd',
      'insetInlineStart',
    ],
    insetBlock: ['insetBlockStart', 'insetBlockEnd'],
    insetInline: ['insetInlineStart', 'insetInlineEnd'],

    borderRadius: [
      'borderStartEndRadius',
      'borderEndEndRadius',
      'borderEndStartRadius',
      'borderStartStartRadius',
    ],
  },
});

export type ResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;

export type DisplayValues = (typeof displayValues)[number];
export type ResponsiveDisplay = ResponsiveValue<DisplayValues>;

export type FlexWrapValues = (typeof flexWrapValues)[number];
export type ResponsiveFlexWrap = ResponsiveValue<FlexWrapValues>;

export type FlexDirectionValues = (typeof flexDirectionValues)[number];
export type ResponsiveFlexDirection = ResponsiveValue<FlexDirectionValues>;

export type JustifyContentValues = (typeof justifyContentValues)[number];
export type ResponsiveJustifyContent = ResponsiveValue<JustifyContentValues>;

export type AlignItemsValues = (typeof alignItemsValues)[number];
export type ResponsiveAlignItems = ResponsiveValue<AlignItemsValues>;

export type AlignSelfValues = (typeof alignSelfValues)[number];
export type ResponsiveAlignSelf = ResponsiveValue<AlignSelfValues>;

export type AlignContentValues = (typeof alignContentValues)[number];
export type ResponsiveAlignContent = ResponsiveValue<AlignContentValues>;

export type JustifySelfValues = (typeof justifySelfValues)[number];
export type ResponsiveJustifySelf = ResponsiveValue<JustifySelfValues>;

export type GapValues = keyof typeof gapValues;
export type ResponsiveGap = ResponsiveValue<GapValues>;

export type FlexGrowValues = (typeof flexGrowValues)[number];
export type ResponsiveFlexGrow = ResponsiveValue<FlexGrowValues>;

export type FlexShrinkValues = (typeof flexShrinkValues)[number];
export type ResponsiveFlexShrink = ResponsiveValue<FlexShrinkValues>;

export type FlexBasisValues = (typeof flexBasisValues)[number];
export type ResponsiveFlexBasis = ResponsiveValue<FlexBasisValues>;

export type WidthValues = (typeof widthValues)[number];
export type ResponsiveWidth = ResponsiveValue<WidthValues>;

export type HeightValues = (typeof heightValues)[number];
export type ResponsiveHeight = ResponsiveValue<HeightValues>;

export type MaxInlineSizeValues = (typeof maxInlineSizeValues)[number];
export type ResponsiveMaxInlineSize = ResponsiveValue<MaxInlineSizeValues>;

export type PaddingsValues = keyof typeof paddingValues;
export type ResponsivePaddings = ResponsiveValue<PaddingsValues>;

export type MarginsValues = keyof typeof marginValues;
export type ResponsiveMargins = ResponsiveValue<MarginsValues>;

export type InsetsValues = keyof typeof insetValues;
export type ResponsiveInsets = ResponsiveValue<InsetsValues>;

export type BorderRadiusValues = keyof typeof borderRadiusValues;
export type ResponsiveBorderRadius = ResponsiveValue<BorderRadiusValues>;

export type PositionValues = (typeof positionValues)[number];
export type ResponsivePosition = ResponsiveValue<PositionValues>;

export type TextAlignValues = (typeof textAlignValues)[number];
export type ResponsiveTextAlign = ResponsiveValue<TextAlignValues>;

export type FontWeightValues = (typeof fontWeightValues)[number];
export type ResponsiveFontWeight = ResponsiveValue<FontWeightValues>;

export type TypographyValues = keyof typeof typography;
export type ResponsiveTypography = ResponsiveValue<TypographyValues>;

export type DividedValues = (typeof dividedValues)[number];
export type ResponsiveDivided = ResponsiveValue<DividedValues>;

export type Sizes = {
  /** Mapped to `width` css property */
  width?: ResponsiveWidth;
  /** Mapped to `height` css property */
  height?: ResponsiveHeight;
  /** Mapped to `max-inline-size` css property */
  maxInlineSize?: ResponsiveMaxInlineSize;
};

export type Layouts = {
  /** Mapped to `position` css property */
  position?: ResponsivePosition;
};

export type Box = {
  /** Mapped to `display` css property */
  display?: ResponsiveDisplay;
  /** Mapped to `flex-wrap` css property */
  flexWrap?: ResponsiveFlexWrap;
  /** Mapped to `flex-direction` css property */
  flexDirection?: ResponsiveFlexDirection;
  /** Mapped to `justify-content` css property */
  justifyContent?: ResponsiveJustifyContent;
  /** Mapped to `align-items` css property */
  alignItems?: ResponsiveAlignItems;
  /** Mapped to `align-self` css property */
  alignSelf?: ResponsiveAlignSelf;
  /** Mapped to `align-content` css property */
  alignContent?: ResponsiveAlignContent;
  /** Mapped to `justify-self` css property */
  justifySelf?: ResponsiveJustifySelf;
  /** Mapped to `gap` css property */
  gap?: ResponsiveGap;
  /** Mapped to `column-gap` css property */
  columnGap?: ResponsiveGap;
  /** Mapped to `row-gap` css property */
  rowGap?: ResponsiveGap;
  /** Mapped to `flex-grow` css property */
  flexGrow?: ResponsiveFlexGrow;
  /** Mapped to `flex-shrink` css property */
  flexShrink?: ResponsiveFlexShrink;
  /** Mapped to `flex-basis` css property */
  flexBasis?: ResponsiveFlexBasis;
};

export type Paddings = {
  /** Mapped to `padding` css property */
  padding?: ResponsivePaddings;
  /** Mapped to `padding-block` css property */
  paddingBlock?: ResponsivePaddings;
  /** Mapped to `padding-inline` css property */
  paddingInline?: ResponsivePaddings;
  /** Mapped to `padding-block-start` css property */
  paddingBlockStart?: ResponsivePaddings;
  /** Mapped to `padding-inline-end` css property */
  paddingInlineEnd?: ResponsivePaddings;
  /** Mapped to `padding-block-end` css property */
  paddingBlockEnd?: ResponsivePaddings;
  /** Mapped to `padding-inline-start` css property */
  paddingInlineStart?: ResponsivePaddings;
};

export type Margins = {
  /** Mapped to `margin` css property */
  margin?: ResponsiveMargins;
  /** Mapped to `margin-block` css property */
  marginBlock?: ResponsiveMargins;
  /** Mapped to `margin-inline` css property */
  marginInline?: ResponsiveMargins;
  /** Mapped to `margin-block-start` css property */
  marginBlockStart?: ResponsiveMargins;
  /** Mapped to `margin-inline-end` css property */
  marginInlineEnd?: ResponsiveMargins;
  /** Mapped to `margin-block-end` css property */
  marginBlockEnd?: ResponsiveMargins;
  /** Mapped to `margin-inline-start` css property */
  marginInlineStart?: ResponsiveMargins;
};

export type Insets = {
  /** Mapped to `inset` css property */
  inset?: ResponsiveInsets;
  /** Mapped to `inset-block` css property */
  insetBlock?: ResponsiveInsets;
  /** Mapped to `inset-inline` css property */
  insetInline?: ResponsiveInsets;
  /** Mapped to `inset-block-start` css property */
  insetBlockStart?: ResponsiveInsets;
  /** Mapped to `inset-inline-end` css property */
  insetInlineEnd?: ResponsiveInsets;
  /** Mapped to `inset-block-end` css property */
  insetBlockEnd?: ResponsiveInsets;
  /** Mapped to `inset-inline-start` css property */
  insetInlineStart?: ResponsiveInsets;
};

export type Radius = {
  /** Mapped to `border-radius` css property */
  borderRadius?: ResponsiveBorderRadius;
  /** Mapped to `border-start-end-radius` css property */
  borderStartEndRadius?: ResponsiveBorderRadius;
  /** Mapped to `border-end-end-radius` css property */
  borderEndEndRadius?: ResponsiveBorderRadius;
  /** Mapped to `border-end-start-radius` css property */
  borderEndStartRadius?: ResponsiveBorderRadius;
  /** Mapped to `border-start-start-radius` css property */
  borderStartStartRadius?: ResponsiveBorderRadius;
};

export type Text = {
  /** Mapped to `text-align` css property */
  textAlign?: ResponsiveTextAlign;

  /** Mapped to `font-weight` css property */
  fontWeight?: ResponsiveFontWeight;

  /** Mapped to `font-family`, `font-weight`, `font-size`, `line-height` and `letter-spacing` css property */
  typography?: ResponsiveTypography;
};

export type Misc = {
  divided?: ResponsiveDivided;
};

export type ResponsiveProperties = Sizes &
  Layouts &
  Paddings &
  Margins &
  Insets &
  Box &
  Radius &
  Text &
  Misc;
