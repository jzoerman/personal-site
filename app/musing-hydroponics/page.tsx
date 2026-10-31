import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { musing } from "../../lib/content";
import { active } from "../../lib/order";
import { DetailPage } from "../../components/DetailPage";

export async function generateMetadata(): Promise<Metadata> {
  const content = await musing("musing-hydroponics");
  return { title: active(content) ? content.pageTitle : "Page not found" };
}
export default async function Page() {
  const content = await musing("musing-hydroponics");
  if (!active(content)) notFound();
  return <DetailPage content={content} />;
}
