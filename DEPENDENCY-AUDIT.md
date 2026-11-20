# Kalink dependency audit

## Implemented and verified on 20 November 2026

The project now uses Node.js 26 LTS, pnpm 12.21.0, Next.js 16.4.6 with Webpack, and React 19.3.1. CI installs the frozen lockfile, lints, checks formatting, generates route types, type-checks and builds with local Prismic and Stripe fixtures. The workflow passed actionlint. The two unused browser Stripe packages were removed. The catalog and shipping reads explicitly request Stripe API version `2024-11-20.acacia` to preserve the Prismic payload. Shipping rates are prerendered as before.

| Verification                                        | Result                                                                                                                                                                                                                                                                                    |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean local checkout of the changes                 | Frozen install, ESLint, Prettier, TypeScript and the CI fixture build passed on Node 26.13.1.                                                                                                                                                                                             |
| Production build with the project's Prismic content | Generated the homepage and courses page. Both were served successfully.                                                                                                                                                                                                                   |
| Development workflow                                | `pnpm dev` started Next.js and Slice Machine, and both responded over HTTP.                                                                                                                                                                                                               |
| Browser smoke test                                  | The courses registration form displayed required-field errors, and client navigation to the homepage succeeded. Vercel Analytics' hosted script returned 404 on localhost.                                                                                                                |
| Integrations                                        | Catalog and shipping routes read Stripe test-mode data. A locally signed test product event reached a local webhook receiver. Both React email templates rendered through Resend with delivery mocked. Slice Simulator, preview exit and local cache revalidation responded successfully. |
| Final lockfile audit                                | Zero production findings. One high development advisory remains in Zod 3.25.76 through Slice Machine's manager and its Claude Agent SDK dependency. [Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)                                                                     |

ESLint 9.39.5 and TypeScript 6.0.3 match the lint plugins' peer ranges. Lucide 1.76.0 satisfies pnpm's release-age policy. Prismic's deprecated Slice Machine editor remains available pending a separate migration to Type Builder. Hosted Actions and the Vercel preview deployment passed on the initially reviewed commit, `6e785b8`. Editor-authenticated Prismic preview and live email delivery remain unverified.

## Pre-upgrade baseline

Checked 20 November 2026 against commit `7e07346`. The first release should replace Next.js 14.2.5 and Node.js 20. The production lockfile has four critical Next.js advisory matches, and Node.js 20 reached end of life on 30 April 2026. Of 48 direct packages, 45 have newer stable releases. All three GitHub Actions have newer majors. [Next.js support policy](https://nextjs.org/support-policy) · [Node.js release schedule](https://github.com/nodejs/Release#release-schedule)

## What the original checks covered

| Check on a clean copy, Node.js 20.20.2 and pnpm 9.6.0 | Observed result                                                                                                                                                        |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install --frozen-lockfile`                      | Passed with the committed lockfile.                                                                                                                                    |
| `pnpm run validate`                                   | ESLint and Prettier passed. These are the only checks the PR workflow runs. No automated test suite or test script was found.                                          |
| `pnpm run tsc` before a Next build                    | Failed on the Kalink logo and quote SVG imports. It passed after Next generated its type declarations.                                                                 |
| `pnpm run build`                                      | Compiled and passed its type check, then failed while generating static parameters for `/[page]`. Prismic returned “Invalid access token” without project credentials. |

## Original upgrade plan

1. **Align the runtime and CI.** Set `engines.node` to `26.x`, select that LTS line locally and on the host, and have CI read it with `node-version-file: package.json`. Node.js 26.13.1 was the current patch tested. Update `@types/node` to 26.6.6 and pin pnpm 12.21.0 in `packageManager`. Update the README's getting-started commands to match. Vercel documents support for Node 26 and pnpm 12. Verify the actual deployment settings and versions in a preview build. [Node.js releases](https://nodejs.org/dist/index.json) · [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions) · [Vercel package managers](https://vercel.com/docs/package-managers)
2. **Update the workflow.** In `.github/workflows/push-request.yml`, change `actions/checkout@v4` to v7.0.1, `pnpm/action-setup@v4` to v6.1.1 and `actions/setup-node@v4` to v7.1.0. Keep pnpm setup before setup-node's pnpm cache lookup. Make the frozen install explicit. Keep lint and formatting, run `pnpm exec next typegen` before `pnpm run tsc` on Next 16, and make a production build a merge check. Use a read-only Prismic test repository or a fixture for PR builds that cannot access credentials. The actions themselves run on Node 24 independently of the application's Node 26. [Checkout release](https://github.com/actions/checkout/releases/tag/v7.0.1) · [pnpm action release](https://github.com/pnpm/action-setup/releases/tag/v6.1.1) · [setup-node release](https://github.com/actions/setup-node/releases/tag/v7.1.0)
3. **Upgrade Next, React, Prismic and the styling plugin together.** Target Next and its ESLint config at 16.4.6, React and React DOM at 19.3.1, and the matching 19.x types. Prismic's Next adapter 3.0.0 requires Next 15/16 and Prismic client 7.23.0 or newer. Use client 7.23.1 and React integration 3.5.1. Upgrade the vanilla-extract plugin to 2.5.2. The current configuration fails under Next 16's default Turbopack. The trial compiled with Webpack. Use `next dev --webpack` and `next build --webpack` for the initial migration or explicitly configure and verify the plugin's experimental Turbopack support. [Next.js 16 migration](https://nextjs.org/docs/app/guides/upgrading/version-16) · [Prismic adapter peers](https://registry.npmjs.org/@prismicio/next/3.0.0) · [vanilla-extract integration](https://vanilla-extract.style/documentation/integrations/next/)
4. **Migrate the linter and compiler deliberately.** Replace `next lint` and consolidate the two legacy ESLint configs into one flat config. Preserve import ordering, unused-import and Prettier rules. The trial used ESLint 9.39.5 and TypeScript 6.0.3. ESLint 9 is deprecated. To adopt ESLint 10.15.0, first replace or update the Next config's import, React and JSX accessibility plugins whose peer ranges stop at ESLint 9. TypeScript 7.0.2 exceeds the current TypeScript ESLint parser's peer ceiling of `<6.1.0`. TypeScript 6.0.3 also meets type-fest 6's minimum. [ESLint migration](https://eslint.org/docs/latest/use/configure/migration-guide) · [Next lint dependencies](https://registry.npmjs.org/eslint-config-next/16.4.6) · [Parser peer versions](https://registry.npmjs.org/@typescript-eslint/parser/8.73.0)
5. **Refresh the full lockfile and verify the install from scratch.** The trial below shows why updating direct pins alone is insufficient. Review pnpm 12's dependency build-script decisions in `pnpm-workspace.yaml`. The existing-lock trial flagged `@swc/core`, `esbuild` and `@scarf/scarf` with `ERR_PNPM_IGNORED_BUILDS` on the default install before running scripts. Record which scripts the build needs, then run a normal frozen install in clean CI. Review the automatically generated release-age exception for `lucide-react@1.77.0` or wait until it meets the policy. [pnpm settings](https://pnpm.io/settings)

## Source changes and acceptance checks

| Area                     | Work indicated by the source and trial                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next routing and caching | Await the promised route parameters in `app/[page]/page.tsx`, its metadata function and `app/[page]/layout.tsx`. Move `experimental.typedRoutes` to the top level in `next.config.mjs`. In `tsconfig.json`, stop excluding the generated route validators under `.next`. Including them exposed a layout mismatch that the ordinary type check missed. In `app/api/revalidate/route.ts`, give `revalidateTag` its required second argument. Use `{ expire: 0 }` to preserve immediate CMS webhook invalidation. Verify a published edit reaches the homepage and a dynamic page. |
| Prismic                  | Update `prismicio.ts`. The v3 adapter removed the exported `CreateClientConfig` type and the old `previewData` and `req` arguments to App Router preview setup. Check preview entry, exit, the simulator, release selection and image rendering. Both Slice Machine packages are deprecated. Prismic supports existing projects and provides a migration to its CLI and Type Builder. Plan that editor migration with the people who use it. [Prismic migration guide](https://prismic.io/docs/slice-machine#migrate-to-the-type-builder)                                        |
| Components               | The trial compiler flagged global `JSX.Element` in IntroBlock and ListItems, a nullable ref in Input, and transition typing in ButtonLoading. It also caught an existing always-truthy `'sm'` condition in `components/button/button-internal.tsx`. Exercise navigation, dialogs, selects, toasts and loading states after the React, Radix and Motion upgrades.                                                                                                                                                                                                                 |
| Stripe                   | The server SDK moves from 17.4.0 to 23.2.0. The SDK default API version changes from `2024-11-20.acacia` to `2026-11-18.endive`, and the project does not set one explicitly. Check the catalog, shipping rates and signed product webhook against Stripe test data and the endpoint's configured event version. The two Stripe browser SDKs occur only in the manifest and lockfile. Remove them if unused, or upgrade them together to the versions below.                                                                                                                     |
| Resend                   | Both contact and inscription messages pass React templates to `resend.emails.send`. Resend 6.39.0 dynamically imports the optional peer `@react-email/render` for that path. Add it as a direct runtime dependency, e.g. 2.3.1, and render both templates against a test destination. [Resend package](https://www.npmjs.com/package/resend/v/6.39.0)                                                                                                                                                                                                                            |
| Other UI packages        | Check icon imports after the Lucide 0.x to 1.x change, contact-map rendering, SimpleBar styling, analytics events and the vanilla-extract CSS in the preview build.                                                                                                                                                                                                                                                                                                                                                                                                              |

## Security results

The counts below come from pnpm's registry audit of the resolved packages. Production and full audits overlap. A match identifies an affected version. Runtime exposure depends on the deployment and features in use.

| Resolution                                                 | Scope      | Critical | High | Moderate | Low |
| ---------------------------------------------------------- | ---------- | -------: | ---: | -------: | --: |
| Committed lockfile                                         | Production |        4 |   37 |       32 |   7 |
| Committed lockfile                                         | Full       |        6 |   71 |       76 |  20 |
| Trial direct upgrades, existing lockfile as starting point | Production |        0 |    4 |        3 |   1 |
| Same trial                                                 | Full       |        2 |   36 |       37 |  12 |
| Same manifest, fresh resolution                            | Production |        0 |    0 |        0 |   0 |
| Same fresh resolution                                      | Full       |        0 |    1 |        0 |   0 |

All four critical production matches concern Next.js. The two other critical matches in the original full audit concern `shell-quote` and `proxy-addr`. The trial that reused existing resolutions retained those through npm-run-all and Slice Machine. It also retained flagged Lodash versions through SimpleBar and Browserslist through Babel. Fresh resolution cleared those matches. Its remaining high finding was `zod@3.25.76` through Slice Machine's manager and Claude Agent SDK. Prefer updating or retiring the parent as part of the editor migration. Re-run both audits on the exact lockfile proposed for merge. [Middleware advisory](https://github.com/advisories/GHSA-f82v-jwr5-mffw) · [Windows advisory](https://github.com/advisories/GHSA-p293-qw3h-jr36) · [AVIF advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4) · [SVG advisory](https://github.com/advisories/GHSA-2464-fhr4-w9xw) · [Zod advisory](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5)

## Direct dependency inventory

The locked column comes from the root importer in `pnpm-lock.yaml`. The release column is the npm registry's stable `latest` tag on the audit date. It includes the deprecated Slice Machine releases and the ESLint and TypeScript versions discussed above. The trial used the listed releases except for ESLint and TypeScript. External services, a deployment, and a hosted Actions run were outside this local trial. [npm registry](https://registry.npmjs.org/)

### Application packages

| Package                           |  Locked | Latest stable |
| --------------------------------- | ------: | ------------: |
| `@prismicio/client`               |   7.7.4 |        7.23.1 |
| `@prismicio/next`                 |   1.6.0 |         3.0.0 |
| `@prismicio/react`                |   2.8.0 |         3.5.1 |
| `@radix-ui/react-dialog`          |   1.1.1 |         1.3.1 |
| `@radix-ui/react-label`           |   2.1.0 |        2.1.17 |
| `@radix-ui/react-navigation-menu` |   1.2.0 |         1.4.1 |
| `@radix-ui/react-popover`         |   1.1.2 |         1.3.1 |
| `@radix-ui/react-scroll-area`     |   1.1.0 |         1.4.0 |
| `@radix-ui/react-select`          |   2.1.2 |         2.4.1 |
| `@radix-ui/react-slot`            |   1.1.0 |         1.5.0 |
| `@radix-ui/react-toast`           |   1.2.1 |         1.3.1 |
| `@stripe/react-stripe-js`         |   3.0.0 |         7.1.0 |
| `@stripe/stripe-js`               |   5.2.0 |        10.3.0 |
| `@uidotdev/usehooks`              |   2.4.1 |         2.4.1 |
| `@vanilla-extract/dynamic`        |   2.1.1 |         2.1.5 |
| `@vercel/analytics`               |   1.3.1 |         2.0.1 |
| `@vis.gl/react-google-maps`       |   1.1.0 |        1.10.2 |
| `clsx`                            |   2.1.1 |         2.1.1 |
| `framer-motion`                   | 11.3.19 |       14.14.0 |
| `lucide-react`                    | 0.424.0 |        1.77.0 |
| `next`                            |  14.2.5 |        16.4.6 |
| `react`                           |  18.3.1 |        19.3.1 |
| `react-dom`                       |  18.3.1 |        19.3.1 |
| `react-hook-form`                 |  7.52.2 |        7.92.0 |
| `resend`                          |   3.5.0 |        6.39.0 |
| `simplebar-react`                 |   3.2.6 |         3.3.2 |
| `stripe`                          |  17.4.0 |        23.2.0 |

### Development packages

| Package                             |   Locked | Latest stable |
| ----------------------------------- | -------: | ------------: |
| `@slicemachine/adapter-next`        |   0.3.61 |       0.3.100 |
| `@types/node`                       | 20.14.13 |        26.6.6 |
| `@types/react`                      |   18.3.3 |        19.3.0 |
| `@types/react-dom`                  |   18.3.0 |        19.3.0 |
| `@vanilla-extract/css`              |   1.15.3 |        1.21.3 |
| `@vanilla-extract/css-utils`        |    0.1.4 |         0.1.6 |
| `@vanilla-extract/next-plugin`      |    2.4.3 |         2.5.2 |
| `@vanilla-extract/recipes`          |    0.5.3 |         0.5.7 |
| `@vanilla-extract/sprinkles`        |    1.6.2 |         1.7.1 |
| `concurrently`                      |    8.2.2 |        10.0.7 |
| `eslint`                            |   8.57.0 |       10.15.0 |
| `eslint-config-next`                |   14.2.5 |        16.4.6 |
| `eslint-config-prettier`            |    9.1.0 |        10.1.8 |
| `eslint-import-resolver-typescript` |    3.6.1 |         4.4.5 |
| `eslint-plugin-import`              |   2.29.1 |        2.32.0 |
| `eslint-plugin-unused-imports`      |    3.2.0 |         4.4.1 |
| `npm-run-all`                       |    4.1.5 |         4.1.5 |
| `prettier`                          |    3.3.3 |        3.10.1 |
| `slice-machine-ui`                  |   2.11.1 |        2.21.6 |
| `type-fest`                         |   4.23.0 |         6.0.3 |
| `typescript`                        |    5.5.4 |         7.0.2 |
