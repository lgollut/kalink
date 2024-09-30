import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Container } from '@/components/container';
import { FiftyFifty } from '@/components/fifty-fifty';
import { SectionHeading } from '@/components/section-heading';

export type FiftyFiftySectionProps =
  SliceComponentProps<Content.FiftyFiftySectionSlice>;

export const FiftyFiftySection = ({ slice }: FiftyFiftySectionProps) => {
  return (
    <Container
      size="2xl"
      paddingInline={{ xs: 'none', md: 'md', lg: 'lg', xl: '5xl' }}
    >
      <SectionHeading
        paddingInlineStart={{ xs: 'base', md: 'none' }}
        slice={slice}
      />
      <FiftyFifty {...slice.primary} />
    </Container>
  );
};
