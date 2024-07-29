import { RecipeVariants } from '@vanilla-extract/recipes';

import { BoxProps } from '@/components/box/box.types';

import { headingWrapper } from './heading.css';

export type HeadingTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type OmittedBoxProps = 'typography' | 'divided';

export type HeadingProps<TUse extends HeadingTypes> = {
  subtitle?: string;
  underline?: boolean;
} & BoxProps<TUse, OmittedBoxProps> &
  HeadingWrapperVariants;

export type HeadingWrapperVariants = NonNullable<
  RecipeVariants<typeof headingWrapper>
>;
