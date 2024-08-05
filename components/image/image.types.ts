import { PrismicNextImageProps } from '@prismicio/next';
import { RecipeVariants } from '@vanilla-extract/recipes';

import { image } from './image.css';

export type ImageVariants = NonNullable<RecipeVariants<typeof image>>;

export type ImageProps = PrismicNextImageProps & ImageVariants;
