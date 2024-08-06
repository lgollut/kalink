import { RecipeVariants } from '@vanilla-extract/recipes';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { ElementType } from 'react';

import { BoxProps } from '@/components/box/box.types';

import { button } from './button.css';

type ButtonOwnProps = {
  icon?: LucideIcon;
} & ButtonVariants;

export type ButtonProps<TUse extends ElementType> = BoxProps<TUse> &
  ButtonOwnProps;

export type ButtonLinkProps<TUse extends ElementType = typeof Link> =
  ButtonProps<TUse>;

export type ButtonLoadingProps = ButtonProps<typeof motion.button> & {
  /** The loading state of the button */
  loading: boolean;
  /** If children need to be transitioned, this key is used for the AnimatePresence */
  childrenComputedKey?: string;
};

export type ButtonInternalProps<TUse extends ElementType> = ButtonProps<TUse>;

export type ButtonVariants = NonNullable<RecipeVariants<typeof button>>;
