import { ToastProviderProps } from '@radix-ui/react-toast';

import { ToastElement } from './toast.types';

export type ToasterProps = {
  defaultDuration?: number;
} & ToastProviderProps;

export type ToasterContext = {
  onAddToast: (toast: GetToasterActionToast<ToasterActions.ADD_TOAST>) => void;
  onUpdateToast: (
    toast: GetToasterActionToast<ToasterActions.UPDATE_TOAST>,
  ) => void;
  onDismissToast: (toastId: ToastElement['id']) => void;
  defaultDuration: number;
};

export enum ToasterActions {
  ADD_TOAST = 'ADD_TOAST',
  UPDATE_TOAST = 'UPDATE_TOAST',
  DISMISS_TOAST = 'DISMISS_TOAST',
}

type GetToasterActionToast<T extends ToasterActions> =
  Extract<ToasterAction, { type: T; toast: unknown }> extends { type: T }
    ? Extract<ToasterAction, { type: T; toast: unknown }>['toast']
    : never;

export type ToasterAction =
  | {
      type: ToasterActions.ADD_TOAST;
      toast: ToastElement;
    }
  | {
      type: ToasterActions.UPDATE_TOAST;
      toast: Partial<ToastElement>;
    }
  | {
      type: ToasterActions.DISMISS_TOAST;
      toastId: ToastElement['id'];
    };

export type ToasterState = {
  toasts: ToastElement[];
};
