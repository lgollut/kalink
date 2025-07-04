import { PrismicNextImageProps } from '@prismicio/next';
import { RecipeVariants } from '@vanilla-extract/recipes';

import { image } from './image.css';

import type { ImageProps as NextImageProps } from 'next/image';

export type ImageVariants = NonNullable<RecipeVariants<typeof image>>;

export type ImageProps = (PrismicNextImageProps | NextImageProps) &
  ImageVariants;
