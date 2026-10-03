import { redirect } from "next/navigation";

// /dashboard just forwards to /dashboard/home
export default function DashboardIndex() {
  redirect("/dashboard/home");
}