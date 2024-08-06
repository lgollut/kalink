'use client';

import { createRequiredContext } from '@/utils/create-required-context';

export const [useFormFieldItemContext, FormFieldItemContextProvider] =
  createRequiredContext<{ id: string }>();
