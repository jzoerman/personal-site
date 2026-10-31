"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { HeaderContent } from "../lib/models";
import { active, ordered } from "../lib/order";

const topicPaths = ["/ai", "/solar", "/hydroponics", "/aquascapes", "/faith"];

export function SiteHeader({ content }: { content: HeaderContent }) {
  const pathname = usePathname();
  const current = topicPaths.includes(pathname)
    ? "/interests"
    : pathname.startsWith("/musing-")
      ? "/musings"
      : pathname;
  if (!active(content)) return null;
  return (
    <header>
      {active(content.brand) && (
        <Link className="brand" href={content.brand.url}>
          <span>{content.brand.monogram}</span>
          {content.brand.label}
        </Link>
      )}
      {active(content.navigation) && (
        <nav aria-label={content.navigation.label}>
          {ordered(content.navigation.children).map((item, index) => (
            <Link
              key={index}
              href={item.url}
              className={item.url === "/elsewhere" ? "elsewhere" : undefined}
              aria-current={current === item.url ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
