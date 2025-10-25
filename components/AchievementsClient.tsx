// components/AchievementsClient.tsx
"use client";

import { useEffect } from "react";

export default function AchievementsClient() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto w-[min(1180px,92%)] space-y-12">
      <div data-reveal className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold">Data Integrity & Reconciliation</h3>
        <p className="mt-2 text-zinc-300/90 leading-relaxed">
          Led validation across CMDB, ERP and Billing systems. Designed SQL & Python
          reconciliation scripts to eliminate discrepancies—achieving <b>99% CI mapping accuracy</b>
          and a <b>32% improvement</b> in data reliability for reporting.
        </p>
      </div>

      <div data-reveal className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 md:p-8">
        <h3 className="text-lg md:text-xl font-semibold">Workflow Optimization & Efficiency</h3>
        <p className="mt-2 text-zinc-300/90 leading-relaxed">
          Streamlined Service Catalog approvals and automated provisioning in enterprise environments,
          delivering a <b>45% improvement</b> in fulfillment speed and a <b>30% reduction</b> in
          manual routing errors.
        </p>
      </div>

      <style jsx>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 600ms ease, transform 600ms ease;
        }
        [data-reveal].show {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}