import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { RichText } from '@/components/rich-text';
import { sectionHeading } from '@/components/section-heading/section-heading.css';
import { Stack } from '@/components/stack';
import { getSliceSlug } from '@/utils/get-slice-slug';

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
  if (!slice.primary.items || slice.primary.items.length === 0) {
    return null;
  }

  return (
    <Stack gap="lg">
      {slice.primary.items.map((item) => {
        const slug = getSliceSlug(item);

        return (
          <Box
            key={slug}
            use="section"
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className={sectionHeading}
            {...(slug ? { id: slug } : {})}
          >
            <Container
              size="xl"
              paddingInline={{ xs: 'none', md: 'md', lg: 'lg', xl: '5xl' }}
            >
              <Box className={mediaBanner}>
                <MediaBannerImage image={item.image} />
                <Stack
                  className={mediaBannerContent({
                    direction: item.direction,
                  })}
                >
                  <Heading use="h3" color="currentColor">
                    {item.title}
                  </Heading>
                  <RichText field={item.content} />
                </Stack>
              </Box>
            </Container>
          </Box>
        );
      })}
    </Stack>
  );
}
