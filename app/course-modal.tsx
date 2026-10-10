"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NOISE, getCoursePalette } from "@/lib/course-gradient";

export type CourseDetails = {
  /** Used for checkout. Falls back to the title if you don't have an id yet. */
  id?: string;
  category: string;
  title: string;
  description: string;
  mentor: string;
  startDate?: string;
  duration: string;
  tools: { src: any; name: string }[];
  /** Price per month in naira. 0 = free. */
  price?: number;
  months: number;
  /** Optional "what you'll learn" bullets. */
  outcomes?: string[];
};

const naira = (n: number) =>
  `NGN ${n.toLocaleString("en-NG")}`

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

export default function CourseModal({
  open,
  onOpenChange,
  id,
  category,
  title,
  description,
  mentor,
  startDate,
  duration,
  tools,
  price,
  months,
  outcomes,
}: CourseDetails & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { background } = getCoursePalette(title);
  const isFree = price === 0;
  const total = price !== undefined ? price * months : undefined;

  async function handleCheckout() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: id ?? title }),
      });
      if (!res.ok) throw new Error("checkout failed");
      const { url } = await res.json();
      window.location.href = url; // redirect to the payment gateway
    } catch {
      setError("Couldn't start checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden rounded-[28px] border-0 bg-surface p-0 sm:max-w-[780px] [&>button]:z-30 [&>button]:text-white md:[&>button]:text-foreground"
      >
        <div className="grid md:grid-cols-[300px_1fr]">
          {/* LEFT: course gradient */}
          <div
            className="relative flex min-h-[170px] flex-col justify-between overflow-hidden p-6 md:min-h-[460px] md:m-1 md:rounded-[24px]"
            style={{ background }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.16] mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />
            <span className="relative z-10 w-fit rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-md">
              {category}
            </span>

            <div className="relative z-10">
              <DialogTitle className="font-[stack-sans-bold] text-3xl font-normal leading-[0.95] tracking-[-0.05em] text-white">
                {title}
              </DialogTitle>
              <p className="med-font mt-3 text-sm text-white/70">
                with {mentor}
              </p>
            </div>
          </div>

          {/* RIGHT: details + purchase */}
          <div className="flex flex-col p-6 md:p-8">
            <DialogDescription className="med-font text-sm leading-relaxed text-muted-foreground">
              {description}
            </DialogDescription>

            {outcomes && outcomes.length > 0 && (
              <ul className="med-font mt-5 space-y-2.5 text-sm text-foreground">
                {outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-foreground text-background">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                    {o}
                  </li>
                ))}
              </ul>
            )}

            <dl className="med-font mt-6 divide-y divide-border rounded-2xl border border-border text-sm">
              <Row label="Mentor" value={mentor} />
              <Row label="Starts" value={startDate ?? "Soon"} />
              <Row label="Duration" value={duration} />
            </dl>

            {tools.length > 0 && (
              <div className="mt-5">
                <p className="med-font mb-2 text-xs text-muted-foreground">
                  Tools you'll use
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <span
                      key={tool.name}
                      className="med-font flex items-center gap-1.5 rounded-full border border-border bg-background py-1 pl-1.5 pr-2.5 text-xs text-foreground"
                    >
                      <Image
                        src={tool.src}
                        alt=""
                        className="size-4 object-contain"
                      />
                      {tool.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* price + CTA */}
            <div className="mt-auto pt-8">
              {price !== undefined && (
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="font-[stack-sans-bold] text-2xl tracking-[-0.04em] text-foreground">
                    {isFree ? "Free" : naira(total!)}
                  </span>
                  {!isFree && months > 1 && (
                    <span className="med-font text-xs text-muted-foreground">
                      {naira(price)}/month × {months} months
                    </span>
                  )}
                </div>
              )}

              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="h-12 w-full rounded-full bg-foreground text-background hover:bg-foreground/90"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : isFree ? (
                  "Enroll for free"
                ) : (
                  "Purchase this course"
                )}
              </Button>

              {error && (
                <p className="med-font mt-2 text-center text-xs text-red-500">
                  {error}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}