"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Navbar() {
  const pathname = usePathname();

  // Build nav items (hide Projects when already on /projects)
  const items = useMemo(() => {
    const base = [
      { href: "/", label: "Home" },
      { href: "/education", label: "Education" },
      { href: "/achievements", label: "Achievements" },
      { href: "/projects", label: "Projects" },
      { href: "/contact", label: "Contact" },
    ];

    if (pathname === "/projects") {
      return base.filter((i) => i.href !== "/projects");
    }
    return base;
  }, [pathname]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav
        className="flex items-center justify-between w-[min(960px,96%)]
                   backdrop-blur-md bg-white/5 border border-white/10
                   rounded-full px-5 py-2 shadow-[0_10px_30px_rgba(0,0,0,.35)]"
        aria-label="Primary"
      >
        {/* Left — Name */}
        <Link
          href="/"
          className="font-semibold text-white text-[15px] tracking-wide
                     hover:text-amber-300 transition-colors duration-300"
        >
          DEVAKALYAN <span className="text-amber-400">ADIGOPULA</span>
        </Link>

        {/* Right — Buttons */}
        <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {items.map((item) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={[
                    "inline-flex items-center rounded-full px-3.5 py-1.5 text-sm transition",
                    "text-white/85 hover:text-white",
                    "border border-transparent hover:border-white/15",
                    isActive
                      ? "bg-white/10 border-white/15"
                      : "bg-transparent",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}