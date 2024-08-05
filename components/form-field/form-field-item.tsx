'use client';

import { ReactNode, useId } from 'react';

import { FormFieldItemContextProvider } from './form-field-item-context';

export const FormFieldItem = ({ children }: { children: ReactNode }) => {
  const id = useId();

  return (
    <FormFieldItemContextProvider value={{ id }}>
      {children}
    </FormFieldItemContextProvider>
  );
};
