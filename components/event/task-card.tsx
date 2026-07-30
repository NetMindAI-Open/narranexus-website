"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { EventTask } from "@/lib/event/tasks";
import { ImagePicker } from "@/components/event/image-picker";

const DEADLINE_FMT = new Intl.DateTimeFormat("zh-CN", {
  timeZone: "Asia/Shanghai",
  month: "long",
  day: "numeric",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return days > 0 ? `${days} 天 ${clock}` : clock;
}

interface TaskCardProps {
  task: EventTask;
  done: boolean;
  locked: boolean;
  onSubmit: (taskNumber: number, content: string, files: File[]) => Promise<void>;
}

export function TaskCard({ task, done, locked, onSubmit }: TaskCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const deadlineMs = task.deadline ? new Date(task.deadline).getTime() : null;
  // `now` stays null until mount so SSR and first client render match; once
  // ticking, we can tell whether the submission window has closed.
  const isClosed = deadlineMs !== null && now !== null && now >= deadlineMs;

  useEffect(() => {
    if (deadlineMs === null) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start the clock on mount (deferred to avoid SSR/client time mismatch)
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadlineMs]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() && files.length === 0) {
      setError("写点什么或上传一张图片吧");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(task.number, content.trim(), files);
      setContent("");
      setFiles([]);
    } catch {
      setError("提交失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="border-b border-rule">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="group w-full flex items-start gap-4 py-5 text-left"
      >
        <span
          className={`flex-none mt-0.5 w-7 h-7 flex items-center justify-center border font-mono text-xs ${
            done
              ? "bg-ink text-paper border-ink"
              : "border-rule text-muted group-hover:border-ink"
          }`}
        >
          {done ? "✓" : task.number}
        </span>
        <span className="flex-1 min-w-0">
          <span className="flex items-center gap-2 flex-wrap">
            <span className="font-heading text-lg font-600 text-ink leading-snug">
              {task.title}
            </span>
            {task.badge && (
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted border border-rule px-1.5 py-0.5">
                {task.badge}
              </span>
            )}
          </span>
          <span className="block font-body text-sm text-muted mt-1">
            {task.summary}
          </span>
        </span>
        <span
          className="flex-none font-mono text-muted group-hover:text-ink transition-transform"
          style={{ transform: expanded ? "rotate(90deg)" : "none" }}
          aria-hidden="true"
        >
          →
        </span>
      </button>

      {expanded && (
        <div className="pb-6 pl-11 pr-1 -mt-1">
          <p className="font-body font-300 text-muted leading-relaxed mb-4">
            {task.detail}
          </p>

          {task.images && (
            <div
              className={`grid gap-3 mb-5 ${
                task.imageColumns === 3
                  ? "grid-cols-3 max-w-[560px]"
                  : "grid-cols-2 max-w-[420px]"
              }`}
            >
              {task.images.map((img) => (
                <figure key={img.src} className="min-w-0">
                  <a
                    href={img.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-rule bg-paper-2/40 overflow-hidden hover:border-ink transition-colors"
                    title="点击查看大图"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={img.width}
                      height={img.height}
                      sizes={task.imageColumns === 3 ? "180px" : "210px"}
                      className="w-full h-auto"
                    />
                  </a>
                  {img.caption && (
                    <figcaption className="font-mono text-[11px] text-muted mt-2 leading-snug">
                      {img.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {task.rewards && (
            <ul className="flex flex-wrap gap-2 mb-5">
              {task.rewards.map((r) => (
                <li
                  key={r.place}
                  className="flex items-baseline gap-2 border border-rule bg-paper-2/40 px-3 py-1.5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {r.place}
                  </span>
                  <span className="font-heading font-700 text-ink">
                    {r.amount}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {task.deadline && (
            <div className="mb-5 border border-rule bg-paper-2/40 px-4 py-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-wider text-carbon border border-carbon/40 px-1.5 py-0.5">
                  限时提交
                </span>
                <span className="font-body text-sm text-ink">
                  截止：北京时间 {DEADLINE_FMT.format(new Date(task.deadline))}
                </span>
              </div>
              {now !== null &&
                (isClosed ? (
                  <p className="font-mono text-xs text-carbon mt-1.5">
                    提交已截止
                  </p>
                ) : (
                  <p className="font-mono text-xs text-muted mt-1.5">
                    距截止还剩{" "}
                    <span className="text-ink">
                      {formatRemaining(deadlineMs! - now)}
                    </span>
                  </p>
                ))}
            </div>
          )}

          {locked ? (
            <p className="font-body text-sm text-muted border border-dashed border-rule px-4 py-3">
              请先在上方签到，再提交任务成果。
            </p>
          ) : isClosed ? (
            <p className="font-body text-sm text-muted border border-dashed border-rule px-4 py-3">
              提交通道已于北京时间{DEADLINE_FMT.format(new Date(task.deadline!))}
              关闭，感谢参与！
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                placeholder="说说你是怎么做的，或贴上结果 / 截图"
                className="w-full border border-rule bg-paper px-3 py-2.5 font-body text-ink placeholder:text-muted/60 focus:border-ink focus-visible:outline-none resize-y"
              />
              <div className="mt-3">
                <ImagePicker
                  files={files}
                  onChange={setFiles}
                  disabled={submitting}
                />
              </div>
              {error && (
                <p className="font-body text-sm text-carbon mt-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {submitting ? "提交中…" : done ? "再次提交 →" : "提交任务 →"}
              </button>
              {done && !submitting && (
                <span className="ml-3 font-mono text-xs text-muted">
                  已提交 ✓
                </span>
              )}
            </form>
          )}
        </div>
      )}
    </div>
  );
}
