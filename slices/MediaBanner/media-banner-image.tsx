'use client';

import { useIsClient, useMediaQuery } from '@uidotdev/usehooks';
import { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import { Image } from '@/components/image';
import { MediaBannerSlice } from '@/prismicio-types';

type MediaBannerImageProps = {
  image: MediaBannerSlice['primary']['items'][number]['image'];
};

const InternalMediaBannerImage = forwardRef(
  ({ image }: MediaBannerImageProps, ref: ForwardedRef<any>) => {
    const isMediumSize = useMediaQuery('screen and (min-width : 768px)');
    const [ratio, setRatio] = useState<'16:9' | '2:3'>('2:3');

    useEffect(() => {
      setRatio(isMediumSize ? '16:9' : '2:3');
    }, [isMediumSize, setRatio]);

    return (
      <Image
        ref={ref}
        cover
        field={image[ratio]}
        sizes="(max-width: 1200px) 100vw, 1200px"
      />
    );
  },
);

const MediaBannerImage = (
  { image }: MediaBannerImageProps,
  ref: ForwardedRef<any>,
) => {
  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  return <InternalMediaBannerImage image={image} ref={ref} />;
};

const WrappedMediaBannerImage = forwardRef(MediaBannerImage);

export { WrappedMediaBannerImage as MediaBannerImage };
