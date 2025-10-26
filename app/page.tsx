// app/page.tsx
import Hero from "@/components/Hero";
import Education from "@/components/Education";
import WaveBreaker from "@/components/WaveBreaker";
import Achievements from "@/components/Achievements";

export const metadata = {
  title: "Devakalyan Adigopula — Portfolio",
  description:
    "Business Analyst Portfolio featuring data visualization, process optimization, and analytics projects.",
};

export default function Page() {
  return (
    <main className="bg-[#0a0a0a] text-white scroll-smooth">
      <Hero />
      <Education />

      {/* 👉 Breaker goes HERE, between Education and Achievements */}
      <WaveBreaker />

      <Achievements />
    </main>
  );
}