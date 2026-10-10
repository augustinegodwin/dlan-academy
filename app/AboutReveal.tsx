"use client";

import { useEffect, useRef } from "react";
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

    const dimColor = "#94a3b8"; // Slate 400 (dimmed text)
    const revealColor = "#0f172a"; // Slate 900 / Deep dark blue (fully revealed text)

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

        gsap.set(words, {
          opacity: 0.3,
          filter: "blur(8px)",
          y: 4,
          color: dimColor,
          willChange: "opacity, filter, transform, color",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "bottom 35%",
            scrub: true,
          },
        });

        tl.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          color: revealColor,
          ease: "none",
          stagger: {
            each: 0.03,
            from: "start",
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section id="story" className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-8">
        <div className="text-center sm:text-left">
          <h2
            ref={paragraphRef}
            className="mx-auto max-w-[1320px] text-3xl font-medium sm:text-4xl md:text-5xl lg:text-6xl leading-[1.3] sm:leading-[1.2] tracking-[-0.04em] sm:tracking-[-0.05em]"
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