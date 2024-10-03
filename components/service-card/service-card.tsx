import { ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { Heading } from '../heading';
import { Image } from '../image';
import { ScrollArea } from '../scroll-area';
import { Stack } from '../stack';
import { Text } from '../text';

import { serviceCardDescription } from './service-card.css';
import { ServiceCardProps } from './service-card.types';

const ServiceCard = (
  props: ServiceCardProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  if ('description' in props) {
    return (
      <Box
        ref={ref}
        tintScheme={props.backgroundColor}
        paddingBlockStart="xl"
        paddingInline="lg"
        height="full"
        className={serviceCardDescription}
        overflow="hidden"
      >
        <ScrollArea>
          <Stack
            ref={ref}
            tintScheme={props.backgroundColor}
            paddingBlockEnd="xl"
            gap="md"
            height="full"
          >
            <Heading use="h6">{props.title}</Heading>
            <Text>{props.description}</Text>
          </Stack>
        </ScrollArea>
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      tintScheme={props.backgroundColor}
      height="full"
      borderEndStartRadius="default"
      borderEndEndRadius="default"
      display="flex"
      flexDirection="column"
    >
      <Image field={props.picture['4:3']} objectPosition="topCenter" cover />
      <Text
        textAlign="center"
        tintScheme="primary"
        paddingBlock="sm"
        borderEndStartRadius="default"
        borderEndEndRadius="default"
      >
        {props.title}
      </Text>
    </Box>
  );
};

const WrappedServiceCard = forwardRef(ServiceCard);

export { WrappedServiceCard as ServiceCard };
