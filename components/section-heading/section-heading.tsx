import { ForwardedRef, forwardRef, useMemo } from 'react';

import { Heading } from '../heading';
import { HeadingTypes } from '../heading/heading.types';
import { slugify } from '@/utils/slugify';

import { sectionHeading } from './section-heading.css';
import { SectionHeadingProps } from './section-heading.types';

const SectionHeading = <TUse extends HeadingTypes>(
  props: SectionHeadingProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const { children, use = 'h2', marginBlockEnd = '3xl', ...rest } = props;

  const additionalProps = useMemo(
    () => (typeof children === 'string' ? { id: `${slugify(children)}` } : {}),
    [children],
  );

  return (
    <Heading
      use={use as HeadingTypes}
      color="onPrimaryContainer"
      ref={ref}
      className={sectionHeading}
      marginBlockEnd={marginBlockEnd}
      {...additionalProps}
      {...rest}
    >
      {children}
    </Heading>
  );
};

const WrappedSectionHeading = forwardRef(SectionHeading);

export { WrappedSectionHeading as SectionHeading };
