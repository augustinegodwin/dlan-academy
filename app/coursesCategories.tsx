import { CourseCategory } from "../lib/courses";
import CourseCard from "./course-card";

export default function CategorySection({
  category,
  index,
  total,
}: {
  category: CourseCategory;
  index: number;
  total: number;
}) {
  const order = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  return (
    <section className="border-t border-border py-16 first:border-t-0 sm:py-24">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-3 sm:px-6 md:px-10 lg:grid-cols-[380px_1fr] lg:gap-16">
        {/* Sticky within THIS section only — the containing block is this
            grid, so it releases the moment the section ends and the next
            category's label starts fresh at the top, instead of staying
            pinned across the whole page. */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="med-font text-xs tracking-wide text-muted-foreground/70">
            {order} / {totalLabel}
          </span>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.05em] text-foreground">
            {category.title}
          </h2>
          <p className="med-font mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {category.description}
          </p>
          <div className="med-font mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{category.courses.length} courses</span>
            <span aria-hidden>·</span>
            <span>{category.duration}</span>
          </div>
        </div>

        {/* min-h + content-center give every category the same generous
            scroll distance (so the sticky label has room to feel
            intentional) even when a category only has 2–3 courses. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:min-h-[70vh] lg:content-center">
          {category.courses.map((course) => (
            <CourseCard
              key={course.id}
              category={course.level}
              title={course.title}
              description={course.description}
              mentor={course.instructor}
              duration={course.duration}
              tools={course.tools}
            />
          ))}
        </div>
      </div>
    </section>
  );
}