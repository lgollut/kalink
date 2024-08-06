'use client';

import { Slot } from '@radix-ui/react-slot';
import {
  forwardRef,
  ElementRef,
  ComponentPropsWithoutRef,
  ForwardedRef,
} from 'react';

import { useFormFieldContext } from './form-field-context';
import { useFormFieldItemContext } from './form-field-item-context';

const UnwrappedFormFieldControl = (
  props: ComponentPropsWithoutRef<typeof Slot>,
  ref: ForwardedRef<ElementRef<typeof Slot>>,
) => {
  const { messageIds, errors } = useFormFieldContext();
  const { id } = useFormFieldItemContext();

  return (
    <Slot
      ref={ref}
      id={id}
      aria-describedby={messageIds.join(' ') || undefined}
      aria-invalid={!!errors || undefined}
      {...props}
    />
  );
};

export const FormFieldControl = forwardRef(UnwrappedFormFieldControl);
