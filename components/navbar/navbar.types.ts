import { ElementType } from 'react';

import { BoxProps } from '../box/box.types';

export type NavbarItem = {
  uid: string;
  label: string;
  tint: 'primary' | 'secondary';
  subItems?: [string, string][];
};

export type NavbarProps<TUse extends ElementType> = {
  scrollThreshold?: number;
  fixedThreshold?: number;
  navItems: NavbarItem[];
} & BoxProps<TUse>;
