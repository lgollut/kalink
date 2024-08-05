'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { cols, grid } from '@/components/grid/grid.css';

import { GridProps } from './grid.types';

const Grid = <TUse extends ElementType = 'div'>(
  { className, columns, templateColumns, ...props }: GridProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const gridTemplateColumns = columns
    ? `repeat(${columns}, 1fr)`
    : templateColumns || 'auto';

  return (
    <Box
      ref={ref}
      display="grid"
      className={clsx(grid, className)}
      style={assignInlineVars({
        [cols]: gridTemplateColumns,
      })}
      {...props}
    />
  );
};

const WrappedGrid = forwardRef(Grid);

export { WrappedGrid as Grid };
