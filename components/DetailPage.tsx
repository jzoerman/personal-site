import { active } from "../lib/order";
import type { DetailContent } from "../lib/models";
import {
  ArticleParagraphs,
  ContentImageView,
  ContentLinkView,
  PageHead,
} from "./Content";

export function DetailPage({ content }: { content: DetailContent }) {
  return (
    <>
      <ContentLinkView item={content.backLink} className="back" />
      <PageHead content={content} />
      {active(content.image) && (
        <div className="topic-banner">
          <ContentImageView item={content.image} />
        </div>
      )}
      <article className="article">
        <ArticleParagraphs items={content.children} />
        <ContentLinkView
          item={content.link}
          className={content.id.startsWith("musing-") ? "text-link" : "button"}
        />
      </article>
    </>
  );
}
