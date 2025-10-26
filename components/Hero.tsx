"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  "Strategic Requirements Engineering",
  "Process Optimization & Mapping",
  "Data-Driven Solution Validation (UAT & QA)",
  "Stakeholder Synthesis & Change Management",
  "BI and Data Storytelling",
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  const arcWrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const labelRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (!prefersReduced) {
        const textEls = textRef.current?.querySelectorAll(".fade-in-up");
        if (textEls && textEls.length) {
          gsap.fromTo(
            textEls,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", stagger: 0.2 }
          );
        }
      } else {
        textRef.current?.querySelectorAll<HTMLElement>(".fade-in-up").forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }

      if (imgRef.current) {
        if (!prefersReduced) {
          gsap.fromTo(
            imgRef.current,
            { opacity: 0, y: 60, scale: 1.1 },
            { opacity: 1, y: 0, scale: 1, duration: 2.2, ease: "power3.out", delay: 0.8 }
          );
        } else {
          imgRef.current.style.opacity = "1";
          imgRef.current.style.transform = "none";
        }
      }

      if (arcWrapRef.current && pathRef.current) {
        const totalDash = 1400;
        gsap.set(pathRef.current, {
          strokeDasharray: totalDash,
          strokeDashoffset: 0,
          opacity: 1,
        });
        gsap.set(labelRef.current, { opacity: 1 });

        if (!prefersReduced) {
          gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "bottom-=30% bottom",
              end: "bottom top+=12%",
              scrub: 1,
            },
          })
            .to(pathRef.current, { strokeDashoffset: -totalDash, ease: "none" }, 0)
            .to([pathRef.current, labelRef.current], { opacity: 0, ease: "power2.out" }, 0.1);
        } else {
          gsap.set([pathRef.current, labelRef.current], { opacity: 1 });
        }
      }
    }, sectionRef);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const buttons = Array.from(document.querySelectorAll<HTMLElement>(".magnetic"));
    const strength = 18;
    const listeners: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];

    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        gsap.to(btn, { x: dx / strength, y: dy / strength, scale: 1.02, duration: 0.25, ease: "power3.out" });
      };
      const onLeave = () => {
        gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.25, ease: "power3.out" });
      };
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      listeners.push([btn, onMove, onLeave]);
    });

    return () => {
      listeners.forEach(([btn, move, leave]) => {
        btn.removeEventListener("mousemove", move);
        btn.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[92vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0 -z-20 bg-black" />
      <div className="absolute -z-10 -top-[22%] -left-[12%] h-[170%] w-[160%] rotate-[-18deg] bg-gradient-to-b from-white/[0.07] via-transparent to-transparent blur-[120px] opacity-45 pointer-events-none" />

      <div className="mx-auto grid w-[min(1200px,92%)] grid-cols-1 items-center gap-10 pt-6 md:grid-cols-2 md:pt-4">
        {/* LEFT — Text */}
        <div ref={textRef} className="relative">
          <p className="fade-in-up text-[clamp(20px,2.4vw,30px)] font-semibold tracking-wide text-white/90">
            {/* no shimmer here */}
            Hello, I’m
          </p>

          <h1 className="fade-in-up mt-2 text-[clamp(44px,6.8vw,90px)] leading-[0.95] font-extrabold text-white">
            <span className="shimmer-once">DEVAKALYAN</span>
            <span className="block shimmer-once text-zinc-400 text-[clamp(36px,6vw,70px)]">
              ADIGOPULA
            </span>
          </h1>

          <p className="fade-in-up mt-4 max-w-[46ch] text-[15.5px] leading-[1.75] text-zinc-300/90 text-justify">
            With <b>3+ years</b> of experience as a Business Analyst, I specialize in requirements
            gathering, data visualization, and process optimization bridging business goals with
            technical delivery to drive measurable performance and growth.
          </p>

          {/* Buttons with glossy sweep restored */}
          <div className="fade-in-up mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="magnetic group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                         text-white/90 border border-white/20 rounded-full overflow-hidden
                         backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12]
                         transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="tracking-wide">See my work</span>
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r
                           from-transparent via-white/40 to-transparent opacity-0
                           group-hover:opacity-100 translate-x-[-100%]
                           group-hover:translate-x-[100%] transition-all duration-700 ease-out"
              />
            </Link>

            <Link
              href="/Deva_Business_Analyst_Resume.pdf"
              target="_blank"
              className="magnetic group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium
                         text-white/90 border border-white/20 rounded-full overflow-hidden
                         backdrop-blur-md bg-white/[0.06] hover:bg-white/[0.12]
                         transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="tracking-wide">Resume</span>
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-r
                           from-transparent via-white/40 to-transparent opacity-0
                           group-hover:opacity-100 translate-x-[-100%]
                           group-hover:translate-x-[100%] transition-all duration-700 ease-out"
              />
            </Link>
          </div>

          {/* Core Skills (unchanged) */}
          <div className="fade-in-up mt-8">
            <div className="mb-2 text-[11px] tracking-[0.22em] text-white/60">CORE SKILLS</div>
            <ul className="flex flex-wrap gap-2">
              {SKILLS.map((s) => (
                <li key={s}>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[12.5px] text-white/90 backdrop-blur hover:bg-white/[0.12] transition">
                    <svg width="12" height="12" viewBox="0 0 20 20">
                      <path d="M7.5 13.5 4.5 10.5M7.5 13.5 15.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT — Portrait + Social Rail (unchanged) */}
        <div className="relative flex items-center justify-center">
          <div className="absolute z-0 h-[85%] w-[85%] rounded-full bg-white/[0.06] blur-[70px] opacity-60" />
          <div ref={imgRef} className="relative z-10">
            <Image
              src="/hero-kalyan.png"
              alt="Devakalyan Adigopula"
              width={1200}
              height={1500}
              priority
              unoptimized
              className="w-full max-w-[560px] h-auto object-contain object-right
                         [filter:brightness(1.22)_contrast(1.12)_saturate(1.12)]
                         mix-blend-screen"
            />
          </div>

          {/* Social Rail */}
          <div className="hidden md:flex flex-col gap-3 absolute right-2 top-1/2 -translate-y-1/2 z-20">
            {[
              {
                href: "https://www.linkedin.com/in/kalyan-adigopula/",
                label: "LinkedIn",
                icon: (
                  <path fill="currentColor" d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5ZM5.5 8.25h2.88V20H5.5ZM10.5 8.25h2.76v1.6h.04a3.02 3.02 0 0 1 2.71-1.49c2.9 0 3.43 1.91 3.43 4.39V20h-2.88v-4.94c0-1.18 0-2.69-1.64-2.69s-1.89 1.28-1.89 2.6V20H10.5Z" />
                ),
              },
              {
                href: "https://github.com/kalyanL16",
                label: "GitHub",
                icon: (
                  <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48V19.4c-2.78.6-3.37-1.19-3.37-1.19a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.14 2.14 0 0 0 2.92.83 2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.93a3.86 3.86 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.03a9.42 9.42 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03a3.6 3.6 0 0 1 .1 2.65 3.86 3.86 0 0 1 1.03 2.68c0 3.83-2.33 4.68-4.56 4.93a2.4 2.4 0 0 1 .68 1.86V20c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                ),
              },
              {
                href: "mailto:devakalyan242@gmail.com",
                label: "Email",
                icon: (
                  <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z" />
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                aria-label={s.label}
                className="group relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] backdrop-blur hover:bg-white/[0.14] transition shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_24px_rgba(0,0,0,.45)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Arc */}
      <div ref={arcWrapRef} className="mt-12 pb-10">
        <div className="flex flex-col items-center">
          <svg className="block w-[92%] max-w-[1200px] h-[120px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="sunrise-hero" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff8a00" />
                <stop offset="50%" stopColor="#ffd54a" />
                <stop offset="100%" stopColor="#ff8a00" />
              </linearGradient>
            </defs>
            <path ref={pathRef} d="M50,110 C300,10 900,10 1150,110" stroke="url(#sunrise-hero)" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>

          <a
            ref={labelRef}
            href="#education"
            className="mt-1 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] tracking-[0.16em] text-white/90 ring-1 ring-white/15 bg-white/[0.06] backdrop-blur hover:bg-white/[0.12] transition"
          >
            Continue Journey ↓
          </a>
        </div>
      </div>
    </section>
  );
}