import type { Metadata } from "next";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Jeremy Zoerman", template: "%s — Jeremy Zoerman" },
  description:
    "Jeremy Zoerman’s personal corner of the web: software in the AI era, DIY solar, hydroponics, aquascapes, faith, and musings.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
