'use client';

import {
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from '@radix-ui/react-scroll-area';
import { clsx } from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

import { scrollAreaScrollbar, scrollAreaThumb } from './scroll-area.css';
import { ScrollAreaScrollbarProps } from './scroll-area.types';

const ScrollBar = (
  { className, orientation = 'vertical', ...props }: ScrollAreaScrollbarProps,
  ref: ForwardedRef<any>,
) => (
  <ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={clsx(scrollAreaScrollbar({ orientation }), className)}
    {...props}
  >
    <ScrollAreaThumb className={scrollAreaThumb} />
  </ScrollAreaScrollbar>
);

const WrappedScrollBar = forwardRef(ScrollBar);

export { WrappedScrollBar as ScrollBar };
