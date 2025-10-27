import Hero from "@/components/Hero";
import SunArcDivider from "@/components/SunArcDivider";
import Education from "@/components/Education";
import WaveBreaker from "@/components/WaveBreaker";
import Achievements from "@/components/Achievements";
import About from "@/components/About";

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] text-white scroll-smooth">
      {/* HERO */}
      <Hero />

      {/* ARC (Hero → Education) */}
      <SunArcDivider />

      {/* EDUCATION */}
      <Education />

      {/* WAVE (Education → Achievements) */}
      <WaveBreaker />

      {/* ACHIEVEMENTS */}
      <Achievements />

      {/* ARC (Achievements → About) */}
      <SunArcDivider />

      {/* ABOUT / CONTACT */}
      <About />
    </main>
  );
}