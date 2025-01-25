import { redirectToPreviewURL } from '@prismicio/next';
import { NextRequest } from 'next/server';

import { createClient } from '@/app/_services/prismic-client';

export async function GET(request: NextRequest) {
  return await redirectToPreviewURL({ client: createClient(), request });
}
