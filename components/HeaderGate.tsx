"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

// Show header on these routes only (NOT on "/")
const SHOW_ON = new Set(["/projects", "/education", "/achievements", "/contact"]);

export default function HeaderGate() {
  const pathname = usePathname();
  if (!SHOW_ON.has(pathname)) return null;
  return <Header />;
}