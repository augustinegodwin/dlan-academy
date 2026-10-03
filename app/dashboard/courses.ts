import { BarChart3, Code2, FileSpreadsheet, Megaphone, Network, Palette, Sparkles, Video } from "lucide-react";
import type { ReactNode } from "react";

// TODO: point these at wherever your tool logos live
import html5 from "@/assets/tools/html5.png";
import css from "@/assets/tools/css.png";
import javascript from "@/assets/tools/javascript.png";
import python from "@/assets/tools/python.png";
import java from "@/assets/tools/java.png";
import word from "@/assets/tools/word.png";
import excel from "@/assets/tools/excel.png";
import powerpoint from "@/assets/tools/powerpoint.png";
import outlook from "@/assets/tools/outlook.png";
import photoshop from "@/assets/tools/photoshop.png";
import coreldraw from "@/assets/tools/coreldraw.png";
import canva from "@/assets/tools/canva.png";
import chatgpt from "@/assets/tools/chatgpt.png";
import claude from "@/assets/tools/claude.png";
import tableau from "@/assets/tools/tableau.png";
import powerbi from "@/assets/tools/powerbi.png";

export type Course = {
  slug: string;
  category: string;
  title: string;
  description: string;
  mentor: string;
  duration: string;
  rating: string;
  icon: ReactNode;
  iconBg: string;
  tools: { src: any; name: string }[];
};

export const COURSES: Course[] = [
  {
    slug: "programming",
    category: "Coding",
    mentor: "Chioma Eze",
    title: "Programming",
    description: "Learn Python, Java, C++, and core programming concepts from basics to advanced algorithms and data structures.",
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
    category: "Productivity",
    mentor: "Tunde Bello",
    title: "Microsoft Office Suite",
    description: "Master Word, Excel, PowerPoint, Outlook and become proficient in essential business productivity tools.",
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
    category: "Design",
    mentor: "Sola Martins",
    title: "Graphics Design",
    description: "Create stunning visuals with Photoshop, CorelDraw, and Canva. Learn logo design, branding, and UI/UX principles.",
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
    category: "IT",
    mentor: "Emeka Okafor",
    title: "Computer Networking",
    description: "Understand network protocols, infrastructure, routing, switching, and prepare for CCNA certification.",
    duration: "12 weeks",
    rating: "4.7",
    icon: <Network className="size-6 text-indigo-600" />,
    iconBg: "bg-indigo-100",
    tools: [],
  },
  {
    slug: "ai-prompt-engineering",
    category: "AI",
    mentor: "Amaka Obi",
    title: "AI Prompt Engineering",
    description: "Master the art of crafting effective prompts for ChatGPT, Claude, and other AI tools to maximize productivity.",
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
    category: "Data",
    mentor: "Ngozi Umeh",
    title: "Data Analysis",
    description: "Learn Excel, SQL, Python, and data visualization with Tableau and Power BI to extract insights from data.",
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
    category: "Business",
    mentor: "Ife Adams",
    title: "YouTube Automation",
    description: "Build profitable YouTube channels using automation tools, content strategies, and monetization techniques.",
    duration: "4 weeks",
    rating: "4.7",
    icon: <Video className="size-6 text-orange-600" />,
    iconBg: "bg-orange-100",
    tools: [],
  },
  {
    slug: "digital-marketing",
    category: "Marketing",
    mentor: "Bisi Alade",
    title: "Digital Marketing",
    description: "Learn strategies and techniques for promoting products and services online, including social media, email, and search engine marketing.",
    duration: "8 weeks",
    rating: "4.7",
    icon: <Megaphone className="size-6 text-orange-600" />,
    iconBg: "bg-orange-100",
    tools: [],
  },
];

/**
 * What THIS student is enrolled in. Comes from your database later.
 * A slug that isn't in here means "not enrolled".
 */
export const ENROLLMENTS: Record<string, { progress: number; nextLesson: string }> = {
  programming: { progress: 35, nextLesson: "Loops and conditions" },
  "microsoft-office-suite": { progress: 80, nextLesson: "Building a PowerPoint deck" },
  "ai-prompt-engineering": { progress: 13, nextLesson: "The parts of a good prompt" },
};

export const isEnrolled = (slug: string) => slug in ENROLLMENTS;