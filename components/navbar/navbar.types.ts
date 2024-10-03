import { motion } from 'framer-motion';

import { BoxProps } from '../box/box.types';

export type NavbarItem = {
  uid: string;
  label: string;
  tint: 'primary' | 'secondary';
  subItems?: [string, string][];
};

export type NavbarProps = {
  scrollThreshold?: number;
  fixedThreshold?: number;
  navItems: NavbarItem[];
} & BoxProps<typeof motion.div>;
