'use client';

import { forwardRef, ElementRef, ForwardedRef } from 'react';

import { useFormFieldContext } from './form-field-context';
import { useFormFieldItemContext } from './form-field-item-context';
import { FormFieldMessage } from './form-field-message';
import { FormFieldErrorProps } from './form-field.types';

const UnwrappedFormFieldError = (
  props: FormFieldErrorProps,
  ref: ForwardedRef<ElementRef<typeof FormFieldMessage>>,
) => {
  const { errors, hideErrorMessage } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  if (!errors || hideErrorMessage) {
    return null;
  }

  return (
    <FormFieldMessage ref={ref} id={`${id}-error`} error {...props}>
      {errors}
    </FormFieldMessage>
  );
};

export const FormFieldError = forwardRef(UnwrappedFormFieldError);
