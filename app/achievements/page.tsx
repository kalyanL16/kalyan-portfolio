// app/achievements/page.tsx
import AchievementsClient from "@/components/AchievementsClient";

export const metadata = {
  title: "Achievements — Devakalyan Adigopula",
  description: "Measurable impact delivered.",
};

export default function AchievementsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <section className="mx-auto w-[min(1180px,92%)] pt-20 pb-10">
        <h1 className="text-center text-[clamp(24px,2.4vw,32px)] tracking-[0.22em] text-white/80">
          MEASURABLE IMPACT
        </h1>
      </section>

      <AchievementsClient />

      <div className="h-20" />
    </main>
  );
}