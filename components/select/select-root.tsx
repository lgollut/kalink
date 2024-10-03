'use client';

import { Root } from '@radix-ui/react-select';

import { useFormFieldContext } from '@/components/form-field/form-field-context';

import { SelectRootProps } from './select.types';

export const SelectRoot = (props: SelectRootProps) => {
  const { name } = useFormFieldContext();

  return <Root name={name} {...props} />;
};
