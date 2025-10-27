"use client";

import Hero from "@/components/Hero";
import SunArcDivider from "@/components/SunArcDivider";
import Education from "@/components/Education";
import WaveBreaker from "@/components/WaveBreaker";
import Achievements from "@/components/Achievements";
import About from "@/components/About";

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] text-white scroll-smooth">
      {/* 🌟 Hero (no changes needed) */}
      <Hero />


      {/* 🎓 Education */}
      <Education />

      {/* 🌊 Wave breaker between Education → Achievements (keep your existing one) */}
      <WaveBreaker />

      {/* 🏆 Achievements */}
      <Achievements />
      

      {/* 💬 About / Contact */}
      <About />
    </main>
  );
}