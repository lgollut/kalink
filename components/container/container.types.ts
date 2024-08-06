import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType } from 'react';

import { BoxProps } from '../box/box.types';

import { container } from './container.css';

type OmittedBoxProps = 'marginInline' | 'width';

export type ContainerProps<TUse extends ElementType> = BoxProps<
  TUse,
  OmittedBoxProps
> &
  ContainerVariants;

export type ContainerVariants = NonNullable<RecipeVariants<typeof container>>;
