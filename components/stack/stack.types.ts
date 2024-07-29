import { ElementType } from 'react';

import { BoxProps } from '@/components/box/box.types';

type OmittedBoxProps =
  | 'display'
  | 'flexDirection'
  | 'justifyContent'
  | 'divided';

export type StackProps<TUse extends ElementType> = {
  divided?: 'none' | 'solid' | 'dashed';
} & BoxProps<TUse, OmittedBoxProps>;
