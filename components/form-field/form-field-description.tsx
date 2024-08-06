'use client';

import { forwardRef, ElementRef, ForwardedRef } from 'react';

import { useFormFieldItemContext } from './form-field-item-context';
import { FormFieldMessage } from './form-field-message';
import { FormFieldDescriptionProps } from './form-field.types';

const UnwrappedFormFieldDescription = (
  props: FormFieldDescriptionProps,
  ref: ForwardedRef<ElementRef<typeof FormFieldMessage>>,
) => {
  const { id } = useFormFieldItemContext();

  if (!props.children) {
    return;
  }

  return <FormFieldMessage ref={ref} id={`${id}-description`} {...props} />;
};

export const FormFieldDescription = forwardRef(UnwrappedFormFieldDescription);
