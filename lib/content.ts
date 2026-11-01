import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { ordered, safeUrl, normalizeUrl } from "./order";
import type {
  Document,
  DetailContent,
  HomeSection,
  HomeContent,
  PageContent,
  HeaderContent,
  FooterContent,
  SiteContent,
} from "./models";

const root = path.join(process.cwd(), "content");
const settings = JSON.parse(
  await readFile(path.join(process.cwd(), "leafplus.settings.json"), "utf8"),
);
const warnings = new Set<string>();
const warn = (resource: string, reason: string) => {
  const message = `Leaf++ ${resource}: ${reason}; using bundled content.`;
  if (!warnings.has(message)) {
    warnings.add(message);
    console.warn(message);
  }
};

function normalizeContentUrls(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalizeContentUrls);
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      key === "url" && typeof child === "string"
        ? normalizeUrl(child)
        : normalizeContentUrls(child),
    ]),
  );
}

// A document's own JSON shape is the contract, as in the Leaf++ editor.
// Every content object must carry explicit metadata. Empty arrays remain valid.
export function validTree(value: unknown): boolean {
  if (Array.isArray(value))
    return value.every(
      (item) => item !== null && typeof item === "object" && validTree(item),
    );
  if (value === null || typeof value !== "object") return true;
  const object = value as Record<string, unknown>;
  if (
    typeof object.isActive !== "boolean" ||
    typeof object.sortKey !== "number" ||
    !Number.isFinite(object.sortKey)
  )
    return false;
  if (
    "url" in object &&
    (typeof object.url !== "string" || !safeUrl(object.url))
  )
    return false;
  return Object.values(object).every(
    (item) => typeof item !== "object" || validTree(item),
  );
}

export function matchesShape(value: unknown, template: unknown): boolean {
  if (Array.isArray(template)) {
    return (
      Array.isArray(value) &&
      (template.length === 0 ||
        value.every((item) =>
          template.some((sample) => matchesShape(item, sample)),
        ))
    );
  }
  if (template !== null && typeof template === "object") {
    return (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      Object.entries(template).every(
        ([key, sample]) =>
          key in value &&
          matchesShape((value as Record<string, unknown>)[key], sample),
      )
    );
  }
  return typeof value === typeof template;
}

export const resources = {
  home: "Pages/home.json",
  interests: "Pages/interests.json",
  musings: "Pages/musings.json",
  elsewhere: "Pages/elsewhere.json",
  "not-found": "Pages/not-found.json",
  "shared/header": "Shared/header.json",
  "shared/footer": "Shared/footer.json",
  "shared/site": "Shared/site.json",
  ...Object.fromEntries(
    ["hero", "topic-strip", "interests", "notebook", "about"].map((id) => [
      `home/${id}`,
      `Sections/${id}.json`,
    ]),
  ),
  ...Object.fromEntries(
    ["ai", "solar", "hydroponics", "aquascapes", "faith"].map((id) => [
      `topics/${id}`,
      `Topics/${id}.json`,
    ]),
  ),
  ...Object.fromEntries(
    ["musing-ai", "musing-hydroponics", "musing-aquascapes"].map((id) => [
      `musings/${id}`,
      `Musings/${id}.json`,
    ]),
  ),
} as Record<string, string>;

export async function loadDocument<T extends Document>(
  resource: string,
): Promise<T> {
  const file = resources[resource];
  if (!file) throw new Error(`Unknown content resource: ${resource}`);
  const local = normalizeContentUrls(
    JSON.parse(await readFile(path.join(root, file), "utf8")),
  ) as Record<string, unknown>;
  if (!validTree(local)) throw new Error(`Invalid bundled content: ${file}`);
  if ((process.env.LEAFPLUS_ENABLED ?? "true").toLowerCase() !== "true")
    return local as unknown as T;
  try {
    const base =
      process.env.LEAFPLUS_BASE_URL ||
      "https://leaf-plus-plus-d9htfbg4fufzd9hy.westcentralus-01.azurewebsites.net/";
    const project = process.env.LEAFPLUS_PROJECT || settings.LeafPlus.Project;
    const seconds = Number(process.env.LEAFPLUS_TIMEOUT_SECONDS) || 3;
    const response = await fetch(
      new URL(
        `api/projects/${encodeURIComponent(project)}/content/${resource}`,
        base.endsWith("/") ? base : `${base}/`,
      ),
      {
        cache: "no-store",
        signal: AbortSignal.timeout(
          Math.min(30, Math.max(0.1, seconds)) * 1000,
        ),
      },
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    let data = normalizeContentUrls(await response.json()) as Record<
      string,
      unknown
    >;
    // Existing /home is {pageTitle: string}. Explicit, narrowly scoped compatibility:
    // retain that remote title while borrowing only the missing root metadata.
    if (
      resource === "home" &&
      data &&
      typeof data.pageTitle === "string" &&
      Object.keys(data).every((key) =>
        ["pageTitle", "id", "sortKey", "isActive"].includes(key),
      )
    ) {
      data = { ...local, ...data };
    }
    if (!validTree(data) || !matchesShape(data, local) || data.id !== local.id)
      throw new Error("invalid content contract");
    return data as unknown as T;
  } catch (error) {
    warn(resource, error instanceof Error ? error.message : "request failed");
    return local as unknown as T;
  }
}

// React caches within one server render, including generateMetadata + page reads.
export const document = cache(loadDocument);
export const homePage = () => document<HomeContent>("home");
export const page = (id: "interests" | "musings" | "elsewhere" | "not-found") =>
  document<PageContent>(id);
export const header = () => document<HeaderContent>("shared/header");
export const footer = () => document<FooterContent>("shared/footer");
export const site = () => document<SiteContent>("shared/site");
export const sectionIds = [
  "hero",
  "topic-strip",
  "interests",
  "notebook",
  "about",
] as const;
export const topicIds = [
  "ai",
  "solar",
  "hydroponics",
  "aquascapes",
  "faith",
] as const;
export const musingIds = [
  "musing-ai",
  "musing-hydroponics",
  "musing-aquascapes",
] as const;
export const homeSections = async () =>
  ordered(
    await Promise.all(
      sectionIds.map((id) => document<HomeSection>(`home/${id}`)),
    ),
  );
export const topics = async () =>
  ordered(
    await Promise.all(
      topicIds.map((id) => document<DetailContent>(`topics/${id}`)),
    ),
  );
export const musings = async () =>
  ordered(
    await Promise.all(
      musingIds.map((id) => document<DetailContent>(`musings/${id}`)),
    ),
  );
export const topic = (id: (typeof topicIds)[number]) =>
  document<DetailContent>(`topics/${id}`);
export const musing = (id: (typeof musingIds)[number]) =>
  document<DetailContent>(`musings/${id}`);
