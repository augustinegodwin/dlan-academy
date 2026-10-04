"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, LogOut, Settings } from "lucide-react";

const ITEMS = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/dashboard/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const STUDENT_NAME = "Mark Daniel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const linkClass = (active: boolean) =>
    `med-font flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
      active ? "bg-foreground/[0.06] text-foreground" : "text-muted-foreground hover:bg-foreground/[0.04] hover:text-foreground"
    }`;

  return (
    <div className="flex h-screen w-full flex-col bg-surface lg:flex-row">
      {/* Desktop sidebar */}
      <nav aria-label="Main" className="hidden h-screen w-60 shrink-0 flex-col justify-between px-3 py-4 lg:flex">
        <div className="flex flex-col gap-4">
          <Link href="/dashboard/home" className="px-1 font-[stack-sans-bold] text-lg text-foreground">
            Dlan Academy
          </Link>

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
      </nav>

      {/* Mobile top bar */}
      <nav aria-label="Main" className="flex items-center gap-1 overflow-x-auto px-3 py-3 lg:hidden">
        {ITEMS.map(({ href, label }) => (
          <Link key={href} href={href} className={`${linkClass(pathname.startsWith(href))} whitespace-nowrap`}>
            {label}
          </Link>
        ))}
      </nav>

      {/* Page box */}
      <main className="min-h-0 min-w-0 flex-1 lg:p-2">
        <div className="h-full overflow-y-auto bg-background lg:rounded-2xl lg:border lg:border-gray-200 ">
          <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10">{children}</div>
        </div>
      </main>
    </div>
  );
}