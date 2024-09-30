'use client';

import { Portal, Content, Viewport } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { forwardRef, ElementRef, ForwardedRef } from 'react';

import { Box } from '@/components/box';
import { popoverContent } from '@/components/popover/popover-content.css';
import { ScrollArea } from '@/components/scroll-area';

import { selectContentViewport } from './select-content.css';
import { SelectContentPortalProps, SelectContentProps } from './select.types';

const SelectContentPortal = ({
  children,
  container,
}: SelectContentPortalProps) => {
  if (container === false) {
    return children;
  }

  return <Portal container={container}>{children}</Portal>;
};

const UnwrappedSelectContent = (
  {
    className,
    children,
    position = 'popper',
    container,
    ...props
  }: SelectContentProps,
  ref: ForwardedRef<ElementRef<typeof Content>>,
) => {
  return (
    <SelectContentPortal container={container}>
      <Content ref={ref} position={position} asChild {...props}>
        <Box
          tintScheme="surface"
          borderRadius="small"
          padding="xs"
          className={clsx(popoverContent())}
        >
          <Viewport className={selectContentViewport}>
            <ScrollArea maxHeight="16rem">{children}</ScrollArea>
          </Viewport>
        </Box>
      </Content>
    </SelectContentPortal>
  );
};

export const SelectContent = forwardRef(UnwrappedSelectContent);
