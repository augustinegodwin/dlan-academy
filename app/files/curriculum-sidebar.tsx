"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, FileText, HelpCircle, Lock, Play } from "lucide-react";
import { Course, Lesson } from "./course-data";
import { computeProgress, getModuleForLesson } from "./course-progress";

const TYPE_ICON: Record<Lesson["type"], typeof Play> = {
  video: Play,
  reading: FileText,
  quiz: HelpCircle,
};

export default function CurriculumSidebar({
  course,
  activeLessonId,
  completedLessonIds,
  onSelectLesson,
  variant = "panel",
}: {
  course: Course;
  activeLessonId: string;
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
  variant?: "panel" | "inline";
}) {
  const { completed, total, percent } = computeProgress(course, completedLessonIds);

  const [expanded, setExpanded] = useState<string[]>(() => {
    const mod = getModuleForLesson(course, activeLessonId);
    return mod ? [mod.id] : [];
  });

  // Whenever the active lesson changes (e.g. via "Next lesson"), make sure
  // its module is expanded — without collapsing anything the person opened
  // themselves.
  useEffect(() => {
    const mod = getModuleForLesson(course, activeLessonId);
    if (mod) setExpanded((prev) => (prev.includes(mod.id) ? prev : [...prev, mod.id]));
  }, [course, activeLessonId]);

  function toggleModule(id: string) {
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const outerClass =
    variant === "panel"
      ? "hidden w-[380px] shrink-0 flex-col overflow-y-auto rounded-[28px] border border-gray-200  bg-surface p-6 lg:flex"
      : "flex flex-col border-t border-border pt-8 lg:hidden";

  return (
    <div className={outerClass}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-[stack-sans-bold] text-base text-foreground">Course content</h2>
        <span className="med-font text-xs text-muted-foreground">
          {completed}/{total} lessons
        </span>
      </div>

      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
        <div className="h-full rounded-full bg-foreground transition-all" style={{ width: `${percent}%` }} />
      </div>

      <div className="flex flex-col gap-2">
        {course.modules.map((mod) => {
          const isOpen = expanded.includes(mod.id);
          const moduleCompleted = mod.lessons.filter((l) => completedLessonIds.includes(l.id)).length;

          return (
            <div key={mod.id} className="overflow-hidden rounded-2xl bg-foreground/[0.03]">
              <button
                type="button"
                onClick={() => toggleModule(mod.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
              >
                <span className="med-font text-sm text-foreground">{mod.title}</span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="med-font text-xs text-muted-foreground">
                    {moduleCompleted}/{mod.lessons.length}
                  </span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform ${isOpen ? "" : "-rotate-90"}`}
                  />
                </span>
              </button>

              {isOpen && (
                <ul className="flex flex-col gap-0.5 px-2 pb-2">
                  {mod.lessons.map((lesson) => {
                    const isActive = lesson.id === activeLessonId;
                    const isCompleted = completedLessonIds.includes(lesson.id);
                    const isLocked = Boolean(lesson.locked);
                    const TypeIcon = TYPE_ICON[lesson.type];

                    return (
                      <li key={lesson.id}>
                        <button
                          type="button"
                          disabled={isLocked}
                          onClick={() => onSelectLesson(lesson.id)}
                          aria-current={isActive ? "true" : undefined}
                          className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                            isActive ? "bg-foreground/[0.06]" : "hover:bg-foreground/[0.04]"
                          } ${isLocked ? "cursor-not-allowed opacity-50" : ""}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="size-4 shrink-0 text-foreground" fill="currentColor" />
                          ) : isLocked ? (
                            <Lock className="size-4 shrink-0 text-muted-foreground/60" />
                          ) : (
                            <TypeIcon className="size-4 shrink-0 text-muted-foreground" />
                          )}
                          <span
                            className={`med-font flex-1 text-sm leading-snug ${
                              isActive ? "text-foreground" : "text-foreground/90"
                            }`}
                          >
                            {lesson.title}
                          </span>
                          <span className="med-font shrink-0 text-xs text-muted-foreground">{lesson.duration}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
