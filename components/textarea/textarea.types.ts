import { TextareaHTMLAttributes } from 'react';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  description?: string;
  hideLabel?: boolean;
  errors: string;
  hideErrorMessage?: boolean;
};
