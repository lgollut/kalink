import Image from 'next/image';
import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { Heading } from '../heading';
import { Text } from '../text';
import quote from '@/public/quote.svg';

import { TestimonialProps } from './testimonial.types';

const Testimonial = <TUse extends ElementType = 'div'>(
  {
    givenName,
    text,
    tintScheme = 'secondaryContainer',
    ...props
  }: TestimonialProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      gap="base"
      tintScheme={tintScheme}
      alignItems="flex-start"
      padding="md"
      borderRadius="default"
      {...props}
    >
      <Image src={quote} alt="quote" width={36} height={34} />
      <Text>{text}</Text>
      <Heading use="h6" marginBlockStart="base">
        {givenName}
      </Heading>
    </Box>
  );
};

const WrappedTestimonial = forwardRef(Testimonial);

export { WrappedTestimonial as Testimonial };
