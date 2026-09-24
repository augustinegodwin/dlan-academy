"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import babayaga from "../app/assets/images/arcadia-arcadia-cosmos-dawn.png"
/**
 * FAQ section: side CTA card + a flat accordion list.
 *
 * Closed rows are completely plain — no background, no border, no
 * rounding, just flush rows in a flat list. Only the currently open
 * row detaches itself: it gets its own rounded card with a
 * background, floating apart from the plain rows above and below it
 * with a bit of margin. There is no persistent grouping — the
 * category label is just text, not a shared container.
 *
 * Note: this whole card sits on a background photo + dark overlay
 * (same treatment as the video/image tiles elsewhere on the page), so
 * its internals stay hardcoded white-on-dark on purpose — it needs
 * fixed contrast over the image regardless of the site's light theme.
 */

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const FAQS: FAQItem[] = [
  {
    question: "Can I visit before enrolling?",
    answer:
      "Yes. Book a walk-through of the Kubwa lab any weekday — meet a mentor and see a live class in session before you commit.",
    category: "Getting started",
  },
  {
    question: "Do I need my own laptop?",
    answer:
      "No. Every seat includes a lab machine for the length of the course. You're welcome to bring your own if you'd rather work on it.",
    category: "Getting started",
  },
  {
    question: "What if I've never coded before?",
    answer:
      "That's fine for our beginner tracks. Mentors start from the fundamentals and adjust pace to where you're actually starting from.",
    category: "Getting started",
  },
  {
    question: "How long is each course?",
    answer:
      "AI Prompt Engineering and YouTube Automation run 4 weeks; Data Analysis runs 12 weeks. All meet several times a week in person.",
    category: "Courses",
  },
  {
    question: "Can I switch courses after enrolling?",
    answer:
      "Talk to us within the first week of a cohort and we'll help you move to a better fit at no extra cost.",
    category: "Courses",
  },
  {
    question: "What do I actually leave with?",
    answer:
      "A portfolio project from your track, plus continued access to the DLAN alumni community and job referrals.",
    category: "Courses",
  },
  {
    question: "How do I secure a seat?",
    answer:
      "Pay the deposit through the Enroll link, then clear the balance before your cohort's start date. Seats are first-come, first-served.",
    category: "Enrollment",
  },
  {
    question: "Is there a payment plan?",
    answer:
      "Yes. Most courses can be split into two installments — ask admissions about this when you enroll.",
    category: "Enrollment",
  },
];

function ChevronDownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function FAQRow({
  item,
  open,
  onToggle,
}: {
  item: FAQItem;
  open: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    if (!open) {
      setHeight(0);
      return;
    }

    const update = () => setHeight(node.scrollHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, [open]);

  return (
    <div
      data-state={open ? "open" : "closed"}
      className={`overflow-hidden text-white transition-all duration-300 ${
        open
          ? "my-2 rounded-[22px] bg-white/[0.06]  ring-white/10"
          : "my-0 rounded-none bg-transparent ring-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={onToggle}
        className="flex min-h-[58px] w-full items-center cursor-pointer gap-4 rounded-[22px] px-4 text-left outline-none transition-colors hover:bg-white/5 sm:px-5"
      >
        <span className="min-w-0 flex-1 text-[15px]  text-white">
          <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <span>{item.question}</span>
            <span className="shrink-0 text-xs med-font uppercase tracking-[0.1em] text-white/40">
              {item.category}
            </span>
          </span>
        </span>
        <span
          aria-hidden
          className="grid h-6 w-6 shrink-0 place-items-center text-white/50 transition-transform duration-200"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <ChevronDownIcon />
        </span>
      </button>

      <section
        aria-hidden={!open}
        className="overflow-hidden transition-[height] duration-300"
        style={{
          height,
          transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          ref={contentRef}
          className="px-4 pb-5 transition-opacity duration-200 sm:px-5"
          style={{ opacity: open ? 1 : 0 }}
        >
          <div className="text-sm med-font leading-6 text-white/60">
            {item.answer}
          </div>
        </div>
      </section>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto px-3 py-16 sm:px-6 sm:py-24 md:px-10">
      <div className="relative isolate overflow-hidden max-w-[1320px] mx-auto rounded-[22px] p-4 sm:rounded-[28px] sm:p-6 lg:p-8">
        {/* soft ambient glow, stand-in for the original's shader canvas.
            Sized relative to the card (%) instead of fixed px, so it
            doesn't look randomly placed on a tall narrow mobile card. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(60% 40% at 15% 0%, rgba(93,107,255,0.14), transparent 60%), radial-gradient(55% 35% at 100% 100%, rgba(255,182,39,0.10), transparent 60%)",
          }}
        />
        <Image
            className="absolute inset-0 -z-10 brightness-50 object-cover opacity-90"
            src={"/cover1.jpg"}
            alt=""
            fill
            sizes="(min-width: 1024px) 1320px, 100vw"
        />

        <div className="grid items-start gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:gap-5">
          {/* side CTA card */}
          <aside className="rounded-2xl bg-white/5 p-5 backdrop-blur-2xl sm:rounded-3xl sm:p-7">
            <p className="text-xl font-medium text-white">Thinking about joining?</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/60">
              Tell us your experience level, the course you're eyeing, and
              your schedule — we'll point you to the right cohort.
            </p>
            <a
              href="#enroll"
              className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-950 transition-colors hover:bg-white/90"
            >
              Talk to admissions
              <ArrowUpRightIcon />
            </a>
          </aside>

          {/* flat accordion list — only the open row has a container */}
          <div>
            {FAQS.map((item, i) => (
              <FAQRow
                key={item.question}
                item={item}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}