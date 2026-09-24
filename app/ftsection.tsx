"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Footer: same inset rounded-card pattern as the hero — a photo
 * background inside a rounded-[28px] card with margin around it,
 * top+bottom vignettes for text legibility, a giant faint "DLAN
 * ACADEMY" watermark bleeding off the bottom edge, a centered CTA
 * block with a word-by-word reveal heading (same GSAP technique as
 * AboutReveal), and a bottom row with brand, nav links, and copyright.
 *
 * The outer <footer> background is bg-background (not bg-black) so
 * the gutter around the rounded card matches the page — same trick
 * the hero section uses. Everything inside the rounded card stays
 * hardcoded white-on-dark since it sits on a photo, not the page bg.
 */

const HEADING_LINE_1 = ["Build","real","tech", "skills"];
const HEADING_LINE_2 = ["worth", "having."];

function ArrowUpRightIcon() {
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
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function Footer() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = headingRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          gsap.set(words, { opacity: 1, filter: "blur(0px)", y: 0 });
          return;
        }

        gsap.set(words, { opacity: 0, filter: "blur(6px)", y: 14 });
        gsap.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <footer className="relative w-full bg-background px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
      <div className="relative mx-auto flex max-w-[1920px] flex-col overflow-hidden rounded-[28px]">
     
        {/* background photo — drop your own file at this path */}
        <Image
          src="/cover4.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none brightness-50   absolute opacity-90 inset-0 z-10 object-cover"
        />

        {/* top vignette — keeps the badge/heading legible */}
        {/* <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black/70 via-black/30 to-transparent"
        /> */}
        {/* bottom vignette — keeps the nav row/copyright legible */}
        {/* <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/25 to-transparent"
        /> */}

       {/* giant watermark, bleeding off the bottom edge */}
<div
  aria-hidden
  className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex select-none items-end justify-center overflow-hidden"
  style={{
    maskImage: "linear-gradient(to top, white 10%, transparent)",
    WebkitMaskImage: "linear-gradient(to top, white 10%, transparent)",
  }}
>
  <span className="translate-y-[30%] z-10 whitespace-nowrap text-[16vw] font-semibold leading-none text-white/25">
    DLAN ACADEMY
  </span>
</div>

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-4 pb-10 pt-10 sm:px-8 sm:pt-20">
          <div className="flex flex-col items-center text-center">

            <h2
              ref={headingRef}
              className="mt-6 max-w-3xl text-balance text-4xl tracking-[-0.06em] font-[stack-sans-bold] leading-[1.05] text-white sm:text-6xl"
            >
              <span className="block">
                {HEADING_LINE_1.map((word, i) => (
                  <span key={word} data-word className="inline-block">
                    {word}
                    {i < HEADING_LINE_1.length - 1 && (
                      <span className="inline-block w-[0.25em]">&nbsp;</span>
                    )}
                  </span>
                ))}
              </span>
              <span className="block">
                {HEADING_LINE_2.map((word, i) => (
                  <span key={word} data-word className="inline-block">
                    {word}
                    {i < HEADING_LINE_2.length - 1 && (
                      <span className="inline-block w-[0.25em]">&nbsp;</span>
                    )}
                  </span>
                ))}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-pretty !tracking-[-0.04em]  text-sm leading-7 med-font text-white/80 sm:text-base">
              Hands-on tech training in Kubwa, Abuja. Start with a free
              walk-through, enroll when you&apos;re ready.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                            <a

                href="#enroll"
                className="inline-flex h-9 items-center justify-center med-font gap-2 rounded-full bg-white px-7 text-base font-medium text-neutral-950 transition-colors hover:bg-white/90"
              >
                Enroll now
              </a>
                            <a

                href="#courses"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-base med-font  text-white backdrop-blur-md transition-colors hover:bg-white/20"
              >
                Browse courses
                <ArrowUpRightIcon />
              </a>
            </div>
          </div>

          <div className="mt-28 flex flex-col items-center gap-5 sm:mt-40 sm:flex-row sm:justify-between med-font">
            <span className="order-2 text-sm text-white sm:order-1 ">
              DLAN Academy
            </span>
            <nav className="order-1 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:order-2">
                            <a

                href="#courses"
                className="text-sm text-white/70 outline-none transition-colors hover:text-white"
              >
                Courses
              </a>
                            <a

                href="#about"
                className="text-sm text-white/70 outline-none transition-colors hover:text-white"
              >
                About
              </a>
              <a
                href="#faq"
                className="text-sm text-white/70 outline-none transition-colors hover:text-white"
              >
                FAQ
              </a>
                            <a
                href="#enroll"
                className="text-sm text-white/70 outline-none transition-colors hover:text-white"
              >
                Contact
              </a>
            </nav>
            <p className="order-3 text-sm text-white">
              © 2026 DLAN Academy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}