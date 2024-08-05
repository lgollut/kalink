import { ElementType } from 'react';

import { BoxProps } from '../box/box.types';
import {
  PersonDocument,
  TeamSliceDefaultPrimaryItemsItem,
} from '@/prismicio-types';

export type PersonCardProps<TUse extends ElementType> = BoxProps<TUse> &
  PersonDocument['data'] &
  Omit<TeamSliceDefaultPrimaryItemsItem, 'person'>;
