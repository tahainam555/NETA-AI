import "./globals.css";

import type { Metadata } from "next";
import { AppProviders } from "@/components/AppProviders";
import { SiteShell } from "@/components/SiteShell";
import { ChatWidget } from "@/components/ChatWidget";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NETA AI",
  alternateName: "NETA AI Pakistan",
  url: "https://www.netaai.studio",
  logo: "https://www.netaai.studio/logo.png",
  description:
    "NETA AI is an AI automation company specializing in AI agents, workflow automation, CRM automation, sales automation, and intelligent business systems.",
  foundingDate: "2026",
  sameAs: ["https://www.linkedin.com/company/neta-ai-pk/"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NETA AI",
  url: "https://www.netaai.studio",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "NETA AI — Intelligent AI Systems for Modern Businesses",
  description:
    "NETA AI builds enterprise-grade AI agents and automation systems that streamline operations, support, sales and workflows.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "NETA AI — Intelligent AI Systems for Modern Businesses",
    description: "Enterprise AI automation, agents and intelligent workflows built for scale.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="antialiased">
        <AppProviders>
          <SiteShell>{children}</SiteShell>
          <ChatWidget />
        </AppProviders>
      </body>
    </html>
  );
}
