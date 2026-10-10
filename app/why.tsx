"use client";

import { useRef } from "react";
import {
  Wifi,
  Zap,
  ArrowUpRight,
  BadgeCheck,
  Globe,
  Smartphone,
  HouseHeart,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const trustItems = [
  { icon: Globe, label: "Build a Real Website" },
  { icon: Smartphone, label: "Build a Mobile App" },
  { icon: BadgeCheck, label: "Certificate on Completion" },
  { icon: HouseHeart, label: "Physical Lab Abuja" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as {
            desktop: boolean;
            reduce: boolean;
          };

          // Respect reduced motion: everything stays visible, no animation.
          if (reduce) return;

          const tilts = desktop ? [-4, 3, -3, 4] : [-2.5, 2, -2, 2.5];
          const xs = desktop ? [-70, 50, -40, 60] : [-24, 24, -24, 24];
          const ys = desktop ? 70 : 48;
          const start = desktop ? "top 85%" : "top 90%";

          /* Heading: fades up when it scrolls into view */
          gsap.from(".wcu-heading > *", {
            opacity: 0,
            y: 24,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: ".wcu-heading",
              start: "top 88%",
              once: true,
            },
          });

          /* Staggered scroll-triggered card entry.
             Every card has its OWN trigger point. Cards that enter the
             viewport at the same moment (e.g. a row on desktop) are staggered
             together; on mobile each card animates as you scroll to it. */
          const animateCards = (selector: string, interval: number) => {
            const cards = gsap.utils.toArray<HTMLElement>(selector);
            if (!cards.length) return;

            // Hidden starting state, unique tilt/offset per card
            gsap.set(cards, {
              opacity: 0,
              x: (i) => xs[i % xs.length],
              y: ys,
              rotate: (i) => tilts[i % tilts.length],
              scale: 0.9,
              transformOrigin: "50% 100%",
            });
            gsap.set(
              cards.flatMap((c) => Array.from(c.querySelectorAll(".wcu-pop, .wcu-line"))),
              { opacity: 0 }
            );

            ScrollTrigger.batch(cards, {
              start,
              once: true,
              interval,
              batchMax: desktop ? 4 : 2,
              onEnter: (batch) => {
                gsap.to(batch, {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  duration: 1.1,
                  ease: "back.out(1.25)",
                  stagger: 0.15,
                  overwrite: true,
                });

                batch.forEach((card, i) => {
                  const delay = 0.3 + i * 0.15;

                  gsap.fromTo(
                    (card as HTMLElement).querySelectorAll(".wcu-pop"),
                    { scale: 0, opacity: 0 },
                    {
                      scale: 1,
                      opacity: 1,
                      duration: 0.6,
                      ease: "back.out(2)",
                      stagger: 0.08,
                      delay,
                    }
                  );

                  gsap.fromTo(
                    (card as HTMLElement).querySelectorAll(".wcu-line"),
                    { y: 16, opacity: 0 },
                    {
                      y: 0,
                      opacity: 1,
                      duration: 0.7,
                      ease: "power3.out",
                      stagger: 0.08,
                      delay: delay - 0.05,
                    }
                  );
                });
              },
            });
          };

          animateCards(".wcu-bento-card", 0.1);
          animateCards(".wcu-trust-card", 0.1);

          /* Video: slow zoom-out as its card scrolls into view */
          gsap.from(".wcu-video", {
            scale: 1.2,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".wcu-video",
              start,
              once: true,
            },
          });

          // Re-measure once fonts / images have loaded
          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          document.fonts?.ready.then(refresh);

          return () => window.removeEventListener("load", refresh);
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="offer"
      className="w-full overflow-hidden bg-background  text-foreground "
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 py-12 sm:px-6 sm:py-20 md:px-10">
        {/* Heading */}
        <div className="wcu-heading text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Why choose us
          </span>
          <h2 className="mx-auto mt-5 max-w-[22ch] text-balance text-[clamp(2rem,6.5vw,3.25rem)] leading-[1.05] tracking-[-0.06rem] font-[stack-sans-bold] text-foreground sm:mt-6">
            Tell us what you&apos;re building,
            <br className="hidden sm:block" />{" "}
            <span className="text-muted-foreground">
              we&apos;ll take it from there.
            </span>
          </h2>
        </div>

        {/* Bento grid
            mobile: 1 col → sm: 2 cols → lg: 4 cols with fixed row height */}
        <div className="wcu-bento-grid mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:auto-rows-[220px] lg:gap-4">
          {/* Video card */}
          <article className="wcu-bento-card group relative isolate flex min-h-[26rem] overflow-hidden rounded-[1.4rem] will-change-transform sm:col-span-2 sm:min-h-[30rem] lg:col-span-2 lg:row-span-2 lg:min-h-0">
            <video
              aria-hidden
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/cover1.jpg"
              className="wcu-video  pointer-events-none absolute inset-0 size-full object-cover"
            >
              <source src="/lab-tour.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-x-0 bottom-0 h-full backdrop-blur-sm bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex w-full flex-col p-5 sm:p-6">
              <span className="wcu-pop inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.75rem] text-white/85 backdrop-blur-sm">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
                </span>
                Cohort in session now
              </span>

              <div className="mt-auto flex items-end justify-between gap-4 sm:gap-5">
                <div className="max-w-[19rem]">
                  <h3 className="wcu-line mb-2 text-xl tracking-[-0.02em] text-white">
                    Step inside the lab
                  </h3>
                  <p className="wcu-line med-font text-sm leading-normal text-white/75">
                    No stock footage — this is Kubwa on a Tuesday afternoon.
                    See the machines, the mentors, and the people at them.
                  </p>
                </div>
                <a
                  href="#enroll"
                  aria-label="Book a visit"
                  className="wcu-pop inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors hover:bg-white/90 sm:size-12"
                >
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-6" />
                </a>
              </div>
            </div>
          </article>

          {/* Mentors card */}
          <article className="wcu-bento-card group relative isolate flex min-h-[14rem] overflow-hidden rounded-[1.4rem] bg-black will-change-transform sm:col-span-2 lg:col-span-2 lg:row-span-1 lg:min-h-0">
            <div className="relative z-10 flex w-full flex-col p-5 sm:p-6">
              <span className="wcu-line med-font text-[0.75rem] tracking-[0.14em] text-white/60">
                40+ Mentors
              </span>
              <div className="mt-auto flex items-end justify-between gap-4 pt-8 sm:gap-5">
                <div className="max-w-[24rem]">
                  <h3 className="wcu-line mb-2 text-xl tracking-[-0.02em] text-white">
                    Expert mentors
                  </h3>
                  <p className="wcu-line med-font text-sm leading-normal text-white/75">
                    Working engineers and designers sit with you, not a forum
                    thread. Office hours, four days a week.
                  </p>
                </div>
                <a
                  href="#enroll"
                  aria-label="Expert mentors"
                  className="wcu-pop inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors hover:bg-white/90 sm:size-12"
                >
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:size-6" />
                </a>
              </div>
            </div>
          </article>

          {/* Free internet */}
          <article className="wcu-bento-card flex min-h-[13rem] flex-col justify-between rounded-[1.4rem] bg-surface p-5 will-change-transform sm:p-6 lg:min-h-0">
            <div className="wcu-pop grid size-11 place-items-center rounded-full bg-foreground">
              <Wifi className="size-5 text-background" />
            </div>
            <div>
              <h3 className="wcu-line med-font mb-1 mt-8 text-lg tracking-[-0.02em] text-foreground">
                Free internet
              </h3>
              <p className="wcu-line med-font text-sm leading-normal text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </article>

          {/* Flexible hours */}
          <article className="wcu-bento-card flex min-h-[13rem] flex-col justify-between rounded-[1.4rem] bg-surface p-5 will-change-transform sm:p-6 lg:min-h-0">
            <div className="wcu-pop grid size-11 place-items-center rounded-full bg-foreground">
              <Zap className="size-5 text-background" />
            </div>
            <div>
              <h3 className="wcu-line med-font mb-1 mt-8 text-lg tracking-[-0.02em] text-foreground">
                Flexible hours
              </h3>
              <p className="wcu-line med-font text-sm leading-normal text-muted-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              </p>
            </div>
          </article>
        </div>

        {/* Trust row: 2x2 on mobile, 4 across on desktop */}
        <div className="wcu-trust-row mt-3 grid grid-cols-2 gap-3 lg:mt-4 lg:grid-cols-4 lg:gap-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="wcu-trust-card flex min-h-[9.5rem] flex-col justify-between rounded-[1.4rem] bg-surface p-4 will-change-transform sm:min-h-[11rem] sm:p-6"
            >
              <Icon
                className="wcu-pop size-7 text-foreground sm:size-8"
                strokeWidth={1.75}
              />
              <h3 className="wcu-line med-font mt-6 text-base leading-snug !tracking-[-0.05em] text-foreground sm:text-2xl">
                {label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}