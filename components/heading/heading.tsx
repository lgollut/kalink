import { ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { Stack } from '@/components/stack';
import { TypographyValues } from '@/styles/sprinkles-properties/responsive-properties.css';

import { headingWrapper } from './heading.css';
import { HeadingProps, HeadingTypes } from './heading.types';

const Heading = <TUse extends HeadingTypes>(
  props: HeadingProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const {
    use = 'h1',
    className,
    subtitle,
    children,
    underline,
    color = 'onSurface',
    typography,
    id,
    ...rest
  } = props;

  const typographyMapping: Record<HeadingTypes, TypographyValues> = {
    h1: 'displayLarge',
    h2: 'displaySmall',
    h3: 'headlineLarge',
    h4: 'headlineSmall',
    h5: 'titleLarge',
    h6: 'titleSmall',
  };

  return (
    <Stack
      gap="xs"
      ref={ref}
      className={headingWrapper({ underline })}
      {...rest}
    >
      <Box
        id={id}
        // See `frontend/components/box/box.types.ts` for why the cast is required
        use={use as HeadingTypes}
        color={color}
        className={className}
        typography={typography || typographyMapping[use]}
      >
        {children}
      </Box>
      {subtitle && (
        <Box typography="titleSmall" color={color}>
          {subtitle}
        </Box>
      )}
    </Stack>
  );
};

const WrappedHeading = forwardRef(Heading);

export { WrappedHeading as Heading };
