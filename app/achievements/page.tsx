import Achievements from "@/components/Achievements";

export const metadata = {
  title: "Achievements — Devakalyan Adigopula",
};

export default function AchievementsPage() {
  return (
    <main className="bg-[#0b0f17] text-white">
      <section className="pt-10" />
      <Achievements />
    </main>
  );
}