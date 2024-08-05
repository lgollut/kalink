import Image from 'next/image';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import instagram from '@/public/instagram.svg';
import linkedin from '@/public/linkedin.svg';

import { FooterProps } from './footer.types';

const Footer = <TUse extends ElementType>(
  { tintScheme = 'primary', paddingBlock = '5xl', ...props }: FooterProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  return (
    <Box
      ref={ref}
      tintScheme={tintScheme}
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
          <Heading use="h4">Kalink Studio ©2024</Heading>
          <Text>Bureau de communication</Text>
        </Box>
        <Box display="flex" gap="md">
          <Image src={instagram} alt="Instagram KalinK account" />
          <Image src={linkedin} alt="LinkedIn KalinK account" />
        </Box>
      </Container>
    </Box>
  );
};

const WrappedFooter = forwardRef(Footer);

export { WrappedFooter as Footer };
