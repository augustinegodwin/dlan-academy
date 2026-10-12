"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  // Carousel state (mobile only)
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const order = String(index + 1).padStart(2, "0");
  const totalLabel = String(total).padStart(2, "0");

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

  const getPad = (el: HTMLElement) =>
    parseFloat(getComputedStyle(el).paddingLeft) || 0;

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const pad = getPad(el);
    const children = Array.from(el.children) as HTMLElement[];

    let nearest = 0;
    let best = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - pad - el.scrollLeft);
      if (dist < best) {
        best = dist;
        nearest = i;
      }
    });

    setActive(nearest);
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const scrollToIndex = (i: number) => {
    const el = trackRef.current;
    const child = el?.children[i] as HTMLElement | undefined;
    if (!el || !child) return;
    el.scrollTo({ left: child.offsetLeft - getPad(el), behavior: "smooth" });
  };

  const scrollByStep = (dir: 1 | -1) => {
    const next = Math.min(
      Math.max(active + dir, 0),
      category.courses.length - 1,
    );
    scrollToIndex(next);
  };

  return (
    <section
      className={`py-16 sm:py-24 ${index === 0 ? "" : "border-t border-border"}`}
    >
      <div className="mx-auto grid max-w-[1320px] gap-10 px-3 sm:px-6 md:px-10 lg:grid-cols-[380px_1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="med-font text-xs tracking-wide text-muted-foreground/70">
            {order} / {totalLabel}
          </span>
          <h2 className="mt-4 font-[stack-sans-bold] text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.05em] text-foreground">
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

        <div className="min-w-0 lg:min-h-[70vh] lg:content-center">
          {/* Mobile: snap carousel · md+: original grid */}
          <div
  ref={trackRef}
  onScroll={update}
  className="relative -mx-3 flex snap-x snap-mandatory items-stretch gap-3 overflow-x-auto scroll-px-3 scroll-smooth px-3 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:px-6 [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
>
  {category.courses.map((course) => (
    <div
      key={course.id}
      className="h-auto w-[82%] max-w-[340px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink"
    >
      <CourseTopicCard course={course} />
    </div>
  ))}
</div>

          {/* Carousel controls (hidden on md+) */}
          {category.courses.length > 1 && (
            <div className="mt-6 flex items-center justify-between gap-4 md:hidden">
              <div className="flex items-center gap-1.5">
                {category.courses.map((course, i) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to ${course.title}`}
                    aria-current={i === active}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 bg-foreground"
                        : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByStep(-1)}
                  disabled={!canPrev}
                  aria-label="Previous course"
                  className="grid size-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-foreground/[0.04] active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByStep(1)}
                  disabled={!canNext}
                  aria-label="Next course"
                  className="grid size-10 place-items-center rounded-full bg-foreground text-background transition hover:bg-foreground/90 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CourseModal open={open} onOpenChange={setOpen} {...details} />
    </section>
  );
}