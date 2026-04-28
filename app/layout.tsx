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
const siteDescription =
  "Build agents with persistent memory, social identity, and modular capabilities. An open-source framework for agents that remember who you are.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NarraNexus — Intelligence Emerges Through Connection",
    template: "%s · NarraNexus",
  },
  description: siteDescription,
  applicationName: "NarraNexus",
  authors: [{ name: "NetMind" }],
  keywords: [
    "agent framework",
    "open source",
    "LLM",
    "persistent memory",
    "multi-agent",
    "MCP",
    "NarraNexus",
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "NarraNexus",
    title: "NarraNexus — Intelligence Emerges Through Connection",
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: "NarraNexus — Intelligence Emerges Through Connection",
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
