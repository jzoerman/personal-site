import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { page } from "../../lib/content";
import { active } from "../../lib/order";
import {
  PageHead,
  ArticleParagraphs,
  ContentLinkView,
} from "../../components/Content";

export async function generateMetadata(): Promise<Metadata> {
  const content = await page("elsewhere");
  return { title: active(content) ? content.pageTitle : "Page not found" };
}
export default async function Page() {
  const content = await page("elsewhere");
  if (!active(content)) notFound();
  return (
    <>
      <PageHead content={content} />
      <section className="article">
        <ArticleParagraphs items={content.children || []} />
        <ContentLinkView item={content.link} className="button" />
      </section>
    </>
  );
}
