import { RecipeVariants } from '@vanilla-extract/recipes';
import { ReactNode, HTMLAttributes } from 'react';

import { formFieldMessage } from './form-field-message.css';

export type FormFieldProps = {
  name: string;
  label: string;
  children: ReactNode;
  errors?: string | null;
  hideErrorMessage: boolean;
};

export type FormFieldMessageProps = HTMLAttributes<HTMLDivElement> &
  FormFieldMessageVariants & {
    id: string;
    error?: boolean;
  };

export type FormFieldErrorProps = Omit<FormFieldMessageProps, 'id'>;

export type FormFieldDescriptionProps = Omit<FormFieldMessageProps, 'id'>;

export type FormFieldMessageVariants = NonNullable<
  RecipeVariants<typeof formFieldMessage>
>;
