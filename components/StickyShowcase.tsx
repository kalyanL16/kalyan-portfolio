"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export default function StickyShowcase() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapRef.current) return;

    let raf1: number | null = null;
    let raf2: number | null = null;
    let cleanup: (() => void) | null = null;

    const start = () => {
      const ctx = gsap.context(() => {
        // Pin the section and animate the visual as you scroll
        ScrollTrigger.create({
          trigger: wrapRef.current!,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: true,
          pinType: document.body.style.transform ? "transform" : "fixed",
        });

        if (visualRef.current) {
          gsap.fromTo(
            visualRef.current,
            { scale: 0.9, rotate: -2, y: 40, opacity: 0.7 },
            {
              scale: 1.06,
              rotate: 0,
              y: -10,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: wrapRef.current!,
                start: "top top",
                end: "+=150%",
                scrub: true,
              },
            }
          );
        }
      }, wrapRef);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    };

    // Delay to ensure hydration & layout done before pinning
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        cleanup = start();
      });
    });

    return () => {
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[160vh] bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(1000px_800px_at_70%_40%,#111_0%,#000_70%)]" />
      <div className="mx-auto grid h-full w-[min(1200px,92%)] grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="max-w-[46ch] text-zinc-300/90 text-justify">
          <h2 className="mb-4 text-3xl font-semibold text-white">Scroll Storytelling</h2>
          <p>
            Sticky positioning and scroll-scrub animation create a cinematic reveal. Use this panel
            to highlight a key project, KPI impact, or a before/after transformation—mirroring the
            premium feel of product hero pages.
          </p>
        </div>
        <div ref={visualRef} className="relative mx-auto w-[520px]">
          <div className="absolute -inset-10 -z-10 rounded-3xl bg-white/5 blur-[60px]" />
          <Image
            src="/hero-kalyan.png"
            alt="Showcase"
            width={1000}
            height={1200}
            className="rounded-3xl object-contain"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}