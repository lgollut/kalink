'use client';

import { Portal, Content } from '@radix-ui/react-popover';
import { clsx } from 'clsx';
import { ElementRef, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { ScrollArea } from '@/components/scroll-area';

import { popoverContent } from './popover-content.css';
import { PopoverContentProps, PopoverScrollableProps } from './popover.types';

const PopoverScrollable = ({
  children,
  scrollable = true,
  maxHeight,
}: PopoverScrollableProps) => {
  if (scrollable === false) {
    return children;
  }

  return <ScrollArea maxHeight={maxHeight}>{children}</ScrollArea>;
};

const PopoverContent = (
  {
    className,
    align = 'center',
    container,
    children,
    padding = 'base',
    borderRadius = 'default',
    tintScheme = 'surface',
    width,
    portaled = true,
    scrollable = true,
    maxHeight = 'var(--radix-popover-content-available-height)',
    ...props
  }: PopoverContentProps,
  ref: ForwardedRef<ElementRef<typeof Content>>,
) => {
  const content = (
    <Content
      ref={ref}
      align={align}
      className={clsx(popoverContent({ width, scrollable }), className)}
      sideOffset={0}
      asChild
      collisionPadding={16}
      {...props}
    >
      <Box
        padding={padding}
        borderRadius={borderRadius}
        tintScheme={tintScheme}
      >
        <PopoverScrollable scrollable={scrollable} maxHeight={maxHeight}>
          {children}
        </PopoverScrollable>
      </Box>
    </Content>
  );

  return portaled === true ? (
    <Portal container={container}>{content}</Portal>
  ) : (
    content
  );
};

const WrappedPopoverContent = forwardRef(PopoverContent);

export { WrappedPopoverContent as PopoverContent };
