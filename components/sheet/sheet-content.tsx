'use client';

import { Content } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { ElementRef, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { ScrollArea } from '../scroll-area';
import { Stack } from '../stack';

import { SheetPortal } from './sheet';
import { sheetContent } from './sheet-content.css';
import { SheetContentProps } from './sheet-content.types';
import { SheetOverlay } from './sheet-overlay';

const SheetContent = (
  {
    className,
    children,
    container,
    gap = 'lg',
    tintScheme = 'surface',
    side,
    size,
    ...props
  }: SheetContentProps,
  ref: ForwardedRef<ElementRef<typeof Content>>,
) => (
  <SheetPortal container={container}>
    <SheetOverlay />
    <Content asChild>
      <Box
        ref={ref}
        boxShadow="low"
        tintScheme={tintScheme}
        className={clsx(sheetContent({ side, size }), className)}
        {...props}
      >
        <ScrollArea>
          <Stack gap={gap}>{children}</Stack>
        </ScrollArea>
      </Box>
    </Content>
  </SheetPortal>
);

const WrappedSheetContent = forwardRef(SheetContent);
export { WrappedSheetContent as SheetContent };
