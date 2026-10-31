import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { page } from "../../lib/content";
import { active } from "../../lib/order";
import { PageHead } from "../../components/Content";
import { NotebookEntries } from "../../components/NotebookEntries";

export async function generateMetadata(): Promise<Metadata> {
  const content = await page("musings");
  return { title: active(content) ? content.pageTitle : "Page not found" };
}
export default async function Page() {
  const content = await page("musings");
  if (!active(content)) notFound();
  return (
    <>
      <PageHead content={content} />
      <section className="section">
        <NotebookEntries />
      </section>
    </>
  );
}
