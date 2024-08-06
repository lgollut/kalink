'use client';

import { Overlay } from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  forwardRef,
} from 'react';

import { sheetOverlay } from './sheet-overlay.css';

const SheetOverlay = (
  { className, ...props }: ComponentPropsWithoutRef<typeof Overlay>,
  ref: ForwardedRef<ElementRef<typeof Overlay>>,
) => <Overlay ref={ref} className={clsx(sheetOverlay, className)} {...props} />;

const WrappedSheetOverlay = forwardRef(SheetOverlay);
export { WrappedSheetOverlay as SheetOverlay };
