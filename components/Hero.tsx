"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const textEls = textRef.current?.querySelectorAll(".fade-in-up");
      if (textEls) {
        gsap.fromTo(
          textEls,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
          }
        );
      }

      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, y: 60, scale: 1.1 },
          { opacity: 1, y: 0, scale: 1, duration: 2.2, ease: "power3.out", delay: 0.8 }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] w-full overflow-hidden bg-black text-white"
    >
      <div className="absolute inset-0 -z-20 bg-black" />
      <div className="absolute -z-10 -top-[22%] -left-[12%] h-[170%] w-[160%] rotate-[-18deg] bg-gradient-to-b from-white/[0.07] via-transparent to-transparent blur-[120px] opacity-45 pointer-events-none" />

      <div className="mx-auto grid w-[min(1200px,92%)] grid-cols-1 items-center gap-10 pt-6 md:grid-cols-2 md:pt-4">
        {/* LEFT — Text */}
        <div ref={textRef} className="-translate-y-1 md:-translate-y-2">
          <p className="fade-in-up text-[clamp(20px,2.4vw,30px)] font-semibold tracking-wide text-white/90">
            Hello, I’m
          </p>

          <div className="h-4" />

          <h1 className="fade-in-up text-[clamp(44px,6.8vw,90px)] leading-[0.95] font-extrabold tracking-[-0.02em] text-white">
            Devakalyan
            <span className="block text-zinc-400 text-[clamp(36px,6vw,70px)]">
              Adigopula
            </span>
          </h1>

          <div className="h-4" />

          <p className="fade-in-up max-w-[46ch] text-[15.5px] leading-[1.75] text-zinc-300/90 text-justify">
            With <b>3+ years</b> of experience as a Business Analyst, I specialize in requirements
            gathering, data visualization, and process optimization bridging business goals with
            technical delivery to drive measurable performance and growth.
          </p>

          {/* Minimal Premium CTAs (added Resume beside See my work) */}
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-premium">
              <span className="label">See my work</span>
            </Link>
            <a
              href="/Deva_Business_Analyst_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium"
            >
              <span className="label">View Resume</span>
            </a>
          </div>
        </div>

        {/* RIGHT — Portrait */}
        <div className="relative flex items-center justify-center">
          {/* neutral, no gradient glow (keeps depth without tint) */}
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
        </div>
      </div>

      {/* Floating socials (desktop only) */}
      <div className="hidden md:flex flex-col gap-3 absolute right-6 top-1/2 -translate-y-1/2 z-20">
        {/* Email */}
        <a
          href="mailto:devakalyan242@gmail.com"
          aria-label="Email"
          title="Email"
          className="h-10 w-10 grid place-items-center rounded-full bg-white text-black shadow hover:bg-white/90 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.6" />
            <path d="m4 7 8 5 8-5" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </a>

        {/* LinkedIn — update with your actual profile if needed */}
        <a
          href="https://linkedin.com/in/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
          className="h-10 w-10 grid place-items-center rounded-full bg-white text-black shadow hover:bg-white/90 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6.94 6.5A2.44 2.44 0 1 1 4.5 4.06 2.44 2.44 0 0 1 6.94 6.5M4.75 8.33h4.4V20h-4.4zM11.07 8.33h4.22v1.58h.06a4.63 4.63 0 0 1 4.16-2.29c4.45 0 5.27 2.93 5.27 6.73V20h-4.4v-4.8c0-1.14 0-2.6-1.58-2.6s-1.83 1.23-1.83 2.52V20h-4.4z"/>
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/kalyanL16"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          className="h-10 w-10 grid place-items-center rounded-full bg-white text-black shadow hover:bg-white/90 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.49v-1.71c-2.78.6-3.36-1.19-3.36-1.19c-.45-1.15-1.11-1.46-1.11-1.46c-.9-.62.07-.61.07-.61c1 .07 1.53 1.03 1.53 1.03c.89 1.53 2.34 1.09 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.56-1.11-4.56-4.95c0-1.09.39-1.98 1.03-2.68c-.1-.25-.45-1.27.1-2.64c0 0 .84-.27 2.75 1.02c.8-.22 1.66-.33 2.51-.33s1.71.11 2.51.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.37.2 2.39.1 2.64c.64.7 1.03 1.59 1.03 2.68c0 3.85-2.34 4.69-4.57 4.94c.36.31.68.92.68 1.86v2.76c0 .27.18 .59.69 .49A10 10 0 0 0 12 2z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}