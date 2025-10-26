"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarClientWrapper() {
  const pathname = usePathname();
  const showNavbar = pathname === "/projects"; // ✅ Only visible on Projects page

  if (!showNavbar) return null;
  return <Navbar />;
}