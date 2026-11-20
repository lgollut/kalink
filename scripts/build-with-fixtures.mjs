// Run the production build against local Prismic fixtures in PR CI.
import { execFileSync, spawn } from 'node:child_process';
import { once } from 'node:events';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

import { filter } from '@prismicio/client';

const pageIDs = ['homepage', 'courses'];
const pages = pageIDs.map((uid) => ({
  id: uid,
  uid,
  type: 'page',
  data: {
    metaTitle: uid,
    metaImage: {},
    navigationLabel: uid,
    tint: 'primary',
    slices: [
      {
        id: 'topics',
        slice_type: 'list_items',
        variation: 'default',
        primary: {
          title: 'Topics',
          slug: 'topics',
          subNavigation: true,
          backgroundColor: 'primary',
          items: [{ label: 'Drawing' }],
        },
      },
    ],
  },
}));
const navigation = {
  type: 'mainNavigation',
  data: {
    items: pages.map(({ id }) => ({ item: { link_type: 'Document', id } })),
  },
};

function queryDocuments(filters) {
  const matches = (predicate) => filters.includes(`[${predicate}]`);
  if (matches(filter.at('document.type', 'mainNavigation')))
    return [navigation];
  if (matches(filter.in('document.id', pageIDs))) return pages;
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

const workspace = mkdtempSync(join(tmpdir(), 'kalink-fixture-'));
try {
  // Build current sources in isolation so pnpm start still serves the normal .next output.
  const files = execFileSync(
    'git',
    ['ls-files', '-z', '--cached', '--others', '--exclude-standard'],
    { encoding: 'utf8' },
  );
  for (const file of files.split('\0').filter(Boolean)) {
    if (!existsSync(file)) continue;
    const destination = join(workspace, file);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(file, destination);
  }
  symlinkSync(
    resolve('node_modules'),
    join(workspace, 'node_modules'),
    'junction',
  );

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const build = spawn(process.execPath, ['--run', 'build'], {
    cwd: workspace,
    stdio: 'inherit',
    env: {
      ...process.env,
      KALINK_BUILD_FIXTURE_PORT: String(server.address().port),
      SHOP_FEED_TOKEN: '',
      STRIPE_SECRET_KEY: '',
      PRISMIC_KEY: '',
      PRISMIC_RELEASE_ID: '',
    },
  });
  const [code] = await once(build, 'exit');
  process.exitCode = code ?? 1;
} finally {
  server.close();
  rmSync(workspace, { recursive: true, force: true });
}
