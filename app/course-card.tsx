"use client";

import { useState } from "react";
import Image from "next/image";
import PriceTag from "@/lib/price-tag";
import { NOISE, getCoursePalette } from "@/lib/course-gradient";
import CourseModal, { type CourseDetails } from "./course-modal";

function CourseArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function CourseCard(course: CourseDetails) {
  const [open, setOpen] = useState(false);
  const { title, category, description, mentor, startDate, duration, tools, price, months } = course;

  const visible = tools.slice(0, 4);
  const extra = tools.length - visible.length;
  const { background } = getCoursePalette(title);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-2xl bg-surface text-left transition-colors"
      >
        <div className="relative h-36 w-full overflow-hidden" style={{ background }}>
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
            style={{ backgroundImage: NOISE }}
          />

          <div
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-10 translate-y-[24%] px-4 transition-transform duration-500 ease-out group-hover:translate-y-[18%]"
            style={{
              maskImage: "linear-gradient(to right, black 65%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, black 65%, transparent 100%)",
            }}
          >
            <span className="block whitespace-nowrap bg-gradient-to-b from-white to-white/45 bg-clip-text font-[stack-sans-bold] text-[44px] leading-[0.9] tracking-[-0.06em] text-transparent">
              {title}
            </span>
          </div>

          <span className="absolute left-3 top-3 z-20 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-md">
            {category}
          </span>
          <span className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-white text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <CourseArrowIcon />
          </span>
        </div>

        <div className="flex w-full flex-1 flex-col p-5">
          {tools.length > 0 && (
            <div className="mb-3 flex items-center gap-0.5">
              {visible.map((tool) => (
                <div
                  key={tool.name}
                  title={tool.name}
                  className="grid size-7 place-items-center rounded-md bg-background p-1.5 border border-gray-200"
                >
                  <Image src={tool.src} alt={tool.name} className="size-full object-contain" />
                </div>
              ))}
              {extra > 0 && (
                <span className="grid size-7 place-items-center rounded-md border border-border bg-foreground/10 text-[10px] font-medium text-foreground-muted">
                  +{extra}
                </span>
              )}
            </div>
          )}

          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-[16px] tracking-[-0.04em] leading-snug text-foreground">
              {title}
            </h3>
            {price !== undefined && <PriceTag price={price} months={months} />}
          </div>
          <p className="mb-3 med-font mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <div className="med-font mt-auto flex items-center gap-2 border-t border-border pt-4 text-[12px] text-muted-foreground">
            <span className="text-foreground">{mentor}</span>
            <span aria-hidden>·</span>
            <span>Starts {startDate ?? "soon"}</span>
            <span aria-hidden className="ml-auto">
              {duration}
            </span>
          </div>
        </div>
      </button>

      <CourseModal open={open} onOpenChange={setOpen} {...course} />
    </>
  );
}