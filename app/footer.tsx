"use client";

import { useRef } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import googleMeetIcon from "../app/assets/icons/google-meet-2026.svg";
import whatsappIcon from "../app/assets/icons/whatsapp.svg";
import gmailIcon from "../app/assets/icons/gmail-2026.svg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Action = {
  label: string;
  href: string;
  icon: { kind: "image"; src: any; alt: string } | { kind: "lucide"; Icon: React.ElementType };
};

export default function ContactSection() {
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

          const cards = gsap.utils.toArray<HTMLElement>(".ct-card");

          /* ---------- 1. Heading sequence ---------- */
          gsap
            .timeline({
              defaults: { ease: "power3.out" },
              scrollTrigger: {
                trigger: ".ct-head",
                start: "top 85%",
                once: true,
              },
            })
            .from(".ct-badge", { opacity: 0, y: 14, scale: 0.9, duration: 0.7 })
            .from(
              ".ct-headline",
              { yPercent: 110, duration: 1, stagger: 0.12 },
              "-=0.4"
            );

          /* ---------- 2. Cards: staggered scroll entry ---------- */
          const yStart = desktop ? 70 : 44;
          const tiltKick = desktop ? 4 : 2.5;

          gsap.set(cards, {
            opacity: 0,
            y: yStart,
            scale: 0.94,
            rotate: (i) => (i % 2 === 0 ? -tiltKick : tiltKick),
            transformOrigin: "50% 100%",
          });

          const innerOf = (card: Element) =>
            Array.from(card.querySelectorAll(".ct-pop, .ct-line, .ct-btn"));

          gsap.set(cards.flatMap(innerOf), { opacity: 0 });

          ScrollTrigger.batch(cards, {
            start: desktop ? "top 88%" : "top 92%",
            once: true,
            interval: 0.1,
            batchMax: desktop ? 5 : 2,
            onEnter: (batch) => {
              // Reading order (row, then column) so the stagger feels natural
              const ordered = [...batch].sort((a, b) => {
                const ra = a.getBoundingClientRect();
                const rb = b.getBoundingClientRect();
                return Math.abs(ra.top - rb.top) > 20
                  ? ra.top - rb.top
                  : ra.left - rb.left;
              }) as HTMLElement[];

              gsap.to(ordered, {
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                duration: 1.1,
                ease: "power3.out",
                stagger: 0.14,
                overwrite: true,
              });

              ordered.forEach((card, i) => {
                const delay = 0.25 + i * 0.14;
                const tl = gsap.timeline({
                  delay,
                  defaults: { ease: "power3.out" },
                });

                const img = card.querySelector(".ct-img");
                if (img) {
                  // Photo card: slow zoom-out as it lands
                  gsap.fromTo(
                    img,
                    { scale: 1.25 },
                    { scale: 1, duration: 1.8, ease: "power3.out", delay: delay - 0.2 }
                  );
                }

                const pop = card.querySelectorAll(".ct-pop");
                const lines = card.querySelectorAll(".ct-line");
                const btn = card.querySelectorAll(".ct-btn");

                if (pop.length) {
                  tl.fromTo(
                    pop,
                    { opacity: 0, scale: 0, rotate: -20 },
                    { opacity: 1, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(2.2)" }
                  );
                }
                if (lines.length) {
                  tl.fromTo(
                    lines,
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.09 },
                    pop.length ? "-=0.35" : 0
                  );
                }
                if (btn.length) {
                  tl.fromTo(
                    btn,
                    { opacity: 0, y: 12, scale: 0.92 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.6)" },
                    "-=0.4"
                  );
                }
              });
            },
          });

          /* ---------- 3. Hover (mouse devices only) ---------- */
          const cleanups: Array<() => void> = [];

          if (canHover) {
            cards.forEach((card) => {
              const enter = () =>
                gsap.to(card, {
                  y: -6,
                  scale: 1.012,
                  duration: 0.45,
                  ease: "power3.out",
                  overwrite: "auto",
                });
              const leave = () =>
                gsap.to(card, {
                  y: 0,
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
      id="contact"
      className="relative overflow-hidden "
    >
      <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 sm:py-20 md:px-10">
        {/* intro */}
        <div className="ct-head text-center">
          <span className="ct-badge inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Get in touch
          </span>
          <h2 className="mx-auto mt-5 max-w-[24ch] text-balance text-[clamp(2rem,6.5vw,3.25rem)] font-[stack-sans-bold] leading-[1.05] tracking-[-0.06em] text-foreground sm:mt-6">
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="ct-headline block">Tell us what you want to learn,</span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span className="ct-headline block text-muted-foreground">
                we&apos;ll take it from there.
              </span>
            </span>
          </h2>
        </div>

        {/* card grid — image / call+whatsapp / google-meet+email */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:gap-4 lg:h-[34rem] lg:grid-cols-3 lg:grid-rows-2">
          {/* image card — tall, left */}
          <div className="ct-card relative min-h-[18rem] overflow-hidden rounded-[28px] will-change-transform sm:min-h-[22rem] lg:min-h-0 lg:[grid-column:1] lg:[grid-row:1/3]">
            <Image
              src="/cover3.jpg"
              alt="Inside the DLAN Academy lab"
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="ct-img object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
              <p className="ct-line max-w-[16rem] text-xl leading-snug tracking-[-0.02em] text-white">
                See the lab before you commit.
              </p>
            </div>
          </div>

          {/* call */}
          <ContactCard
            className="lg:[grid-column:2] lg:[grid-row:1]"
            title="Prefer to talk it through?"
            description="Call the front desk and we'll walk you through courses, pricing, and start dates."
            action={{
              label: "Call us",
              href: "tel:+2340000000000",
              icon: { kind: "lucide", Icon: Phone },
            }}
          />

          {/* whatsapp */}
          <ContactCard
            className="lg:[grid-column:2] lg:[grid-row:2]"
            title="Quick question?"
            description="Message us on WhatsApp — a real person replies, usually within the hour."
            action={{
              label: "Chat on WhatsApp",
              href: "https://wa.me/2340000000000",
              icon: { kind: "image", src: whatsappIcon, alt: "WhatsApp" },
            }}
          />

          {/* google meet */}
          <ContactCard
            className="lg:[grid-column:3] lg:[grid-row:1]"
            title="Want a live walkthrough?"
            description="Book a short Google Meet with admissions before you enroll."
            action={{
              label: "Book a Google Meet",
              href: "#",
              icon: { kind: "image", src: googleMeetIcon, alt: "Google Meet" },
            }}
          />

          {/* email */}
          <ContactCard
            className="lg:[grid-column:3] lg:[grid-row:2]"
            title="Rather write it out?"
            description="Send us the details and we'll get back to you within a day."
            action={{
              label: "Email us",
              href: "mailto:hello@dlanacademy.com",
              icon: { kind: "image", src: gmailIcon, alt: "Gmail" },
            }}
          />
        </div>
      </div>
    </section>
  );
}

function IconBadge({ action }: { action: Action }) {
  return (
    <div className="ct-pop grid size-11 place-items-center rounded-xl bg-background shadow-sm">
      {action.icon.kind === "image" ? (
        <Image src={action.icon.src} alt={action.icon.alt} className="size-6" />
      ) : (
        <action.icon.Icon className="size-5 text-foreground" strokeWidth={1.75} />
      )}
    </div>
  );
}

function ContactCard({
  title,
  description,
  action,
  className = "",
}: {
  title: string;
  description: string;
  action: Action;
  className?: string;
}) {
  return (
    <div
      className={`ct-card flex flex-col justify-between rounded-[28px] bg-surface p-5 will-change-transform sm:p-7 ${className}`}
    >
      <div>
        <IconBadge action={action} />
        <h3 className="ct-line mt-5 text-xl leading-snug tracking-[-0.02em] text-foreground">
          {title}
        </h3>
        <p className="ct-line med-font mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <a
        href={action.href}
        className="ct-btn mt-6 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-full bg-foreground px-5 text-[0.875rem] font-medium text-background transition-opacity hover:opacity-90 sm:h-10 sm:px-4"
      >
        {action.label}
        {action.icon.kind === "image" ? (
          <Image src={action.icon.src} alt="" className="size-4" />
        ) : (
          <action.icon.Icon className="size-4" />
        )}
      </a>
    </div>
  );
}