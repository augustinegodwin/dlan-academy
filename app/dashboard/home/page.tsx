import Link from "next/link";
import CourseCard from "../courses/course-card";
import { COURSES, ENROLLMENTS, isEnrolled } from "../course-data";

const STUDENT_FIRST_NAME = "Mark";

function SectionHeader({ title, href, linkText }: { title: string; href: string; linkText: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h2 className="font-[stack-sans-bold] text-lg text-foreground">{title}</h2>
      <Link href={href} className="med-font text-sm text-muted-foreground transition-colors hover:text-foreground">
        {linkText}
      </Link>
    </div>
  );
}

export default function HomePage() {
  const mine = COURSES.filter((c) => isEnrolled(c.slug));
  const explore = COURSES.filter((c) => !isEnrolled(c.slug)).slice(0, 3);
  const current = mine.find((c) => ENROLLMENTS[c.slug].progress < 100);

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="font-[stack-sans-bold] text-3xl text-foreground">Welcome back, {STUDENT_FIRST_NAME}</h1>
        <p className="med-font mt-1 text-sm text-muted-foreground">
          {mine.length > 0
            ? `You're enrolled in ${mine.length} ${mine.length === 1 ? "course" : "courses"}. Pick up where you left off.`
            : "You're not enrolled in any course yet. Start with one below."}
        </p>
      </div>

      {/* Continue learning */}
      {current && (
        <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 sm:flex-row sm:items-center sm:p-6">
          <span className={`grid size-16 shrink-0 place-items-center rounded-2xl ${current.iconBg}`}>{current.icon}</span>

          <div className="min-w-0 flex-1">
            <p className="med-font text-xs text-muted-foreground">Continue learning</p>
            <h2 className="mt-1 truncate font-[stack-sans-bold] text-xl text-foreground">{current.title}</h2>
            <p className="med-font mt-0.5 truncate text-sm text-muted-foreground">
              Next up: {ENROLLMENTS[current.slug].nextLesson}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foreground/10">
                <div className="h-full rounded-full bg-foreground" style={{ width: `${ENROLLMENTS[current.slug].progress}%` }} />
              </div>
              <span className="med-font text-xs text-muted-foreground">{ENROLLMENTS[current.slug].progress}%</span>
            </div>
          </div>

          <Link
            href={`/courses/${current.slug}/learn`}
            className="med-font shrink-0 rounded-full bg-foreground px-6 py-2.5 text-center text-sm text-background transition-colors hover:bg-foreground/90"
          >
            Resume
          </Link>
        </div>
      )}

      {/* My courses */}
      {mine.length > 0 && (
        <section>
          <SectionHeader title="My courses" href="/dashboard/courses" linkText="View all" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mine.map((c) => (
              <CourseCard
                key={c.slug}
                category={c.category}
                title={c.title}
                description={c.description}
                mentor={c.mentor}
                duration={c.duration}
                rating={c.rating}
                tools={c.tools}
                href={`/courses/${c.slug}/learn`}
                progress={ENROLLMENTS[c.slug].progress}
              />
            ))}
          </div>
        </section>
      )}

      {/* Explore */}
      {explore.length > 0 && (
        <section>
          <SectionHeader title="Explore more courses" href="/dashboard/courses" linkText="See all" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {explore.map((c) => (
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
        </section>
      )}
    </div>
  );
}