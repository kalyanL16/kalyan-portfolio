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

          {/* Minimal Premium CTA */}
          <div className="mt-10">
            <Link href="/projects" className="btn-premium">
              See my work
            </Link>
          </div>
        </div>

        {/* RIGHT — Portrait */}
        <div className="relative flex items-center justify-center">
            {/* neutral, no gradient glow (keeps depth without tint) */}
            <div className="absolute z-0 h-[85%] w-[85%] rounded-full bg-white/[0.06] blur-[70px] opacity-60" />          <div ref={imgRef} className="relative z-10">
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
    </section>
  );
}