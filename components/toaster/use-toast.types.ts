import { ToastElement, ToastProps } from './toast.types';

export type AddToastProps = Omit<ToastProps, 'id'>;
export type AddToast = (props: AddToastProps) => ToastElement;
