import { RecipeVariants } from '@vanilla-extract/recipes';
import { ForwardedRef, InputHTMLAttributes, ReactNode, RefObject } from 'react';

import { UnconditionalProperties } from '@/styles/sprinkles.css';

import { inputAppearance } from './input-appearance.css';

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  inputRef?: ForwardedRef<HTMLInputElement>;
  tintScheme?: UnconditionalProperties['tintScheme'];
} & InputAppearanceVariants;

export type InputWrapperProps = {
  children: ReactNode;
  className?: string;
  inputRef: RefObject<HTMLInputElement>;
  disabled?: boolean;
  tintScheme?: UnconditionalProperties['tintScheme'];
} & InputAppearanceVariants;

export type InputAppearanceVariants = NonNullable<
  RecipeVariants<typeof inputAppearance>
>;
