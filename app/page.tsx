import { Feather, GraduationCap, Star, Wifi } from "lucide-react";
import AboutReveal from "./AboutReveal";
import FAQSection from "./faq";
import babayaga from "../app/assets/images/arcadia-arcadia.png"
import CoursesGrid from "./course";
import WhyChooseUs from "./why";
import Testimonials from "./testimony";
import ContactSection from "./footer";
import Footer from "./ftsection";
import Hero from "./hero";
  export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* ---------- NAV — fixed, floats over the hero card ---------- */}
      <nav className="fixed inset-x-0 top-0 z-30 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 md:px-10">
        <a href="#" className="rounded-full title-font bg-background px-5 py-1.5 text-sm tracking-tight ring-1 ring-border backdrop-blur-md">
          DLAN ACADEMY
        </a>

        <div className="hidden items-center gap-1 rounded-full bg-white/75
         px-1 py-1 text-sm font-medium shadow-sm backdrop-blur-md md:flex">
          <a
            href="#courses"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            <span aria-hidden className="text-xs">
              <GraduationCap size={20}/>
            </span>
            Courses
          </a>
          <a
            href="#offer"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            <span aria-hidden className="text-xs">
               <Wifi size={20}/>
            </span>
            Our Offer
          </a>
          <a
            href="#reviews"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            <span aria-hidden >
                <Star size={20}/>
            </span>
            Reviews
          </a>
          <a
            href="#contact"
            className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            <span aria-hidden className="text-xs">
                <Feather size={20}/>
            </span>
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

      {/* ---------- HERO — inset rounded video card, matches the captured markup ---------- */}
      {/* Intentionally kept on a fixed dark palette (white text over video/gradient) — 
          this section needs contrast against footage regardless of the site's theme. */}
      <Hero/>
            <AboutReveal/>
                  <CoursesGrid />

      <WhyChooseUs />
      <FAQSection/>
      <Testimonials />
            <ContactSection/>
            <Footer/>
      {/* ---------- SCROLLING TAG MARQUEE ---------- */}
      {/* <div className="mt-16 overflow-hidden border-y border-border py-6">
        <div className="flex w-max animate-marquee gap-4">
          {[...TAGS, ...TAGS].map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className="flex items-center gap-2 whitespace-nowrap rounded-full bg-foreground/5 px-6 py-3 text-sm font-medium ring-1 ring-border"
            >
              <span style={{ color: "var(--accent)" }}>✦</span>
              {tag}
            </span>
          ))}
        </div>
      </div> */}
    </main>
  );
}

const TAGS = [
  "Hands-On Labs",
  "Small Cohorts",
  "Career Ready",
  "In-Person Mentors",
  "Kubwa, Abuja",
];

function CourseCard({
  index,
  title,
  description,
  meta,
}: {
  index: string;
  title: string;
  description: string;
  meta: string;
}) {
  return (
    <div className="flex flex-col rounded-2xl bg-surface p-6 ring-1 ring-border transition hover:ring-foreground/25">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted">{index}</span>
        <a
          href="#enroll"
          aria-label={`Enroll in ${title}`}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10 text-sm ring-1 ring-border transition hover:bg-foreground/20"
        >
          <span style={{ color: "var(--accent)" }}>↗</span>
        </a>
      </div>

      <h3 className="mt-16 text-xl">{title}</h3>
      <p className="mt-3 text-base leading-relaxed med-font text-muted">
        {description}
      </p>
      <p className="mt-6 text-xs text-muted">{meta}</p>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-border">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-3 text-3xl">{value}</p>
    </div>
  );
}