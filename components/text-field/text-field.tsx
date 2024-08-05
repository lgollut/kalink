import { ForwardedRef, forwardRef } from 'react';

import {
  FormField,
  FormFieldControl,
  FormFieldDescription,
  FormFieldError,
  FormFieldItem,
  FormFieldLabel,
} from '@/components/form-field';
import { Input } from '@/components/input';
import { Stack } from '@/components/stack';

import { TextFieldProps } from './text-field.types';

const UnwrappedTextField = (
  {
    description,
    disabled,
    label,
    name,
    hideLabel,
    errors,
    required,
    tintScheme,
    hideErrorMessage = false,
    ...rest
  }: TextFieldProps,
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
            required={required}
            disabled={disabled}
            hidden={hideLabel}
          >
            {label}
          </FormFieldLabel>

          <FormFieldControl>
            <Input
              ref={ref}
              name={name}
              disabled={disabled}
              required={required}
              aria-label={hideLabel ? label : undefined}
              tintScheme={tintScheme}
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

export const TextField = forwardRef(UnwrappedTextField);
