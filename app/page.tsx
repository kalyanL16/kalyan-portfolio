import Hero from "@/components/Hero";

export const metadata = {
  title: "Devakalyan Adigopula — Portfolio",
  description:
    "Business Analyst Portfolio featuring data visualization, process optimization, and analytics projects.",
};

export default function Page() {
  return (
    <main className="bg-[#0a0a0a] text-white scroll-smooth">
      <Hero />
    </main>
  );
}