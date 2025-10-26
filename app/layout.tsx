import "@/app/globals.css";
import type { Metadata } from "next";
import HeaderGate from "@/components/HeaderGate"; // ⬅️ gate decides when to show header

export const metadata: Metadata = {
  title: "Devakalyan Adigopula — Portfolio",
  description:
    "Business Analyst Portfolio featuring data visualization, process optimization, and analytics projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white">
        <HeaderGate />
        {children}
      </body>
    </html>
  );
}