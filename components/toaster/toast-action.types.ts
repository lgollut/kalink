import { Action } from '@radix-ui/react-toast';
import { ComponentPropsWithoutRef, MouseEventHandler } from 'react';

import { UnconditionalProperties } from '@/styles/sprinkles.css';

export type ToastActionProps = ComponentPropsWithoutRef<typeof Action> & {
  tintScheme?: UnconditionalProperties['tintScheme'];
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
