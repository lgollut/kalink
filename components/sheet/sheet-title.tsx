'use client';

import { Title } from '@radix-ui/react-dialog';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  forwardRef,
} from 'react';

import { Heading } from '../heading';
import { HeadingProps, HeadingTypes } from '../heading/heading.types';

const SheetTitle = <TUse extends HeadingTypes>(
  {
    className,
    children,
    ...props
  }: ComponentPropsWithoutRef<typeof Title> & HeadingProps<TUse>,
  ref: ForwardedRef<ElementRef<typeof Title>>,
) => {
  const { use = 'h2', ...rest } = props;

  return (
    <Title ref={ref} asChild {...rest}>
      <Heading use={use} className={className}>
        {children}
      </Heading>
    </Title>
  );
};

const WrappedSheetTitle = forwardRef(SheetTitle);
export { WrappedSheetTitle as SheetTitle };
