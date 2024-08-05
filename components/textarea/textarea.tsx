'use client';

import { ForwardedRef, forwardRef } from 'react';

import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldItem,
  FormFieldLabel,
} from '@/components/form-field';
import { Stack } from '@/components/stack';

import { TextareaInput } from './textarea-input';
import { TextareaProps } from './textarea.types';

const Textarea = (
  {
    className,
    description,
    disabled,
    label,
    name,
    hideLabel,
    errors,
    required,
    hideErrorMessage = false,
    ...rest
  }: TextareaProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <FormField
      name={name}
      label={label}
      errors={errors}
      hideErrorMessage={hideErrorMessage}
    >
      <FormFieldItem>
        <Stack gap="xs">
          <FormFieldLabel
            disabled={disabled}
            required={required}
            hidden={hideLabel}
          >
            {label}
          </FormFieldLabel>

          <FormFieldControl>
            <TextareaInput
              ref={ref}
              name={name}
              className={className}
              disabled={disabled}
              aria-label={hideLabel ? label : undefined}
              {...rest}
            />
          </FormFieldControl>

          <FormFieldDescription disabled={disabled}>
            {description}
          </FormFieldDescription>
          <FormFieldError />
        </Stack>
      </FormFieldItem>
    </FormField>
  );
};

const WrappedTextarea = forwardRef(Textarea);

export { WrappedTextarea as Textarea };
