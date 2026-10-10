"use client";

import { useEffect, useRef, useState } from "react";
import type { ClipboardEvent, FormEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { COURSE_CATEGORIES } from "../../lib/courses";

gsap.registerPlugin(useGSAP);

/* ---------- swap these two to match your sign-in fonts ---------- */
const HEADING = "font-[stack-sans-bold] tracking-[-0.04em] text-foreground";
const BODY = "med-font";

const inputCls = `${BODY} h-12 w-full rounded-full bg-foreground/[0.06] px-5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:bg-foreground/[0.09] focus:ring-2 focus:ring-foreground/15`;
const primaryBtn = `${BODY} flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground text-sm text-background transition-colors hover:bg-foreground/90 disabled:opacity-60`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* ---------- WIRE THESE TO YOUR AUTH PROVIDER ----------
   The stubs below only wait, so you can click through the UI.
   verifyCode currently accepts ANY code: replace it before launch. */
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

type Data = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  interests: string[];
  level: string;
  hours: string;
};

const api = {
  sendCode: async (_email: string) => {
    await wait(800); // TODO: trigger your email OTP
  },
  verifyCode: async (_email: string, _code: string) => {
    await wait(800); // TODO: verify the OTP, return false if wrong
    return true;
  },
  signUpWithGoogle: async () => {
    // TODO: signIn("google"). Real OAuth redirects away; on return,
    // send the user to the profile step.
  },
  saveProfile: async (_data: Data) => {
    await wait(900); // TODO: save onboarding answers
  },
};

/* ---------- content ---------- */
const SIDE = [
  {
    lead: "Signed up for the AI Prompt Engineering track not knowing what to expect — ",
    highlight: "left with a portfolio project I actually use at work.",
    author: "Ada Okafor, Programming Grad",
  },
  { lead: "Check your inbox — ", highlight: "one quick code and you're in." },
  { lead: "Every learner starts somewhere — ", highlight: "tell us a little about you." },
  { lead: "Pick the paths that catch your eye — ", highlight: "you can change your mind later." },
  { lead: "No wrong answers here — ", highlight: "we'll point you to the right starting place." },
  { lead: "You're in. ", highlight: "Time to pick your first course." },
];

const LEVELS = [
  { id: "beginner", title: "I'm just starting", desc: "New to this. Start me from the basics." },
  { id: "some", title: "I know a bit", desc: "I've tried it, but I have gaps to fill." },
  { id: "advanced", title: "I'm experienced", desc: "I want advanced, practical depth." },
];

const HOURS = [
  { id: "2-4", label: "2–4 hrs / week" },
  { id: "5-8", label: "5–8 hrs / week" },
  { id: "9+", label: "9+ hrs / week" },
];

const PROGRESS_STEPS = 5; // steps 0–4 show progress, step 5 is the finish screen

/* ---------- small helpers ---------- */
function shake(el: HTMLElement | null) {
  if (!el) return;
  gsap.fromTo(el, { x: -8 }, { x: 0, duration: 0.5, ease: "elastic.out(1, 0.25)" });
}

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Placeholder flame: replace with your real logo. */
function BrandMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-11" aria-hidden>
      <path d="M26 4c8 9 14 15 14 24a14 14 0 1 1-28 0c0-6 3-10 7-14 0 4 2 6 4 7 0-6 1-11 3-17z" fill="#e03a1e" />
      <path d="M17 24c5 5 9 8 9 13a9 9 0 1 1-18 0c0-4 4-8 9-13z" fill="#fbbf24" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  );
}

function StepHeader({ title, desc }: { title: string; desc?: ReactNode }) {
  return (
    <div className="mb-7 text-center">
      <h1 className={`ob-item text-[28px] leading-[1.1] ${HEADING}`}>{title}</h1>
      {desc && (
        <p className={`ob-item ${BODY} mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground`}>
          {desc}
        </p>
      )}
    </div>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <div
      className="flex w-full max-w-[200px] items-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={PROGRESS_STEPS}
      aria-valuenow={step + 1}
    >
      {Array.from({ length: PROGRESS_STEPS }).map((_, i) => (
        <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/10">
          <span
            className="block h-full origin-left rounded-full bg-foreground transition-transform duration-700 ease-out"
            style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
          />
        </span>
      ))}
    </div>
  );
}

/* ---------- STEP 0: account ---------- */
function AccountStep({
  email,
  onChange,
  onNext,
  onGoogle,
}: {
  email: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onGoogle: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const field = useRef<HTMLDivElement>(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("Enter a valid email address.");
      shake(field.current);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.sendCode(email);
      onNext();
    } catch {
      setError("Couldn't send the code. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <div className="ob-item mb-5 flex justify-center">
        <BrandMark />
      </div>
      <StepHeader
        title="Create your free account"
        desc="Join Dlan Academy and start learning skills that move your career forward."
      />

      <div className="ob-item">
        <button
          type="button"
          onClick={onGoogle}
          className={`${BODY} flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-border bg-background text-sm text-foreground transition-colors hover:bg-foreground/[0.03]`}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      <div className="ob-item my-5 flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className={`${BODY} text-[11px] text-muted-foreground`}>OR</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={submit} noValidate className="space-y-3">
        <div ref={field} className="ob-item">
          <input
            type="email"
            autoComplete="email"
            aria-label="Email address"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => onChange(e.target.value)}
            className={inputCls}
          />
          {error && <p className={`${BODY} mt-2 px-2 text-xs text-red-500`}>{error}</p>}
        </div>
        <div className="ob-item">
          <button type="submit" disabled={loading} className={primaryBtn}>
            {loading ? <Loader2 className="size-4 animate-spin" /> : "Continue"}
          </button>
        </div>
      </form>

      <p className={`ob-item ${BODY} mt-5 text-center text-xs leading-relaxed text-muted-foreground`}>
        By continuing, you agree to Dlan Academy&apos;s{" "}
        <Link href="/terms" className="underline underline-offset-2">Terms of Service</Link> and{" "}
        <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
      </p>
      <p className={`ob-item ${BODY} mt-4 text-center text-sm text-muted-foreground`}>
        Already have an account?{" "}
        <Link href="/sign-in" className="text-foreground underline underline-offset-2">Sign in</Link>
      </p>
    </>
  );
}

/* ---------- STEP 1: verify ---------- */
function VerifyStep({ email, onVerified }: { email: string; onVerified: () => void }) {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const row = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function verify(code: string) {
    setLoading(true);
    setError("");
    try {
      const ok = await api.verifyCode(email, code);
      if (!ok) throw new Error("bad code");
      onVerified();
    } catch {
      setError("That code didn't work. Check it and try again.");
      setDigits(Array(6).fill(""));
      shake(row.current);
      refs.current[0]?.focus();
      setLoading(false);
    }
  }

  function handleChange(i: number, raw: string) {
    const v = raw.replace(/\D/g, "");
    if (!v) {
      setDigits((d) => d.map((x, k) => (k === i ? "" : x)));
      return;
    }
    let chars = v.split("");
    if (digits[i] && chars.length === 2) chars = [chars[1]]; // typed over a filled box
    const next = [...digits];
    chars.forEach((c, k) => {
      if (i + k < 6) next[i + k] = c;
    });
    setDigits(next);
    refs.current[Math.min(i + chars.length, 5)]?.focus();
    if (next.every(Boolean)) verify(next.join(""));
  }

  function handleKeyDown(i: number, key: string) {
    if (key === "Backspace" && !digits[i] && i > 0) {
      setDigits((d) => d.map((x, k) => (k === i - 1 ? "" : x)));
      refs.current[i - 1]?.focus();
    }
    if (key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (key === "ArrowRight" && i < 5) refs.current[i + 1]?.focus();
  }

  function handlePaste(e: ClipboardEvent) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    setDigits(Array.from({ length: 6 }, (_, k) => text[k] ?? ""));
    refs.current[Math.min(text.length, 5)]?.focus();
    if (text.length === 6) verify(text);
  }

  async function resend() {
    setCooldown(30);
    await api.sendCode(email);
  }

  const code = digits.join("");

  return (
    <>
      <StepHeader
        title="Check your email"
        desc={
          <>
            We sent a 6-digit code to <span className="text-foreground">{email}</span>
          </>
        }
      />

      <div ref={row} onPaste={handlePaste} className="ob-item flex justify-between gap-2">
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1}`}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e.key)}
            onFocus={(e) => e.target.select()}
            className={`${BODY} h-14 w-full min-w-0 rounded-2xl bg-foreground/[0.06] text-center text-lg text-foreground outline-none transition-colors focus:bg-foreground/[0.09] focus:ring-2 focus:ring-foreground/20`}
          />
        ))}
      </div>

      {error && <p className={`${BODY} mt-3 text-center text-xs text-red-500`}>{error}</p>}

      <div className="ob-item mt-5">
        <button
          type="button"
          disabled={loading || code.length < 6}
          onClick={() => verify(code)}
          className={primaryBtn}
        >
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Verify"}
        </button>
      </div>

      <p className={`ob-item ${BODY} mt-5 text-center text-sm text-muted-foreground`}>
        Didn&apos;t get it?{" "}
        {cooldown > 0 ? (
          <span>Resend in {cooldown}s</span>
        ) : (
          <button type="button" onClick={resend} className="text-foreground underline underline-offset-2">
            Resend code
          </button>
        )}
      </p>
    </>
  );
}

/* ---------- STEP 2: about you ---------- */
function ProfileStep({
  data,
  update,
  onNext,
}: {
  data: Data;
  update: (p: Partial<Data>) => void;
  onNext: () => void;
}) {
  const [error, setError] = useState("");
  const box = useRef<HTMLDivElement>(null);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!data.firstName.trim() || !data.lastName.trim()) {
      setError("Please enter your first and last name.");
      shake(box.current);
      return;
    }
    onNext();
  }

  return (
    <>
      <StepHeader title="Tell us about you" desc="So we know what to call you in class." />
      <form onSubmit={submit} noValidate className="space-y-3">
        <div ref={box} className="space-y-3">
          <div className="ob-item">
            <input
              autoComplete="given-name"
              aria-label="First name"
              placeholder="First name"
              value={data.firstName}
              onChange={(e) => update({ firstName: e.target.value })}
              className={inputCls}
            />
          </div>
          <div className="ob-item">
            <input
              autoComplete="family-name"
              aria-label="Last name"
              placeholder="Last name"
              value={data.lastName}
              onChange={(e) => update({ lastName: e.target.value })}
              className={inputCls}
            />
          </div>
          <div className="ob-item">
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              aria-label="Phone number (optional)"
              placeholder="Phone number (optional)"
              value={data.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className={inputCls}
            />
          </div>
        </div>
        {error && <p className={`${BODY} px-2 text-xs text-red-500`}>{error}</p>}
        <div className="ob-item pt-2">
          <button type="submit" className={primaryBtn}>Continue</button>
        </div>
      </form>
    </>
  );
}

/* ---------- STEP 3: interests ---------- */
function InterestsStep({
  value,
  onChange,
  onNext,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
}) {
  const [error, setError] = useState("");

  const toggle = (slug: string) => {
    setError("");
    onChange(value.includes(slug) ? value.filter((s) => s !== slug) : [...value, slug]);
  };

  return (
    <>
      <StepHeader title="What do you want to learn?" desc="Pick as many as you like." />

      <div className="grid grid-cols-2 gap-2">
        {COURSE_CATEGORIES.map((c) => {
          const on = value.includes(c.slug);
          return (
            <button
              key={c.slug}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(c.slug)}
              className={`ob-item ${BODY} flex min-h-[64px] items-center justify-between gap-2 rounded-2xl border p-3.5 text-left text-[13px] leading-tight transition-colors ${
                on
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/30"
              }`}
            >
              {c.title}
              <span
                className={`grid size-4 shrink-0 place-items-center rounded-full bg-background text-foreground transition-transform duration-300 ${
                  on ? "scale-100" : "scale-0"
                }`}
              >
                <Check className="size-2.5" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      {error && <p className={`${BODY} mt-3 px-2 text-xs text-red-500`}>{error}</p>}

      <div className="ob-item mt-5">
        <button
          type="button"
          className={primaryBtn}
          onClick={() => (value.length ? onNext() : setError("Pick at least one to continue."))}
        >
          Continue
        </button>
      </div>
    </>
  );
}

/* ---------- STEP 4: level + time ---------- */
function LevelStep({
  data,
  update,
  onFinish,
}: {
  data: Data;
  update: (p: Partial<Data>) => void;
  onFinish: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function finish() {
    if (!data.level || !data.hours) {
      setError("Choose your level and weekly time to finish.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onFinish();
    } catch {
      setError("Couldn't save your answers. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <StepHeader title="Where are you at?" desc="We'll use this to suggest a starting point." />

      <div role="radiogroup" aria-label="Experience level" className="space-y-2">
        {LEVELS.map((l) => {
          const on = data.level === l.id;
          return (
            <button
              key={l.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => update({ level: l.id })}
              className={`ob-item ${BODY} flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
                on ? "border-foreground bg-foreground/[0.04]" : "border-border bg-background hover:border-foreground/30"
              }`}
            >
              <span
                className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border transition-colors ${
                  on ? "border-foreground bg-foreground" : "border-border"
                }`}
              >
                <span className={`size-1.5 rounded-full bg-background transition-transform duration-300 ${on ? "scale-100" : "scale-0"}`} />
              </span>
              <span>
                <span className="block text-sm text-foreground">{l.title}</span>
                <span className="block text-xs text-muted-foreground">{l.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className={`ob-item ${BODY} mb-2 mt-6 text-xs text-muted-foreground`}>How much time can you give each week?</p>
      <div role="radiogroup" aria-label="Weekly time" className="grid grid-cols-3 gap-2">
        {HOURS.map((h) => {
          const on = data.hours === h.id;
          return (
            <button
              key={h.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => update({ hours: h.id })}
              className={`ob-item ${BODY} h-11 rounded-full border text-xs transition-colors ${
                on
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:border-foreground/30"
              }`}
            >
              {h.label}
            </button>
          );
        })}
      </div>

      {error && <p className={`${BODY} mt-3 px-2 text-xs text-red-500`}>{error}</p>}

      <div className="ob-item mt-6">
        <button type="button" disabled={loading} onClick={finish} className={primaryBtn}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Finish setup"}
        </button>
      </div>
    </>
  );
}

/* ---------- STEP 5: done ---------- */
function DoneStep({ data }: { data: Data }) {
  const ref = useRef<HTMLDivElement>(null);
  const rec = COURSE_CATEGORIES.find((c) => c.slug === data.interests[0]);

  useGSAP(
    () => {
      gsap.fromTo(".ring", { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" });
      gsap.fromTo(".tick", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.6, delay: 0.35, ease: "power2.out" });
    },
    { scope: ref }
  );

  return (
    <div ref={ref}>
      <div className="ob-item mb-6 flex justify-center">
        <svg viewBox="0 0 24 24" className="ring size-20" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="11" className="fill-foreground" />
          <path
            className="tick"
            d="M7 12.5l3.2 3.2L17 9"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </svg>
      </div>

      <StepHeader
        title={data.firstName ? `You're all set, ${data.firstName}` : "You're all set"}
        desc="Your account is ready and your preferences are saved."
      />

      {rec && (
        <div className="ob-item mb-5 rounded-2xl border border-border bg-background p-4">
          <p className={`${BODY} text-xs text-muted-foreground`}>Recommended to start</p>
          <p className={`mt-1 text-lg ${HEADING}`}>{rec.title}</p>
          <p className={`${BODY} mt-0.5 text-xs text-muted-foreground`}>
            {rec.courses.length} courses · {rec.duration}
          </p>
        </div>
      )}

      <div className="ob-item">
        <Link href="/courses" className={primaryBtn}>
          Explore courses
        </Link>
      </div>
    </div>
  );
}

/* ---------- PAGE ---------- */
export default function SignUpPage() {
  const root = useRef<HTMLElement>(null);
  const dir = useRef(1);
  const busy = useRef(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    interests: [],
    level: "",
    hours: "",
  });

  const update = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));
  const side = SIDE[step];

  // enter animation, runs every time the step changes
  useGSAP(
    () => {
      const d = dir.current;
      gsap.fromTo(
        ".ob-item",
        { opacity: 0, y: 22 * d, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          clearProps: "opacity,transform,filter",
        }
      );
      gsap.fromTo(".side-item", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" });
      gsap.fromTo(".side-img", { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power2.out" });
      busy.current = false;
    },
    { scope: root, dependencies: [step] }
  );

  // exit animation, then swap the step
  const goTo = (next: number) => {
    if (busy.current) return;
    busy.current = true;
    dir.current = next > step ? 1 : -1;
    const q = gsap.utils.selector(root);
    const items = q(".ob-item");
    if (!items.length) {
      setStep(next);
      return;
    }
    gsap.to(q(".side-item"), { opacity: 0, duration: 0.25 });
    gsap.to(items, {
      opacity: 0,
      y: -16 * dir.current,
      filter: "blur(6px)",
      duration: 0.28,
      stagger: 0.03,
      ease: "power2.in",
      onComplete: () => setStep(next),
    });
  };

  return (
    <main ref={root} className="h-screen min-h-screen bg-background p-1">
      <div className="relative flex h-full flex-col gap-1 overflow-hidden lg:flex-row">
        {/* left: photo + copy */}
        <section className="relative hidden w-full overflow-hidden rounded-[28px] lg:block lg:w-1/2">
          <Image src="/cover3.jpg" alt="" fill priority className="side-img object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

          <LogoMark className="absolute left-8 top-8 size-6 text-white/90" />

          <div className="absolute inset-x-0 bottom-16 px-12">
            <blockquote className="side-item max-w-md text-xl leading-relaxed text-white/60">
              {side.lead}
              <span className="text-white">{side.highlight}</span>
            </blockquote>
            {side.author && <p className="side-item mt-4 text-sm text-white/40">{side.author}</p>}
          </div>
        </section>

        {/* right: onboarding panel */}
        <section className="relative flex min-h-0 w-full flex-1 flex-col rounded-[28px] bg-surface lg:w-1/2">
          <div className="flex h-16 shrink-0 items-center justify-between px-5 pt-5 sm:px-8">
            <div className="w-9">
              {step > 0 && step < PROGRESS_STEPS && (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  aria-label="Go back"
                  className="grid size-9 place-items-center rounded-full text-foreground/70 transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <ArrowLeft className="size-4" />
                </button>
              )}
            </div>
            {step < PROGRESS_STEPS && <Progress step={step} />}
            <div className="w-9" />
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-6 pb-10 pt-4">
            <div className="w-full max-w-sm">
              {step === 0 && (
                <AccountStep
                  email={data.email}
                  onChange={(email) => update({ email })}
                  onNext={() => goTo(1)}
                  onGoogle={async () => {
                    await api.signUpWithGoogle();
                    goTo(2);
                  }}
                />
              )}
              {step === 1 && <VerifyStep email={data.email} onVerified={() => goTo(2)} />}
              {step === 2 && <ProfileStep data={data} update={update} onNext={() => goTo(3)} />}
              {step === 3 && (
                <InterestsStep value={data.interests} onChange={(interests) => update({ interests })} onNext={() => goTo(4)} />
              )}
              {step === 4 && (
                <LevelStep
                  data={data}
                  update={update}
                  onFinish={async () => {
                    await api.saveProfile(data);
                    goTo(5);
                  }}
                />
              )}
              {step === 5 && <DoneStep data={data} />}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}