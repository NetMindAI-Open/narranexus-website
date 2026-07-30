"use client";

import { EVENT_TASKS } from "@/lib/event/tasks";
import { SectionHeader } from "@/components/event/check-in-section";
import { TaskCard } from "@/components/event/task-card";

interface TasksSectionProps {
  locked: boolean;
  tasksDone: number[];
  onSubmitTask: (
    taskNumber: number,
    content: string,
    files: File[],
  ) => Promise<void>;
}

export function TasksSection({
  locked,
  tasksDone,
  onSubmitTask,
}: TasksSectionProps) {
  const doneSet = new Set(tasksDone);

  return (
    <section id="tasks" className="scroll-mt-24">
      <SectionHeader index="02" eyebrow="任务 / Tasks" title="六个任务" />
      <p className="font-body font-300 text-muted mb-2 max-w-2xl">
        点开每个任务查看说明，完成后提交文字说明或截图。
        <span className="text-muted-2">
          {" "}
          已完成 {doneSet.size} / {EVENT_TASKS.length}
        </span>
      </p>

      <div className="border-t border-rule mt-6">
        {EVENT_TASKS.map((task) => (
          <TaskCard
            key={task.number}
            task={task}
            done={doneSet.has(task.number)}
            locked={locked}
            onSubmit={onSubmitTask}
          />
        ))}
      </div>
    </section>
  );
}
