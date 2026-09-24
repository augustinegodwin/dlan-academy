"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const WORDS =
  "We provide hands-on tech training at our lab in Kubwa, guiding students of every skill level. From beginner-friendly foundations to real mentorship in small, focused cohorts — built to create the perfect environment for turning curiosity into a real tech career.".split(
    " "
  );

type Conditions = {
  reduced: boolean;
  full: boolean;
};

export default function AboutReveal() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = paragraphRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");

    // Pull the reveal colors from CSS variables so this stays in sync
    // with globals.css instead of hardcoding hex tuned for one theme.
    const rootStyles = getComputedStyle(document.documentElement);
    const dimColor = rootStyles.getPropertyValue("--muted-dim").trim() || "#d4d4d8";
    const revealColor = rootStyles.getPropertyValue("--foreground").trim() || "#0a0a0a";

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as Conditions;

        if (reduced) {
          gsap.set(words, { opacity: 1, filter: "blur(0px)", y: 0, color: revealColor });
          return;
        }

        // light-bg version: dim = faint light-gray, revealed = near-black
        gsap.set(words, {
          opacity: 0.4,
          filter: "blur(10px)",
          y: 6,
          color: dimColor,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 0.4,
          },
        });

        tl.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          color: revealColor,
          ease: "none",
          stagger: {
            each: 0.05,
            from: "start",
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="story" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="text-left">
          <h2
            ref={paragraphRef}
            className="mx-auto max-w-[1320px] text-4xl font-medium leading-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.02] tracking-[-0.06em]"
          >
            {WORDS.map((word, i) => (
              <span key={i} data-word className="inline-block">
                {word}
                {"\u00A0"}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}