import { Portal, Content, Trigger } from '@radix-ui/react-popover';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import { BoxProps } from '@/components/box/box.types';

import { popoverContent } from './popover-content.css';

export type PopoverContentProps = {
  portaled?: boolean;
  maxHeight?: string;
  scrollable?: boolean;
} & ComponentPropsWithoutRef<typeof Content> &
  PopoverContentVariants &
  ComponentPropsWithoutRef<typeof Portal> &
  BoxProps<'div'>;

export type PopoverTriggerProps = ComponentPropsWithoutRef<typeof Trigger>;

export type PopoverContentVariants = NonNullable<
  RecipeVariants<typeof popoverContent>
>;

export type PopoverScrollableProps = {
  scrollable?: boolean;
  maxHeight?: string;
  children?: ReactNode;
};
