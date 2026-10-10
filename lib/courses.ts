import html5 from "@/app/assets/icons/html5.svg";
import css from "@/app/assets/icons/css.svg";
import javascript from "@/app/assets/icons/javascript.svg";
import java from "@/app/assets/icons/java.svg";
import python from "@/app/assets/icons/python.svg";
import word from "@/app/assets/icons/microsoft-word (1).svg";
import excel from "@/app/assets/icons/microsoft-excel (1).svg";
import powerpoint from "@/app/assets/icons/microsoft-powerpoint.svg";
import photoshop from "@/app/assets/icons/photoshop.svg";
import coreldraw from "@/app/assets/icons/coreldraw.svg";
import canva from "@/app/assets/icons/canva.svg";
import claudeIcon from "@/app/assets/icons/claude-ai.svg";
import chatgpt from "@/app/assets/icons/openai-chatgpt (1).svg";
import tableau from "@/app/assets/icons/tableau.svg";
import powerbi from "@/app/assets/icons/microsoft-power-bi.svg";

export type Tool = { src: any; name: string };

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  tools: Tool[];
};

export type CourseCategory = {
  slug: string;
  title: string;
  description: string;
  duration: string;
  /** Price per month in naira for the full course. */
  price: number;
  /** How many months the full course runs. */
  months: number;
  courses: Course[];
};

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    slug: "programming",
    title: "Programming",
    description:
      "Learn Python, Java, C++, and core programming concepts from basics to advanced algorithms and data structures.",
    duration: "10 weeks",
    price: 25000,
    months: 3,
    courses: [
      {
        id: "prog-1",
        title: "Python for Beginners",
        description: "Variables, loops, functions and your first real scripts.",
        duration: "3 weeks",
        level: "Beginner",
        instructor: "Chidi Okonkwo",
        tools: [{ src: python, name: "Python" }],
      },
      {
        id: "prog-2",
        title: "JavaScript Essentials",
        description: "The language behind every website, from syntax to the DOM.",
        duration: "3 weeks",
        level: "Beginner",
        instructor: "Chidi Okonkwo",
        tools: [
          { src: javascript, name: "JavaScript" },
          { src: html5, name: "HTML5" },
          { src: css, name: "CSS" },
        ],
      },
      {
        id: "prog-3",
        title: "Data Structures & Algorithms",
        description: "Arrays, trees, graphs, and how to reason about time and space.",
        duration: "4 weeks",
        level: "Intermediate",
        instructor: "Chidi Okonkwo",
        tools: [
          { src: python, name: "Python" },
          { src: java, name: "Java" },
        ],
      },
      {
        id: "prog-4",
        title: "Object-Oriented Java",
        description: "Classes, interfaces, and building larger programs that don't fall over.",
        duration: "3 weeks",
        level: "Intermediate",
        instructor: "Chidi Okonkwo",
        tools: [{ src: java, name: "Java" }],
      },
    ],
  },
  {
    slug: "microsoft-office-suite",
    title: "Microsoft Office Suite",
    description:
      "Master Word, Excel, PowerPoint, Outlook and become proficient in essential business productivity tools.",
    duration: "4 weeks",
    price: 24000,
    months: 1,
    courses: [
      {
        id: "office-1",
        title: "Excel from Scratch",
        description: "Formulas, pivot tables, and charts that actually make sense.",
        duration: "1 week",
        level: "Beginner",
        instructor: "Ngozi Adeyemi",
        tools: [{ src: excel, name: "Excel" }],
      },
      {
        id: "office-2",
        title: "Word for Reports & Proposals",
        description: "Styles, templates, and documents that look professionally done.",
        duration: "1 week",
        level: "Beginner",
        instructor: "Ngozi Adeyemi",
        tools: [{ src: word, name: "Word" }],
      },
      {
        id: "office-3",
        title: "PowerPoint that Doesn't Bore",
        description: "Slide design, transitions, and presenting with confidence.",
        duration: "1 week",
        level: "Beginner",
        instructor: "Ngozi Adeyemi",
        tools: [{ src: powerpoint, name: "PowerPoint" }],
      },
    ],
  },
  {
    slug: "graphics-design",
    title: "Graphics Design",
    description:
      "Create stunning visuals with Photoshop, CorelDraw, and Canva. Learn logo design, branding, and UI/UX principles.",
    duration: "8 weeks",
    price: 38000,
    months: 2,
    courses: [
      {
        id: "design-1",
        title: "Photoshop Fundamentals",
        description: "Layers, masks, and retouching without destroying the original.",
        duration: "2 weeks",
        level: "Beginner",
        instructor: "Lara Hassan",
        tools: [{ src: photoshop, name: "Photoshop" }],
      },
      {
        id: "design-2",
        title: "Brand Identity Design",
        description: "Logos, colour systems and guidelines clients actually follow.",
        duration: "3 weeks",
        level: "Intermediate",
        instructor: "Lara Hassan",
        tools: [
          { src: photoshop, name: "Photoshop" },
          { src: coreldraw, name: "CorelDraw" },
          { src: canva, name: "Canva" },
        ],
      },
      {
        id: "design-3",
        title: "UI/UX Foundations",
        description: "Wireframes, user flows, and designing interfaces people enjoy.",
        duration: "3 weeks",
        level: "Intermediate",
        instructor: "Lara Hassan",
        tools: [{ src: canva, name: "Canva" }],
      },
    ],
  },
  {
    slug: "computer-networking",
    title: "Computer Networking",
    description:
      "Understand network protocols, infrastructure, routing, switching, and prepare for CCNA certification.",
    duration: "12 weeks",
    price: 30000,
    months: 3,
    courses: [
      {
        id: "net-1",
        title: "Networking Fundamentals",
        description: "IP addressing, the OSI model, and how packets actually travel.",
        duration: "4 weeks",
        level: "Beginner",
        instructor: "Emeka Johnson",
        tools: [],
      },
      {
        id: "net-2",
        title: "Routing & Switching",
        description: "Configure real routers and switches, the CCNA way.",
        duration: "4 weeks",
        level: "Intermediate",
        instructor: "Emeka Johnson",
        tools: [],
      },
      {
        id: "net-3",
        title: "Network Security Basics",
        description: "Firewalls, VPNs, and closing the doors attackers look for first.",
        duration: "4 weeks",
        level: "Advanced",
        instructor: "Emeka Johnson",
        tools: [],
      },
    ],
  },
  {
    slug: "ai-prompt-engineering",
    title: "AI Prompt Engineering",
    description:
      "Master the art of crafting effective prompts for ChatGPT, Claude, and other AI tools to maximize productivity.",
    duration: "4 weeks",
    price: 40000,
    months: 1,
    courses: [
      {
        id: "ai-1",
        title: "Prompting Foundations",
        description: "How a model reads your prompt, and why similar ones get different answers.",
        duration: "1 week",
        level: "Beginner",
        instructor: "Amaka Obi",
        tools: [
          { src: chatgpt, name: "ChatGPT" },
          { src: claudeIcon, name: "Claude" },
        ],
      },
      {
        id: "ai-2",
        title: "Advanced Prompting Techniques",
        description: "Few-shot examples, reasoning chains, and reusable templates.",
        duration: "1 week",
        level: "Intermediate",
        instructor: "Amaka Obi",
        tools: [
          { src: chatgpt, name: "ChatGPT" },
          { src: claudeIcon, name: "Claude" },
        ],
      },
      {
        id: "ai-3",
        title: "Prompting for Data & Workflows",
        description: "Connect prompts to spreadsheets, documents and other tools.",
        duration: "2 weeks",
        level: "Intermediate",
        instructor: "Amaka Obi",
        tools: [
          { src: chatgpt, name: "ChatGPT" },
          { src: claudeIcon, name: "Claude" },
          { src: excel, name: "Excel" },
        ],
      },
    ],
  },
  {
    slug: "data-analysis",
    title: "Data Analysis",
    description:
      "Learn Excel, SQL, Python, and data visualization with Tableau and Power BI to extract insights from data.",
    duration: "12 weeks",
    price: 30000,
    months: 3,
    courses: [
      {
        id: "data-1",
        title: "SQL for Analysts",
        description: "Query real databases and answer questions with confidence.",
        duration: "3 weeks",
        level: "Beginner",
        instructor: "Femi Alabi",
        tools: [],
      },
      {
        id: "data-2",
        title: "Python for Data Analysis",
        description: "Pandas, NumPy, and cleaning data that's never actually clean.",
        duration: "4 weeks",
        level: "Intermediate",
        instructor: "Femi Alabi",
        tools: [{ src: python, name: "Python" }],
      },
      {
        id: "data-3",
        title: "Dashboards with Tableau",
        description: "Turn a spreadsheet into something a manager wants to read.",
        duration: "3 weeks",
        level: "Intermediate",
        instructor: "Femi Alabi",
        tools: [{ src: tableau, name: "Tableau" }],
      },
      {
        id: "data-4",
        title: "Power BI in Practice",
        description: "Build and share reports your whole team can plug into.",
        duration: "2 weeks",
        level: "Intermediate",
        instructor: "Femi Alabi",
        tools: [{ src: powerbi, name: "Power BI" }],
      },
    ],
  },
  {
    slug: "youtube-automation",
    title: "YouTube Automation",
    description:
      "Build profitable YouTube channels using automation tools, content strategies, and monetization techniques.",
    duration: "4 weeks",
    price: 35000,
    months: 1,
    courses: [
      {
        id: "yt-1",
        title: "Channel Strategy & Niche",
        description: "Pick a niche people search for, and plan a channel around it.",
        duration: "1 week",
        level: "Beginner",
        instructor: "Kelechi Nwosu",
        tools: [],
      },
      {
        id: "yt-2",
        title: "Faceless Video Production",
        description: "Scripting, voiceover and editing without showing your face.",
        duration: "2 weeks",
        level: "Intermediate",
        instructor: "Kelechi Nwosu",
        tools: [],
      },
      {
        id: "yt-3",
        title: "Monetization & Scaling",
        description: "Ad revenue, sponsorships, and outsourcing the repeatable parts.",
        duration: "1 week",
        level: "Advanced",
        instructor: "Kelechi Nwosu",
        tools: [],
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Learn strategies and techniques for promoting products and services online, including social media, email, and search engine marketing.",
    duration: "8 weeks",
    price: 30000,
    months: 2,
    courses: [
      {
        id: "mkt-1",
        title: "Social Media Marketing",
        description: "Content calendars, organic growth, and reading the numbers.",
        duration: "2 weeks",
        level: "Beginner",
        instructor: "Zainab Yusuf",
        tools: [{ src: canva, name: "Canva" }],
      },
      {
        id: "mkt-2",
        title: "SEO Fundamentals",
        description: "Get found on Google without paying for every single click.",
        duration: "2 weeks",
        level: "Beginner",
        instructor: "Zainab Yusuf",
        tools: [],
      },
      {
        id: "mkt-3",
        title: "Email Marketing that Converts",
        description: "Sequences, segmentation, and subject lines people actually open.",
        duration: "2 weeks",
        level: "Intermediate",
        instructor: "Zainab Yusuf",
        tools: [],
      },
      {
        id: "mkt-4",
        title: "Paid Ads Across Platforms",
        description: "Meta, Google and TikTok ads, budgeted and measured properly.",
        duration: "2 weeks",
        level: "Advanced",
        instructor: "Zainab Yusuf",
        tools: [],
      },
    ],
  },
];

export function getStartingPrice(category: CourseCategory): number {
  return category.price;
}