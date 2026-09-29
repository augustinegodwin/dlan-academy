"use client";

import { useRef } from "react";
import Image from "next/image";
import { Wifi, Zap, ArrowUpRight, BadgeCheck, Globe, Smartphone, HouseHeart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".wcu-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".wcu-heading",
          start: "top 90%",
        },
      });

      gsap.from(".wcu-bento-card", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".wcu-bento-grid",
          start: "top 90%",
        },
      });

      gsap.from(".wcu-trust-card", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".wcu-trust-row",
          start: "top 90%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="offer"
      className="w-full overflow-hidden bg-background px-4 py-20 text-foreground sm:px-6 sm:py-24 lg:px-8 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1320px]">

        <div className="wcu-heading text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Why choose us
          </span>
          <h2 className="mx-auto mt-6 max-w-[24ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground">
            Tell us what you're building,
            <br />
            <span className="text-muted-foreground-foreground">we'll take it from there.</span>
          </h2>
        </div>

        <div className="wcu-bento-grid mt-14 grid grid-cols-1 gap-3 lg:mt-20 lg:grid-cols-4 lg:auto-rows-[220px] lg:gap-4">
          <article className="wcu-bento-card group relative isolate flex overflow-hidden rounded-[1.4rem] lg:col-span-2 lg:row-span-2">
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
                  <p className="med-font text-sm leading-normal text-white/75">
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

          <article className="wcu-bento-card group relative isolate bg-black flex overflow-hidden rounded-[1.4rem] lg:col-span-2 lg:row-span-1">
            {/* <Image
              src="/cover4.jpg"
              alt=""
              fill
              className="scale-[1.08] object-cover transition-transform duration-500 group-hover:scale-[1.14]"
            /> */}
           
            <div className="relative z-10 flex w-full flex-col p-5 sm:p-6">
              <span className="med-font text-[0.75rem]  tracking-[0.14em] text-white/60">
                40+ Mentors
              </span>
              <div className="mt-auto flex items-end justify-between gap-5">
                <div className="max-w-[24rem]">
                  <h3 className="mb-2 text-xl tracking-[-0.02em] text-white">
                    Expert mentors
                  </h3>
                  <p className="med-font text-sm leading-normal text-white/75">
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

          <article className="wcu-bento-card flex flex-col justify-between rounded-[1.4rem] bg-surface p-5 sm:p-6">
            <div className="grid size-11 place-items-center rounded-full bg-foreground">
              <Wifi className="size-5 text-background" />
            </div>
            <div>
              <h3 className="mb-1 mt-8 med-font text-lg tracking-[-0.02em] text-foreground">
                Free internet
              </h3>
              <p className="med-font text-sm  leading-normal text-muted-foreground">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              </p>
            </div>
          </article>

          <article className="wcu-bento-card flex flex-col justify-between rounded-[1.4rem] bg-surface p-5 sm:p-6">
            <div className="grid size-11 place-items-center rounded-full bg-foreground">
              <Zap className="size-5 text-background" />
            </div>
            <div>
              <h3 className="mb-1 mt-8 med-font text-lg tracking-[-0.02em] text-foreground">
                Flexible hours
              </h3>
              <p className="med-font text-sm leading-normal text-muted-foreground">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
              </p>
            </div>
          </article>
        </div>

        <div className="wcu-trust-row mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {[
            { icon: Globe, label: "Build a Real Website" },
            { icon: Smartphone, label: "Build a Mobile App" },
            { icon: BadgeCheck, label: "Certificate on Completion" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="wcu-trust-card flex flex-col justify-between rounded-[1.4rem] bg-surface p-6 min-h-[11rem]"
              >
                <Icon className="size-8 text-foreground" strokeWidth={1.75} />
                <h3 className="mt-6 text-lg med-font sm:text-2xl leading-snug !tracking-[-0.06em] text-foreground">
                  {item.label}
                </h3>
              </div>
            );
          })}

          <div className="wcu-trust-card relative flex flex-col justify-between overflow-hidden rounded-[1.4rem] bg-surface p-6 min-h-[11rem]">
            <HouseHeart  className="size-8 text-foreground" strokeWidth={1.75} />
            <h3 className="relative z-10 med-font text-xl sm:text-2xl leading-snug !tracking-[-0.06em] text-foreground">
              Physical Lab Abuja
            </h3>
            
          </div>
        </div>
      </div>
    </section>
  );
}