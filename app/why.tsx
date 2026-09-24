import Image from "next/image";
import { Wifi, GraduationCap, Zap, ArrowUpRight, Layers, BadgeCheck, Globe, Smartphone } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section id="offer" className="w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-[1320px]">

        <div className="animate-fade-up text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Why choose us
          </span>
          <h2 className="mx-auto mt-6 max-w-[24ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground">
            Tell us what you're building,
            <br />
            <span className="text-muted-foreground">we'll take it from there.</span>
          </h2>
        </div>

        {/* bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-3 lg:mt-20 lg:grid-cols-4 lg:auto-rows-[220px] lg:gap-4">
          {/* A — video, tall left. Kept dark/white — scrim over video needs fixed contrast regardless of site theme. */}
          <article className="group relative isolate flex overflow-hidden rounded-[1.4rem] lg:col-span-2 lg:row-span-2">
            <video
              aria-hidden
              autoPlay
              muted
              loop
              playsInline
              poster="/cover1.jpg"
              className="pointer-events-none absolute inset-0 size-full object-cover"
            >
              <source src="/lab-tour.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex w-full flex-col p-5 sm:p-6">
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[0.75rem] text-white/85 backdrop-blur-sm">
                Cohort in session now
              </span>

              <div className="mt-auto flex items-end justify-between gap-5">
                <div className="max-w-[19rem]">
                  <h3 className="mb-2 text-xl tracking-[-0.02em] text-white">
                    Step inside the lab
                  </h3>
                  <p className="med-font text-sm leading-6 text-white/75">
                    No stock footage — this is Kubwa on a Tuesday afternoon.
                    See the machines, the mentors, and the people at them.
                  </p>
                </div>
                <a
                  href="#enroll"
                  aria-label="Book a visit"
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors hover:bg-white/90"
                >
                  <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </article>

          {/* B — mentors, wide top right. Same reasoning — image + scrim needs fixed white text. */}
          <article className="group relative isolate flex overflow-hidden rounded-[1.4rem] lg:col-span-2 lg:row-span-1">
            <Image
              src="/cover4.jpg"
              alt=""
              fill
              className="scale-[1.08] object-cover transition-transform duration-500 group-hover:scale-[1.14]"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            <div className="relative z-10 flex w-full flex-col p-5 sm:p-6">
              <span className="text-[0.75rem] uppercase tracking-[0.14em] text-white/60">
                40+ mentors
              </span>
              <div className="mt-auto flex items-end justify-between gap-5">
                <div className="max-w-[24rem]">
                  <h3 className="mb-2 text-xl tracking-[-0.02em] text-white">
                    Expert mentors
                  </h3>
                  <p className="med-font text-sm leading-6 text-white/75">
                    Working engineers and designers sit with you, not a
                    forum thread. Office hours, four days a week.
                  </p>
                </div>
                <a
                  href="#enroll"
                  aria-label="Expert mentors"
                  className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-neutral-900 transition-colors hover:bg-white/90"
                >
                  <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </article>

          {/* C — free internet, small */}
          <article className="flex flex-col justify-between rounded-[1.4rem] bg-surface p-5 sm:p-6">
            <div className="grid size-11 place-items-center rounded-full bg-foreground">
              <Wifi className="size-5 text-background" />
            </div>
            <div>
              <h3 className="mb-1 mt-4 text-lg tracking-[-0.02em] text-foreground">
                Free internet
              </h3>
              <p className="med-font text-sm leading-6 text-muted">
                1 Gbps shared, no throttling, no login screen.
              </p>
            </div>
          </article>

          {/* D — flexible learning, small */}
          <article className="flex flex-col justify-between rounded-[1.4rem] bg-surface p-5 sm:p-6">
            <div className="grid size-11 place-items-center rounded-full bg-foreground">
              <Zap className="size-5 text-background" />
            </div>
            <div>
              <h3 className="mb-1 text-lg tracking-[-0.02em] text-foreground">
                Flexible hours
              </h3>
              <p className="med-font text-sm leading-6 text-muted">
                Lab access 24/7 — come in before work, stay after.
              </p>
            </div>
          </article>
        </div>

        {/* trust row — four standalone cards, last one carries a visual */}
        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {[
            { icon: Globe, label: "Build a Real Website" },
            { icon: Smartphone, label: "Build a Mobile App" },
            { icon: BadgeCheck, label: "Certificate on Completion" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col justify-between rounded-[1.4rem] bg-surface p-6 min-h-[11rem]"
              >
                <Icon className="size-8 text-foreground" strokeWidth={1.75} />
                <h3 className="mt-6 text-xl sm:text-2xl leading-snug tracking-[-0.04em] text-foreground">
                  {item.label}
                </h3>
              </div>
            );
          })}

          {/* fourth card — the one physical lab, carries the photo */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-[1.4rem] bg-surface p-6 min-h-[11rem]">
            <h3 className="relative z-10 max-w-[9rem] text-2xl leading-snug tracking-[-0.02em] text-foreground">
              One Physical Lab in Kubwa
            </h3>
            <div className="absolute -bottom-6 -right-6 size-32 overflow-hidden rounded-2xl opacity-90">
              <Image src="/arcadia-arcadia.png" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}