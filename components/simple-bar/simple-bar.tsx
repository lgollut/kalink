'use client';

import { ComponentPropsWithoutRef } from 'react';
import SimpleBarComponent from 'simplebar-react';

import 'simplebar-react/dist/simplebar.min.css';

export const SimpleBar = (
  props: ComponentPropsWithoutRef<typeof SimpleBarComponent>,
) => {
  return <SimpleBarComponent {...props} />;
};
