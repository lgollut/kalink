'use client';

import { Provider } from '@radix-ui/react-toast';
import { AnimatePresence } from 'framer-motion';
import { Reducer, useCallback, useReducer } from 'react';

import { Toast } from './toast';
import { ToastViewport } from './toast-viewport';
import { ToasterContextProvider } from './toaster-context';
import {
  ToasterAction,
  ToasterActions,
  ToasterContext,
  ToasterProps,
  ToasterState,
} from './toaster.types';

const toasterInitialState: ToasterState = {
  toasts: [],
};

const toasterReducer: Reducer<ToasterState, ToasterAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case ToasterActions.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts],
      };

    case ToasterActions.UPDATE_TOAST: {
      const id = state.toasts.findIndex(
        (toast) => toast.id === action.toast.id,
      );

      if (id === -1) {
        return state;
      }

      const toasts = [...state.toasts];

      toasts[id] = {
        ...toasts[id],
        ...action.toast,
      };

      return {
        ...state,
        toasts,
      };
    }

    case ToasterActions.DISMISS_TOAST: {
      const id = state.toasts.findIndex((toast) => toast.id === action.toastId);

      if (id === -1) {
        return state;
      }

      const toasts = [...state.toasts];
      toasts.splice(id, 1);

      return {
        ...state,
        toasts,
      };
    }

    default:
      return state;
  }
};

export const Toaster = ({
  children,
  defaultDuration = 8000,
  ...props
}: ToasterProps) => {
  const [state, dispatch] = useReducer(toasterReducer, toasterInitialState);

  const onAddToast = useCallback<ToasterContext['onAddToast']>(
    (toast) => {
      dispatch({ type: ToasterActions.ADD_TOAST, toast });
    },
    [dispatch],
  );

  const onUpdateToast = useCallback<ToasterContext['onUpdateToast']>(
    (toast) => {
      dispatch({ type: ToasterActions.UPDATE_TOAST, toast });
    },
    [dispatch],
  );

  const onDismissToast = useCallback<ToasterContext['onDismissToast']>(
    (toastId) => {
      dispatch({ type: ToasterActions.DISMISS_TOAST, toastId });
    },
    [dispatch],
  );

  return (
    <Provider {...props}>
      <ToasterContextProvider
        value={{
          onAddToast,
          onUpdateToast,
          onDismissToast,
          defaultDuration,
        }}
      >
        {children}

        <AnimatePresence initial={false}>
          {state.toasts.map(({ id, ...toastProps }) => (
            <Toast key={id} id={id} {...toastProps} />
          ))}
        </AnimatePresence>

        <ToastViewport />
      </ToasterContextProvider>
    </Provider>
  );
};
