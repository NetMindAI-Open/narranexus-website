import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1400px] mx-auto lg:flex min-h-[calc(100vh-3.5rem)]">
      <DocsSidebar />
      <div className="flex-1 min-w-0 px-6 py-10 md:px-10 lg:px-12 max-w-3xl docs-content">
        {children}
      </div>
    </div>
  );
}
