import Image from "next/image";
import Link from "next/link";
import { formatNGN } from "@/lib/format-price";

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

export default function CourseCard({
  category,
  title,
  description,
  mentor,
  startDate,
  duration,
  tools = [],
  href = "#enroll",
  progress,
  rating,
  price,
}: {
  category: string;
  title: string;
  description: string;
  mentor: string;
  startDate?: string;
  duration: string;
  tools?: { src: any; name: string }[];
  /** Where the card goes (learn page if enrolled, course page if not) */
  href?: string;
  /** Pass a 0-100 number for enrolled courses to show progress */
  progress?: number;
  /** e.g. "4.9" */
  rating?: string;
  /** Price in naira. Hidden for enrolled courses. */
  price?: number;
}) {
  const visible = tools.slice(0, 4);
  const extra = tools.length - visible.length;
  const enrolled = progress !== undefined;
  const showPrice = !enrolled && price !== undefined;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface transition-colors"
    >
      <div className="relative h-30 overflow-hidden">
        <Image
          className="absolute inset-0 z-10 size-full object-cover opacity-70"
          src="/cover2.jpg"
          width={500}
          height={500}
          alt={title}
        />
        <span className="absolute left-3 top-3 z-20 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground/70 backdrop-blur-sm">
          {category}
        </span>
        <span className="absolute bottom-3 right-3 z-20 grid size-8 place-items-center rounded-full bg-background text-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:opacity-100">
          <CourseArrowIcon />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {tools.length > 0 && (
          <div className="mb-3 flex items-center gap-1.5">
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
              <span className="grid size-7 place-items-center rounded-md border border-border bg-foreground/10 text-[10px] font-medium text-muted">
                +{extra}
              </span>
            )}
          </div>
        )}

        <h3 className="line-clamp-2 text-[16px] tracking-[-0.04em] leading-snug text-foreground">
          {title}
        </h3>
        <p className="mb-3 med-font mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {showPrice && (
          <div className="mb-3 flex items-baseline gap-1.5">
            <span className="text-lg font-semibold tracking-[-0.04em] text-foreground">
              {formatNGN(price)}
            </span>
            {price > 0 && (
              <span className="med-font text-[11px] text-muted-foreground">one-time</span>
            )}
          </div>
        )}

        {enrolled && (
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-foreground/10">
            <div className="h-full rounded-full bg-foreground" style={{ width: `${progress}%` }} />
          </div>
        )}

        <div className="med-font mt-auto flex items-center gap-2 border-t border-border pt-4 text-[12px] text-muted-foreground">
          <span className="text-foreground">{mentor}</span>
          <span aria-hidden>·</span>
          <span>{enrolled ? `${progress}% complete` : `Starts ${startDate ?? "soon"}`}</span>
          <span aria-hidden className="ml-auto">
            {duration}
            {rating && ` · ★ ${rating}`}
          </span>
        </div>
      </div>
    </Link>
  );
}