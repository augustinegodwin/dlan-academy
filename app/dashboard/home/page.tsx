import Link from "next/link";
import CourseCard from "../courses/course-card";
import { COURSES, ENROLLMENTS, isEnrolled } from "../course-data";

// Mock numbers. Replace with real data when you have it.
const STATS = { lessonsDone: 14, hoursLearned: 12, streak: 4 };
const WEEK = [
  { day: "M", hours: 1.5 },
  { day: "T", hours: 0.5 },
  { day: "W", hours: 2 },
  { day: "T", hours: 1 },
  { day: "F", hours: 0 },
  { day: "S", hours: 2.5 },
  { day: "S", hours: 0.5 },
];
const UPCOMING = [
  { title: "Live Q&A: Prompting", when: "Tue, 6 Oct · 5:00 PM" },
  { title: "Excel quiz due", when: "Thu, 8 Oct · 11:59 PM" },
  { title: "Programming assignment 3", when: "Mon, 12 Oct" },
];
const RECENT = [
  { text: "Finished “How a model reads your prompt”", when: "Today" },
  { text: "Enrolled in Microsoft Office Suite", when: "2 days ago" },
  { text: "Week 3 of AI Prompt Engineering opened", when: "5 days ago" },
];

const panel = "rounded-2xl border border-gray-200 p-5";

export default function HomePage() {
  const mine = COURSES.filter((c) => isEnrolled(c.slug));
  const current = mine.find((c) => ENROLLMENTS[c.slug].progress < 100);
  const recommended = COURSES.filter((c) => !isEnrolled(c.slug)).slice(0, 3);
  const maxHours = Math.max(...WEEK.map((w) => w.hours));

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-[stack-sans-bold] text-3xl text-foreground">Welcome back, Mark</h1>
        <p className="med-font mt-1 text-sm text-muted-foreground">Here is where you are today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          { label: "Courses enrolled", value: mine.length },
          { label: "Lessons completed", value: STATS.lessonsDone },
          { label: "Hours learned", value: `${STATS.hoursLearned}h` },
          { label: "Day streak", value: STATS.streak },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-foreground/[0.03] p-4">
            <p className="font-[stack-sans-bold] text-2xl text-foreground">{s.value}</p>
            <p className="med-font text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {current && (
            <div className={`${panel} flex flex-col gap-4 sm:flex-row sm:items-center`}>
              <span className={`grid size-14 shrink-0 place-items-center rounded-2xl ${current.iconBg}`}>{current.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="med-font text-xs text-muted-foreground">Continue learning</p>
                <p className="med-font truncate text-base font-medium text-foreground">{current.title}</p>
                <p className="med-font truncate text-sm text-muted-foreground">Next: {ENROLLMENTS[current.slug].nextLesson}</p>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                    <div className="h-full rounded-full bg-foreground" style={{ width: `${ENROLLMENTS[current.slug].progress}%` }} />
                  </div>
                  <span className="med-font text-xs text-muted-foreground">{ENROLLMENTS[current.slug].progress}%</span>
                </div>
              </div>
              <Link
                href={`/courses/${current.slug}/learn`}
                className="med-font shrink-0 rounded-full bg-foreground px-5 py-2 text-center text-sm text-background hover:bg-foreground/90"
              >
                Resume
              </Link>
            </div>
          )}

          <div className={panel}>
            <h2 className="font-[stack-sans-bold] text-base text-foreground">In progress</h2>
            <ul className="mt-3 flex flex-col gap-1">
              {mine.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/courses/${c.slug}/learn`}
                    className="flex items-center gap-3 rounded-xl px-2 py-2.5 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${c.iconBg}`}>{c.icon}</span>
                    <span className="med-font min-w-0 flex-1 truncate text-sm text-foreground">{c.title}</span>
                    <div className="hidden h-1.5 w-28 overflow-hidden rounded-full bg-foreground/10 sm:block">
                      <div className="h-full rounded-full bg-foreground" style={{ width: `${ENROLLMENTS[c.slug].progress}%` }} />
                    </div>
                    <span className="med-font w-9 text-right text-xs text-muted-foreground">{ENROLLMENTS[c.slug].progress}%</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={panel}>
            <h2 className="font-[stack-sans-bold] text-base text-foreground">Recent activity</h2>
            <ul className="mt-3 flex flex-col">
              {RECENT.map((r) => (
                <li key={r.text} className="flex items-center justify-between gap-4 border-t border-gray-100 py-3 first:border-t-0">
                  <span className="med-font text-sm text-foreground">{r.text}</span>
                  <span className="med-font shrink-0 text-xs text-muted-foreground">{r.when}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className={panel}>
            <h2 className="font-[stack-sans-bold] text-base text-foreground">This week</h2>
            <div className="mt-4 flex h-28 items-end justify-between gap-2">
              {WEEK.map((w, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-md bg-foreground"
                    style={{ height: `${maxHours ? Math.max((w.hours / maxHours) * 80, 4) : 4}px`, opacity: w.hours ? 1 : 0.12 }}
                  />
                  <span className="med-font text-[11px] text-muted-foreground">{w.day}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={panel}>
            <h2 className="font-[stack-sans-bold] text-base text-foreground">Coming up</h2>
            <ul className="mt-3 flex flex-col gap-3">
              {UPCOMING.map((u) => (
                <li key={u.title} className="rounded-xl bg-foreground/[0.03] px-3 py-2.5">
                  <p className="med-font text-sm text-foreground">{u.title}</p>
                  <p className="med-font text-xs text-muted-foreground">{u.when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Recommended */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-[stack-sans-bold] text-base text-foreground">Recommended for you</h2>
          <Link href="/dashboard/courses" className="med-font text-sm text-muted-foreground hover:text-foreground">
            See all courses
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((c) => (
            <CourseCard
              key={c.slug}
              category={c.category}
              title={c.title}
              description={c.description}
              mentor={c.mentor}
              duration={c.duration}
              rating={c.rating}
              tools={c.tools}
              href={`/courses/${c.slug}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}