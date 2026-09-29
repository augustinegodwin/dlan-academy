"use client";

import { useCallback, useMemo, useState } from "react";
import { COURSE } from "./course-data";
import { computeProgress, flattenLessons, getAdjacentLessons, getLesson } from "./course-progress";
import SideNav from "./side-nav";
import BreadcrumbBar from "./breadcrumb-bar";
import VideoPlayer from "./video-player";
import LessonOverview from "./lesson-overview";
import CurriculumSidebar from "./curriculum-sidebar";

// Swap COURSE for a fetch keyed off params.slug once this is wired to real data.
export default function CourseLearnPage() {
  const course = COURSE;
  const flat = useMemo(() => flattenLessons(course), [course]);

  const [activeLessonId, setActiveLessonId] = useState<string>(flat[0]?.id ?? "");
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(course.completedLessonIds);

  const lesson = useMemo(
    () => getLesson(course, activeLessonId) ?? flat[0],
    [course, activeLessonId, flat],
  );
  const { next } = useMemo(() => getAdjacentLessons(course, activeLessonId), [course, activeLessonId]);
  const progress = useMemo(() => computeProgress(course, completedLessonIds), [course, completedLessonIds]);
  const completed = completedLessonIds.includes(activeLessonId);

  const handleSelectLesson = useCallback(
    (id: string) => {
      const target = flat.find((l) => l.id === id);
      if (!target || target.locked) return;
      setActiveLessonId(id);
    },
    [flat],
  );

  const handleToggleComplete = useCallback(() => {
    setCompletedLessonIds((prev) =>
      prev.includes(activeLessonId) ? prev.filter((id) => id !== activeLessonId) : [...prev, activeLessonId],
    );
  }, [activeLessonId]);

  const handleLessonEnded = useCallback(() => {
    setCompletedLessonIds((prev) => (prev.includes(activeLessonId) ? prev : [...prev, activeLessonId]));
  }, [activeLessonId]);

  const handleGoNext = useCallback(() => {
    if (next) setActiveLessonId(next.id);
  }, [next]);

  if (!lesson) return null;

  return (
    <main className="h-screen min-h-screen bg-background p-1">
      <div className="flex h-full gap-1">
        <SideNav active="courses" />

        <section className="flex min-w-0 flex-1 flex-col overflow-y-auto rounded-[28px] border border-gray-200 bg-surface [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-8 sm:px-10">
            <BreadcrumbBar courseTitle={course.title} percent={progress.percent} />

            <VideoPlayer key={lesson.id} lesson={lesson} onEnded={handleLessonEnded} />

            <LessonOverview
              course={course}
              lesson={lesson}
              completed={completed}
              onToggleComplete={handleToggleComplete}
              nextLesson={next}
              onGoNext={handleGoNext}
            />

            <CurriculumSidebar
              variant="inline"
              course={course}
              activeLessonId={activeLessonId}
              completedLessonIds={completedLessonIds}
              onSelectLesson={handleSelectLesson}
            />
          </div>
        </section>

        <CurriculumSidebar
          variant="panel"
          course={course}
          activeLessonId={activeLessonId}
          completedLessonIds={completedLessonIds}
          onSelectLesson={handleSelectLesson}
        />
      </div>
    </main>
  );
}