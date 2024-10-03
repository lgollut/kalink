import { ElementType, ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { Heading } from '../heading';
import { Image } from '../image';
import { RichText } from '../rich-text';
import { Stack } from '../stack';

import {
  personCard,
  personCardContent,
  personCardContentInner,
  personCardImage,
} from './person-card.css';
import { PersonCardProps } from './person-card.types';

const PersonCard = <TUse extends ElementType = 'div'>(
  {
    givenName,
    surname,
    jobTitle,
    summary,
    picture,
    direction,
    backgroundColor,
    ...props
  }: PersonCardProps<TUse>,
  ref: ForwardedRef<any>,
) => {
  return (
    <div ref={ref} className={personCard({ direction })}>
      <Image
        field={picture['3:4']}
        className={personCardImage}
        sizes="37.5vw"
        fill
      />
      <Box tintScheme={backgroundColor} className={personCardContent}>
        <Stack gap="md" className={personCardContentInner}>
          <Heading use="h3" subtitle={jobTitle ?? ''} color="onPrimary">
            {givenName} {surname}
          </Heading>
          <RichText field={summary} />
        </Stack>
      </Box>
    </div>
  );
};

const WrappedPersonCard = forwardRef(PersonCard);

export { WrappedPersonCard as PersonCard };
