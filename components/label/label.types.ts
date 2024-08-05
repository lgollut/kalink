import { Root } from '@radix-ui/react-label';
import { RecipeVariants } from '@vanilla-extract/recipes';

import { label } from './label.css';

export type LabelProps = React.ComponentPropsWithoutRef<typeof Root> & {
  required?: boolean;
} & LabelVariants;

export type LabelVariants = NonNullable<RecipeVariants<typeof label>>;
