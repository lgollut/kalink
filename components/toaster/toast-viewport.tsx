import { Viewport } from '@radix-ui/react-toast';
import { clsx } from 'clsx';
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';

import { toastViewport } from './toast-viewport.css';

const ToastViewport = (
  { className, children, ...props }: ComponentPropsWithoutRef<typeof Viewport>,
  ref: ForwardedRef<any>,
) => (
  <Viewport ref={ref} className={clsx(toastViewport, className)} {...props}>
    {children}
  </Viewport>
);

const WrappedToastViewport = forwardRef(ToastViewport);
export { WrappedToastViewport as ToastViewport };
