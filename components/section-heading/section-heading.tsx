import { ForwardedRef, forwardRef, useMemo } from 'react';

import { Box } from '../box';
import { Heading } from '../heading';
import { HeadingTypes } from '../heading/heading.types';
import { slugify } from '@/utils/slugify';

import { sectionHeading, sectionHeadingDot } from './section-heading.css';
import { SectionHeadingProps } from './section-heading.types';

const SectionHeading = <TUse extends HeadingTypes>(
  props: SectionHeadingProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const {
    children,
    dotColor = 'primary',
    use = 'h2',
    marginBlockEnd = '3xl',
    paddingInlineStart,
    ...rest
  } = props;

  const additionalProps = useMemo(
    () => (typeof children === 'string' ? { id: `${slugify(children)}` } : {}),
    [children],
  );

  const size = useMemo(() => {
    switch (use) {
      case 'h1':
      case 'h2':
        return 'md';
      default:
        return 'base';
    }
  }, [use]);

  return (
    <Box
      display="flex"
      alignItems="flex-end"
      marginBlockEnd={marginBlockEnd}
      paddingInlineStart={paddingInlineStart}
      gap="sm"
    >
      <Box
        tintScheme={dotColor}
        borderRadius="small"
        className={sectionHeadingDot({ size })}
        flexShrink={0}
      />
      <Heading
        use={use as HeadingTypes}
        color="onPrimaryContainer"
        ref={ref}
        className={sectionHeading}
        {...additionalProps}
        {...rest}
      >
        {children}
      </Heading>
    </Box>
  );
};

const WrappedSectionHeading = forwardRef(SectionHeading);

export { WrappedSectionHeading as SectionHeading };
