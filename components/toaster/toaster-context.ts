'use client';

import { createRequiredContext } from '@/utils/create-required-context';

import { ToasterContext } from './toaster.types';

export const [useToasterContext, ToasterContextProvider] =
  createRequiredContext<ToasterContext>();
