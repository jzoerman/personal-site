import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";

const buildOnly = process.argv.includes("--build");
const manifest = buildOnly
  ? JSON.parse(await readFile(".next/routes-manifest.json", "utf8"))
  : null;

async function readPage(route) {
  if (buildOnly)
    return readFile(
      `.next/server/app/${route === "/" ? "index" : route.slice(1)}.html`,
      "utf8",
    );
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

for (const route of routes) {
  const html = await readPage(route);
  assert.match(
    html,
    /<title>.+Jeremy Zoerman<\/title>/,
    `${route} needs metadata`,
  );
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
      /Sample editorial copy/,
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
  if (buildOnly) {
    const redirect = manifest.redirects.find(
      (entry) => entry.source === legacy,
    );
    assert.equal(
      redirect?.statusCode,
      308,
      `${legacy} must redirect permanently`,
    );
    assert.equal(redirect.destination, route);
  } else {
    const redirect = await fetch(new URL(legacy, base), { redirect: "manual" });
    assert.equal(redirect.status, 308, `${legacy} must redirect permanently`);
    assert.equal(
      new URL(redirect.headers.get("location"), base).pathname,
      route,
    );
  }
}
for (const asset of assets) {
  if (buildOnly) {
    await access(
      asset.startsWith("/_next/")
        ? `.next/${asset.slice(7)}`
        : `public${asset}`,
    );
  } else {
    assert.equal(
      (await fetch(new URL(asset, base))).status,
      200,
      `${asset} must resolve`,
    );
  }
}
if (buildOnly) {
  assert.equal(manifest.pages404, true);
  assert.match(
    await readFile(".next/server/app/_not-found.html", "utf8"),
    /This page is/,
  );
} else {
  assert.equal((await fetch(new URL("/missing-page", base))).status, 404);
}
console.log(
  `Verified ${buildOnly ? "build artifacts for" : "HTTP responses for"} ${routes.length} pages, legacy redirects, ${assets.size} linked assets, active navigation, sample labels, and 404.`,
);
