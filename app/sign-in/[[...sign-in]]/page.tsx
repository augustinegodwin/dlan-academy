"use client";


import { useState } from "react";
import SignInSection from "../../signInsection";
import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  // Placeholder mark — swap for Google's official multi-color "G" SVG
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <text x="10" y="14" textAnchor="middle" fontSize="11" fontWeight="700" fill="currentColor">
        G
      </text>
    </svg>
  );
}

export default function LoginPage() {
  const [showOptions, setShowOptions] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main className="h-dvh bg-background p-1">
      <div className="relative h-full flex flex-col overflow-hidden gap-1 sm:min-h-full lg:flex-row">
        {/* left: photo + testimonial — stays hardcoded dark/white on purpose,
            it needs fixed contrast over the photo regardless of page theme */}
        <section className="relative hidden w-full overflow-hidden  rounded-[28px] lg:block lg:w-1/2">
          <Image src={"/cover3.jpg"} alt="" fill className="object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

          <LogoMark className="absolute left-8 top-8 size-6 text-white/90" />

          <div className="absolute inset-x-0 bottom-16 px-12">
            <blockquote className="max-w-md text-xl leading-relaxed text-white/60">
              Signed up for the AI Prompt Engineering track not knowing what
              to expect —{" "}
              <span className="text-white">
                left with a portfolio project I actually use at work.
              </span>
            </blockquote>
            <p className="mt-4 text-sm text-white/40">
              Ada Okafor, Programming Grad
            </p>
          </div>
        </section>

       <section className="flex w-full flex-1 overflow-y-auto rounded-[28px] bg-surface">
  {/* my-auto centers when there's room, scrolls cleanly when there isn't */}
  <div className="mx-auto my-auto flex w-full flex-col items-stretch gap-4 px-6 py-8 sm:max-w-[420px]">
    <Image
      src="/firebase.png"
      alt="Dlan Academy"
      width={100}
      height={100}
      className="size-14 shrink-0 self-center"
    />

    <div>
      <h1 className="text-balance text-center text-2xl font-[stack-sans-bold] tracking-tight text-foreground sm:text-3xl">
        Welcome back to Dlan
      </h1>
      <p className="med-font mt-1 text-center text-sm text-muted-foreground">
        Sign in to access your dashboard and active courses.
      </p>
    </div>

    <div className="flex w-full justify-center">
      <SignIn
        routing="path"
        path="/sign-in"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: "w-full",
            // let focus rings breathe instead of being clipped
            cardBox: "w-full !shadow-none !border-0 !overflow-visible !bg-surface",
            card: "w-full !gap-4 !p-0 !shadow-none !bg-surface",
            main: "!gap-4",

            header: "hidden",
            headerTitle: "hidden",
            headerSubtitle: "hidden",

            socialButtons: "!gap-2",
            socialButtonsBlockButton:
              "!h-10 w-full rounded-full border border-border bg-background text-sm font-medium text-foreground hover:bg-foreground/[0.04] transition",
            socialButtonsBlockButtonText: "font-medium text-sm",

            dividerRow: "!my-0",
            dividerLine: "bg-border h-px",
            dividerText: "text-xs text-muted-foreground uppercase px-2",

            form: "!gap-3",
            formFieldRow: "!m-0",
            formField: "!gap-1",
            formFieldLabel: "text-xs font-medium text-foreground",
            formFieldInput:
              "!h-11 w-full rounded-2xl !border-0 bg-foreground/[0.04] px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground focus-visible:!ring-2 focus-visible:!ring-foreground focus-visible:!ring-offset-0",

            formButtonPrimary:
              "!h-10 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90 transition !mt-1 !shadow-none",

            footer: "!bg-none !bg-transparent",
            footerAction: "!m-0 !p-0",
            footerActionLink: "text-foreground font-medium underline",
            footerActionText: "text-muted-foreground text-xs",
            identityPreviewText: "text-foreground",
            formResendCodeLink: "text-foreground underline",
          },
        }}
      />
    </div>

    <p className="med-font text-center text-xs text-muted-foreground">
      By continuing, you agree to Dlan Academy&apos;s{" "}
      <a href="/terms" className="underline">Terms of Service</a> and{" "}
      <a href="/privacy" className="underline">Privacy Policy</a>.
    </p>
  </div>
</section>
      </div>
    </main>
  );
}