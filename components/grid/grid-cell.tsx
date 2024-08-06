'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { BoxProps } from '@/components/box/box.types';

import {
  gridColumnStartVar,
  gridColumnEndVar,
  gridCell,
  gridRowStartVar,
  gridRowEndVar,
} from './grid-cell.css';

type GridCellProps<TUse extends ElementType> = {
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRowStart?: string;
  gridRowEnd?: string;
} & BoxProps<TUse>;

const GridCell = <TUse extends ElementType = 'div'>(
  {
    gridColumnStart = 'auto',
    gridColumnEnd = 'auto',
    gridRowStart = 'auto',
    gridRowEnd = 'auto',
    className,
    ...props
  }: GridCellProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  return (
    <Box
      ref={ref}
      className={clsx(gridCell, className)}
      style={assignInlineVars({
        [gridColumnStartVar]: gridColumnStart,
        [gridColumnEndVar]: gridColumnEnd,
        [gridRowStartVar]: gridRowStart,
        [gridRowEndVar]: gridRowEnd,
      })}
      {...props}
    />
  );
};

const WrappedGridCell = forwardRef(GridCell);

export { WrappedGridCell as GridCell };
