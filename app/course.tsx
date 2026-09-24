"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  FileSpreadsheet,
  Palette,
  Network,
  Sparkles,
  BarChart3,
  Video,
} from "lucide-react";

import babayaga from "../app/assets/images/arcadia-arcadia.png";

import html5 from "../app/assets/icons/html5.svg";
import css from "../app/assets/icons/css.svg";
import javascript from "../app/assets/icons/javascript.svg";
import java from "../app/assets/icons/java.svg";
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

type Course = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  rating: string;
  icon: React.ReactNode;
  iconBg: string;
  tools: { src: any; name: string }[];
};

const COURSES: Course[] = [
  {
    slug: "programming",
    title: "Programming",
    description:
      "Learn Python, Java, C++, and core programming concepts from basics to advanced algorithms and data structures.",
    duration: "10 weeks",
    rating: "4.9",
    icon: <Code2 className="size-6 text-blue-600" />,
    iconBg: "bg-blue-100",
    tools: [
      { src: html5, name: "HTML5" },
      { src: css, name: "CSS" },
      { src: javascript, name: "JavaScript" },
            { src: python, name: "Python" },
      { src: java, name: "Java" },

    ],
  },
  {
    slug: "microsoft-office-suite",
    title: "Microsoft Office Suite",
    description:
      "Master Word, Excel, PowerPoint, Outlook and become proficient in essential business productivity tools.",
    duration: "4 weeks",
    rating: "4.7",
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
    icon: <Video className="size-6 text-orange-600" />,
    iconBg: "bg-orange-100",
    tools: [],
  },
];

export default function CoursesGrid() {
  return (
    <section id="courses" className="mx-auto w-full px-3 sm:px-6 pt-8 md:px-10">
      <div className="mx-auto max-w-[1320px]">
        <div className="animate-fade-up text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Our courses
          </span>
          <h2 className="mx-auto mt-6 max-w-[24ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground">
            Pick a path.
            <br />
            <span className="text-muted-foreground ">Show up and start building.</span>
          </h2>
          <p className="max-w-2xl m-auto med-font mt-3 text-muted-foreground ">
            Eight programs, taught in person by people who work in the
            field — not read off a slide. Small cohorts, real machines,
            and a mentor who actually knows your name by week two.
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {COURSES.map((item, index) => (
            <CourseCard
              key={index}
              category={item.slug}
              title={item.title}
              description={item.description}
              duration={item.duration}
              rating={item.rating}
              mentor={item.slug}
              tools={item.tools}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function CourseArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="size-4"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

function CourseCard({
  category,
  title,
  description,
  mentor,
  startDate,
  duration,
  tools,
}: {
  category: string;
  title: string;
  description: string;
  mentor: string;
  startDate?: string;
  duration: string;
  tools: { src: any; name: string }[];
}) {
  const visible = tools.slice(0, 4);
  const extra = tools.length - visible.length;

  return (
    <a
      href="#enroll"
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm transition-colors "
    >
      <div className="relative h-30 overflow-hidden">
        <Image
          className="absolute inset-0 z-10 size-full object-cover opacity-70"
          src="/cover2.jpg"
          width={500}
          height={500}  
          alt={title}
        />
        <span className="absolute left-3 top-3 z-20 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-medium text-foreground/70 backdrop-blur-sm">
          {category}
        </span>
        <span className="absolute bottom-3 right-3 z-20 grid size-8 place-items-center rounded-full bg-background text-foreground opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:opacity-100">
          <CourseArrowIcon />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        {/* Tool stack — clean chip row, not overlapping avatars */}
        {tools.length > 0 && (
          <div className="mb-3 flex items-center gap-1.5">
            {visible.map((tool) => (
              <div
                key={tool.name}
                title={tool.name}
                className="grid size-7 place-items-center rounded-md  bg-background p-1.5 shadow-sm"
              >
                <Image
                  src={tool.src}
                  alt={tool.name}
                  className="size-full object-contain"
                />
              </div>
            ))}
            {extra > 0 && (
              <span className="grid size-7 place-items-center rounded-md border border-border bg-foreground/10 text-[10px] font-medium text-muted">
                +{extra}
              </span>
            )}
          </div>
        )}

        <h3 className="line-clamp-2 text-[16px] tracking-[-0.04em] leading-snug text-foreground">
          {title}
        </h3>
        <p className=" mb-3 med-font mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
        <div className="med-font mt-auto flex items-center gap-2 border-t border-border pt-4 text-[12px] text-muted-foreground">
          <span className="text-foreground">{mentor}</span>
          <span aria-hidden>·</span>
          <span>Starts {startDate ?? "soon"}</span>
          <span aria-hidden className="ml-auto">
            {duration}
          </span>
        </div>
      </div>
    </a>
  );
}