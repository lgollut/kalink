import * as prismic from '@prismicio/client';
import * as prismicNext from '@prismicio/next';

import config from './slicemachine.config.json';

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
const routes: prismic.ClientConfig['routes'] = [
  {
    type: 'page',
    uid: 'homepage',
    path: '/',
  },
  {
    type: 'page',
    path: '/:uid',
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismic.ClientConfig = {}) => {
  const fixturePort = process.env.KALINK_BUILD_FIXTURE_PORT;
  const client = prismic.createClient(repositoryName, {
    ...(fixturePort
      ? {
          documentAPIEndpoint: `http://127.0.0.1:${Number(fixturePort)}/api/v2`,
        }
      : { accessToken: process.env.PRISMIC_KEY }),
    routes,
    fetchOptions:
      process.env.NODE_ENV === 'production'
        ? { next: { tags: ['prismic'] }, cache: 'force-cache' }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({ client });

  if (process.env.PRISMIC_RELEASE_ID) {
    client.queryContentFromReleaseByID(process.env.PRISMIC_RELEASE_ID);
  }

  return client;
};
