import { ComponentPropsWithRef, ReactNode } from 'react';

import { Input } from '@/components/input';
import { UnconditionalProperties } from '@/styles/sprinkles.css';

export type TextFieldProps = ComponentPropsWithRef<typeof Input> & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  name: string;
  label: string;
  description?: string;
  wrapperClassName?: string;
  hideLabel?: boolean;
  errors?: string | null;
  hideErrorMessage?: boolean;
  tintScheme?: UnconditionalProperties['tintScheme'];
};
