import "./globals.css";

import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { ChatWidget } from "@/components/ChatWidget";

export const metadata: Metadata = {
  metadataBase: new URL("https://neta.ai"),
  title: "NETA AI — Intelligent AI Systems for Modern Businesses",
  description:
    "NETA AI builds enterprise-grade AI agents and automation systems that streamline operations, support, sales and workflows.",
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
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
        <ChatWidget />
      </body>
    </html>
  );
}
