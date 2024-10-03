'use client';

import { Trigger } from '@radix-ui/react-popover';
import { ElementRef, ForwardedRef, forwardRef } from 'react';

import { PopoverTriggerProps } from './popover.types';

const PopoverTrigger = (
  { children, ...props }: PopoverTriggerProps,
  ref: ForwardedRef<ElementRef<typeof Trigger>>,
) => (
  <Trigger ref={ref} {...props}>
    {children}
  </Trigger>
);

const WrappedPopoverTrigger = forwardRef(PopoverTrigger);

export { WrappedPopoverTrigger as PopoverTrigger };
