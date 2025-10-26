"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Header() {
  const pathname = usePathname();

  const nav = useMemo(
    () => [
      { label: "Projects", href: "/projects" },
      { label: "Education", href: "/education" },
      { label: "Achievements", href: "/achievements" },
      { label: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex w-[min(1200px,92%)] items-center justify-between py-3">
        {/* Left — Brand */}
        <Link href="/" className="text-sm font-semibold tracking-wide text-white/90 hover:text-white">
          Devakalyan Adigopula
        </Link>

        {/* Right — Nav (hide current page item) */}
        <nav className="flex items-center gap-2">
          {nav
            .filter((item) => item.href !== pathname) // 👈 hide the current page
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.06]
                           px-3.5 py-1.5 text-sm text-white/85 hover:bg-white/[0.12] transition"
              >
                {item.label}
              </Link>
            ))}
        </nav>
      </div>
    </header>
  );
}