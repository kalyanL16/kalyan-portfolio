// components/RotatingCards.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as projectData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  slug: string;
  stack: string;
  title: string;
  summary: string;
  image?: string;
  link?: string;
  cta?: string;
  year?: string | number;
  tags?: string[];
};

export default function RotatingCards({
  items = projectData,
  id = "projects",
}: {
  items?: Project[];
  id?: string;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const deckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || !deckRef.current) return;

    const cards = Array.from(
      deckRef.current.querySelectorAll<HTMLElement>("[data-card]")
    );

    // Initial state for each card
    cards.forEach((card, idx) => {
      gsap.set(card, {
        opacity: 0,
        rotateY: -18,
        y: 80 + idx * 30, // slight offset stack
        scale: 0.96,
        zIndex: cards.length - idx, // top card has higher z
      });
    });

    // Pin the whole section and scrub through progress
    const totalDistance = Math.max(1200, 500 * cards.length); // scroll distance
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: `+=${totalDistance}`,
      scrub: 0.6,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress; // 0..1
        // map progress to each card
        cards.forEach((card, i) => {
          // each card gets a local progress window across the full scroll
          // spread across 0..1 (cardCount windows)
          const step = 1 / cards.length;
          const start = i * step - 0.1; // slight early entry
          const end = start + step + 0.15; // linger
          const t = clamp01((p - start) / (end - start));

          // ease for prettier motion
          const e = gsap.parseEase("power3.out")(t);

          // position/rotation per card
          const lift = lerp(80 + i * 30, 0, e);
          const rotY = lerp(-18, 0, e);
          const sc = lerp(0.96, 1.0, e);
          const op = lerp(0.0, 1.0, smoothstep(0, 0.25, t));

          gsap.set(card, {
            y: lift,
            rotateY: rotY,
            scale: sc,
            opacity: op,
            zIndex: i === Math.floor(p * cards.length + 0.5) ? 100 : cards.length - i,
            filter: `saturate(${1 + 0.05 * e}) contrast(${1 + 0.05 * e})`,
          });
        });
      },
    });

    // Utility functions
    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }
    function clamp01(x: number) {
      return Math.max(0, Math.min(1, x));
    }
    function smoothstep(edge0: number, edge1: number, x: number) {
      const t = clamp01((x - edge0) / (edge1 - edge0));
      return t * t * (3 - 2 * t);
    }

    // Refresh after fonts/images
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      st.kill();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative rc-wrap bg-[#0a0a0a] text-white"
    >
      <div className="mx-auto w-[min(1180px,92%)] py-10 md:py-16">
        <h2 className="mb-6 text-center text-sm tracking-[0.28em] text-white/70">
          PROJECT SHOWCASE
        </h2>
      </div>

      {/* Deck area (pinned) */}
      <div
        ref={deckRef}
        className="rc-stage mx-auto w-[min(1180px,92%)]"
        style={{ perspective: "1400px" }}
      >
        {items.map((p, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <article
              key={p.slug}
              data-card
              className="rc-card grid items-center gap-8 rounded-2xl bg-white/[0.02] p-4 ring-1 ring-white/5 md:grid-cols-12 will-change-transform"
            >
              {/* IMAGE SIDE */}
              <div
                className={`md:col-span-7 ${
                  imageLeft ? "md:order-1" : "md:order-2"
                }`}
              >
                <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-900/40 shadow-[0_30px_80px_rgba(0,0,0,.35)]">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={1200}
                      height={800}
                      unoptimized
                      className="h-auto w-full object-cover"
                    />
                  )}
                </div>
                {p.year && (
                  <div className="mt-3 text-xs text-white/60">{p.year}</div>
                )}
              </div>

              {/* TEXT SIDE */}
              <div
                className={`md:col-span-5 ${
                  imageLeft ? "md:order-2" : "md:order-1"
                }`}
              >
                {/* Tool pill */}
                {p.stack && (
                  <div className="mb-3 inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] tracking-[0.18em] text-white/80">
                    {p.stack.toUpperCase()}
                  </div>
                )}

                <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">
                  {p.title}
                </h3>

                <p className="text-zinc-300/90 leading-relaxed mb-4">
                  {p.summary}
                </p>

                {p.tags && p.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300 ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:bg-white/90 transition"
                  >
                    {p.cta ?? "View Project"} <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* space below pin so the next section doesn’t jump */}
      <div className="h-24 md:h-36" />
    </section>
  );
}