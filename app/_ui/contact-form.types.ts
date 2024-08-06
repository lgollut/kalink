import { ComponentPropsWithoutRef } from 'react';

import { ContactsSliceDefaultPrimaryFormItem } from '@/prismicio-types';

export type ContactFormProps = ComponentPropsWithoutRef<'form'> & {
  fields: ContactsSliceDefaultPrimaryFormItem[];
};
