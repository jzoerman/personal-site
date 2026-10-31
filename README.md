# Jeremy Zoerman — personal website

The approved HTML mockup rebuilt with **Next.js App Router, React, and TypeScript**. All twelve pages retain the white background, teal header and footer, five photographic topics, orbital illustration, and original placeholder/sample copy.

## Run locally

Use Node.js 20.9 or newer:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run these commands from `personal-site/`.

For a production build:

```sh
npm run build
npm start
```

## Project structure

- `app/`: route pages, metadata, root layout, shared CSS, and custom 404.
- `components/`: shared navigation, footer, topic grid, and notebook entries. Only the active-navigation header requires a client component.
- `public/`: local photographs and SVG artwork. See [photo credits](PHOTO-CREDITS.md).
- `next.config.ts`: permanent redirects from the mockup's `.html` URLs to Next.js routes.
- `scripts/verify-site.mjs`: production HTTP smoke checks.
- `dist/`: retained original static mockup for reference; Next.js does not serve it. New changes belong in `app/`, `components/`, and `public/`.

Routes: `/`, `/interests`, `/ai`, `/solar`, `/hydroponics`, `/aquascapes`, `/faith`, `/musings`, `/musing-ai`, `/musing-hydroponics`, `/musing-aquascapes`, and `/elsewhere`.

The global layout provides the shared header/footer, skip-to-content link, and title template. Individual pages provide their own titles. Navigation uses Next.js Link and highlights the parent section on topic and notebook detail pages. The SVG itself controls globe animation so its guides remain stationary; reduced-motion support is preserved.

## Validate

```sh
npm run typecheck
npm run build
npm run verify -- --build
npm start
# In another terminal, with the production server running:
npm run verify
```

The `--build` mode validates generated HTML, linked assets, and redirect manifests without starting a server. The default mode checks HTTP responses from the running app. Set `SITE_URL` to verify another local port. Verification checks all twelve routes, active navigation, page titles, five-topic grids, sample-writing labels, linked local assets, legacy redirects, and the 404 response.

Google Fonts are optional external requests; local/system fallbacks remain. Contact/social links, the future professional domain, and sample writing are still explicitly placeholders.

## Hosting

The Next.js project can run on a Node.js host or a platform supporting Next.js. No deployment was requested or performed during the framework conversion. The existing `.openai/hosting.json` still identifies the earlier static mockup and its `dist/` directory; it is historical configuration, **not a deployment configuration for this Next.js app**. Do not use it to publish the application without adapting the hosting setup.
