'use client';

import { createRequiredContext } from '@/utils/create-required-context';

type FormFieldContext = {
  name: string;
  registerMessageId: (id: string) => void;
  unRegisterMessageId: (id: string) => void;
  messageIds: string[];
  errors?: string | null;
  hideErrorMessage: boolean;
  label: string;
};

export const [useFormFieldContext, FormFieldContextProvider] =
  createRequiredContext<FormFieldContext>();
