import { Portal } from '@radix-ui/react-dialog';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { ComponentPropsWithoutRef } from 'react';

import { BoxProps } from '../box/box.types';

import { sheetContent } from './sheet-content.css';

export type SheetContentVariants = RecipeVariants<typeof sheetContent>;

export type SheetContentProps = BoxProps<'div', 'use'> &
  ComponentPropsWithoutRef<typeof Portal> &
  SheetContentVariants;
