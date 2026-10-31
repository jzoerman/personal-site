import { active, ordered } from "../lib/order";
import type { FooterContent } from "../lib/models";
import { ContentLinkView } from "./Content";

export function SiteFooter({ content }: { content: FooterContent }) {
  if (!active(content)) return null;
  return (
    <footer>
      <span>{content.copyright}</span>
      <div>
        {ordered(content.children).map((item, index) => (
          <ContentLinkView key={index} item={item} className="" />
        ))}
      </div>
    </footer>
  );
}
