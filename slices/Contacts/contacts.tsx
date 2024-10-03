import { type Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';

import { ContactForm } from '@/app/_ui/contact-form';
import { Container } from '@/components/container';
import { MapLocator } from '@/components/map-locator';
import { RichText } from '@/components/rich-text';
import { SectionHeading } from '@/components/section-heading';

import {
  contactForm,
  contactInformation,
  contactMap,
  contactsGrid,
} from './contacts.css';

type ContactsProps = SliceComponentProps<Content.ContactsSlice>;

export const Contacts = ({ slice }: ContactsProps) => {
  const mapsApiKey = process.env.MAPS_API_KEY;
  const mapsId = process.env.MAPS_ID;

  return (
    <Container size="2xl">
      <SectionHeading slice={slice} />
      <div className={contactsGrid}>
        <div className={contactForm}>
          <ContactForm
            fields={slice.primary.form}
            tintScheme={slice.primary.backgroundColor}
            type={slice.primary.formType}
          />
        </div>
        <pre className={contactInformation}>
          <RichText field={slice.primary.information} />
        </pre>
        <div className={contactMap}>
          <MapLocator apiKey={mapsApiKey} mapId={mapsId} />
        </div>
      </div>
    </Container>
  );
};
