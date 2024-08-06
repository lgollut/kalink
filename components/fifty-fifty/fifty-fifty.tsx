import { ForwardedRef, forwardRef } from 'react';

import { Box } from '../box';
import { Image } from '../image';
import { RichText } from '../rich-text';

import {
  fiftyFifty,
  fiftyFiftyContent,
  fiftyFiftyImage,
} from './fifty-fifty.css';
import { FiftyFiftyProps } from './fifty-fifty.types';

const FiftyFifty = (
  { text, image, backgroundColor, direction }: FiftyFiftyProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <div ref={ref} className={fiftyFifty({ direction })}>
      <Image field={image} className={fiftyFiftyImage} sizes="37.5vw" fill />
      <Box tintScheme={backgroundColor} className={fiftyFiftyContent}>
        <RichText field={text} />
      </Box>
    </div>
  );
};

const WrappedFiftyFifty = forwardRef(FiftyFifty);

export { WrappedFiftyFifty as FiftyFifty };
