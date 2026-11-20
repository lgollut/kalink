This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Use Node.js 26 LTS and the pnpm version pinned in `package.json`. With nvm installed:

```bash
nvm install
npm install --global pnpm@12.21.0
pnpm install --frozen-lockfile
pnpm dev
```

Set `PRISMIC_KEY` in `.env.local` for the project's private Prismic repository.
Run `pnpm validate`, `pnpm tsc` and `pnpm build` to check changes. To run the
same production build as pull-request CI with local Prismic fixtures, use
`node scripts/build-with-fixtures.mjs`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Private shop feeds

The catalog and shipping feeds return 404 by default. To enable a trusted
server-side reader, configure the same secret on both sides: set
`SHOP_FEED_TOKEN` on the server and send it as `Authorization: Bearer <token>`
on each GET request. The Stripe webhook uses its own signature.
