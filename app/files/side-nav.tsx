"use client";

import Link from "next/link";
import { BookOpen, Compass, Home, Settings, Users } from "lucide-react";
import Image from "next/image";

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

const ITEMS = [
  { id: "home", href: "/dashboard", label: "Home", icon: Home },
  { id: "courses", href: "/dashboard/courses", label: "My courses", icon: BookOpen },
  { id: "explore", href: "/explore", label: "Explore courses", icon: Compass },
  { id: "community", href: "/community", label: "Community", icon: Users },
];

export default function SideNav({ active = "courses" }: { active?: string }) {
  return (
    <nav
      aria-label="Main"
      className="hidden w-[72px] shrink-0 flex-col items-center justify-between rounded-[28px] border border-gray-200 bg-surface py-6 lg:flex"
    >
      <div className="flex flex-col items-center gap-8">
        <Link href="/" aria-label="Dlan Academy home">
          <Image
                      src="/firebase.png"
                      alt=""
                      width={100}
                      height={100}
                      className="size-6 shrink-0 self-center"
                      />
        </Link>

        <ul className="flex flex-col items-center gap-2">
          {ITEMS.map(({ id, href, label, icon: Icon }) => {
            const isActive = id === active;
            return (
              <li key={id}>
                <Link
                  href={href}
                  title={label}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  className={`grid size-11 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                    isActive
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
                  }`}
                >
                  <Icon className="size-[18px]" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Link
          href="/settings"
          title="Settings"
          aria-label="Settings"
          className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
        >
          <Settings className="size-[18px]" />
        </Link>
        {/* swap for the signed-in user's avatar */}
        <span
          aria-hidden
          className="grid size-10 place-items-center rounded-full bg-foreground/[0.08] text-xs font-medium text-foreground"
        >
          You
        </span>
      </div>
    </nav>
  );
}
