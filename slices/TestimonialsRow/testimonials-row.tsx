import { type Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { Testimonial } from '@/components/testimonial';
import { createClient } from '@/prismicio';

export type TestimonialsProps =
  SliceComponentProps<Content.TestimonialsRowSlice>;

export async function TestimonialsRow({ slice }: TestimonialsProps) {
  const client = createClient();
  const ids: string[] = [];

  for (const { item } of slice.primary.items) {
    if (!isFilled.contentRelationship(item)) {
      continue;
    }

    ids.push(item.id);
  }

  const testimonials = await client.getByIDs<Content.TestimonialDocument>(ids);

  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      size="2xl"
    >
      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'stretch', md: 'flex-end' }}
        gap={{ xs: 'base', md: 'md', lg: 'lg' }}
      >
        {testimonials.results.map(({ id, data }) => {
          return (
            <Testimonial
              key={id}
              flexGrow={1}
              flexShrink={1}
              flexBasis="100%"
              {...data}
            />
          );
        })}
      </Box>
    </Container>
  );
}
