import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { homePage, homeSections } from "../lib/content";
import { active } from "../lib/order";
import { HomeSection } from "../components/HomeSection";

export async function generateMetadata(): Promise<Metadata> {
  const content = await homePage();
  return {
    title: {
      absolute: active(content) ? content.pageTitle : "Jeremy Zoerman",
    },
  };
}
export default async function Page() {
  const [content, sections] = await Promise.all([homePage(), homeSections()]);
  if (!active(content)) notFound();
  return (
    <>
      {sections.map((section) => (
        <HomeSection key={section.id} content={section} />
      ))}
    </>
  );
}
