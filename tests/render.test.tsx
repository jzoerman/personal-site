import { test, afterEach } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import { SiteFooter } from "../components/SiteFooter";
import { HomeSection } from "../components/HomeSection";
import { DetailPage } from "../components/DetailPage";
import { TopicGrid } from "../components/TopicGrid";
import { NotebookEntries } from "../components/NotebookEntries";
import { resources } from "../lib/content";

const originalFetch = globalThis.fetch;
const initialEnabled = process.env.LEAFPLUS_ENABLED;
const local = async (resource: string) =>
  JSON.parse(await readFile(`content/${resources[resource]}`, "utf8"));
const markup = (Component: any, props: any) =>
  renderToStaticMarkup(createElement(Component, props));
afterEach(() => {
  globalThis.fetch = originalFetch;
  if (initialEnabled === undefined) delete process.env.LEAFPLUS_ENABLED;
  else process.env.LEAFPLUS_ENABLED = initialEnabled;
});

test("inactive sections hide descendants; nested hero image and labels honor activation and order", async () => {
  const hero = await local("home/hero");
  assert.equal(
    markup(HomeSection, { content: { ...hero, isActive: false } }),
    "",
  );
  hero.orbital.image.isActive = false;
  hero.orbital.children[0].isActive = false;
  hero.orbital.topLabels[1].sortKey = 0;
  const html = markup(HomeSection, { content: hero });
  assert.doesNotMatch(html, /<img|01 \/ SOFTWARE/);
  assert.ok(
    html.indexOf("PERSONAL SYSTEMS") < html.indexOf("JZ / EXPLORATIONS"),
  );
  hero.orbital.isActive = false;
  assert.doesNotMatch(
    markup(HomeSection, { content: hero }),
    /class="art orbital"/,
  );
});

test("inactive footer parent and child links do not render; links retain their destinations", async () => {
  const footer = await local("shared/footer");
  footer.children[0].isActive = false;
  const html = markup(SiteFooter, { content: footer });
  assert.doesNotMatch(html, /Say hello/);
  assert.match(html, /href="\/elsewhere#professional"/);
  footer.isActive = false;
  assert.equal(markup(SiteFooter, { content: footer }), "");
});

test("inactive detail images, paragraph children, and links stay hidden", async () => {
  const detail = await local("topics/faith");
  detail.image.isActive = false;
  detail.link.isActive = false;
  detail.children[0].isActive = false;
  const html = markup(DetailPage, { content: detail });
  assert.doesNotMatch(
    html,
    /topic-banner|Visit the notebook|Still being shaped\.<\/h2>/,
  );
  assert.match(html, /A life of faith, still being shaped by grace/);
  assert.match(html, /placeholder for the mockup/);
  assert.match(html, /href="\/interests"/);
});

test("rendered topic cards reflect remote ordering, inactive documents, images, and links", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  globalThis.fetch = async (input) => {
    const data = await local(
      new URL(String(input)).pathname.split("/content/")[1],
    );
    if (data.id === "ai") data.isActive = false;
    if (data.id === "solar") data.card.link.isActive = false;
    if (data.id === "faith") {
      data.sortKey = 1;
      data.card.image.isActive = false;
    }
    return Response.json(data);
  };
  const html = renderToStaticMarkup(await TopicGrid());
  assert.equal((html.match(/class="topic"/g) || []).length, 3);
  assert.ok(
    html.indexOf('href="/faith"') < html.indexOf('href="/hydroponics"'),
  );
  assert.doesNotMatch(html, /faith-photo|href="\/ai"|href="\/solar"/);
});

test("notebook cards honor card activation and display sample labels", async () => {
  process.env.LEAFPLUS_ENABLED = "true";
  globalThis.fetch = async (input) => {
    const data = await local(
      new URL(String(input)).pathname.split("/content/")[1],
    );
    if (data.id === "musing-ai") data.card.isActive = false;
    return Response.json(data);
  };
  const html = renderToStaticMarkup(await NotebookEntries());
  assert.equal((html.match(/class="note"/g) || []).length, 2);
  assert.match(html, /SAMPLE NOTE/);
  assert.doesNotMatch(html, /href="\/musing-ai"/);
});
