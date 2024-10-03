import { RecipeVariants } from '@vanilla-extract/recipes';

import { menuItem } from './menu-item.css';
import { menuSeparator } from './menu-separator.css';

export type MenuSeparatorVariants = NonNullable<
  RecipeVariants<typeof menuSeparator>
>;

export type MenuItemVariants = NonNullable<RecipeVariants<typeof menuItem>>;
