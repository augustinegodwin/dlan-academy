"use client";

import Image from "next/image";
import { SignIn } from "@clerk/nextjs";

export default function SignInSection() {
  return (
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
                  "h-11 w-full rounded-full border border-border bg-background text-sm font-medium text-foreground hover:bg-foreground/[0.04] transition",
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
                  "h-11 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90 transition mt-2",

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
  );
}