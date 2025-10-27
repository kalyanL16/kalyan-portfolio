"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      const items = Array.from(root.querySelectorAll<HTMLElement>(".about-reveal"));
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0b0f17] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* ambient glows */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div
          className="absolute -left-[20%] top-[5%] h-[60vh] w-[60vh] rounded-full blur-[120px] opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(120,170,255,0.35) 0%, rgba(120,170,255,0) 70%)",
          }}
        />
        <div
          className="absolute -right-[15%] bottom-[0%] h-[70vh] w-[70vh] rounded-full blur-[140px] opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,190,90,0.35) 0%, rgba(255,190,90,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto w-[min(1100px,92%)]">
        {/* Header */}
        <div className="about-reveal text-center mb-16">
          <div className="mb-3 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-white/70">
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
              <path
                d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 19.8l1-6.1L3.2 9.4l6.1-.9L12 3z"
                fill="currentColor"
              />
            </svg>
            <span>ABOUT</span>
          </div>
          <h2 className="text-[clamp(32px,6vw,54px)] font-extrabold leading-[1.05]">
            What I Know, Who I Am, and Where I’m Headed
          </h2>
          <p className="mt-4 max-w-[70ch] mx-auto text-[16px] leading-[1.8] text-white/80">
            A quick snapshot of my current skillset, how I operate as a professional, and what I’m
            looking for next.
          </p>
        </div>

        {/* 3-up grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20">
          {/* What I Know */}
          <div className="about-reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:bg-white/[0.06] transition">
            <h3 className="text-lg font-semibold mb-2">What I Know</h3>
            <ul className="space-y-2 text-white/85 text-[15px] leading-relaxed">
              <li>• Requirements Engineering, UAT & QA</li>
              <li>• Process Mapping & Optimization (As-Is → To-Be)</li>
              <li>• BI & Analytics: Tableau, Looker Studio, Power BI</li>
              <li>• SQL, Data Storytelling, KPI Design</li>
              <li>• Tools: JIRA, Azure DevOps, Microsoft Fabric</li>
            </ul>
          </div>

          {/* Who I Am */}
          <div className="about-reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:bg-white/[0.06] transition">
            <h3 className="text-lg font-semibold mb-2">Who I Am (Professionally)</h3>
            <p className="text-white/85 text-[15px] leading-relaxed">
              I bridge stakeholder needs and technical delivery. I thrive in structured ambiguity—
              clarifying requirements, translating them into measurable workflows, and collaborating
              with teams to ship solutions that improve performance and decision-making.
            </p>
          </div>

          {/* What I Want */}
          <div className="about-reveal rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm hover:bg-white/[0.06] transition">
            <h3 className="text-lg font-semibold mb-2">What I Want Next</h3>
            <p className="text-white/85 text-[15px] leading-relaxed">
              Business Analyst / Analytics roles where I can own requirements, validate solutions
              with data, and scale reporting/processes. I’m excited by teams that value clarity,
              iteration, and outcome-focused delivery.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="about-reveal mx-auto mb-16 h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        {/* CONTACT — Enlarged and Hero-style */}
        <div className="about-reveal relative grid md:grid-cols-[1fr_auto] items-center gap-8">
          <div>
            <h3 className="text-[clamp(34px,6vw,56px)] font-extrabold leading-[1.05] mb-3">
              Get in touch
            </h3>
            <p className="text-[16px] text-white/80 mb-6">
              Let’s connect — I’m always open to new opportunities, collaborations, or just a good
              analytics conversation.
            </p>

            {/* EMAIL PILL */}
            <a
              href="mailto:devakalyan242@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/20
                         bg-white/[0.06] px-6 py-3 text-[17px] font-medium text-white/90
                         hover:bg-white/[0.12] transition backdrop-blur
                         shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_24px_rgba(0,0,0,.45)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="opacity-90">
                <path
                  fill="currentColor"
                  d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 3.5-8 5-8-5V6l8 5 8-5v1.5Z"
                />
              </svg>
              devakalyan242@gmail.com
            </a>

            <div className="mt-5">
              <Link
                href="/Deva_Business_Analyst_Resume.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3
                           text-[15.5px] font-medium text-white/90 bg-white/[0.06]
                           hover:bg-white/[0.12] backdrop-blur transition"
              >
                Download Resume
              </Link>
            </div>
          </div>

          {/* Floating rail — Hero style */}
          <div className="hidden md:flex flex-col gap-3">
            {[
              {
                href: "https://www.linkedin.com/in/kalyan-adigopula/",
                label: "LinkedIn",
                icon: (
                  <path
                    fill="currentColor"
                    d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5ZM5.5 8.25h2.88V20H5.5ZM10.5 8.25h2.76v1.6h.04a3.02 3.02 0 0 1 2.71-1.49c2.9 0 3.43 1.91 3.43 4.39V20h-2.88v-4.94c0-1.18 0-2.69-1.64-2.69s-1.89 1.28-1.89 2.6V20H10.5Z"
                  />
                ),
              },
              {
                href: "https://github.com/kalyanL16",
                label: "GitHub",
                icon: (
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48V19.4c-2.78.6-3.37-1.19-3.37-1.19a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.14 2.14 0 0 0 2.92.83 2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.93a3.86 3.86 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.03a9.42 9.42 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03a3.6 3.6 0 0 1 .1 2.65 3.86 3.86 0 0 1 1.03 2.68c0 3.83-2.33 4.68-4.56 4.93a2.4 2.4 0 0 1 .68 1.86V20c0 .26.18.58.69.48A10 10 0 0 0 12 2Z"
                  />
                ),
              },
              {
                href: "https://public.tableau.com/app/profile/devakalyan.adigopula",
                label: "Tableau",
                icon: (
                  <path
                    fill="currentColor"
                    d="M11 2h2v4h4v2h-4v4h-2V8H7V6h4V2zm-6 9h2v2H5v2H3v-2H1v-2h2V9h2v2zm16 0h2v2h-2v2h-2v-2h-2v-2h2V9h2v2zM11 18h2v4h4v2h-4v4h-2v-4H7v-2h4v-4z"
                  />
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                title={s.label}
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full
                           border border-white/20 bg-white/[0.06] backdrop-blur hover:bg-white/[0.14]
                           transition shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_24px_rgba(0,0,0,.45)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}