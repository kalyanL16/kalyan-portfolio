// app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css"; // keep this import

export const metadata: Metadata = {
  title: "Devakalyan Adigopula — Portfolio",
  description: "Business Analyst portfolio",
  other: { "theme-color": "#0b0f17" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="text-white antialiased overflow-x-hidden">
        {/* Hard matte background layer, always on bottom */}
        <div className="fixed inset-0 -z-50 bg-[#0b0f17]" />
        {children}
      </body>
    </html>
  );
}