export type LessonType = "video" | "reading" | "quiz";

export type Lesson = {
  id: string;
  title: string;
  /** "12:04" for videos, "6 min" for readings, "5 questions" for quizzes */
  duration: string;
  type: LessonType;
  summary: string;
  videoUrl?: string;
  locked?: boolean;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Resource = {
  id: string;
  name: string;
  size: string;
  href: string;
};

export type Course = {
  slug: string;
  title: string;
  instructor: { name: string; role: string; initials: string };
  outcomes: string[];
  resources: Resource[];
  modules: Module[];
  /** Lesson ids this student has already finished (comes from your progress table) */
  completedLessonIds: string[];
};

// Placeholder video so the player works out of the box. Replace with your
// own hosted / signed URLs (Mux, Cloudflare Stream, S3, etc).
const SAMPLE_VIDEO =
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

export const COURSE: Course = {
  slug: "ai-prompt-engineering",
  title: "AI Prompt Engineering",
  instructor: { name: "Amaka Obi", role: "Lead instructor", initials: "AO" },
  outcomes: [
    "Write prompts that get a usable answer on the first or second try",
    "Give models examples, context and roles so they stop guessing",
    "Break hard tasks into steps a model can follow",
    "Build reusable prompt templates for your daily work",
    "Check outputs for mistakes before you rely on them",
    "Finish with a portfolio project you can show an employer",
  ],
  resources: [
    { id: "r1", name: "Prompting cheat sheet.pdf", size: "1.2 MB", href: "#" },
    { id: "r2", name: "Week 1 workbook.pdf", size: "3.4 MB", href: "#" },
    { id: "r3", name: "Prompt templates.zip", size: "820 KB", href: "#" },
  ],
  completedLessonIds: ["w1-l1", "w1-l2"],
  modules: [
    {
      id: "w1",
      title: "Week 1: Foundations",
      lessons: [
        {
          id: "w1-l1",
          title: "Welcome to the course",
          duration: "3:12",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary:
            "What the next four weeks look like, how to use the workbook, and how to get help from your mentor.",
        },
        {
          id: "w1-l2",
          title: "How a model reads your prompt",
          duration: "11:40",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary:
            "Tokens, context windows and why the same question can get two very different answers.",
        },
        {
          id: "w1-l3",
          title: "The parts of a good prompt",
          duration: "14:05",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary:
            "Task, context, format and constraints. We rebuild a weak prompt piece by piece and compare the results.",
        },
        {
          id: "w1-l4",
          title: "Prompting cheat sheet",
          duration: "6 min",
          type: "reading",
          summary: "A one-page reference you can keep open while you work through the rest of the course.",
        },
        {
          id: "w1-l5",
          title: "Foundations quiz",
          duration: "5 questions",
          type: "quiz",
          summary: "Check what stuck from week one before moving on to techniques.",
        },
      ],
    },
    {
      id: "w2",
      title: "Week 2: Techniques",
      lessons: [
        {
          id: "w2-l1",
          title: "Teaching by example",
          duration: "9:48",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary: "Few-shot prompting: how many examples to give and how to choose them.",
        },
        {
          id: "w2-l2",
          title: "Making the model show its work",
          duration: "13:22",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary: "Step-by-step reasoning prompts and when they help or hurt.",
        },
        {
          id: "w2-l3",
          title: "Roles, tone and context",
          duration: "10:15",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary: "Set who the model is writing as, and who it is writing for.",
        },
        {
          id: "w2-l4",
          title: "Techniques quiz",
          duration: "6 questions",
          type: "quiz",
          summary: "Pick the right technique for six real prompting problems.",
        },
      ],
    },
    {
      id: "w3",
      title: "Week 3: Workflows",
      lessons: [
        {
          id: "w3-l1",
          title: "Reusable prompt templates",
          duration: "12:30",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary: "Turn a prompt that worked once into a template your whole team can use.",
        },
        {
          id: "w3-l2",
          title: "Prompting for spreadsheets and data",
          duration: "15:10",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary: "Clean, summarise and explain data without pasting it all into the chat.",
        },
        {
          id: "w3-l3",
          title: "Connecting prompts to tools",
          duration: "16:45",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          summary: "Chain prompts together and hand results to other apps.",
        },
      ],
    },
    {
      id: "w4",
      title: "Week 4: Capstone",
      lessons: [
        {
          id: "w4-l1",
          title: "Capstone brief",
          duration: "4:20",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          locked: true,
          summary: "What you are building, how it is graded, and what to hand in.",
        },
        {
          id: "w4-l2",
          title: "Build your portfolio project",
          duration: "22:00",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          locked: true,
          summary: "A guided build from a blank page to a working project.",
        },
        {
          id: "w4-l3",
          title: "Review and next steps",
          duration: "6:30",
          type: "video",
          videoUrl: SAMPLE_VIDEO,
          locked: true,
          summary: "Get feedback on your project and choose your next course.",
        },
      ],
    },
  ],
};
