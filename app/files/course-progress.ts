import { Course, Lesson, Module } from "./course-data";

export type FlatLesson = Lesson & { 
  moduleId: string;
  moduleTitle: string;
  /** position across the whole course, 0-indexed */
  index: number;
  /** position within its own module, 0-indexed */
  indexInModule: number;
};

export function flattenLessons(course: Course): FlatLesson[] {
  const flat: FlatLesson[] = [];
  let index = 0;
  for (const mod of course.modules) {
    mod.lessons.forEach((lesson, indexInModule) => {
      flat.push({ ...lesson, moduleId: mod.id, moduleTitle: mod.title, index, indexInModule });
      index += 1;
    });
  }
  return flat;
}

export function getModuleForLesson(course: Course, lessonId: string): Module | undefined {
  return course.modules.find((m) => m.lessons.some((l) => l.id === lessonId));
}

export function getLesson(course: Course, lessonId: string | undefined): Lesson | undefined {
  if (!lessonId) return undefined;
  for (const mod of course.modules) {
    const found = mod.lessons.find((l) => l.id === lessonId);
    if (found) return found;
  }
  return undefined;
}

export function getAdjacentLessons(course: Course, lessonId: string | undefined) {
  const flat = flattenLessons(course);
  const i = flat.findIndex((l) => l.id === lessonId);
  return {
    previous: i > 0 ? flat[i - 1] : undefined,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined,
  };
}

export function computeProgress(course: Course, completedLessonIds: string[]) {
  const flat = flattenLessons(course);
  const total = flat.length;
  const completed = flat.filter((l) => completedLessonIds.includes(l.id)).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  return { total, completed, percent };
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
