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
    const wrap = wrapRef.current;
    if (!wrap || !pathRef.current) return;

    const dash = 1800;
    gsap.set(pathRef.current, {
      strokeDasharray: dash,
      strokeDashoffset: dash * 0.4,
      opacity: 1,
    });

    const tl = gsap.to(pathRef.current, {
      strokeDashoffset: -dash,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        end: "bottom 30%",
        scrub: 1,
      },
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section aria-hidden="true" className="relative isolate overflow-hidden bg-transparent">
      <div ref={wrapRef} className="mx-auto w-[min(1200px,92%)] py-10">
        <svg className="block h-[100px] w-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wb-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#77aaff" />
              <stop offset="50%" stopColor="#ffd36b" />
              <stop offset="100%" stopColor="#77aaff" />
            </linearGradient>
            <filter id="wb-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            ref={pathRef}
            d="M0,70 C200,20 400,120 600,70 S1000,20 1200,70"
            stroke="url(#wb-grad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#wb-glow)"
          />
        </svg>
      </div>
    </section>
  );
}