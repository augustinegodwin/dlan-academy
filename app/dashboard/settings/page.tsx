"use client";

import { useEffect, useState } from "react";
import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "name", label: "Full name", hint: "Shown on your certificates." },
  { key: "university", label: "University", hint: "Where you study." },
  { key: "phone", label: "Phone number", hint: "Used for account recovery." },
  { key: "level", label: "Level", hint: "Your current level." },
] as const;

type Form = Record<(typeof FIELDS)[number]["key"], string>;

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const { openUserProfile } = useClerk();
  const [form, setForm] = useState<Form>({ name: "", university: "", phone: "", level: "" });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  // Fill the form once Clerk has loaded the user
  useEffect(() => {
    if (!isLoaded || !user) return;
    const meta = user.unsafeMetadata as Partial<Form>;
    setForm({
      name: user.fullName ?? "",
      university: meta.university ?? "",
      phone: meta.phone ?? "",
      level: meta.level ?? "",
    });
  }, [isLoaded, user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  async function save() {
    if (!user) return;
    setSaving(true);
    setStatus("idle");
    try {
      const [firstName, ...rest] = form.name.trim().split(/\s+/);
      await user.update({
        firstName,
        lastName: rest.join(" "),
        unsafeMetadata: {
          ...user.unsafeMetadata,
          university: form.university,
          phone: form.phone,
          level: form.level,
        },
      });
      setStatus("saved");
    } catch {
      setStatus("error");
    } finally {
      setSaving(false);
    }
  }

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
            disabled={!isLoaded}
            onChange={(e) => {
              setForm({ ...form, [f.key]: e.target.value });
              setStatus("idle");
            }}
            className="med-font h-10 w-full rounded-xl border border-gray-200 bg-background px-3 text-sm text-foreground disabled:opacity-50"
          />
        </section>
      ))}

      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={save}
          disabled={!isLoaded || saving}
          className="med-font h-10 rounded-full bg-foreground px-5 text-background hover:bg-foreground/90"
        >
          {saving ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => openUserProfile()}
          className="med-font h-10 rounded-full px-5"
        >
          Change password
        </Button>
        {status === "saved" && <span className="med-font text-sm text-muted-foreground">Saved</span>}
        {status === "error" && <span className="med-font text-sm text-red-600">Couldn&apos;t save. Try again.</span>}
      </div>
    </div>
  );
}