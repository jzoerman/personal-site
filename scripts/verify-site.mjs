import assert from "node:assert/strict";
import { readFile, access, readdir } from "node:fs/promises";

const buildOnly = process.argv.includes("--build");
const manifest = buildOnly
  ? JSON.parse(await readFile(".next/routes-manifest.json", "utf8"))
  : null;

async function readPage(route) {
  const response = await fetch(new URL(route, base));
  assert.equal(response.status, 200, `${route} must render`);
  return response.text();
}

// Run against a production server: npm start -- --port 3000
const base = process.env.SITE_URL || "http://localhost:3000";
const routes = [
  "/",
  "/interests",
  "/ai",
  "/solar",
  "/hydroponics",
  "/aquascapes",
  "/faith",
  "/musings",
  "/musing-ai",
  "/musing-hydroponics",
  "/musing-aquascapes",
  "/elsewhere",
];
const assets = new Set();

if (buildOnly) {
  const emitted = JSON.parse(
    await readFile(".next/server/app-paths-manifest.json", "utf8"),
  );
  for (const route of [...routes, "/_not-found"]) {
    const key = route === "/" ? "/page" : `${route}/page`;
    assert.ok(emitted[key], `${route} must have a compiled route`);
    await access(`.next/server/${emitted[key]}`);
    if (route === "/_not-found") continue;
    const legacy = route === "/" ? "/index.html" : `${route}.html`;
    const redirect = manifest.redirects.find((item) => item.source === legacy);
    assert.equal(redirect?.statusCode, 308);
    assert.equal(redirect.destination, route);
  }
  async function inspect(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = `${directory}/${entry.name}`;
      if (entry.isDirectory()) {
        await inspect(file);
        continue;
      }
      if (!file.endsWith(".json")) continue;
      function collect(value) {
        if (!value || typeof value !== "object") return;
        if (typeof value.url === "string" && value.url.startsWith("/")) {
          const url = new URL(value.url, base);
          if (!routes.includes(url.pathname)) assets.add(url.pathname);
        }
        Object.values(value).forEach(collect);
      }
      collect(JSON.parse(await readFile(file, "utf8")));
    }
  }
  await inspect("content");
  for (const asset of assets) await access(`public${asset}`);
  console.log(
    `Verified compiled routes for ${routes.length} pages and 404, legacy redirects, and ${assets.size} bundled content assets. Dynamic HTML is covered by npm test and live HTTP verification.`,
  );
  process.exit(0);
}

for (const route of routes) {
  const html = await readPage(route);
  assert.match(html, /<title>[^<]+<\/title>/, `${route} needs metadata`);
  assert.equal(
    (html.match(/<h1[ >]/g) || []).length,
    1,
    `${route} needs one main heading`,
  );
  assert.match(
    html,
    /id="main-content"/,
    `${route} needs the skip-link target`,
  );
  assert.equal(
    (html.match(/aria-current="page"/g) || []).length,
    1,
    `${route} needs active navigation`,
  );
  if (route === "/" || route === "/interests") {
    assert.equal(
      (html.match(/class="topic"/g) || []).length,
      5,
      `${route} must have five topics`,
    );
  }
  if (route.startsWith("/musing-"))
    assert.match(
      html,
      /Sample reflection/,
      "Sample writing must stay labeled",
    );
  if (route === "/faith")
    assert.match(html, /A life of faith, still being shaped by grace/);
  for (const [, target] of html.matchAll(/(?:href|src)="([^\"]+)"/g)) {
    if (!target.startsWith("/")) continue;
    const url = new URL(target, base);
    if (!routes.includes(url.pathname)) assets.add(url.pathname);
    if (url.hash && url.pathname === "/elsewhere") {
      const destination = await readPage("/elsewhere");
      assert.match(destination, /id="professional"/);
    }
  }
  const legacy = route === "/" ? "/index.html" : `${route}.html`;
  const redirect = await fetch(new URL(legacy, base), { redirect: "manual" });
  assert.equal(redirect.status, 308, `${legacy} must redirect permanently`);
  assert.equal(new URL(redirect.headers.get("location"), base).pathname, route);
}
for (const asset of assets) {
  assert.equal(
    (await fetch(new URL(asset, base))).status,
    200,
    `${asset} must resolve`,
  );
}
assert.equal((await fetch(new URL("/missing-page", base))).status, 404);
console.log(
  `Verified HTTP responses for ${routes.length} pages, legacy redirects, ${assets.size} linked assets, active navigation, sample labels, and 404.`,
);
