import { ServiceDescriptionDocument, ServiceDocument } from '@/prismicio-types';

export type ServiceCardProps =
  | ServiceDocument['data']
  | ServiceDescriptionDocument['data'];
