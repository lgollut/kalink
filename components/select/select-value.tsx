'use client';

import { Value } from '@radix-ui/react-select';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  forwardRef,
} from 'react';

const UnwrappedSelectValue = (
  props: ComponentPropsWithoutRef<typeof Value>,
  ref: ForwardedRef<ElementRef<typeof Value>>,
) => {
  return <Value ref={ref} {...props} />;
};

export const SelectValue = forwardRef(UnwrappedSelectValue);
