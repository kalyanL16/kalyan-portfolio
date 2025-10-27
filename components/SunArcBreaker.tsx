"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SunArcBreaker() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const totalDash = 1400;

    // ✅ Start hidden (fully offset so it draws left → right)
    gsap.set(path, {
      strokeDasharray: totalDash,
      strokeDashoffset: totalDash, 
      opacity: 0,
    });

    if (!prefersReduced) {
      gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 1,
        },
      })
        // ✅ Reverse the direction: from totalDash → 0
        .to(path, { strokeDashoffset: 0, opacity: 1, ease: "none" }, 0)
        .to(path, { opacity: 0.2, ease: "power2.out" }, 0.2);
    } else {
      gsap.set(path, { strokeDashoffset: 0, opacity: 1 });
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      ref={wrapRef}
      aria-hidden="true"
      className="relative py-10 md:py-12 bg-transparent"
    >
      <div className="flex items-center justify-center">
        <svg
          className="block w-[92%] max-w-[1200px] h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sunrise-breaker-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8a00" />
              <stop offset="50%" stopColor="#ffd54a" />
              <stop offset="100%" stopColor="#ff8a00" />
            </linearGradient>
            <filter id="sunrise-breaker-glow-2" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            ref={pathRef}
            d="M50,110 C300,10 900,10 1150,110"
            stroke="url(#sunrise-breaker-2)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#sunrise-breaker-glow-2)"
          />
        </svg>
      </div>
    </section>
  );
}