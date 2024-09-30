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

import { SelectContent } from './select-content';
import { SelectRoot } from './select-root';
import { SelectTrigger } from './select-trigger';
import { SelectValue } from './select-value';
import { SelectProps } from './select.types';

const Select = (
  {
    placeholder,
    label,
    children,
    container,
    description,
    name,
    hideErrorMessage = false,
    hideLabel,
    disabled,
    errors,
    onBlur,
    onFocus,
    required,
    ...props
  }: SelectProps,
  ref: ForwardedRef<HTMLButtonElement>,
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

          <SelectRoot disabled={disabled} {...props}>
            <FormFieldControl>
              <SelectTrigger
                ref={ref}
                title={hideLabel ? label : undefined}
                onBlur={onBlur}
                onFocus={onFocus}
                aria-label={hideLabel ? label : undefined}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormFieldControl>
            <SelectContent container={container}>{children}</SelectContent>
          </SelectRoot>
          <FormFieldDescription disabled={disabled}>
            {description}
          </FormFieldDescription>
          <FormFieldError />
        </Stack>
      </FormFieldItem>
    </FormField>
  );
};

export const WrappedSelect = forwardRef(Select);

export { WrappedSelect as Select };
