import { PrismicNextImage } from '@prismicio/next';
import { clsx } from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

import { imageWrapper, image } from './image.css';
import { ImageProps } from './image.types';

const Image = (
  { className, field, cover, objectPosition, sizes, fill, ...rest }: ImageProps,
  ref: ForwardedRef<any>,
) => {
  return (
    <div
      ref={ref}
      className={clsx(imageWrapper({ cover }), className)}
      {...rest}
    >
      <PrismicNextImage
        field={field}
        className={image({ cover, objectPosition })}
        sizes={sizes}
        fill={fill}
      />
    </div>
  );
};

const WrappedImage = forwardRef(Image);

export { WrappedImage as Image };
