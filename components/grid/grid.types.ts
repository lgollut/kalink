import { ElementType } from 'react';

import { BoxProps } from '@/components/box/box.types';

type OmittedBoxProps = 'display';

export type GridProps<TUse extends ElementType> = {
  columns?: number;
  templateColumns?: string;
} & BoxProps<TUse, OmittedBoxProps>;
