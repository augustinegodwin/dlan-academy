import Image from "next/image";
import Link from "next/link";
import { BookOpen, Flame, Trophy, ArrowRight, Clock } from "lucide-react";
import CourseCard from "../courses/course-card";
import { COURSES, ENROLLMENTS, isEnrolled } from "../course-data";

const STUDENT_FIRST_NAME = "Mark";

// Placeholder target date for finishing the current course: replace with real data later
const TARGET_DATE = "2026-11-15";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

function SectionHeader({ title, href, linkText }: { title: string; href: string; linkText: string }) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="font-[stack-sans-bold] text-lg text-foreground">{title}</h2>
      <Link href={href} className="med-font text-sm text-muted-foreground transition-colors hover:text-foreground">
        {linkText}
      </Link>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tint: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col justify-between gap-2 rounded-2xl p-3 shadow-sm backdrop-blur-md ${tint}`}>
      <div className="flex items-center gap-1.5 text-neutral-600">
        {icon}
        <span className="med-font truncate text-xs sm:text-sm">{label}</span>
      </div>
      <p className="font-[stack-sans-bold] text-3xl leading-none text-neutral-900 sm:text-4xl">{value}</p>
    </div>
  );
}

function Calendar({ today, target }: { today: Date; target: Date }) {
  const year = today.getFullYear();
  const month = today.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday start
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array<null>(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  const targetInMonth = target.getFullYear() === year && target.getMonth() === month ? target.getDate() : null;

  return (
    <div className="h-full rounded-3xl bg-surface p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-[stack-sans-bold] text-base text-foreground">
          {today.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h2>
        {targetInMonth && (
          <span className="med-font flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full bg-lime-400" /> Target date
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="med-font pb-1 text-xs text-muted-foreground">
            {d}
          </span>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <span key={`e-${i}`} />;
          const isToday = day === today.getDate();
          const isTarget = day === targetInMonth;
          return (
            <span
              key={day}
              // fluid cell: shrinks on small phones instead of overflowing
              className={`med-font mx-auto grid aspect-square w-full max-w-9 place-items-center rounded-full text-sm ${
                isToday
                  ? "bg-foreground text-background"
                  : isTarget
                    ? "bg-lime-300 text-neutral-900"
                    : "text-foreground hover:bg-background"
              }`}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const mine = COURSES.filter((c) => isEnrolled(c.slug));
  const explore = COURSES.filter((c) => !isEnrolled(c.slug)).slice(0, 3);
  const inProgress = mine.filter((c) => ENROLLMENTS[c.slug].progress < 100);
  const current = inProgress[0];
  const completed = mine.length - inProgress.length;

  const today = new Date();
  const target = new Date(TARGET_DATE);
  const daysLeft = Math.max(0, Math.ceil((target.getTime() - today.getTime()) / 86_400_000));

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="flex flex-col gap-3">
        {/* Hero banner */}
        <section className="relative isolate flex flex-col justify-between gap-8 overflow-hidden rounded-3xl p-4 sm:min-h-[340px] sm:p-6">
          <Image
            src="/cover3.jpg"
            alt=""
            fill
            priority
            sizes="(min-width: 1152px) 1072px, 100vw"
            className="-z-20 object-cover object-[center_30%]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/5 rounded-3xl to-black/30 backdrop-blur-lg" />

          <div>
            <h1 className="font-[stack-sans-bold] text-2xl text-white sm:text-3xl">
              Welcome back, {STUDENT_FIRST_NAME} Daniel
            </h1>
            <p className="med-font mt-1 max-w-md text-sm text-white/80">
              {mine.length > 0
                ? "Pick up where you left off and keep your streak going."
                : "You're not enrolled in any course yet. Start with one below."}
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 lg:flex-row lg:items-stretch">
            <div className="grid flex-1 grid-cols-3 gap-2 sm:gap-3">
              <StatCard
                tint="bg-violet-100/85"
                icon={<BookOpen className="size-3.5 shrink-0 sm:size-4" />}
                label="Enrolled"
                value={mine.length}
              />
              <StatCard
                tint="bg-emerald-100/85"
                icon={<Flame className="size-3.5 shrink-0 sm:size-4" />}
                label="In progress"
                value={inProgress.length}
              />
              <StatCard
                tint="bg-sky-100/85"
                icon={<Trophy className="size-3.5 shrink-0 sm:size-4" />}
                label="Completed"
                value={completed}
              />
            </div>

            <div className="flex flex-col justify-between gap-3 rounded-2xl bg-lime-200/90 p-4 shadow-sm backdrop-blur-md lg:w-72">
              {current ? (
                <>
                  <div className="min-w-0">
                    <p className="med-font text-xs text-neutral-600">Continue learning</p>
                    <h2 className="mt-1 truncate font-[stack-sans-bold] text-base text-neutral-900">{current.title}</h2>
                    <p className="med-font mt-0.5 truncate text-xs text-neutral-600">
                      Next: {ENROLLMENTS[current.slug].nextLesson}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                        <div
                          className="h-full rounded-full bg-neutral-900"
                          style={{ width: `${ENROLLMENTS[current.slug].progress}%` }}
                        />
                      </div>
                      <span className="med-font text-xs text-neutral-700">{ENROLLMENTS[current.slug].progress}%</span>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${current.slug}/learn`}
                    className="med-font inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm text-white transition-colors hover:bg-neutral-800"
                  >
                    Resume <ArrowRight className="size-4" />
                  </Link>
                </>
              ) : (
                <>
                  <div>
                    <p className="med-font text-xs text-neutral-600">Nothing in progress</p>
                    <h2 className="mt-1 font-[stack-sans-bold] text-base text-neutral-900">Find your next course</h2>
                  </div>
                  <Link
                    href="/dashboard/courses"
                    className="med-font inline-flex items-center justify-center gap-2 rounded-full bg-neutral-900 px-5 py-2 text-sm text-white transition-colors hover:bg-neutral-800"
                  >
                    Browse courses <ArrowRight className="size-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Calendar + days left */}
        <div className="grid gap-3 lg:grid-cols-5">
          <div className={current ? "lg:col-span-2" : "lg:col-span-5"}>
            <Calendar today={today} target={target} />
          </div>

          {current && (
            <div className="flex flex-col justify-between gap-6 rounded-3xl bg-lime-200 p-4 sm:p-5 lg:col-span-3">
              <div>
                <p className="med-font flex items-center gap-1.5 text-sm text-neutral-700">
                  <Clock className="size-3.5" /> Days left
                </p>
                <p className="mt-2 font-[stack-sans-bold] text-6xl leading-none text-neutral-900">{daysLeft}</p>
              </div>

              <div>
                <p className="med-font text-xs text-neutral-600">Target finish date</p>
                <p className="mt-0.5 truncate font-[stack-sans-bold] text-lg text-neutral-900">{current.title}</p>
                <p className="med-font mt-0.5 text-sm text-neutral-700">
                  {target.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-neutral-900"
                      style={{ width: `${ENROLLMENTS[current.slug].progress}%` }}
                    />
                  </div>
                  <span className="med-font text-xs text-neutral-700">{ENROLLMENTS[current.slug].progress}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* My courses */}
      {mine.length > 0 && (
        <section>
          <SectionHeader title="My courses" href="/dashboard/courses" linkText="View all" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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