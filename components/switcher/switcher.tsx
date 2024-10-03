'use client';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { clsx } from 'clsx';
import { ElementType } from 'react';

import { BoxProps } from '../box/box.types';

import { switcher, SwitcherVariants, thresholdVar } from './switcher.css';

type SwitcherProps<TUse extends ElementType> = BoxProps<TUse> & {
  /**
   * The gap between items
   */
  spacing?: SwitcherVariants['spacing'];

  /**
   * The threshold at which to switch between horizontal and vertical layouts
   */
  threshold?: string;

  /**
   * The maximum number of elements allowed to appear in the horizontal configuration
   */
  limit?: SwitcherVariants['limit'];
};

/**
 * Switch directly between horizontal and vertical layouts
 * at a given (container width-based) breakpoint or 'threshold'
 *
 * https://every-layout.dev/layouts/switcher
 */
export const Switcher = <TUse extends ElementType>({
  spacing,
  threshold,
  limit,
  className,
  ...props
}: SwitcherProps<TUse>) => {
  const { use: Comp = 'div' } = props;

  return (
    <Comp
      className={clsx(switcher({ spacing, limit }), className)}
      style={assignInlineVars({
        ...(threshold && { [thresholdVar]: threshold }),
      })}
      {...props}
    />
  );
};
