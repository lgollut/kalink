import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Heading } from '@/components/heading';
import { Stack } from '@/components/stack';
import { Text } from '@/components/text';

import { introBlockFigure } from './Intro-block.css';

/**
 * Props for `IntroBloc`.
 */
export type IntroBlocProps = SliceComponentProps<Content.IntroBlockSlice>;

/**
 * Component for "IntroBloc" Slices.
 */
export function IntroBlock({ slice }: IntroBlocProps): JSX.Element {
  return (
    <Container size="xl" paddingInline={{ xs: 'none', lg: 'lg', xl: '5xl' }}>
      <Box display="flex" gap="lg" className={introBlockFigure}>
        <Stack
          gap="md"
          marginBlockStart={{ xs: '2xl', lg: '4xl', xl: '6xl' }}
          marginBlockEnd={{ xs: '5xl', lg: '7xl', xl: '9xl' }}
          paddingInlineEnd={{ xs: 'base', lg: 'md', xl: 'none' }}
        >
          <Heading use="h1" typography="headlineLarge">
            {slice.primary.title}
          </Heading>
          <Text>{slice.primary.content}</Text>
        </Stack>
      </Box>
    </Container>
  );
}
