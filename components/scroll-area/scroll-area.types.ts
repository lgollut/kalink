import { Root, ScrollAreaScrollbar } from '@radix-ui/react-scroll-area';
import { RecipeVariants } from '@vanilla-extract/recipes';
import { ComponentPropsWithoutRef } from 'react';

import { scrollAreaScrollbar } from '@/components/scroll-area/scroll-area.css';

export type ScrollAreaProps = ComponentPropsWithoutRef<typeof Root> & {
  maxHeight?: string;
};

export type ScrollAreaScrollbarProps = ComponentPropsWithoutRef<
  typeof ScrollAreaScrollbar
> &
  ScrollAreaScrollbarVariants;

export type ScrollAreaScrollbarVariants = NonNullable<
  RecipeVariants<typeof scrollAreaScrollbar>
>;
