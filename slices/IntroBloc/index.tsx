import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

/**
 * Props for `IntroBloc`.
 */
export type IntroBlocProps = SliceComponentProps<Content.IntroBlocSlice>;

/**
 * Component for "IntroBloc" Slices.
 */
const IntroBloc = ({ slice }: IntroBlocProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for intro_bloc (variation: {slice.variation}) Slices
    </section>
  );
};

export default IntroBloc;
