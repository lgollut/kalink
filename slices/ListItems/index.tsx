import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Box } from '@/components/box';
import { Container } from '@/components/container';
import { SectionHeading } from '@/components/section-heading';

/**
 * Props for `ListItems`.
 */
export type ListItemsProps = SliceComponentProps<Content.ListItemsSlice>;

/**
 * Component for "ListItems" Slices.
 */
const ListItems = ({ slice }: ListItemsProps): JSX.Element => {
  return (
    <Box
      use="section"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      tintScheme={slice.primary.backgroundColor}
      paddingBlock="3xl"
      paddingInline="none"
    >
      <Container size="2xl">
        <SectionHeading slice={slice} width="full" textAlign="center" />
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={{ xs: 'base', sm: 'md', lg: 'lg' }}
          justifyContent="center"
          flexWrap={{ xs: 'nowrap', sm: 'wrap' }}
        >
          {slice.primary.items.map((item) => (
            <Box
              display="flex"
              justifyContent="center"
              paddingBlock="md"
              paddingInline="lg"
              key={item.label}
              tintScheme="surface"
              borderRadius="default"
            >
              {item.label}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ListItems;
