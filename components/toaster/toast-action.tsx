import { Action } from '@radix-ui/react-toast';
import { ForwardedRef, forwardRef } from 'react';

import { Button } from '@/components/button';

import { ToastActionProps } from './toast-action.types';

const ToastAction = (
  { className, tintScheme, label, onClick, ...props }: ToastActionProps,
  ref: ForwardedRef<any>,
) => (
  <Action ref={ref} {...props} asChild>
    <Button
      size="sm"
      variant="outlined"
      tintScheme={tintScheme}
      className={className}
      onClick={onClick}
    >
      {label}
    </Button>
  </Action>
);

const WrappedToastAction = forwardRef(ToastAction);

export { WrappedToastAction as ToastAction };
