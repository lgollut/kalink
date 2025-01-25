import { type Content, isFilled } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { getByIDs } from '@/app/_services/prismic';
import { Container } from '@/components/container';
import { SectionHeading } from '@/components/section-heading';
import { ServiceCard } from '@/components/service-card';

import { servicesGrid, servicesGridCell } from './services-grid.css';

export type GridProps = SliceComponentProps<Content.GridSlice>;

export async function ServicesGrid({ slice }: GridProps) {
  const ids: string[] = [];

  for (const { item } of slice.primary.items) {
    if (!isFilled.contentRelationship(item)) {
      continue;
    }

    ids.push(item.id);
  }

  const services = await getByIDs<
    Content.ServiceDocument | Content.ServiceDescriptionDocument
  >(ids);

  return (
    <Container
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      size="2xl"
    >
      <SectionHeading slice={slice} />

      <div className={servicesGrid}>
        {services.results.map(({ id, type, data }) => {
          return (
            <div key={id} className={servicesGridCell({ type })}>
              <ServiceCard {...data} />
            </div>
          );
        })}
      </div>
    </Container>
  );
}
