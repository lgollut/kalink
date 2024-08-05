import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { ContactForm } from '@/app/_ui/contact-form';
import { Container } from '@/components/container';
import { SectionHeading } from '@/components/section-heading';

type ContactsProps = SliceComponentProps<Content.ContactsSlice>;

export const Contacts = ({ slice }: ContactsProps) => {
  return (
    <Container size="2xl">
      {slice.primary.title && (
        <SectionHeading>{slice.primary.title}</SectionHeading>
      )}
      <ContactForm />
    </Container>
  );
};
