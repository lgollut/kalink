import { clsx } from 'clsx';
import { ComponentPropsWithRef } from 'react';

import { divider, DividerVariants } from './divider.css';

type DividerProps = ComponentPropsWithRef<'hr'> & DividerVariants;

export function Divider({ className, borderStyle }: DividerProps) {
  return <hr className={clsx(divider({ borderStyle }), className)} />;
}
