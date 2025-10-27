// app/page.tsx
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import WaveBreaker from "@/components/WaveBreaker";
import Achievements from "@/components/Achievements";
import SunArcDivider from "@/components/SunArcDivider"; // ✅ match the file name
import About from "@/components/About";

export const metadata = {
  title: "Devakalyan Adigopula — Portfolio",
  description:
    "Business Analyst Portfolio featuring data visualization, process optimization, and analytics projects.",
};

export default function Page() {
  return (
    <main className="bg-[#0a0a0a] text-white scroll-smooth">
      {/* 🌅 Hero (already has its own arc + button) */}
      <Hero />

      {/* 🎓 Education */}
      <Education />

      {/* 🌊 Between Education → Achievements (keep your existing wave) */}
      <WaveBreaker />

      {/* 🏆 Achievements */}
      <Achievements />

      {/* 🌅 Hero-style Sun Arc between Achievements → About */}
      <SunArcDivider />

      {/* 💬 About / Contact */}
      <About />
    </main>
  );
}