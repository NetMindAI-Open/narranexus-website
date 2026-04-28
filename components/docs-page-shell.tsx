interface DocsPageShellProps {
  section: string;
  title: string;
  description?: string;
  status?: "placeholder" | "draft" | "ready";
}

export function DocsPageShell({
  section,
  title,
  description,
  status = "placeholder",
}: DocsPageShellProps) {
  return (
    <article>
      {/* Section label — NetMind style */}
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; {section}
        </span>
      </div>

      <h1 className="font-heading text-3xl sm:text-4xl font-700 leading-tight tracking-tight mb-4">
        {title}
      </h1>

      {description && (
        <p className="text-base sm:text-lg font-body font-300 text-muted mb-8 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}

      <hr className="border-rule mb-8" />

      {status === "placeholder" && (
        <div className="border border-rule bg-paper-2/30 p-6">
          <p className="font-mono text-xs text-muted uppercase tracking-wider mb-2">
            Content pending
          </p>
          <p className="font-body text-sm text-muted font-300 leading-relaxed">
            This page is part of the site structure. Content will be added in
            an upcoming phase of the website build.
          </p>
        </div>
      )}

      {status === "draft" && (
        <div className="border border-rule bg-paper-2/30 p-3 mb-6 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-muted" aria-hidden="true" />
          <p className="font-mono text-[11px] text-muted uppercase tracking-wider">
            Draft
          </p>
        </div>
      )}
    </article>
  );
}
