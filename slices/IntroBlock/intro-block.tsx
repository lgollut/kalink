import { isFilled, type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Box } from '@/components/box';
import { ButtonLink } from '@/components/button';
import { Cluster } from '@/components/cluster';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { RichText } from '@/components/rich-text';
import { Stack } from '@/components/stack';
import { getSliceSlug } from '@/utils/get-slice-slug';

import { introBlock, introBlockFigure } from './intro-block.css';

/**
 * Props for `IntroBloc`.
 */
export type IntroBlocProps = SliceComponentProps<Content.IntroBlockSlice>;

/**
 * Component for "IntroBloc" Slices.
 */
export function IntroBlock({ slice }: IntroBlocProps): JSX.Element {
  const slug = getSliceSlug(slice.primary);

  return (
    <Container
      size="xl"
      paddingInline={{ xs: 'none', lg: 'lg', xl: '5xl' }}
      className={introBlock}
      {...(slug ? { id: slug } : {})}
    >
      <Box
        display="flex"
        gap="lg"
        className={introBlockFigure({
          color: slice.primary.backgroundColor,
        })}
      >
        <Stack
          gap="3xl"
          marginBlock={{ xs: '2xl', lg: '4xl', xl: '6xl' }}
          paddingInlineEnd={{ xs: 'base', lg: 'md', xl: 'none' }}
        >
          <Stack gap="md">
            <Heading use="h1" typography="headlineLarge">
              {slice.primary.title}
            </Heading>
            <RichText field={slice.primary.text} />
          </Stack>
          {slice.variation === 'withLinkToMedia' &&
            isFilled.group(slice.primary.cta) && (
              <Cluster gap="md">
                {slice.primary.cta.map(
                  (cta) =>
                    isFilled.linkToMedia(cta.media) && (
                      <ButtonLink
                        key={cta.label}
                        variant={cta.variant}
                        href={cta.media.url}
                        alignSelf="flex-start"
                        tintScheme={slice.primary.backgroundColor}
                        target="_blank"
                      >
                        {cta.label}
                      </ButtonLink>
                    ),
                )}
              </Cluster>
            )}
        </Stack>
      </Box>
    </Container>
  );
}
