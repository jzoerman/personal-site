# Leaf++ integration

This application consumes project **`JeremyZoerman.com`**, using the same Leaf++ service and server-side/local-fallback approach as `/home/jz/AppDev/Profile-Professional-Vercel`.

## Configuration

The project ID is committed in `leafplus.settings.json`. Remote reads are enabled by default. Copy `.env.example` to `.env.local` to override settings:

| Variable                   | Default                                      |
| -------------------------- | -------------------------------------------- |
| `LEAFPLUS_ENABLED`         | `true`; set `false` for bundled content only |
| `LEAFPLUS_BASE_URL`        | Existing Azure-hosted Leaf++ service         |
| `LEAFPLUS_PROJECT`         | `JeremyZoerman.com`                          |
| `LEAFPLUS_TIMEOUT_SECONDS` | `3` (bounded to 0.1–30 seconds)              |

No editor credentials are needed by the website. It only calls the public document GET endpoint. No write credentials are shipped to the browser.

The root layout uses `force-dynamic`, and document fetches use `cache: 'no-store'`. React request caching deduplicates metadata/page reads. CMS saves become visible after the Leaf++ service's next successful public snapshot refresh (normally about 30 seconds), followed by a page refresh. The application remains a Node.js Next.js app; static export would freeze CMS content.

A missing document, timeout, malformed JSON, incompatible shape, or service error logs a warning and falls back independently to that document's bundled JSON. Explicitly inactive remote documents stay inactive; empty child arrays remain empty. An inactive topic or musing is removed from listings and its detail route returns 404. Existing `.html` redirects are preserved.

## Editable resources

| Leaf++ path                                          | Local source                        | Purpose                                                          |
| ---------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `/home`                                              | `content/Pages/home.json`           | Home page title and activation                                   |
| `/home/hero`                                         | `content/Sections/hero.json`        | Hero copy, actions, orbital image/labels                         |
| `/home/topic-strip`                                  | `content/Sections/topic-strip.json` | Topic strip labels                                               |
| `/home/interests`                                    | `content/Sections/interests.json`   | Home interests heading/link                                      |
| `/home/notebook`                                     | `content/Sections/notebook.json`    | Home notebook introduction/link                                  |
| `/home/about`                                        | `content/Sections/about.json`       | Closing panel                                                    |
| `/interests`, `/musings`, `/elsewhere`, `/not-found` | `content/Pages/*.json`              | Page headings, introductions, notices, contact placeholders, 404 |
| `/shared/header`                                     | `content/Shared/header.json`        | Brand and navigation                                             |
| `/shared/footer`                                     | `content/Shared/footer.json`        | Footer copy and links                                            |
| `/shared/site`                                       | `content/Shared/site.json`          | Site title, description, favicon, skip-link text                 |
| `/topics/{id}`                                       | `content/Topics/*.json`             | Five topic cards and detail pages                                |
| `/musings/{id}`                                      | `content/Musings/*.json`            | Three notebook cards and sample notes                            |

The five topic IDs are `ai`, `solar`, `hydroponics`, `aquascapes`, and `faith`. Musing IDs are `musing-ai`, `musing-hydroponics`, and `musing-aquascapes`. The current route inventory is deliberately explicit in application code; adding new detail pages requires adding their route and resource registration. CMS links can point to internal pages, HTTPS/HTTP URLs, email, or telephone links. Qualified domains entered without a scheme (for example `JeremyZoerman.dev`) are normalized to `https://JeremyZoerman.dev` when content is read, including inactive links. This does not modify saved Leaf++ JSON. Executable URL schemes are rejected. Text is rendered as React text, never injected HTML.

## Ordering and activation

Every document and nested content object has numeric `sortKey` and boolean `isActive`. Repeatable items are filtered on `isActive === true`, then sorted ascending with stable ties. An inactive parent hides its entire subtree. This includes sections, cards, navigation groups, links, images, labels, heading lines, and article paragraphs. Disabling a card's destination hides the card so there is no empty or misleading clickable target.

Section layouts, classes, routes, and the `interests` and `professional` anchors remain in application code. Content is ordinary JSON, not a page-builder schema. There is no parallel HTML content store.

## Existing `/home` compatibility

The live project was read during implementation. It contained one document:

```json
{ "pageTitle": "Jeremy Zoerman's Digital Space" }
```

That document was **not overwritten**. The consumer explicitly supports this legacy `/home` shape by borrowing missing root metadata and `id` from the bundled `/home` document, while retaining its remote title and any explicit activation/order values. This exception applies only to `/home`; all other documents require the full recursive metadata contract. Existing explicit invalid metadata still fails validation.

## Seed the remote project

`leafplus-project.json` is a ready-to-import archive containing all 21 documents. Regenerate after local content edits with:

```sh
npm run content:package
```

In the Leaf++ editor:

1. Select project `JeremyZoerman.com`.
2. Expand **Import / export project** and choose `leafplus-project.json`.
3. Leave **Overwrite existing paths** unchecked.
4. Preview, then import. Based on the observed project state, expect **20 new documents and 1 skipped document**.

The default skip mode preserves the existing `/home` title and any other remote edits made since inspection. Do not overwrite or recreate `/home` just to add metadata. No authenticated editor session was available in this workspace, so no remote writes were performed during integration. Until import, missing paths render the bundled defaults.

## Verification

```sh
npm test
npm run typecheck
LEAFPLUS_ENABLED=false npm run build
npm run verify -- --build
```

The content and React-rendering tests use local fixtures and mocked service responses. They cover strict metadata, local mode, remote project selection, no-store fetches, legacy home titles, missing/unavailable/malformed responses, unsafe URLs, inactive parents/children/links/images, stable ordering, and preserved sample labels/links.

Build verification checks compiled routes, redirects, and local content assets. For full HTTP checks with default bundled content:

```sh
LEAFPLUS_ENABLED=false npm start
# In another terminal:
npm run verify
```

The HTTP checks assert the original twelve-page/five-topic baseline. Intentional CMS deactivation or copy changes may require corresponding smoke-check updates. Live editor saves and browser layout QA require a reachable service and a local server.

Implementation verification also reached the live production server using curl: all twelve pages, twelve legacy redirects, thirteen linked assets, 404, active navigation, sample labels, the professional anchor, and the existing remote `/home` title passed. Node fetch was blocked by the sandbox, so the normal HTTP verifier could not run there; equivalent assertions were applied to the actual curl responses. Browser layout checks were not performed.
