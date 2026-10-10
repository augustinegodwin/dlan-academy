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
    <main className="min-h-screen h-screen bg-background p-1 sm:p-1">
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

        {/* right: form — light-mode tokens, matches the rest of the site */}
       <section className="flex w-full flex-1 justify-center rounded-[28px] bg-surface">
             <div className="flex w-full flex-col items-stretch justify-center gap-6 px-6 py-16 sm:max-w-[420px] sm:gap-8">
               
               {/* Custom Brand Logo matching your previous design */}
               <Image
                 src="/firebase.png"
                 alt="Dlan Academy"
                 width={100}
                 height={100}
                 className="size-16 shrink-0 self-center"
               />
       
               <div>
                 <h1 className="text-center sm:text-3xl text-2xl font-[stack-sans-bold] tracking-tight text-foreground text-balance">
                   Welcome back to Dlan
                 </h1>
                 <p className="text-center med-font text-sm text-muted-foreground">
                   Sign in to access your dashboard and active courses.
                 </p>
               </div>
       
               {/* Clerk's SignIn Component styled via the appearance prop to match your design tokens */}
               <div className="w-full flex justify-center">
                 <SignIn
                   routing="path"
                   path="/sign-in"
                   fallbackRedirectUrl="/dashboard"
                   appearance={{
                     elements: {
                       // Outer container
                       rootBox: "w-full",
                       card: "bg-transparent shadow-none p-0 w-full",
                       
                       // Header text hiding (since we have our own custom header above)
                       headerTitle: "hidden",
                       headerSubtitle: "hidden",
       
                       // Social buttons (Google) matching your outline button style
                       socialButtonsBlockButton: 
                         "h-8 w-full rounded-full border border-border bg-background text-sm font-medium text-foreground hover:bg-foreground/[0.04] transition",
                       socialButtonsBlockButtonText: "font-medium text-sm",
                       
                       // Divider ("or")
                       dividerLine: "bg-border h-px",
                       dividerText: "text-xs text-muted-foreground uppercase px-2",
       
                       // Form inputs matching your custom input styles
                       formFieldInput: 
                         "h-12 w-full rounded-2xl border-0 bg-foreground/[0.04] px-4 text-sm font-medium text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-0",
                       formFieldLabel: "text-xs font-medium text-foreground mb-1.5",
       
                       // Primary submit button matching your custom continue button
                       formButtonPrimary: 
                         "h-8 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90 transition mt-2",
       
                       // Footer links / text
                       footerActionLink: "text-foreground font-medium underline",
                       footerActionText: "text-muted-foreground text-xs",
                       identityPreviewText: "text-foreground",
                       formResendCodeLink: "text-foreground underline",
                     },
                   }}
                 />
               </div>
       
               {/* Custom terms text matching your previous footer style */}
               <p className="text-center med-font text-xs text-muted-foreground">
                 By continuing, you agree to Dlan Academy&apos;s{" "}
                 <a href="/terms" className="underline">
                   Terms of Service
                 </a>{" "}
                 and{" "}
                 <a href="/privacy" className="underline">
                   Privacy Policy
                 </a>
                 .
               </p>
       
             </div>
           </section>
      </div>
    </main>
  );
}