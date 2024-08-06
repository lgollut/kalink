import { ElementType } from 'react';

import { BoxProps } from '@/components/box/box.types';

type OmittedBoxProps = 'display' | 'flexDirection';

export type ClusterProps<TUse extends ElementType> = BoxProps<
  TUse,
  OmittedBoxProps
>;
