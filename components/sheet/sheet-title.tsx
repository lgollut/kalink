'use client';

import { Title } from '@radix-ui/react-dialog';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  forwardRef,
} from 'react';

import { Heading } from '../heading';

const SheetTitle = (
  { className, children, ...props }: ComponentPropsWithoutRef<typeof Title>,
  ref: ForwardedRef<ElementRef<typeof Title>>,
) => (
  <Title ref={ref} asChild {...props}>
    <Heading use="h2" className={className}>
      {children}
    </Heading>
  </Title>
);

const WrappedSheetTitle = forwardRef(SheetTitle);
export { WrappedSheetTitle as SheetTitle };
