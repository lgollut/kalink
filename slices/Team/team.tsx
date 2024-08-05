import { isFilled, type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { Container } from '@/components/container';
import { PersonCard } from '@/components/person-card';
import { SectionHeading } from '@/components/section-heading';
import { Stack } from '@/components/stack';
import { createClient } from '@/prismicio';
import { isObject } from '@/utils/is-object';

export type TeamProps = SliceComponentProps<Content.TeamSlice>;

export async function Team({ slice }: TeamProps) {
  const client = createClient();
  const items: Map<string, Content.TeamSliceDefaultPrimaryItemsItem> =
    new Map();

  for (const item of slice.primary.items) {
    if (!isFilled.contentRelationship(item.person)) {
      continue;
    }

    items.set(item.person.id, item);
  }

  const people = await client.getByIDs<Content.PersonDocument>([
    ...items.keys(),
  ]);

  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      size="2xl"
    >
      {slice.primary.title && (
        <SectionHeading>{slice.primary.title}</SectionHeading>
      )}
      <Stack gap="5xl">
        {people.results.map(({ id, data }) => {
          const item = items.get(id);

          if (!isObject(item)) {
            return null;
          }

          const { person, ...rest } = item;

          return (
            <PersonCard
              key={id}
              flexGrow={1}
              flexShrink={1}
              flexBasis="100%"
              {...rest}
              {...data}
            />
          );
        })}
      </Stack>
    </Container>
  );
}
