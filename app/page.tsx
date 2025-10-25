"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";

export default function Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const prev = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = prev || "";
    } catch {}
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col">
      <div className="flex-1">
        <Hero />
      </div>

      <footer className="mt-auto border-t border-zinc-800 bg-black py-8 text-center">
        <p className="text-sm tracking-widest uppercase text-zinc-400">
          © {new Date().getFullYear()} Devakalyan Adigopula — Portfolio
        </p>
      </footer>
    </main>
  );
}