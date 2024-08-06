'use client';

import { Root } from '@radix-ui/react-label';
import { clsx } from 'clsx';
import { ElementRef, ForwardedRef, forwardRef } from 'react';

import { label } from './label.css';
import { LabelProps } from './label.types';

const Label = (
  { className, disabled, error, ...props }: LabelProps,
  ref: ForwardedRef<ElementRef<typeof Root>>,
) => (
  <Root
    ref={ref}
    className={clsx(label({ disabled, error }), className)}
    {...props}
  />
);

const WrappedLabel = forwardRef(Label);

export { WrappedLabel as Label };
