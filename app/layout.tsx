import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import {ClerkProvider} from "@clerk/nextjs";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "DLAN Academy | Hands-On IT Training in Kubwa, Abuja",
  description:
    "Physical, in-person tech training in Kubwa, Abuja. Small cohorts, real mentors, hands-on labs in AI, data analysis, and content automation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <ClerkProvider>{children}</ClerkProvider>
        
      </body>
    </html>
  );
}
