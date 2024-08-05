import { HeadingProps, HeadingTypes } from '../heading/heading.types';
import { TintSchemeValues } from '@/styles/sprinkles-properties/unconditional-properties.css';

export type SectionHeadingProps<TUse extends HeadingTypes> =
  HeadingProps<TUse> & {
    dotColor?: TintSchemeValues;
  };
