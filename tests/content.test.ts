import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { active, ordered } from "../lib/order";
import {
  loadDocument,
  homeSections,
  topics,
  musings,
  resources,
  validTree,
} from "../lib/content";
import type { DetailContent, HomeContent } from "../lib/models";

const originalFetch = globalThis.fetch;
const environment = { ...process.env };
const local = async (resource: string) =>
  JSON.parse(await readFile(`content/${resources[resource]}`, "utf8"));
beforeEach(() => {
  process.env.LEAFPLUS_ENABLED = "false";
});
afterEach(() => {
  globalThis.fetch = originalFetch;
  process.env = { ...environment };
});

test("all bundled content follows the recursive Leaf++ contract", async () => {
  for (const resource of Object.keys(resources))
    assert.equal(validTree(await local(resource)), true, resource);
  assert.equal((await homeSections()).length, 5);
  assert.equal((await topics()).length, 5);
  assert.equal((await musings()).length, 3);
});

test("activation requires actual booleans and ordering is numeric, stable, and nonmutating", () => {
  const items = [
    { id: "late", sortKey: 20, isActive: true },
    { id: "hidden", sortKey: 0, isActive: false },
    { id: "first", sortKey: 10, isActive: true },
    { id: "tie", sortKey: 10, isActive: true },
  ];
  assert.deepEqual(
    ordered(items).map((item) => item.id),
    ["first", "tie", "late"],
  );
  assert.equal(items[0].id, "late");
  assert.equal(active({ sortKey: 10, isActive: false }), false);
  assert.equal(active({ sortKey: 10, isActive: "true" } as never), false);
  assert.equal(active(undefined), false);
});

test("remote URLs use the configured project, no cache, and bounded timeout", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  process.env.LEAFPLUS_BASE_URL = "https://cms.example.test/";
  delete process.env.LEAFPLUS_PROJECT;
  globalThis.fetch = async (input, init) => {
    assert.equal(
      String(input),
      "https://cms.example.test/api/projects/JeremyZoerman.com/content/topics/faith",
    );
    assert.equal(init?.cache, "no-store");
    assert.ok(init?.signal);
    return Response.json({
      ...(await local("topics/faith")),
      pageTitle: "Remote faith title",
    });
  };
  assert.equal(
    (await loadDocument<DetailContent>("topics/faith")).pageTitle,
    "Remote faith title",
  );
});

test("legacy /home preserves the existing remote title without mutating its JSON", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  globalThis.fetch = async () =>
    Response.json({ pageTitle: "Jeremy Zoerman's Digital Space" });
  const home = await loadDocument<HomeContent>("home");
  assert.equal(home.pageTitle, "Jeremy Zoerman's Digital Space");
  assert.equal(home.isActive, true);
  assert.equal(home.sortKey, 10);
});

test("missing, unavailable, malformed, unsafe, and invalid metadata fall back per document", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  const fallback = await local("topics/ai");
  const brokenImage = structuredClone(fallback);
  brokenImage.card.image.isActive = "false";
  const unsafe = structuredClone(fallback);
  unsafe.card.link.url = "javascript:alert(1)";
  const missingMetadata = structuredClone(fallback);
  delete missingMetadata.card.image.sortKey;
  for (const response of [
    () => new Response(null, { status: 404 }),
    () => new Response(null, { status: 503 }),
    () =>
      new Response("{broken", {
        headers: { "Content-Type": "application/json" },
      }),
    () => Response.json({ ...fallback, headingLines: "broken" }),
    () => Response.json(brokenImage),
    () => Response.json(unsafe),
    () => Response.json(missingMetadata),
    () => Response.json({ ...fallback, sortKey: "10" }),
    () => {
      throw new Error("network fixture");
    },
  ]) {
    globalThis.fetch = async () => response();
    assert.deepEqual(await loadDocument("topics/ai"), fallback);
  }
});

test("remote inactive documents stay inactive, and empty children stay empty", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  const data = await local("topics/solar");
  globalThis.fetch = async () =>
    Response.json({ ...data, isActive: false, children: [] });
  const content = await loadDocument<DetailContent>("topics/solar");
  assert.equal(content.isActive, false);
  assert.deepEqual(content.children, []);
});

test("remote sibling order and deactivation control topic listings without deleting fallbacks", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  globalThis.fetch = async (input) => {
    const resource = new URL(String(input)).pathname.split("/content/")[1];
    const data = await local(resource);
    if (data.id === "ai") data.isActive = false;
    if (data.id === "faith") data.sortKey = 1;
    return Response.json(data);
  };
  assert.deepEqual(
    (await topics()).map((item) => item.id),
    ["faith", "solar", "hydroponics", "aquascapes"],
  );
});

test("local mode never calls the service and rejects arbitrary filesystem paths", async () => {
  globalThis.fetch = async () => {
    throw new Error("must not fetch");
  };
  assert.equal(
    (await loadDocument<DetailContent>("topics/faith")).intro,
    "A life of faith, still being shaped by grace.",
  );
  await assert.rejects(
    () => loadDocument("../../secret"),
    /Unknown content resource/,
  );
});
