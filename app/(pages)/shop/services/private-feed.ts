import { timingSafeEqual } from 'node:crypto';

export async function privateFeed(
  request: Request,
  load: () => Promise<unknown>,
) {
  const headers = { 'Cache-Control': 'private, no-store' };
  const token = process.env.SHOP_FEED_TOKEN;
  if (!token) {
    return new Response(null, { status: 404, headers });
  }

  const expected = Buffer.from(`Bearer ${token}`);
  const supplied = Buffer.from(request.headers.get('authorization') ?? '');
  if (
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  ) {
    return new Response(null, { status: 404, headers });
  }

  return Response.json(await load(), { headers });
}
