import { Client, ClientConfig, PrismicDocument } from '@prismicio/client';

import config from '../../slicemachine.config.json';

const routes: ClientConfig['routes'] = [
  {
    type: 'page',
    uid: 'homepage',
    path: '/',
  },
  {
    type: 'page',
    uid: 'shop',
    path: '/shop',
  },
  {
    type: 'page',
    path: '/:uid',
  },
  {
    type: 'product',
    path: '/shop/:uid',
  },
];

export function createClient<
  TDocuments extends PrismicDocument = PrismicDocument,
>() {
  const client = new Client<TDocuments>(config.repositoryName, {
    accessToken: process.env.NEXT_PUBLIC_PRISMIC_KEY,
    routes,
  });

  setContentRef(client);

  return client;
}

export function setContentRef(
  client: Client,
  releaseId: string | undefined = process.env.NEXT_PUBLIC_PRISMIC_RELEASE_ID,
) {
  if (releaseId) {
    client.queryContentFromReleaseByID(releaseId);
  } else {
    client.queryLatestContent();
  }
}
