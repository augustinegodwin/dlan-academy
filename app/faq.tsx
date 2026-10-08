"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

const FAQS = [
  {
    question: "Can I visit before enrolling?",
    answer:
      "Yes. Book a walk-through of the Kubwa lab any weekday. You can meet a mentor and sit in on a live class before you commit.",
  },
  {
    question: "Do I need my own laptop?",
    answer:
      "No. Every seat comes with a lab machine for the length of the course. You are welcome to bring your own if you prefer.",
  },
  {
    question: "What if I have never coded before?",
    answer:
      "That is fine for our beginner tracks. Mentors start from the basics and set the pace around where you actually are.",
  },
  {
    question: "How do I secure a seat, and can I pay in parts?",
    answer:
      "Pay the deposit through the Enroll link and clear the balance before your cohort starts. Most courses can be split into two installments. Seats are first come, first served.",
  },
  {
    question: "What do I leave with?",
    answer:
      "A portfolio project from your track, plus ongoing access to the DLAN alumni community and job referrals.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-20 md:px-10">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        {/* Left: heading + CTA */}
        <div className="animate-fade-up flex sm:block flex-col justify-center items-center">
          <span className="inline-flex select-none items-center rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70">
            FAQ
          </span>
          <h2 className="mt-5 text-balance text-[clamp(2rem,4vw,3rem)] text-center sm:text-left leading-[1.05] tracking-[-0.06em] text-foreground">
            Questions before
            <br />
            <span className="text-muted-foreground">you enroll</span>
          </h2>
          <p className="med-font mt-4 max-w-sm text-sm leading-6 text-center sm:text-left text-muted-foreground">
            Not sure which cohort fits you? Tell us your experience level and schedule and we will point you to the right one.
          </p>
          <a
            href="#enroll"
            className="med-font mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm text-background transition-opacity hover:opacity-90"
          >
            Talk to admissions
            <ArrowUpRight className="size-4" />
          </a>
        </div>

        {/* Right: accordion */}
        <div className="divide-y divide-border rounded-3xl bg-surface px-5 sm:px-8">
          {FAQS.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left sm:py-5"
                >
                  <span className="text-[15px] leading-snug tracking-[-0.02em] text-foreground sm:text-base">
                    {item.question}
                  </span>
                  <Plus
                    aria-hidden
                    className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      open ? "rotate-45" : ""
                    }`}
                  />
                </button>

                {/* grid-rows 0fr -> 1fr animates height without measuring anything in JS */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-hidden={!open}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="med-font pb-5 pr-8 text-sm leading-6 text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}