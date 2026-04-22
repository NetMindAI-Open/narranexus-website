import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1400px] mx-auto flex min-h-[calc(100vh-3.5rem)]">
      <DocsSidebar />
      <div className="flex-1 px-12 py-10 max-w-3xl docs-content">
        {children}
      </div>
    </div>
  );
}
