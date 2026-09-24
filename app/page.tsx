import { Feather, GraduationCap, Star, Wifi } from "lucide-react";
import AboutReveal from "./AboutReveal";
import FAQSection from "./faq";
import babayaga from "../app/assets/images/arcadia-arcadia.png"
import CoursesGrid from "./course";
import WhyChooseUs from "./why";
import Testimonials from "./testimony";
import ContactSection from "./footer";
import Footer from "./ftsection";

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      {/* ---------- NAV — fixed, floats over the hero card ---------- */}
      <nav className="fixed inset-x-0 top-0 z-30 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 md:px-10">
        <a href="#hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh" className="rounded-full title-font bg-background px-5 py-1.5 text-sm tracking-tight ring-1 ring-border backdrop-blur-md">
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
            href="#enroll"
            className="rounded-full med-font bg-foreground px-5 py-1.5 text-sm text-background transition hover:opacity-90"
          >
            Enroll
          </a>
        </div>
      </nav>

      {/* ---------- HERO — inset rounded video card, matches the captured markup ---------- */}
      {/* Intentionally kept on a fixed dark palette (white text over video/gradient) — 
          this section needs contrast against footage regardless of the site's theme. */}
      <section className="relative z-10 px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative mx-auto flex min-h-[84vh] max-w-[1920px] flex-col overflow-hidden rounded-[28px]">
          {/* fallback gradient, shows while/if the video doesn't load */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#3a3b3d_0%,#6b6c6e_55%,#b9bab9_100%)]"
          />

          {/* video background — drop your own files at these two paths.
              Poster shows immediately; falls back gracefully if the video is missing. */}
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

          {/* top-down gradient — just enough to hold the badge/headline legible */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/55 via-black/25 to-transparent"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pt-28 sm:px-8 sm:pt-36">
            <div className="hidden animate-fade-up sm:flex">
              <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-white/15 px-3.5 py-2 text-sm med-font  text-white/80 backdrop-blur-md">
                Enrolling now — limited seats per cohort
              </span>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div
                className="animate-fade-up"
                style={{ animationDelay: "80ms" }}
              >
                <h1 className="text-balance text-[clamp(2.5rem,5vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
                  <span className="text-white/55">Learn real skills.</span>
                  <br />
                  <span className="text-white">In one cohort.</span>
                </h1>
              </div>

              <div
                className="animate-fade-up"
                style={{ animationDelay: "160ms" }}
              >
                <p className="max-w-[44ch] text-[1.0625rem]  leading-[1.5] text-white/80">
                  A <span className="text-white tracking-[-0.03em]">physical lab in Kubwa</span>.
                  Sign up, show up, and the mentors and machines you need{" "}
                  <span className="text-white">are right there</span> — no
                  video course to abandon in week two.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href="#enroll"
                    className="inline-flex h-9 w-full cursor-pointer items-center justify-center rounded-full bg-white px-4 text-[0.875rem] font-medium text-neutral-950 transition-colors hover:bg-white/90 sm:w-auto"
                  >
                    Book a Visit
                  </a>
                  <a
                    href="#courses"
                    className="inline-flex h-9 w-full items-center justify-center rounded-full border border-white/30 bg-white/10 px-4 text-[0.875rem] font-medium text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:w-auto"
                  >
                    What are the courses
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
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