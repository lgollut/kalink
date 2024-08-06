'use client';

import { Corner, Root, Viewport } from '@radix-ui/react-scroll-area';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { ForwardedRef, forwardRef } from 'react';

import {
  scrollArea,
  scrollAreaViewport,
  viewportMaxHeight,
} from './scroll-area.css';
import { ScrollAreaProps } from './scroll-area.types';
import { ScrollBar } from './scroll-bar';

const ScrollArea = (
  { className, children, maxHeight = 'initial', ...props }: ScrollAreaProps,
  ref: ForwardedRef<any>,
) => (
  <Root ref={ref} className={scrollArea} {...props}>
    <Viewport
      className={scrollAreaViewport}
      style={assignInlineVars({
        [viewportMaxHeight]: maxHeight,
      })}
    >
      {children}
    </Viewport>
    <ScrollBar />
    <Corner />
  </Root>
);

const WrappedScrollArea = forwardRef(ScrollArea);

export { WrappedScrollArea as ScrollArea };
