import { page } from "../lib/content";
import { active } from "../lib/order";
import { PageHead, ContentLinkView } from "../components/Content";

export default async function NotFound() {
  const content = await page("not-found");
  return active(content) ? (
    <>
      <PageHead content={content} />
      <ContentLinkView item={content.link} className="button" />
    </>
  ) : null;
}
