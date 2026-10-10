"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { GraduationCap, Star, Wifi, Feather } from "lucide-react";
import { COURSE_CATEGORIES } from "../../lib/courses";
import CategorySection from "../coursesCategories";
import Footer from "../ftsection";

export default function CoursesPage() {
  const heroRef = useRef<HTMLElement>(null);
  const totalCourses = COURSE_CATEGORIES.reduce((sum, c) => sum + c.courses.length, 0);

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
        );
    },
    { scope: heroRef }
  );

  return (
    <main className="bg-background">
      {/* Navigation */}
      <nav className="fixed inset-x-0 top-0 z-30 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 md:px-10">
        <a href="/" className="rounded-full title-font bg-background px-5 py-1.5 text-sm tracking-tight ring-1 ring-border backdrop-blur-md">
          DLAN ACADEMY
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-white/75 px-1 py-1 text-sm font-medium shadow-sm backdrop-blur-md md:flex">
          <a
            href="/courses"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            
            Home 
          </a>
          <a
            href="/#offer"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            
            Our Offer
          </a>
          <a
            href="/#reviews"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            
            Reviews
          </a>
          <a
            href="/#contact"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            
            Contact
          </a>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden items-center gap-1 rounded-full bg-overlay px-4 py-1.5 text-sm text-foreground/70 ring-1 ring-border backdrop-blur-md sm:flex">
            NG <span aria-hidden>▾</span>
          </div>
          <a
            href="/sign-in"
            className="rounded-full med-font bg-foreground px-5 py-1.5 text-sm text-background transition hover:opacity-90"
          >
            Enroll
          </a>
        </div>
      </nav>

      {/* Hero Section styled consistently with your home hero */}
      <section ref={heroRef} className="relative z-10 px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative mx-auto flex min-h-[50vh] max-w-[1920px] flex-col overflow-hidden rounded-[28px]">
          {/* Fallback gradient / Dark card background */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10  bg-[linear-gradient(180deg,#1a1a1a_0%,#2d2d2d_55%,#111111_100%)]"
          />
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
          {/* Top-down subtle gradient overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 backdrop-blur-lg -z-10 bg-gradient-to-b from-black/90 via-transparent to-black/20"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 py-20 text-center sm:px-8 sm:py-28">
            <div className="hero-badge inline-flex">
              <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-white/15 px-3.5 py-2 text-[0.8125rem] text-white/80 backdrop-blur-md">
                All courses
              </span>
            </div>

            <div className="hero-title">
              <h1 className="mx-auto mt-6 max-w-[22ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] font-[stack-sans-bold] text-white">
                Every path we teach,
                <br />
                <span className="text-white/60">in one place.</span>
              </h1>
            </div>

            <div className="hero-desc">
              <p className="med-font mx-auto mt-4 max-w-2xl text-white/80 text-[1.0625rem]">
                {COURSE_CATEGORIES.length} categories, {totalCourses} courses. Scroll through each
                one — the courses that fit you will be the ones that make you stop.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      {COURSE_CATEGORIES.map((category, i) => (
        <CategorySection
          key={category.slug}
          category={category}
          index={i}
          total={COURSE_CATEGORIES.length}
        />
      ))}
      <Footer />
    </main>
  );
}