"use client";

import Image from "next/image";
import { useState } from "react";
import SignInSection from "../signInsection";

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
       <SignInSection/>
      </div>
    </main>
  );
}