import { PrismicNextImage } from '@prismicio/next';
import { clsx } from 'clsx';
import NextImage from 'next/image';
import { ForwardedRef, forwardRef } from 'react';

import { imageWrapper, image } from './image.css';
import { ImageProps } from './image.types';

const Image = (
  {
    className,
    cover,
    objectPosition,
    sizes,
    fill,
    alt,
    width,
    height,
    ...props
  }: ImageProps,
  ref: ForwardedRef<any>,
) => {
  let rootProps: Partial<ImageProps> = structuredClone(props);

  if ('field' in rootProps) {
    delete rootProps.field;
  } else if ('src' in rootProps) {
    delete rootProps.src;
  }

  return (
    <div
      ref={ref}
      className={clsx(imageWrapper({ cover }), className)}
      {...rootProps}
    >
      {'field' in props && (
        <PrismicNextImage
          field={props.field}
          width={width}
          height={height}
          className={image({ cover, objectPosition })}
          sizes={sizes}
          fill={fill}
          alt={alt as ''}
        />
      )}
      {'src' in props && (
        <NextImage
          src={props.src}
          width={width}
          height={height}
          alt={alt ?? ''}
          className={image({ cover, objectPosition })}
          sizes={sizes}
          fill={fill}
        />
      )}
    </div>
  );
};

const WrappedImage = forwardRef(Image);

export { WrappedImage as Image };
