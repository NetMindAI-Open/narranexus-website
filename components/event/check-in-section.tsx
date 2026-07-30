"use client";

import { useState } from "react";
import type { Participant } from "@/lib/event/local";

interface CheckInSectionProps {
  checkedIn: boolean;
  participant: Participant | null;
  onCheckIn: (nickname: string, contact: string) => Promise<void>;
}

export function CheckInSection({
  checkedIn,
  participant,
  onCheckIn,
}: CheckInSectionProps) {
  const [nickname, setNickname] = useState("");
  const [contact, setContact] = useState("");
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Show the form for the initial check-in, or when editing an existing one.
  const showForm = !checkedIn || editing;

  function startEditing() {
    setNickname(participant?.nickname ?? "");
    setContact(participant?.contact ?? "");
    setError(null);
    setEditing(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nickname.trim() || !contact.trim()) {
      setError("请填写昵称和联系方式");
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      // Same participant_id is reused, so task / feedback progress is untouched.
      await onCheckIn(nickname.trim(), contact.trim());
      setEditing(false);
    } catch {
      setError(editing ? "保存失败，请稍后重试" : "签到失败，请稍后重试");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="checkin" className="scroll-mt-24">
      <SectionHeader index="01" eyebrow="签到 / Check-in" title="先来签到" />

      {showForm ? (
        <form onSubmit={handleSubmit} className="max-w-md">
          <p className="font-body font-300 text-muted mb-5">
            {editing
              ? "更新你的昵称和联系方式，下面的任务与反馈进度会照常保留。"
              : "填一下昵称和联系方式（微信 / 邮箱），方便活动结束后联系你、发放奖励。"}
          </p>
          <div className="space-y-4">
            <Field
              label="昵称"
              value={nickname}
              onChange={setNickname}
              placeholder="你的昵称"
            />
            <Field
              label="微信 / 邮箱"
              value={contact}
              onChange={setContact}
              placeholder="微信号或邮箱"
            />
          </div>
          {error && (
            <p className="font-body text-sm text-carbon mt-3">{error}</p>
          )}
          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 font-mono text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {submitting
                ? editing
                  ? "保存中…"
                  : "签到中…"
                : editing
                  ? "保存 →"
                  : "签到 →"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => setEditing(false)}
                disabled={submitting}
                className="font-mono text-xs uppercase tracking-wider text-muted hover:text-ink disabled:opacity-50 transition-colors"
              >
                取消
              </button>
            )}
          </div>
        </form>
      ) : (
        <div className="border border-rule bg-paper-2/40 px-5 py-4 flex items-center gap-3 flex-wrap">
          <span className="flex-none w-6 h-6 flex items-center justify-center bg-ink text-paper text-sm">
            ✓
          </span>
          <p className="font-body text-ink flex-1 min-w-0">
            已签到，
            <span className="font-500">{participant?.nickname}</span>
            ！接着完成下面的任务吧。
          </p>
          <button
            type="button"
            onClick={startEditing}
            className="flex-none font-mono text-xs uppercase tracking-wider text-muted hover:text-ink transition-colors underline underline-offset-2"
          >
            修改信息
          </button>
        </div>
      )}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] uppercase tracking-widest text-muted mb-1.5">
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-rule bg-paper px-3 py-2.5 font-body text-ink placeholder:text-muted/60 focus:border-ink focus-visible:outline-none"
      />
    </label>
  );
}

export function SectionHeader({
  index,
  eyebrow,
  title,
}: {
  index: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-6 md:mb-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-[11px] text-muted">{index}</span>
        <span className="w-8 h-px bg-ink block" aria-hidden="true" />
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          {eyebrow}
        </span>
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-700 leading-[1.1] tracking-tight">
        {title}
      </h2>
    </div>
  );
}
