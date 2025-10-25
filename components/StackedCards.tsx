// components/StackedCards.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects as projectData } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function StackedCards({
  items = projectData,
  id = "projects",
}: {
  items?: typeof projectData;
  id?: string;
}) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".c-card");
      if (!cards.length) return;

      const lastCardIndex = cards.length - 1;

      // Create “start positions” triggers like the sample
      const firstCardST = ScrollTrigger.create({
        trigger: cards[1] || cards[0],
        start: "center center",
      });

      const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: "center center",
      });

      // initial state: slightly smaller except the last one (top)
      cards.forEach((card, index) => {
        const scale = index === lastCardIndex ? 1 : 0.5;
        gsap.set(card, { scale, transformOrigin: "center center" });

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: () => lastCardST.start, // pin until the last card reaches center
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
          ease: "none",
          animation: gsap.to(card, { scale }),
          toggleActions: "restart none none reverse",
        });
      });
    }, rootRef);

    // refresh after load
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section id={id} ref={rootRef} className="bg-[#0a0a0a] text-white">
      <header className="max-w-[1024px] mx-auto px-5 py-16 text-center">
        <p className="mb-4 text-white/80 tracking-[0.18em] text-xs">PROJECTS</p>
        <h2 className="mb-6 text-[clamp(28px,4vw,44px)] font-semibold">
          Selected Work
        </h2>
        <div className="mb-6 text-[15px] leading-7 text-white/80">
          Scroll to explore a stacked, cinematic view of my recent analytics &
          process projects. Each card highlights the tool, the story, and the impact.
        </div>
      </header>

      <div className="l-cards w-full max-w-[1200px] mx-auto">
        {items.map((p) => (
          <div className="c-card" key={p.slug}>
            <div className="c-card__description">
              <div className="c-card__tagline">{p.stack}</div>
              <h3 className="c-card__title">{p.title}</h3>
              <div className="c-card__excerpt">{p.summary}</div>
              <div className="c-card__cta">
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer">
                    {p.cta ?? "View Project"}
                  </a>
                )}
              </div>
            </div>

            <figure className="c-card__figure">
              {/* Uses your saved paths:
                 /aa-review.jpg
                 /projects/looker.jpg
                 /projects/lucid.jpg */}
              {p.image && (
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  priority={false}
                  className="object-cover"
                />
              )}
            </figure>
          </div>
        ))}
      </div>

      <div className="spacer" />
    </section>
  );
}