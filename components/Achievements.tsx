"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".achv-card");

      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            delay: i * 0.25, // staggered, smoother timing
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 70%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // gentle float on scroll for depth
        gsap.to(card, {
          y: -15,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative bg-[#0b0f17] text-white py-20 md:py-28 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div
          className="absolute -left-[20%] top-[-10%] h-[60vh] w-[60vh] rounded-full blur-[120px] opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(80,160,255,0.35) 0%, rgba(80,160,255,0) 70%)",
          }}
        />
        <div
          className="absolute -right-[15%] bottom-[-10%] h-[70vh] w-[70vh] rounded-full blur-[140px] opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,190,90,0.35) 0%, rgba(255,190,90,0) 70%)",
          }}
        />
      </div>

      <div className="mx-auto w-[min(1100px,92%)]">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-white/70">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.8 6.6 19.8l1-6.1L3.2 9.4l6.1-.9L12 3z"
                fill="currentColor"
                className="opacity-80"
              />
            </svg>
            <span>ACHIEVEMENTS</span>
          </div>

          <h2 className="text-[clamp(28px,6vw,48px)] font-extrabold leading-[1.05]">
            Milestones That Shaped My Craft
          </h2>
          <p className="mt-4 max-w-[70ch] mx-auto text-[15.5px] leading-[1.8] text-white/80">
            Just three but meaningful. These show how I blend academic rigor with
            real operational improvements and team impact.
          </p>
          <div className="mx-auto mt-6 mb-12 h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Wipro */}
          <div className="achv-card group rounded-2xl border border-white/10 bg-white/[.03] p-5 md:p-6 backdrop-blur-sm hover:bg-white/[.06] hover:border-amber-400/40 hover:shadow-[0_0_30px_-5px_rgba(255,191,0,.25)] transition duration-700">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10 mb-5">
              <Image
                src="/achievements/wipro-award.jpg"
                alt="Best Contributor Award – Wipro"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Best Contributor Award — Wipro
            </h3>
            <p className="text-white/80 text-[15px] leading-relaxed">
              Recognized for <b>outstanding performance, innovation, and teamwork</b> in
              enterprise project delivery at Wipro. Led process refinement and data
              accuracy initiatives that <b>improved reporting efficiency</b> and
              <b> accelerated decision-making</b>.
            </p>
          </div>

          {/* Omega Rho */}
          <div className="achv-card group rounded-2xl border border-white/10 bg-white/[.03] p-5 md:p-6 backdrop-blur-sm hover:bg-white/[.06] hover:border-amber-400/40 hover:shadow-[0_0_30px_-5px_rgba(255,191,0,.25)] transition duration-700">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10 mb-5">
              <Image
                src="/achievements/omega-rho.jpg"
                alt="Omega Rho Induction – University of Scranton"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Omega Rho Induction — University of Scranton
            </h3>
            <p className="text-white/80 text-[15px] leading-relaxed">
              Inducted into <b>Omega Rho</b>, the International Honor Society for
              Operations Research & Management Science, celebrating
              <b> academic excellence</b>, <b>analytical problem-solving</b>, and
              <b> leadership in decision science</b>.
            </p>
            <a
              href="https://lnkd.in/gSqnu9Vx"
              target="_blank"
              className="mt-2 inline-block text-sm text-amber-400 hover:text-amber-300 transition-colors"
            >
              Read More →
            </a>
          </div>

          {/* BGS */}
          <div className="achv-card group rounded-2xl border border-white/10 bg-white/[.03] p-5 md:p-6 backdrop-blur-sm hover:bg-white/[.06] hover:border-amber-400/40 hover:shadow-[0_0_30px_-5px_rgba(255,191,0,.25)] transition duration-700">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10 mb-5">
              <Image
                src="/achievements/bgs.jpg"
                alt="Beta Gamma Sigma (BGS) Membership"
                fill
                className="object-[center_35%] object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">
              Beta Gamma Sigma (BGS)
            </h3>
            <p className="text-white/80 text-[15px] leading-relaxed">
              Earned lifetime membership in <b>Beta Gamma Sigma</b>, recognizing the
              <b> top 10% of graduate business students</b> from AACSB-accredited
              institutions. Reflects a legacy of <b>academic excellence</b> and
              <b> ethical leadership</b>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}