import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function BreadcrumbBar({ courseTitle, percent }: { courseTitle: string; percent: number }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Link
        href="/dashboard/courses"
        className="med-font inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" />
        My courses
      </Link>

      <span className="med-font rounded-full bg-foreground/[0.05] px-3 py-1 text-xs text-muted-foreground">
        {percent}% complete
      </span>
    </div>
  );
}
