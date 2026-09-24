import Image from "next/image";
import { Phone } from "lucide-react";

import googleMeetIcon from "../app/assets/icons/google-meet-2026.svg";
import whatsappIcon from "../app/assets/icons/whatsapp.svg";
import gmailIcon from "../app/assets/icons/gmail-2026.svg";

type Action = {
  label: string;
  href: string;
  icon: { kind: "image"; src: any; alt: string } | { kind: "lucide"; Icon: React.ElementType };
};

export default function ContactSection() {
  return (
    <section id="contact" className="relative px-3 py-24 sm:px-4 sm:py-32">
      <div className="mx-auto max-w-[1320px]">
        {/* intro */}
        <div className="animate-fade-up text-center">
          <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
            Get in touch
          </span>
          <h2 className="mx-auto mt-6 max-w-[24ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground">
            Tell us what you want to learn,
            <br />
            <span className="text-muted-foreground">we&apos;ll take it from there.</span>
          </h2>
        </div>

        {/* card grid — image / call+whatsapp / google-meet+email, matches the wireframe */}
        <div className="animate-fade-up mt-14 grid grid-cols-1 gap-4 lg:h-[34rem] lg:grid-cols-3 lg:grid-rows-2">
          {/* image card — tall, left */}
          <div className="relative min-h-[16rem] overflow-hidden rounded-[28px] lg:min-h-0 lg:[grid-column:1] lg:[grid-row:1/3]">
            <Image
              src="/cover3.jpg"
              alt="Inside the DLAN Academy lab"
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="max-w-[16rem] text-xl leading-snug tracking-[-0.02em] text-white">
                See the lab before you commit.
              </p>
            </div>
          </div>

          {/* call */}
          <ContactCard
            className="lg:[grid-column:2] lg:[grid-row:1]"
            title="Prefer to talk it through?"
            description="Call the front desk and we'll walk you through courses, pricing, and start dates."
            action={{
              label: "Call us",
              href: "tel:+2340000000000",
              icon: { kind: "lucide", Icon: Phone },
            }}
          />

          {/* whatsapp */}
          <ContactCard
            className="lg:[grid-column:2] lg:[grid-row:2]"
            title="Quick question?"
            description="Message us on WhatsApp — a real person replies, usually within the hour."
            action={{
              label: "Chat on WhatsApp",
              href: "https://wa.me/2340000000000",
              icon: { kind: "image", src: whatsappIcon, alt: "WhatsApp" },
            }}
          />

          {/* google meet */}
          <ContactCard
            className="lg:[grid-column:3] lg:[grid-row:1]"
            title="Want a live walkthrough?"
            description="Book a short Google Meet with admissions before you enroll."
            action={{
              label: "Book a Google Meet",
              href: "#",
              icon: { kind: "image", src: googleMeetIcon, alt: "Google Meet" },
            }}
          />

          {/* email */}
          <ContactCard
            className="lg:[grid-column:3] lg:[grid-row:2]"
            title="Rather write it out?"
            description="Send us the details and we'll get back to you within a day."
            action={{
              label: "Email us",
              href: "mailto:hello@dlanacademy.com",
              icon: { kind: "image", src: gmailIcon, alt: "Gmail" },
            }}
          />
        </div>
      </div>
    </section>
  );
}

function IconBadge({ action }: { action: Action }) {
  return (
    <div className="grid size-11 place-items-center rounded-xl bg-background shadow-sm">
      {action.icon.kind === "image" ? (
        <Image src={action.icon.src} alt={action.icon.alt} className="size-6" />
      ) : (
        <action.icon.Icon className="size-5 text-foreground" strokeWidth={1.75} />
      )}
    </div>
  );
}

function ContactCard({
  title,
  description,
  action,
  className = "",
}: {
  title: string;
  description: string;
  action: Action;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-[28px]  border-border bg-surface p-6 sm:p-7 ${className}`}
    >
      <div>
        <IconBadge action={action} />
        <h3 className="mt-5 text-xl leading-snug tracking-[-0.02em] text-foreground">
          {title}
        </h3>
        <p className="med-font mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
      <a
        href={action.href}
        className="mt-6 inline-flex h-10 w-fit items-center justify-center gap-2 rounded-full bg-foreground px-4 text-[0.875rem] font-medium text-background transition-colors hover:opacity-90"
      >
        {action.label}
        {action.icon.kind === "image" ? (
          <Image src={action.icon.src} alt="" className="size-4" />
        ) : (
          <action.icon.Icon className="size-4" />
        )}
      </a>
    </div>
  );
}