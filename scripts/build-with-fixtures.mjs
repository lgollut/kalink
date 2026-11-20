// Run the production build against a small local Prismic repository in PR CI.
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { createServer } from 'node:http';

import { filter } from '@prismicio/client';

const pages = ['homepage', 'courses'].map((uid) => ({
  id: uid,
  uid,
  type: 'page',
  data: { metaTitle: uid, metaImage: {}, tint: 'primary', slices: [] },
}));
const navigation = { type: 'mainNavigation', data: { items: [] } };

function queryDocuments(filters) {
  const matches = (predicate) => filters.includes(`[${predicate}]`);
  if (matches(filter.at('document.type', 'mainNavigation')))
    return [navigation];
  if (matches(filter.in('document.id', []))) return [];
  if (matches(filter.at('document.type', 'page'))) {
    return pages.filter(({ uid }) =>
      matches(filter.not('my.page.uid', 'homepage'))
        ? uid !== 'homepage'
        : matches(filter.at('my.page.uid', uid)),
    );
  }
  return undefined;
}

const server = createServer((request, response) => {
  const { pathname, searchParams } = new URL(request.url, 'http://localhost');
  response.setHeader('Content-Type', 'application/json');
  if (pathname === '/api/v2') {
    response.end(JSON.stringify({ refs: [{ ref: 'ci', isMasterRef: true }] }));
  } else if (pathname === '/api/v2/documents/search') {
    const results = queryDocuments(searchParams.getAll('q'));
    if (results) {
      response.end(JSON.stringify({ results, next_page: null }));
    } else {
      response
        .writeHead(400)
        .end(JSON.stringify({ error: 'Unknown fixture query' }));
    }
  } else {
    response.writeHead(404).end();
  }
});

server.listen(0, '127.0.0.1');
await once(server, 'listening');
try {
  const build = spawn(process.execPath, ['--run', 'build'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      PRISMIC_DOCUMENT_API_ENDPOINT: `http://127.0.0.1:${server.address().port}/api/v2`,
      PRISMIC_KEY: '',
      PRISMIC_RELEASE_ID: '',
    },
  });
  const [code] = await once(build, 'exit');
  process.exitCode = code ?? 1;
} finally {
  server.close();
}
