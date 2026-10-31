import { Fragment } from "react";
import Link from "next/link";
import { active, ordered, safeUrl } from "../lib/order";
import type {
  ContentImage,
  ContentLink,
  PageContent,
  TextItem,
  Paragraph,
} from "../lib/models";

export function TextLines({ items }: { items: TextItem[] }) {
  return ordered(items).map((line, index) => (
    <Fragment key={index}>
      {index > 0 && <br />}
      {line.text}
    </Fragment>
  ));
}
export function ContentLinkView({
  item,
  className = "text-link",
}: {
  item?: ContentLink;
  className?: string;
}) {
  if (!active(item) || !safeUrl(item.url)) return null;
  const buttonArrow = className === "button" && item.label.endsWith(" ↗");
  return (
    <Link className={className} href={item.url}>
      {buttonArrow ? (
        <>
          {item.label.slice(0, -2)} <span>↗</span>
        </>
      ) : (
        item.label
      )}
    </Link>
  );
}
export function ContentImageView({
  item,
  lazy = true,
}: {
  item?: ContentImage;
  lazy?: boolean;
}) {
  return active(item) && safeUrl(item.url) ? (
    <img
      src={item.url}
      alt={item.alt}
      loading={lazy ? "lazy" : undefined}
      decoding="async"
    />
  ) : null;
}
export function PageHead({ content }: { content: PageContent }) {
  return (
    <section className="page-head">
      <div className="eyebrow">{content.eyebrow}</div>
      <h1>
        <TextLines items={content.headingLines} />
      </h1>
      <p className="intro">{content.intro}</p>
      {content.id === "musings" && content.notice && (
        <p className="notice">{content.notice}</p>
      )}
    </section>
  );
}
export function ArticleParagraphs({ items }: { items: Paragraph[] }) {
  return ordered(items).map((item, index) => (
    <Fragment key={index}>
      {item.heading && (
        <h2 id={item.id === "professional" ? "professional" : undefined}>
          {item.heading}
        </h2>
      )}
      {item.text && (
        <p className={item.isNotice ? "notice" : undefined}>{item.text}</p>
      )}
    </Fragment>
  ));
}
