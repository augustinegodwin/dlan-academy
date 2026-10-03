"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "name", label: "Full name", hint: "Shown on your certificates." },
  { key: "university", label: "University", hint: "Where you study." },
  { key: "phone", label: "Phone number", hint: "Used for account recovery." },
  { key: "level", label: "Level", hint: "Your current level." },
] as const;

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({
    name: "Mark Daniel",
    university: "Bingham University, Karu",
    phone: "+2348033496101",
    level: "100",
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-[stack-sans-bold] text-3xl text-foreground">Settings</h1>

      {FIELDS.map((f) => (
        <section key={f.key} className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          <div>
            <h2 className="med-font text-base font-medium text-foreground">{f.label}</h2>
            <p className="med-font text-sm text-muted-foreground">{f.hint}</p>
          </div>
          <input
            value={form[f.key]}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className="med-font h-10 w-full rounded-xl border border-gray-200 bg-background px-3 text-sm text-foreground"
          />
        </section>
      ))}

      <div className="flex gap-3">
        <Button type="button" className="med-font h-10 rounded-full bg-foreground px-5 text-background hover:bg-foreground/90">
          Save changes
        </Button>
        <Button type="button" variant="outline" className="med-font h-10 rounded-full px-5">
          Change password
        </Button>
      </div>
    </div>
  );
}