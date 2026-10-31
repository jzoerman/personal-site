import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { header, footer, site } from "../lib/content";
import { active } from "../lib/order";
import "./globals.css";

// CMS edits must be read at request time rather than frozen into the build.
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await site();
  return active(content)
    ? {
        title: content.title,
        description: content.description,
        icons: active(content.favicon)
          ? { icon: content.favicon.url }
          : undefined,
      }
    : { title: "Jeremy Zoerman" };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [headerContent, footerContent, siteContent] = await Promise.all([
    header(),
    footer(),
    site(),
  ]);
  return (
    <html lang="en">
      <body>
        {active(siteContent) && (
          <a className="skip-link" href="#main-content">
            {siteContent.skipLabel}
          </a>
        )}
        <SiteHeader content={headerContent} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter content={footerContent} />
      </body>
    </html>
  );
}
