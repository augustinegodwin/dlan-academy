import Image from "next/image";
import { NOISE, getCoursePalette } from "@/lib/course-gradient";
import type { Course } from "../../lib/courses";

export default function CourseTopicCard({ course }: { course: Course }) {
  const { title, description, level, instructor, duration, tools } = course;
  const { background } = getCoursePalette(title);

  const visible = tools.slice(0, 4);
  const extra = tools.length - visible.length;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-surface text-left">
      <div className="relative h-36 w-full overflow-hidden" style={{ background }}>
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
          style={{ backgroundImage: NOISE }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-10 translate-y-[24%] px-4"
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
          {level}
        </span>
      </div>

      <div className="flex w-full flex-1 flex-col p-5">
        {tools.length > 0 && (
          <div className="mb-3 flex items-center gap-0.5">
            {visible.map((tool) => (
              <div
                key={tool.name}
                title={tool.name}
                className="grid size-7 place-items-center rounded-md border border-gray-200 bg-background p-1.5"
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

        <h3 className="line-clamp-2 text-[16px] leading-snug tracking-[-0.04em] text-foreground">
          {title}
        </h3>
        <p className="med-font mb-3 mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        <div className="med-font mt-auto flex items-center gap-2 border-t border-border pt-4 text-[12px] text-muted-foreground">
          <span className="text-foreground">{instructor}</span>
          <span aria-hidden className="ml-auto">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
}