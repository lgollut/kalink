import { ForwardedRef, forwardRef } from 'react';

import { Heading } from '../heading';
import { HeadingTypes } from '../heading/heading.types';
import { PageDocument } from '@/prismicio-types';
import { useSliceSlug } from '@/utils/use-slice-slug';

import { sectionHeading } from './section-heading.css';
import { SectionHeadingProps } from './section-heading.types';

const SectionHeading = <
  TUse extends HeadingTypes,
  TSlice extends PageDocument['data']['slices'][number],
>(
  props: SectionHeadingProps<TUse, TSlice>,
  ref: ForwardedRef<any>,
) => {
  const {
    children,
    use = 'h2',
    marginBlockEnd = '3xl',
    slice,
    ...rest
  } = props;

  const slug = useSliceSlug(slice);

  if (!slice.primary.title) {
    return null;
  }

  return (
    <Heading
      use={use as HeadingTypes}
      color="onPrimaryContainer"
      ref={ref}
      className={sectionHeading}
      marginBlockEnd={marginBlockEnd}
      {...(slug ? { id: slug } : {})}
      {...rest}
    >
      {slice.primary.title}
    </Heading>
  );
};

const WrappedSectionHeading = forwardRef(SectionHeading);

export { WrappedSectionHeading as SectionHeading };
