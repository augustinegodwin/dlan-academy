import { Mail } from "lucide-react";

const testimonials = [
  {
    name: "Maya Chen",
    role: "Web Development Grad",
    course: "WEB DEVELOPMENT",
    quote:
      "Landed my first dev role two weeks after graduating. The mentor feedback on my final project changed how I write code.",
    rotate: -1.2,
  },
  {
    name: "Marcus Strom",
    role: "Cyber Security Grad",
    course: "CYBER SECURITY",
    quote:
      "The flexible schedule saved me. I studied nights around a full-time job and never fell behind the cohort.",
    rotate: 0.8,
  },
  {
    name: "Sara Lindqvist",
    role: "Data Analyst Grad",
    course: "DATA ANALYST",
    quote:
      "My mentor had actually shipped the things she was teaching. That real-world context is what made it click.",
    rotate: -0.6,
  },
  {
    name: "Tom Becker",
    role: "Microsoft Office Specialist Grad",
    course: "MICROSOFT OFFICE SPECIALIST",
    quote:
      "Unlimited connectivity meant I never lost a live session, even studying from three different countries.",
    rotate: 1.1,
  },
  {
    name: "Liam O'Brien",
    role: "Web Development Grad",
    course: "WEB DEVELOPMENT",
    quote:
      "Went from zero to building full apps in twelve weeks. The pacing let me go faster once I found my rhythm.",
    rotate: -0.9,
  },
  {
    name: "Diego Santos",
    role: "Data Analyst Grad",
    course: "DATA ANALYST",
    quote:
      "Feels like the curriculum was built by people who've actually launched products, not just taught theory.",
    rotate: 0.6,
  },
] as const;

function Testimonials() {
  return (
    <section id="reviews" className="w-full px-4 py-20 sm:px-8">
      <div className="mx-auto w-full max-w-[1320px]">

        <div className="animate-fade-up text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Reviews
          </span>
         <h2 className="mx-auto mt-6 max-w-[26ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground">
    Real people, real cohorts,
    <br />
    <span className="text-muted-foreground">real results.</span>
  </h2>
  <p className="text-muted-foreground max-w-3xl m-auto med-font mt-3">
    Every course is taught in person, so these aren't reviews of a video
    library — they're from people who sat in the Kubwa lab, worked
    through the same projects you will, and came out the other side
    with a portfolio and, in most cases, a job.
  </p>
        </div>

        <div className="mt-20 grid grid-cols-1 items-start gap-x-6 gap-y-5 sm:gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="relative rounded-2xl  bg-surface p-5"
              style={{ transform: `rotate(${t.rotate}deg)` }}
            >
              <p className="med-font text-[10px] text-muted-foreground tracking-[-0.02em]">
                COURSE <span className="ml-1 text-foreground">{t.course}</span>
              </p>

              <blockquote className="mt-7 text-foreground text-xl leading-6">
                {t.quote}
              </blockquote>

              <figcaption className="mt-5 flex items-end justify-between border-border border-t border-dashed pt-3">
                <div>
                  <p className="text-base text-foreground">{t.name}</p>
                  <p className="mt-0.5 text-muted-foreground text-sm tracking-[-0.03em]">
                    {t.role}
                  </p>
                </div>
                <Mail className="size-3.5 text-muted/50" aria-hidden="true" />
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;