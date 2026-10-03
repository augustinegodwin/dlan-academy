"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CourseCard from "./course-card";
import { COURSES, ENROLLMENTS, isEnrolled } from "../course-data";

type Tab = "all" | "enrolled" | "explore";

export default function CoursesPage() {
  const [tab, setTab] = useState<Tab>("all");
  const [query, setQuery] = useState("");

  const enrolledCount = COURSES.filter((c) => isEnrolled(c.slug)).length;
  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "All", count: COURSES.length },
    { id: "enrolled", label: "My courses", count: enrolledCount },
    { id: "explore", label: "Explore", count: COURSES.length - enrolledCount },
  ];

  const list = COURSES.filter((c) => {
    if (tab === "enrolled" && !isEnrolled(c.slug)) return false;
    if (tab === "explore" && isEnrolled(c.slug)) return false;
    const q = query.trim().toLowerCase();
    return !q || c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-[stack-sans-bold] text-3xl text-foreground">Courses</h1>
        <p className="med-font mt-1 text-sm text-muted-foreground">
          {enrolledCount} enrolled · {COURSES.length} available
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-full bg-foreground/[0.04] p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`med-font rounded-full px-4 py-1.5 text-sm transition-colors ${
                tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.label} <span className="text-xs text-muted-foreground">{t.count}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses"
            className="med-font h-10 w-full rounded-full border border-gray-200 bg-background pl-9 pr-3 text-sm text-foreground"
          />
        </div>
      </div>

      {list.length === 0 ? (
        <p className="med-font py-10 text-center text-sm text-muted-foreground">No courses match that search.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => {
            const enrolled = isEnrolled(c.slug);
            return (
              <CourseCard
                key={c.slug}
                category={c.category}
                title={c.title}
                description={c.description}
                mentor={c.mentor}
                duration={c.duration}
                rating={c.rating}
                tools={c.tools}
                href={enrolled ? `/courses/${c.slug}/learn` : `/courses/${c.slug}`}
                progress={enrolled ? ENROLLMENTS[c.slug].progress : undefined}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}