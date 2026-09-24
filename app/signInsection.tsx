import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function SignInSection() {
  const [email, setEmail] = useState("");

  return (
    <section className="flex w-full flex-1 justify-center rounded-[28px] bg-surface">
      <div className="flex w-full flex-col items-stretch justify-center gap-6 px-6 py-16 sm:max-w-[420px] sm:gap-8">
            <Image
            src="/logo.png"
            alt=""
            width={18}
            height={18}
            className="size-10 shrink-0 self-center"
            />
        <div>
          <h1 className="text-center text-2xl font-[stack-sans-bold] tracking-tight text-foreground text-balance">
            Create your free account{" "}
          </h1>
          <p className="text-center med-font text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Facere, atque aspernatur minima beatae 
          </p>
        </div>

        <div className="flex flex-col items-stretch gap-4">
          <Button
            type="button"
            variant="outline"
            className="h-11 w-full rounded-full border-border text-sm  med-font font-medium"
          >
            <Image
              src="/google.svg"
              alt=""
              width={18}
              height={18}
              className="size-[18px] shrink-0"
            />
            Continue with Google
          </Button>

          <div className="relative flex h-5 items-center justify-center">
            <hr className="h-px grow border-0 bg-border" />
            <span className="w-11 shrink-0 text-center text-xs med-font text-muted-foreground">
              or
            </span>
            <hr className="h-px grow border-0 bg-border" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // wire this up to your auth handler
            }}
            className="flex flex-col items-stretch gap-4"
          >
            <Input
              type="email"
              required
              placeholder="Enter email address"
              aria-label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full rounded-2xl med-font border-0 bg-foreground/[0.04] px-4 text-sm font-medium placeholder:font-normal placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-foreground text-sm font-medium text-background hover:bg-foreground/90"
            >
              Continue
            </Button>

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
          </form>
        </div>

        {/* <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-2">
            Sign up
          </a>
        </p> */}
      </div>
    </section>
  );
}
