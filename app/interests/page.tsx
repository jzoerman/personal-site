import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { page } from "../../lib/content";
import { active } from "../../lib/order";
import { PageHead } from "../../components/Content";
import { TopicGrid } from "../../components/TopicGrid";

export async function generateMetadata(): Promise<Metadata> {
  const content = await page("interests");
  return { title: active(content) ? content.pageTitle : "Page not found" };
}
export default async function Page() {
  const content = await page("interests");
  if (!active(content)) notFound();
  return (
    <>
      <PageHead content={content} />
      <section className="section">
        <TopicGrid />
      </section>
      <p className="notice">{content.notice}</p>
    </>
  );
}
