"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, LogOut, Menu, Settings, X } from "lucide-react";

const ITEMS = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const STUDENT_NAME = "Mark Daniel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  // Close with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (active: boolean) =>
    `med-font flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
      active ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
    }`;

  // Same content is used in the desktop sidebar and the mobile drawer
  const sidebar = (
    <div className="flex h-full flex-col justify-between px-3 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <Link href="/dashboard/home" className="font-[stack-sans-bold] text-lg text-foreground">
            Dlan Academy
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/[0.04] lg:hidden"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-2.5 py-2">
          <span className="grid size-5 place-items-center rounded-md bg-foreground text-[11px] font-semibold text-background">
            {STUDENT_NAME.charAt(0)}
          </span>
          <span className="med-font truncate text-sm text-foreground">{STUDENT_NAME}</span>
        </div>

        <ul className="flex flex-col gap-0.5">
          {ITEMS.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={linkClass(pathname.startsWith(href))}>
                <Icon className="size-[17px]" />
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className={`${linkClass(false)} w-full`}>
        <LogOut className="size-[17px]" />
        Log out
      </button>
    </div>
  );

  return (
    <div className="flex h-dvh w-full flex-col bg-surface lg:flex-row">
      {/* Desktop: fixed sidebar */}
      <nav aria-label="Main" className="hidden w-60 shrink-0 lg:block">
        {sidebar}
      </nav>

      {/* Mobile: top bar with menu button */}
      <header className="flex h-14 shrink-0 items-center justify-between px-4 lg:hidden">
        <Link href="/dashboard/home" className="font-[stack-sans-bold] text-lg text-foreground">
          Dlan Academy
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="grid size-9 place-items-center rounded-lg text-foreground hover:bg-foreground/[0.06]"
        >
          <Menu className="size-5" />
        </button>
      </header>

      {/* Mobile: slide-in drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${open ? "visible" : "invisible"} transition-all duration-200`}>
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />
        <nav
          aria-label="Main"
          className={`absolute inset-y-0 left-0 w-72 max-w-[85%] bg-surface shadow-xl transition-transform duration-200 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebar}
        </nav>
      </div>

      {/* Page box */}
      <main className="min-h-0 min-w-0 flex-1 lg:p-2">
        <div className="h-full overflow-y-auto rounded-t-3xl bg-background lg:rounded-5xl lg:border lg:border-gray-200 ">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 ">{children}</div>
        </div>
      </main>
    </div>
  );
}