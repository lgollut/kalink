'use client';

import { useState, useCallback } from 'react';

import { FormFieldContextProvider } from './form-field-context';
import { FormFieldProps } from './form-field.types';

export const FormField = ({
  name,
  label,
  children,
  errors,
  hideErrorMessage = false,
}: FormFieldProps) => {
  const [messageIds, setMessageIds] = useState<string[]>([]);

  const registerMessageId = useCallback(
    (id: string) => setMessageIds((ids) => [...new Set([...ids, id])]),
    [setMessageIds],
  );

  const unRegisterMessageId = useCallback(
    (id: string) =>
      setMessageIds((ids) => ids.filter((current) => current !== id)),
    [setMessageIds],
  );

  return (
    <FormFieldContextProvider
      value={{
        name,
        registerMessageId,
        unRegisterMessageId,
        messageIds,
        errors,
        hideErrorMessage,
        label,
      }}
    >
      {children}
    </FormFieldContextProvider>
  );
};
