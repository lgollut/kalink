import { Root } from '@radix-ui/react-toast';
import { ComponentPropsWithoutRef } from 'react';

import { ToastActionProps } from './toast-action.types';

export type ToastElement = {
  id: string;
  title?: string;
  description: string;
  action?: ToastActionProps;
  tintScheme?: 'primary' | 'secondary' | 'error';
};

export type ToastProps = ComponentPropsWithoutRef<typeof Root> & ToastElement;
