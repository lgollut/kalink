import {
  SprinklesProperties,
  createMapValueFn,
  createSprinkles,
} from '@vanilla-extract/sprinkles';

import { responsiveProperties } from './sprinkles-properties/responsive-properties.css';
import { unconditionalProperties } from './sprinkles-properties/unconditional-properties.css';

export const sprinkles = createSprinkles(
  responsiveProperties,
  unconditionalProperties,
);

export const mapResponsiveValue = createMapValueFn(responsiveProperties);

export {
  tintVar,
  onTintVar,
} from './sprinkles-properties/unconditional-properties.css';

export type SprinklesProps =
  typeof sprinkles.properties extends Set<infer T>
    ? {
        [KeyType in keyof T]: T[KeyType] extends SprinklesProperties
          ? KeyType
          : never;
      }
    : never;

export type {
  AlignItemsValues,
  AlignSelfValues,
  BorderRadiusValues,
  DisplayValues,
  FlexBasisValues,
  FlexDirectionValues,
  FlexGrowValues,
  FlexShrinkValues,
  FlexWrapValues,
  GapValues,
  InsetsValues,
  JustifyContentValues,
  MarginsValues,
  PaddingsValues,
  PositionValues,
  WidthValues,
  Box,
  Insets,
  Layouts,
  Margins,
  Paddings,
  Radius,
  Sizes,
  ResponsiveAlignItems,
  ResponsiveAlignSelf,
  ResponsiveBorderRadius,
  ResponsiveDisplay,
  ResponsiveFlexBasis,
  ResponsiveFlexDirection,
  ResponsiveFlexGrow,
  ResponsiveFlexShrink,
  ResponsiveFlexWrap,
  ResponsiveGap,
  ResponsiveInsets,
  ResponsiveJustifyContent,
  ResponsiveMargins,
  ResponsivePaddings,
  ResponsivePosition,
  ResponsiveProperties,
  ResponsiveWidth,
} from './sprinkles-properties/responsive-properties.css';

export type { UnconditionalProperties } from './sprinkles-properties/unconditional-properties.css';
