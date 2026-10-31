import Link from "next/link";

export function SiteFooter() {
  return (
    <footer>
      <span>© 2026 Jeremy Zoerman · A curious work in progress.</span>
      <div>
        <Link href="/elsewhere">Say hello ↗</Link>
        <Link href="/elsewhere#professional">The professional side ↗</Link>
      </div>
    </footer>
  );
}
