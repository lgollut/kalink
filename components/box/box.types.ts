import { ComponentPropsWithRef, ElementType } from 'react';

import {
  ResponsiveProperties,
  UnconditionalProperties,
} from '@/styles/sprinkles.css';
import {
  DistributiveOmit,
  PolymorphicComponentProps,
} from '@/types/utils.types';

type BaseBoxProps = ResponsiveProperties & UnconditionalProperties;

type OmittedBaseBoxProps<OmittedProps extends string> = Omit<
  BaseBoxProps,
  OmittedProps
>;

/**
 * When you use `BoxProps` in other components and want to define a default
 * value for that prop in your component (e.g. `const { use = 'span' } = props;`)
 * you will need to cast the `use` prop as `YourComponentProps<TUse>['use]` otherwise
 * it will be considered as `TUse | span` and you will get a type error.
 *
 * You can see an example of this in `frontend/components/text/text.tsx`.
 */
export type BoxProps<
  TUse extends ElementType,
  OmittedProps extends string = never,
> = OmittedBaseBoxProps<OmittedProps> &
  PolymorphicComponentProps<TUse> &
  DistributiveOmit<
    ComponentPropsWithRef<ElementType extends TUse ? 'div' : TUse>,
    'use' | OmittedProps
  >;
