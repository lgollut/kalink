import { useCallback } from 'react';

import { ToastProps } from './toast.types';
import { useToasterContext } from './toaster-context';
import { AddToast } from './use-toast.types';

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

export function useToast() {
  const { onAddToast, onDismissToast } = useToasterContext();

  return useCallback(
    (props) => {
      const id = genId();

      const toast = {
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) {
            onDismissToast(id);
          }
        },
        ...props,
      } satisfies ToastProps;

      onAddToast(toast);

      return toast;
    },
    [onAddToast, onDismissToast],
  ) satisfies AddToast;
}
