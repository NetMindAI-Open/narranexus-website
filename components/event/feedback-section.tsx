"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/event/check-in-section";
import { ImagePicker } from "@/components/event/image-picker";

interface FeedbackSectionProps {
  locked: boolean;
  done: boolean;
  onSubmitFeedback: (content: string, files: File[]) => Promise<void>;
}

export function FeedbackSection({
  locked,
  done,
  onSubmitFeedback,
}: FeedbackSectionProps) {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() && files.length === 0) {
      setError("写点反馈或上传一张图片吧");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmitFeedback(content.trim(), files);
      setContent("");
      setFiles([]);
      setSent(true);
    } catch {
      setError("提交失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="feedback" className="scroll-mt-24">
      <SectionHeader index="03" eyebrow="反馈 / Feedback" title="留下你的反馈" />
      <p className="font-body font-300 text-muted mb-6 max-w-2xl">
        用得顺不顺手？哪里卡住了、哪里惊喜？把你的想法、建议或截图留给我们。
      </p>

      {locked ? (
        <p className="font-body text-sm text-muted border border-dashed border-rule px-4 py-3 max-w-xl">
          请先在上方签到，再提交反馈。
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-xl">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="你的反馈、建议或遇到的问题…"
            className="w-full border border-rule bg-paper px-3 py-2.5 font-body text-ink placeholder:text-muted/60 focus:border-ink focus-visible:outline-none resize-y"
          />
          <div className="mt-3">
            <ImagePicker files={files} onChange={setFiles} disabled={submitting} />
          </div>
          {error && <p className="font-body text-sm text-carbon mt-3">{error}</p>}
          <div className="flex items-center gap-3 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {submitting ? "提交中…" : "提交反馈 →"}
            </button>
            {(sent || done) && !submitting && (
              <span className="font-mono text-xs text-muted">
                感谢反馈 ✓ 可以再提交一条
              </span>
            )}
          </div>
        </form>
      )}
    </section>
  );
}
