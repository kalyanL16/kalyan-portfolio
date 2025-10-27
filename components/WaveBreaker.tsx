// components/WaveBreaker.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function WaveBreaker() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!wrapRef.current || !pathRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dash = 1800;

    gsap.set(pathRef.current, {
      strokeDasharray: dash,
      strokeDashoffset: dash * 0.45, // start partially drawn
      opacity: 1,
    });

    if (!prefersReduced) {
      const st = gsap.to(pathRef.current, {
        strokeDashoffset: -dash,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",      // begins as breaker enters viewport
          end: "bottom top",        // finishes as it leaves
          scrub: 1,                 // tied to scroll, reversible
        },
      });

      return () => {
        st.scrollTrigger?.kill();
        st.kill();
      };
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="relative my-12 md:my-16 select-none"
    >
      {/* soft ambient glows to match hero vibe */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/4 -top-8 h-32 w-32 rounded-full blur-[60px] opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(120,170,255,0.55) 0%, rgba(120,170,255,0) 70%)",
          }}
        />
        <div
          className="absolute right-1/5 -bottom-10 h-36 w-36 rounded-full blur-[70px] opacity-30"
          style={{
            background:
              "radial-gradient(50% 50% at 50% 50%, rgba(255,210,110,0.55) 0%, rgba(255,210,110,0) 70%)",
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        <svg
          className="block w-[92%] max-w-[1200px] h-[110px]"
          viewBox="0 0 1200 110"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#77aaff" />
              <stop offset="50%" stopColor="#ffd36b" />
              <stop offset="100%" stopColor="#77aaff" />
            </linearGradient>
            <filter id="wave-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* gentle wave */}
          <path
            ref={pathRef}
            d="
              M0,75
              C180,25  360,125  540,75
              S900,25  1080,75
              S1200,75 1200,75
            "
            stroke="url(#wave-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#wave-glow)"
          />
        </svg>
      </div>
    </div>
  );
}