import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType } from 'react';

import { BoxProps } from '@/components/box/box.types';

import { loader } from './loader.css';
import { loaderWrapper } from './moon-loader.css';

export type LoaderProps<TUse extends ElementType> = BoxProps<TUse> & {
  forceMount?: boolean;
  className?: string;
} & LoaderVariants;

export type LoaderVariants = NonNullable<RecipeVariants<typeof loader>>;
export type MoonLoaderVariants = NonNullable<
  RecipeVariants<typeof loaderWrapper>
>;
