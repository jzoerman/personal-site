"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/interests", label: "Interests" },
  { href: "/musings", label: "Musings" },
  { href: "/elsewhere", label: "Elsewhere ↗" },
];
const topicPaths = ["/ai", "/solar", "/hydroponics", "/aquascapes", "/faith"];

export function SiteHeader() {
  const pathname = usePathname();
  const active = topicPaths.includes(pathname)
    ? "/interests"
    : pathname.startsWith("/musing-")
      ? "/musings"
      : pathname;

  return (
    <header>
      <Link className="brand" href="/">
        <span>JZ</span>Jeremy Zoerman
      </Link>
      <nav aria-label="Main navigation">
        {navigation.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={href === "/elsewhere" ? "elsewhere" : undefined}
            aria-current={active === href ? "page" : undefined}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
