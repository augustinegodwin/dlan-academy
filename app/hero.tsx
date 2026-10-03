"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })
        .from(
          ".hero-title",
          {
            opacity: 0,
            y: 35,
            duration: 1,
          },
          "-=0.5"
        )
        .from(
          ".hero-desc",
          {
            opacity: 0,
            y: 25,
            duration: 0.9,
          },
          "-=0.6"
        )
        .from(
          ".hero-btn",
          {
            opacity: 0,
            y: 20,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.5"
        );
    },
    { scope: heroRef }
  );

  return (
    <section ref={heroRef} className="relative z-10 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto flex min-h-[84vh] max-w-[1920px] flex-col overflow-hidden rounded-[28px]">
        {/* fallback gradient */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#3a3b3d_0%,#6b6c6e_55%,#b9bab9_100%)]"
        />

        {/* video background */}
        <video
          aria-hidden
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/cover3.jpg"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
        >
          <source src="/hero-video.webm" type="video/webm" />
          <source src="/bgmd.mp4" type="video/mp4" />
        </video>

        {/* top-down gradient */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-transparent"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pt-28 sm:px-8 sm:pt-36">
          <div className="hero-badge hidden sm:flex">
            <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-white/15 px-3.5 py-2 text-sm med-font text-white/80 backdrop-blur-md">
              Enrolling now — limited seats per cohort
            </span>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div className="hero-title">
              <h1 className="text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                <span className="text-white/55">Learn real skills.</span>
                <br />
                <span className="text-white">In one cohort.</span>
              </h1>
            </div>

            <div className="hero-desc">
              <p className="max-w-[44ch] text-[1.0625rem] leading-[1.5] text-white/80">
                A <span className="text-white tracking-[-0.03em]">physical lab in Kubwa</span>.
                Sign up, show up, and the mentors and machines you need{" "}
                <span className="text-white">are right there</span> — no
                video course to abandon in week two.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href="#enroll"
                  className="hero-btn inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-full bg-white px-4 text-[0.875rem] font-medium text-neutral-950 transition-colors hover:bg-white/90 sm:w-auto"
                >
                  Book a Visit
                </a>
                <a
                  href="/courses"
                  className="hero-btn inline-flex h-9 w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 text-[0.875rem] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto"
                >
                  What are the courses
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}