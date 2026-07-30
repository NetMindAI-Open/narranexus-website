"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { uploadEventImages } from "@/lib/event/upload";
import {
  addTaskDone,
  loadCheckedIn,
  loadFeedbackDone,
  loadParticipant,
  loadTasksDone,
  newParticipantId,
  saveParticipant,
  setCheckedIn as persistCheckedIn,
  setFeedbackDone as persistFeedbackDone,
  type Participant,
} from "@/lib/event/local";
import { CheckInSection } from "@/components/event/check-in-section";
import { TasksSection } from "@/components/event/tasks-section";
import { FeedbackSection } from "@/components/event/feedback-section";

export function EventApp() {
  const supabase = useMemo(() => createClient(), []);

  // One state object so hydration is a single update. Initial values are
  // SSR-safe defaults; the real per-device state is read from localStorage
  // after mount to avoid a hydration mismatch.
  const [state, setState] = useState<{
    participant: Participant | null;
    checkedIn: boolean;
    tasksDone: number[];
    feedbackDone: boolean;
  }>({
    participant: null,
    checkedIn: false,
    tasksDone: [],
    feedbackDone: false,
  });
  const { participant, checkedIn, tasksDone, feedbackDone } = state;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage (unavailable during SSR)
    setState({
      participant: loadParticipant(),
      checkedIn: loadCheckedIn(),
      tasksDone: loadTasksDone(),
      feedbackDone: loadFeedbackDone(),
    });
  }, []);

  async function handleCheckIn(nickname: string, contact: string) {
    if (!supabase) throw new Error("Supabase 未配置");
    const current = participant ?? {
      id: newParticipantId(),
      nickname,
      contact,
    };
    const next: Participant = { ...current, nickname, contact };

    const { error } = await supabase.from("event_checkins").insert({
      participant_id: next.id,
      nickname: next.nickname,
      contact: next.contact,
    });
    if (error) throw error;

    saveParticipant(next);
    persistCheckedIn();
    setState((s) => ({ ...s, participant: next, checkedIn: true }));
  }

  async function handleSubmitTask(
    taskNumber: number,
    content: string,
    files: File[],
  ) {
    if (!supabase) throw new Error("Supabase 未配置");
    if (!participant) throw new Error("not checked in");

    const imageUrls = files.length
      ? await uploadEventImages(supabase, participant.id, files)
      : [];

    const { error } = await supabase.from("event_task_submissions").insert({
      participant_id: participant.id,
      nickname: participant.nickname,
      task_number: taskNumber,
      content,
      image_urls: imageUrls,
    });
    if (error) throw error;

    addTaskDone(taskNumber);
    setState((s) =>
      s.tasksDone.includes(taskNumber)
        ? s
        : { ...s, tasksDone: [...s.tasksDone, taskNumber] },
    );
  }

  async function handleSubmitFeedback(content: string, files: File[]) {
    if (!supabase) throw new Error("Supabase 未配置");
    if (!participant) throw new Error("not checked in");

    const imageUrls = files.length
      ? await uploadEventImages(supabase, participant.id, files)
      : [];

    const { error } = await supabase.from("event_feedback").insert({
      participant_id: participant.id,
      nickname: participant.nickname,
      content,
      image_urls: imageUrls,
    });
    if (error) throw error;

    persistFeedbackDone();
    setState((s) => ({ ...s, feedbackDone: true }));
  }

  return (
    <div className="space-y-16 md:space-y-24">
      {!supabase && (
        <p className="font-body text-sm text-carbon border border-carbon/40 bg-paper-2/40 px-4 py-3">
          活动后端尚未配置，签到与提交暂时不可用。请稍后再试。
        </p>
      )}
      <CheckInSection
        checkedIn={checkedIn}
        participant={participant}
        onCheckIn={handleCheckIn}
      />
      <TasksSection
        locked={!checkedIn}
        tasksDone={tasksDone}
        onSubmitTask={handleSubmitTask}
      />
      <FeedbackSection
        locked={!checkedIn}
        done={feedbackDone}
        onSubmitFeedback={handleSubmitFeedback}
      />
    </div>
  );
}
