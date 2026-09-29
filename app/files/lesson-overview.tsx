"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Download, FileText } from "lucide-react";
import { Course, Lesson } from "./course-data";
import { FlatLesson, getModuleForLesson } from "./course-progress";

type Tab = "overview" | "resources";

export default function LessonOverview({
  course,
  lesson,
  completed,
  onToggleComplete,
  nextLesson,
  onGoNext,
}: {
  course: Course;
  lesson: Lesson;
  completed: boolean;
  onToggleComplete: () => void;
  nextLesson?: FlatLesson;
  onGoNext: () => void;
}) {
  const [tab, setTab] = useState<Tab>("overview");
  const mod = getModuleForLesson(course, lesson.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="med-font text-xs uppercase tracking-wide text-muted-foreground/70">
            {mod?.title}
          </p>
          <h1 className="mt-1 font-[stack-sans-bold] text-2xl text-foreground text-balance">{lesson.title}</h1>
          <p className="med-font mt-1 text-sm text-muted-foreground">{lesson.duration}</p>
        </div>

        <Button
          type="button"
          variant={completed ? "default" : "outline"}
          onClick={onToggleComplete}
          className={`h-10 shrink-0 rounded-full px-4 text-sm med-font font-medium ${
            completed ? "bg-foreground text-background hover:bg-foreground/90" : "border-border"
          }`}
        >
          {completed && <Check className="size-4" />}
          {completed ? "Completed" : "Mark as complete"}
        </Button>
      </div>

      <div className="inline-flex w-fit rounded-full bg-foreground/[0.04] p-1">
        {(["overview", "resources"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`med-font rounded-full px-4 py-1.5 text-sm transition-colors ${
              tab === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "overview" ? "Overview" : `Resources (${course.resources.length})`}
          </button>
        ))}
      </div>

      {tab === "overview" ? (
        <div className="flex flex-col gap-8">
          <p className="med-font max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{lesson.summary}</p>

          <div>
            <h2 className="font-[stack-sans-bold] text-base text-foreground">What you&apos;ll learn</h2>
            <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
                  <span className="med-font text-sm leading-snug text-foreground/90">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-foreground/[0.03] p-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-foreground/[0.08] text-sm font-medium text-foreground">
              {course.instructor.initials}
            </span>
            <div>
              <p className="med-font text-sm font-medium text-foreground">{course.instructor.name}</p>
              <p className="med-font text-xs text-muted-foreground">{course.instructor.role}</p>
            </div>
          </div>
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {course.resources.map((resource) => (
            <li key={resource.id}>
              <a
                href={resource.href}
                className="flex items-center gap-3 rounded-2xl bg-foreground/[0.03] px-4 py-3 transition-colors hover:bg-foreground/[0.06]"
              >
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <span className="med-font flex-1 text-sm text-foreground">{resource.name}</span>
                <span className="med-font text-xs text-muted-foreground">{resource.size}</span>
                <Download className="size-4 shrink-0 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>
      )}

      {nextLesson && (
        <div className="flex items-center justify-between gap-4 rounded-2xl bg-foreground/[0.03] p-4">
          <div>
            <p className="med-font text-xs text-muted-foreground">Up next</p>
            <p className="med-font mt-0.5 text-sm font-medium text-foreground">{nextLesson.title}</p>
          </div>
          <Button
            type="button"
            onClick={onGoNext}
            className="h-10 shrink-0 rounded-full bg-foreground px-4 text-sm med-font font-medium text-background hover:bg-foreground/90"
          >
            Next lesson
          </Button>
        </div>
      )}
    </div>
  );
}
