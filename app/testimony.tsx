"use client";

import { useRef } from "react";
import { Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonials = [
  {
    name: "Maya Chen",
    role: "Web Development Grad",
    course: "WEB DEVELOPMENT",
    quote:
      "Landed my first dev role two weeks after graduating. The mentor feedback on my final project changed how I write code.",
    rotate: -1.2,
  },
  {
    name: "Marcus Strom",
    role: "Cyber Security Grad",
    course: "CYBER SECURITY",
    quote:
      "The flexible schedule saved me. I studied nights around a full-time job and never fell behind the cohort.",
    rotate: 0.8,
  },
  {
    name: "Sara Lindqvist",
    role: "Data Analyst Grad",
    course: "DATA ANALYST",
    quote:
      "My mentor had actually shipped the things she was teaching. That real-world context is what made it click.",
    rotate: -0.6,
  },
  {
    name: "Tom Becker",
    role: "Microsoft Office Specialist Grad",
    course: "MICROSOFT OFFICE SPECIALIST",
    quote:
      "Unlimited connectivity meant I never lost a live session, even studying from three different countries.",
    rotate: 1.1,
  },
  {
    name: "Liam O'Brien",
    role: "Web Development Grad",
    course: "WEB DEVELOPMENT",
    quote:
      "Went from zero to building full apps in twelve weeks. The pacing let me go faster once I found my rhythm.",
    rotate: -0.9,
  },
  {
    name: "Diego Santos",
    role: "Data Analyst Grad",
    course: "DATA ANALYST",
    quote:
      "Feels like the curriculum was built by people who've actually launched products, not just taught theory.",
    rotate: 0.6,
  },
] as const;

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          canHover: "(hover: hover) and (pointer: fine)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, canHover, reduce } = ctx.conditions as {
            desktop: boolean;
            canHover: boolean;
            reduce: boolean;
          };

          // Respect reduced motion: everything stays visible, no animation.
          if (reduce) return;

          const cards = gsap.utils.toArray<HTMLElement>(".tm-card");
          const restRotate = (el: Element) =>
            parseFloat((el as HTMLElement).dataset.rotate || "0");

          /* ---------- 1. Heading sequence ----------
             Badge fades in, headline lines slide up out of a mask,
             then the paragraph fades up. One timeline, plays once. */
          const head = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: ".tm-head",
              start: "top 85%",
              once: true,
            },
          });

          head
            .from(".tm-badge", { opacity: 0, y: 14, scale: 0.9, duration: 0.7 })
            .from(
              ".tm-line",
              { yPercent: 110, duration: 1, stagger: 0.12 },
              "-=0.4"
            )
            .from(".tm-sub", { opacity: 0, y: 18, duration: 0.8 }, "-=0.6");

          /* ---------- 2. Cards: staggered scroll entry ----------
             Each card has its own trigger. Cards entering together are
             staggered; on mobile each one animates as you reach it.
             They land on their own resting tilt (data-rotate), not on 0. */
          const yStart = desktop ? 70 : 44;
          const tiltKick = desktop ? 5 : 3;

          gsap.set(cards, {
            opacity: 0,
            y: yStart,
            scale: 0.94,
            rotate: (i, el) =>
              restRotate(el) + (i % 2 === 0 ? -tiltKick : tiltKick),
            transformOrigin: "50% 100%",
          });

          const inner = (card: Element) => ({
            label: card.querySelector(".tm-label"),
            quote: card.querySelector(".tm-quote"),
            foot: card.querySelectorAll(".tm-foot > *"),
            icon: card.querySelector(".tm-icon"),
          });

          gsap.set(
            cards.flatMap((c) => {
              const { label, quote, foot, icon } = inner(c);
              return [label, quote, ...Array.from(foot), icon].filter(Boolean) as Element[];
            }),
            { opacity: 0 }
          );

          ScrollTrigger.batch(cards, {
            start: desktop ? "top 88%" : "top 92%",
            once: true,
            interval: 0.1,
            batchMax: desktop ? 3 : 2,
            onEnter: (batch) => {
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: (i, el) => restRotate(el),
                duration: 1.1,
                ease: "power3.out",
                stagger: 0.14,
                overwrite: true,
              });

              batch.forEach((card, i) => {
                const delay = 0.25 + i * 0.14;
                const { label, quote, foot, icon } = inner(card);

                gsap
                  .timeline({ delay, defaults: { ease: "power3.out" } })
                  .fromTo(label, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6 })
                  .fromTo(
                    quote,
                    { opacity: 0, y: 18 },
                    { opacity: 1, y: 0, duration: 0.8 },
                    "-=0.35"
                  )
                  .fromTo(
                    foot,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
                    "-=0.45"
                  )
                  .fromTo(
                    icon,
                    { opacity: 0, scale: 0, rotate: -25 },
                    { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.2)" },
                    "-=0.4"
                  );
              });
            },
          });

          /* ---------- 3. Hover (mouse devices only) ----------
             Card straightens and lifts slightly, then returns to its tilt. */
          const cleanups: Array<() => void> = [];

          if (canHover) {
            cards.forEach((card) => {
              const rest = restRotate(card);

              const enter = () =>
                gsap.to(card, {
                  y: -8,
                  rotate: 0,
                  scale: 1.015,
                  duration: 0.45,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              const leave = () =>
                gsap.to(card, {
                  y: 0,
                  rotate: rest,
                  scale: 1,
                  duration: 0.6,
                  ease: "power3.out",
                  overwrite: "auto",
                });

              card.addEventListener("mouseenter", enter);
              card.addEventListener("mouseleave", leave);
              cleanups.push(() => {
                card.removeEventListener("mouseenter", enter);
                card.removeEventListener("mouseleave", leave);
              });
            });
          }

          // Re-measure once fonts / images have loaded
          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          document.fonts?.ready.then(refresh);
          cleanups.push(() => window.removeEventListener("load", refresh));

          return () => cleanups.forEach((fn) => fn());
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full overflow-hidden "
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-20 md:px-10">
        <div className="tm-head text-center">
          <span className="tm-badge inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Reviews
          </span>

          <h2 className="mx-auto mt-5 max-w-[26ch] text-balance text-[clamp(2rem,6.5vw,3.25rem)] leading-[1.05] tracking-[-0.06em] font-[stack-sans-bold] text-foreground sm:mt-6">
            {/* each line sits in an overflow mask so it can slide up cleanly */}
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="tm-line block">Real people, real cohorts,</span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="tm-line block text-muted-foreground">
                real results.
              </span>
            </span>
          </h2>

          <p className="tm-sub med-font m-auto mt-3 max-w-3xl text-muted-foreground">
            Every course is taught in person, so these aren&apos;t reviews of a
            video library — they&apos;re from people who sat in the Kubwa lab,
            worked through the same projects you will, and came out the other
            side with a portfolio and, in most cases, a job.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:mt-16 sm:grid-cols-2 sm:gap-y-14 lg:mt-20 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              data-rotate={t.rotate}
              className="tm-card relative rounded-2xl bg-surface p-5 will-change-transform"
              style={{ transform: `rotate(${t.rotate}deg)` }}
            >
              <p className="tm-label med-font text-[10px] tracking-[-0.02em] text-muted-foreground">
                COURSE <span className="ml-1 text-foreground">{t.course}</span>
              </p>

              <blockquote className="tm-quote med-font mt-7 text-xl leading-6 text-foreground">
                {t.quote}
              </blockquote>

              <figcaption className="tm-foot mt-5 flex items-end justify-between border-t border-dashed border-border pt-3">
                <div>
                  <p className="text-base text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-sm tracking-[-0.03em] text-muted-foreground">
                    {t.role}
                  </p>
                </div>
                <Mail
                  className="tm-icon size-3.5 text-muted-foreground/50"
                  aria-hidden="true"
                />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;