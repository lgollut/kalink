import { RecipeVariants } from '@vanilla-extract/recipes';
import { ElementType } from 'react';

import { BoxProps } from '@/components/box/box.types';

import { text } from './text.css';

export type TextVariants = NonNullable<RecipeVariants<typeof text>>;

export type TextProps<TUse extends ElementType> = TextVariants & BoxProps<TUse>;
