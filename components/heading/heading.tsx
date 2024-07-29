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
    ...rest
  } = props;

  const typographyMapping: Record<HeadingTypes, TypographyValues> = {
    h1: 'displayLarge',
    h2: 'displayMedium',
    h3: 'displaySmall',
    h4: 'headlineLarge',
    h5: 'headlineMedium',
    h6: 'headlineSmall',
  };

  return (
    <Stack
      gap="xs"
      ref={ref}
      className={headingWrapper({ underline })}
      {...rest}
    >
      <Box
        // See `frontend/components/box/box.types.ts` for why the cast is required
        use={use as HeadingTypes}
        color={color}
        className={className}
        typography={typographyMapping[use]}
      >
        {children}
      </Box>
      {subtitle && (
        <Box typography="titleMedium" color="onSurface">
          {subtitle}
        </Box>
      )}
    </Stack>
  );
};

const WrappedHeading = forwardRef(Heading);

export { WrappedHeading as Heading };
