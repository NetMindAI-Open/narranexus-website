import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NarraNexus - Multi-Agent Framework",
  description:
    "Build interconnected agent systems where intelligence emerges through collaboration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
