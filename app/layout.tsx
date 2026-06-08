import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, Barlow, DM_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Matches internal.netmind.foundation exactly:
//   Space Grotesk 400;500;600;700
//   DM Mono 400;500
//   Inter 300;400;500;600   (primary body)
//   Barlow 300;400;500 + italic 300   (body fallback / display alt)

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});


const siteUrl = "https://narra.nexus";
const siteTitle = "NarraNexus — An agent team, ready in one click.";
const siteDescription =
  "A ready-to-run team of agents that already remember, collaborate, and use tools. Start from a template — cloud, desktop, or self-hosted. Open source.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s · NarraNexus",
  },
  description: siteDescription,
  applicationName: "NarraNexus",
  icons: {
    icon: "/images/narra-nexus-logo-light-mode.svg",
  },
  authors: [{ name: "NetMind" }],
  keywords: [
    "multi-agent",
    "agent team",
    "open source",
    "LLM",
    "agent templates",
    "MCP",
    "NarraNexus",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NarraNexus",
    title: siteTitle,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e8eaed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${barlow.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="relative z-10 min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-3 focus:py-2 focus:bg-ink focus:text-paper focus:font-mono focus:text-xs focus:uppercase focus:tracking-wider"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
