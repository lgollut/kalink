import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';

import { FooterProps } from './footer.types';

const Footer = <TUse extends ElementType>(
  { tintScheme = 'primary', paddingBlock = '5xl', ...props }: FooterProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  const normalizedTintScheme =
    tintScheme === 'secondary' ? 'secondaryContainer' : tintScheme;

  return (
    <Box
      ref={ref}
      tintScheme={normalizedTintScheme}
      paddingBlock={paddingBlock}
      {...props}
    >
      <Container
        size="2xl"
        display="flex"
        flexDirection="column"
        gap="lg"
        alignItems="center"
      >
        <Box textAlign="center">
          <Heading use="h3">KalinK Studio ©2026</Heading>
          <Text>Développement & arts visuels</Text>
        </Box>
      </Container>
    </Box>
  );
};

const WrappedFooter = forwardRef(Footer);

export { WrappedFooter as Footer };
