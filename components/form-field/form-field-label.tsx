import { ElementRef, ForwardedRef, forwardRef } from 'react';

import { Label } from '@/components/label';
import { LabelProps } from '@/components/label/label.types';

import { useFormFieldContext } from './form-field-context';
import { useFormFieldItemContext } from './form-field-item-context';

const UnwrappedFormFieldLabel = (
  { className, children, required, ...props }: LabelProps,
  ref: ForwardedRef<ElementRef<typeof Label>>,
) => {
  const { errors } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  return (
    <Label
      ref={ref}
      className={className}
      htmlFor={id}
      error={!!errors}
      {...props}
    >{`${children}${required ? ' *' : ''}`}</Label>
  );
};

export const FormFieldLabel = forwardRef(UnwrappedFormFieldLabel);
