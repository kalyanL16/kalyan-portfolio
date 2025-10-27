// components/SunArcDivider.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function SunArcDivider() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!wrap || !path) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const totalDash = 1400; // tune if you change the path

    const ctx = gsap.context(() => {
      // prep path for “draw” animation (left → right)
      gsap.set(path, {
        strokeDasharray: totalDash,
        strokeDashoffset: totalDash, // fully hidden at start
        opacity: 0,                  // start faded out
      });

      if (prefersReduced) {
        gsap.set(path, { strokeDashoffset: 0, opacity: 1 });
        return;
      }

      // scrubbed timeline that reverses on scroll up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",   // arc begins drawing when divider nears viewport
          end: "bottom 30%",  // finishes + fades by here
          scrub: 1,           // ties to scroll; reverses naturally
        },
      });

      // 1) draw the arc left → right
      tl.fromTo(
        path,
        { strokeDashoffset: totalDash },
        { strokeDashoffset: 0, ease: "none" }, // no easing so the draw looks crisp
        0
      );

      // 2) fade in early in the scroll
      tl.fromTo(
        path,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out" },
        0.05
      );

      // 3) fade out near the end of the scroll range
      tl.to(
        path,
        { opacity: 0, ease: "power2.in" },
        0.8 // later in the timeline so it lingers a bit before fading away
      );
    }, wrap);

    // safety: refresh triggers when mounted
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="my-10 md:my-14">
      <div className="flex items-center justify-center">
        <svg
          className="block w-[92%] max-w-[1200px] h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="sunrise-mid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8a00" />
              <stop offset="50%" stopColor="#ffd54a" />
              <stop offset="100%" stopColor="#ff8a00" />
            </linearGradient>
            <filter id="sunrise-mid-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left → Right arc */}
          <path
            ref={pathRef}
            d="M50,110 C300,10 900,10 1150,110"
            stroke="url(#sunrise-mid)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#sunrise-mid-glow)"
          />
        </svg>
      </div>
    </div>
  );
}