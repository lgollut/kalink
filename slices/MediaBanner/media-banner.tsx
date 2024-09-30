import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { RichText } from '@/components/rich-text';
import { sectionHeading } from '@/components/section-heading/section-heading.css';
import { Stack } from '@/components/stack';
import { useSliceSlug } from '@/utils/use-slice-slug';

import { MediaBannerImage } from './media-banner-image';
import { mediaBanner, mediaBannerContent } from './media-banner.css';

/**
 * Props for `MediaBanner`.
 */
export type MediaBannerProps = SliceComponentProps<Content.MediaBannerSlice>;

/**
 * Component for "MediaBanner" Slices.
 */
export function MediaBanner({ slice }: MediaBannerProps) {
  const slug = useSliceSlug(slice);

  return (
    <Box
      use="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={sectionHeading}
      {...(slug ? { id: slug } : {})}
    >
      <Container size="xl">
        <Box className={mediaBanner}>
          <MediaBannerImage image={slice.primary.image} />
          <Stack
            className={mediaBannerContent({
              direction: slice.primary.direction,
            })}
          >
            <Heading use="h3" color="currentColor">
              {slice.primary.title}
            </Heading>
            <RichText field={slice.primary.content} />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
