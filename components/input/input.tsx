'use client';

import { clsx } from 'clsx';
import { ForwardedRef, forwardRef, useRef } from 'react';

import { Box } from '@/components/box';
import { Cluster } from '@/components/cluster';
import { useFormFieldContext } from '@/components/form-field/form-field-context';
import { mergeRefs } from '@/utils/merge-refs';

import { InputWrapper } from './input-wrapper';
import { input } from './input.css';
import { InputProps } from './input.types';

const Input = (
  {
    className,
    type = 'text',
    startAdornment,
    endAdornment,
    disabled,
    inputRef,
    children,
    tintScheme,
    variant,
    size,
    ...props
  }: InputProps,
  forwardedRef: ForwardedRef<HTMLDivElement>,
) => {
  const ref = useRef<HTMLInputElement>(null);
  const { errors } = useFormFieldContext();

  return (
    <InputWrapper
      ref={forwardedRef}
      inputRef={ref}
      disabled={disabled}
      tintScheme={tintScheme}
      variant={variant}
      size={size}
    >
      <Cluster gap="sm" width="full">
        {startAdornment}
        <input
          ref={mergeRefs([inputRef, ref])}
          type={type}
          className={clsx(input, className)}
          disabled={disabled}
          aria-invalid={errors ? 'true' : undefined}
          {...props}
        />
      </Cluster>
      <Box flexShrink={0}>{endAdornment}</Box>
    </InputWrapper>
  );
};

const WrappedInput = forwardRef(Input);

export { WrappedInput as Input };
