"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Code2,
  FileSpreadsheet,
  Palette,
  Network,
  Sparkles,
  BarChart3,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import html5 from "../app/assets/icons/html5.svg";
import css from "../app/assets/icons/css.svg";
import javascript from "../app/assets/icons/javascript.svg";
import python from "../app/assets/icons/python.svg";
import word from "../app/assets/icons/microsoft-word (1).svg";
import excel from "../app/assets/icons/microsoft-excel (1).svg";
import powerpoint from "../app/assets/icons/microsoft-powerpoint.svg";
import outlook from "../app/assets/icons/microsoft-outlook.svg";
import photoshop from "../app/assets/icons/photoshop.svg";
import coreldraw from "../app/assets/icons/coreldraw.svg";
import canva from "../app/assets/icons/canva.svg";
import claude from "../app/assets/icons/claude-ai.svg";
import chatgpt from "../app/assets/icons/openai-chatgpt (1).svg";
import tableau from "../app/assets/icons/tableau.svg";
import powerbi from "../app/assets/icons/microsoft-power-bi.svg";
import CourseCard from "./course-card";

type Course = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  rating: string;
  /** Price per month in naira (whole number). Use 0 for free. */
  price: number;
  /** How many months the track runs. */
  months: number;
  icon: React.ReactNode;
  iconBg: string;
  tools: { src: any; name: string }[];
};

const COURSES: Course[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Learn Python, Java, C++, and core programming concepts from basics to advanced algorithms and data structures.",
    duration: "10 weeks",
    rating: "4.9",
    price: 22000,
    months: 3,
    icon: <Code2 className="size-6 text-blue-600" />,
    iconBg: "bg-blue-100",
    tools: [
      { src: html5, name: "HTML5" },
      { src: css, name: "CSS" },
      { src: javascript, name: "JavaScript" },
    ],
  },
  {
    slug: "microsoft-office-suite",
    title: "Microsoft Office Suite",
    description:
      "Master Word, Excel, PowerPoint, Outlook and become proficient in essential business productivity tools.",
    duration: "4 weeks",
    rating: "4.7",
    price: 20000,
    months: 1,
    icon: <FileSpreadsheet className="size-6 text-emerald-600" />,
    iconBg: "bg-emerald-100",
    tools: [
      { src: word, name: "Word" },
      { src: excel, name: "Excel" },
      { src: powerpoint, name: "PowerPoint" },
      { src: outlook, name: "Outlook" },
    ],
  },
  {
    slug: "graphics-design",
    title: "Graphics Design",
    description:
      "Create stunning visuals with Photoshop, CorelDraw, and Canva. Learn logo design, branding, and UI/UX principles.",
    duration: "8 weeks",
    rating: "4.8",
    price: 33000,
    months: 2,
    icon: <Palette className="size-6 text-purple-600" />,
    iconBg: "bg-purple-100",
    tools: [
      { src: photoshop, name: "Photoshop" },
      { src: coreldraw, name: "CorelDraw" },
      { src: canva, name: "Canva" },
    ],
  },
  {
    slug: "computer-networking",
    title: "Computer Networking",
    description:
      "Understand network protocols, infrastructure, routing, switching, and prepare for CCNA certification.",
    duration: "12 weeks",
    rating: "4.7",
    price: 27000,
    months: 3,
    icon: <Network className="size-6 text-indigo-600" />,
    iconBg: "bg-indigo-100",
    tools: [],
  },
  {
    slug: "ai-prompt-engineering",
    title: "AI Prompt Engineering",
    description:
      "Master the art of crafting effective prompts for ChatGPT, Claude, and other AI tools to maximize productivity.",
    duration: "4 weeks",
    rating: "4.9",
    price: 35000,
    months: 1,
    icon: <Sparkles className="size-6 text-white" />,
    iconBg: "bg-gradient-to-br from-cyan-400 to-rose-300",
    tools: [
      { src: chatgpt, name: "ChatGPT" },
      { src: claude, name: "Claude" },
    ],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    description:
      "Learn Excel, SQL, Python, and data visualization with Tableau and Power BI to extract insights from data.",
    duration: "12 weeks",
    rating: "4.8",
    price: 25000,
    months: 3,
    icon: <BarChart3 className="size-6 text-rose-600" />,
    iconBg: "bg-rose-100",
    tools: [
      { src: excel, name: "Excel" },
      { src: python, name: "Python" },
      { src: tableau, name: "Tableau" },
      { src: powerbi, name: "Power BI" },
    ],
  },
  {
    slug: "youtube-automation",
    title: "YouTube Automation",
    description:
      "Build profitable YouTube channels using automation tools, content strategies, and monetization techniques.",
    duration: "4 weeks",
    rating: "4.7",
    price: 30000,
    months: 1,
    icon: <Video className="size-6 text-orange-600" />,
    iconBg: "bg-orange-100",
    tools: [],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Learn strategies and techniques for promoting products and services online, including social media, email, and search engine marketing.",
    duration: "8 weeks",
    rating: "4.7",
    price: 25000,
    months: 2,
    icon: <Video className="size-6 text-orange-600" />,
    iconBg: "bg-orange-100",
    tools: [],
  },
];

export default function CoursesGrid() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  /** Distance between the start of one card and the next (card width + gap). */
  const getStep = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || el.children.length < 2) return 0;
    const a = el.children[0] as HTMLElement;
    const b = el.children[1] as HTMLElement;
    return b.offsetLeft - a.offsetLeft;
  }, []);

  const syncState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const atStart = el.scrollLeft <= 4;
    const atEnd = el.scrollLeft >= maxScroll - 4;

    setCanPrev(!atStart);
    setCanNext(!atEnd);

    const step = getStep();
    if (!step) return;
    const index = atEnd
      ? COURSES.length - 1
      : Math.min(COURSES.length - 1, Math.round(el.scrollLeft / step));
    setActive(index);
  }, [getStep]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncState();
    el.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);
    return () => {
      el.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  const scrollByStep = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * getStep(), behavior: "smooth" });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: index * getStep(), behavior: "smooth" });
  };

  return (
    <section id="courses" className="relative w-full overflow-visible py-8">
      {/* Header */}
      <div className="mx-auto max-w-[1320px] px-3 sm:px-6 md:px-10">
        <div className="animate-fade-up text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Our courses
          </span>
          <h2 className="mx-auto mt-6 max-w-[24ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground font-[stack-sans-bold]">
            Pick a path.
            <br />
            <span className="text-muted-foreground">
              Show up and start building.
            </span>
          </h2>
          <p className="med-font m-auto mt-3 max-w-2xl text-muted-foreground">
            Seven programs, taught in person by people who work in the field —
            not read off a slide. Small cohorts, real machines, and a mentor
            who actually knows your name by week two.
          </p>
        </div>
      </div>

      {/* Carousel */}
      <div className="mx-auto mt-14 max-w-[1320px] px-3 sm:px-6 md:px-10">
        {/* -mx / px: cards bleed to the screen edge but the first card still
            lines up with the header.
            -my / py: gives shadows, hover lifts and focus rings room, because
            overflow-x-auto forces overflow-y to clip too. */}
        <div
          ref={scrollerRef}
          className="
            relative -mx-3 -my-6 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain
            px-3 py-6 scroll-pl-3
            sm:-mx-6 sm:px-6 sm:scroll-pl-6
            md:-mx-10 md:px-10 md:scroll-pl-10
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
          role="region"
          aria-roledescription="carousel"
          aria-label="Courses"
        >
          {COURSES.map((item) => (
            <div
              key={item.slug}
              className="w-[78vw] shrink-0 snap-start sm:w-[45vw] md:w-[340px] lg:w-[320px]"
            >
              <CourseCard
                category={item.slug}
                title={item.title}
                description={item.description}
                duration={item.duration}
                mentor={item.slug}
                tools={item.tools}
                price={item.price}
                months={item.months}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {COURSES.map((item, i) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to ${item.title}`}
                aria-current={i === active}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-6 bg-foreground"
                    : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
              aria-label="Previous course"
              className="grid size-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:bg-foreground/[0.04] active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
              aria-label="Next course"
              className="grid size-10 place-items-center rounded-full bg-foreground text-background transition hover:bg-foreground/90 active:scale-95 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}