"use client";

import { useMemo, useState } from "react";
import PriceTag from "@/lib/price-tag";
import type { CourseCategory } from "../lib/courses";
import CourseTopicCard from "./courses/course-topic-card";
import CourseModal, { type CourseDetails } from "./course-modal";

export default function CategorySection({
  category,
  index,
  total,
}: {
  category: CourseCategory;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);

  const order = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

  // One purchasable "full course" per category, with every tool used inside it
  const details: CourseDetails = useMemo(() => {
    const seen = new Set<string>();
    const tools = category.courses
      .flatMap((c) => c.tools)
      .filter((t) => (seen.has(t.name) ? false : seen.add(t.name)));

    return {
      title: category.title,
      category: "Full course",
      description: category.description,
      mentor: category.courses[0]?.instructor ?? "",
      duration: category.duration,
      tools,
      price: category.price,
      months: category.months,
    };
  }, [category]);

  return (
    <section
      className={`py-16 sm:py-24 ${index === 0 ? "" : "border-t border-border"}`}
    >
      <div className="mx-auto grid max-w-[1320px] gap-10 px-3 sm:px-6 md:px-10 lg:grid-cols-[380px_1fr] lg:gap-16">
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

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="med-font rounded-full bg-foreground px-6 py-2.5 text-sm text-background transition hover:opacity-90"
            >
              Purchase course
            </button>
            <PriceTag price={category.price} months={category.months} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:min-h-[70vh] lg:content-center">
          {category.courses.map((course) => (
            <CourseTopicCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      <CourseModal open={open} onOpenChange={setOpen} {...details} />
    </section>
  );
}