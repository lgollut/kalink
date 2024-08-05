import { ForwardedRef, forwardRef, useMemo } from 'react';

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
  const dotColor = useMemo(
    () =>
      backgroundColor === 'primary' ? 'primaryContainer' : 'secondaryContainer',
    [backgroundColor],
  );

  return (
    <div ref={ref} className={fiftyFifty({ direction })}>
      <Image field={image} className={fiftyFiftyImage} sizes="37.5vw" fill />
      <Box tintScheme={backgroundColor} className={fiftyFiftyContent}>
        <RichText field={text} headingDotColor={dotColor} />
      </Box>
    </div>
  );
};

const WrappedFiftyFifty = forwardRef(FiftyFifty);

export { WrappedFiftyFifty as FiftyFifty };
