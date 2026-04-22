import Link from "next/link";

const posts = [
  {
    slug: "2026-03-13-v0-2-0-release",
    title: "NarraNexus v0.2.0: Connected Agents",
    date: "March 13, 2026",
    summary:
      "Agent-to-agent communication via Matrix, ClawHub skill marketplace, LLM cost tracking, and the new desktop app.",
  },
];

export default function BlogIndex() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-20">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-px bg-ink block" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          NarraNexus &middot; Blog
        </span>
      </div>

      <h1 className="font-heading text-4xl font-800 mb-12">Blog</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-rule pb-8">
            <span className="font-mono text-xs text-muted">{post.date}</span>
            <h2 className="font-heading text-2xl font-700 mt-1 mb-2">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-muted transition-colors"
              >
                {post.title}
              </Link>
            </h2>
            <p className="font-body font-300 text-muted">{post.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
