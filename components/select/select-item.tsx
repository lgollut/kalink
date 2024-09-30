'use client';

import { Item, ItemIndicator, ItemText } from '@radix-ui/react-select';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';
import {
  ComponentPropsWithoutRef,
  ElementRef,
  ForwardedRef,
  forwardRef,
} from 'react';

import { Cluster } from '@/components/cluster';
import { menuItem, menuItemIcon } from '@/components/menu/menu-item.css';

const UnwrappedSelectItem = (
  { children, ...props }: ComponentPropsWithoutRef<typeof Item>,
  ref: ForwardedRef<ElementRef<typeof Item>>,
) => {
  return (
    <Item ref={ref} className={clsx(menuItem())} {...props}>
      <Cluster gap="sm">
        <ItemIndicator>
          <Check size={16} className={menuItemIcon} />
        </ItemIndicator>
        <ItemText>{children}</ItemText>
      </Cluster>
    </Item>
  );
};

export const SelectItem = forwardRef(UnwrappedSelectItem);
