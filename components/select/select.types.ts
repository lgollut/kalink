import { Content, Root, SelectTrigger } from '@radix-ui/react-select';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ChangeHandler, UseControllerReturn } from 'react-hook-form';

import { SelectValue } from './select-value';

export type SelectProps = ComponentPropsWithoutRef<typeof Root> &
  Pick<ComponentPropsWithoutRef<typeof SelectValue>, 'placeholder'> &
  Pick<ComponentPropsWithoutRef<typeof SelectTrigger>, 'onBlur' | 'onFocus'> & {
    name: string;
    label: string;
    description?: string;
    container?: HTMLElement | null | false;
    onChange?: ChangeHandler;
    hideLabel?: boolean;
    errors: string;
    hideErrorMessage?: boolean;
  };

export type SelectContentProps = ComponentPropsWithoutRef<typeof Content> & {
  container?: SelectProps['container'];
};

export type SelectRootProps = ComponentPropsWithoutRef<typeof Root> &
  (Pick<UseControllerReturn, 'field'> extends {
    field: infer T;
  }
    ? Partial<Omit<T, 'ref'>>
    : never);

export type SelectContentPortalProps = {
  children: ReactNode;
  container?: SelectProps['container'];
};
