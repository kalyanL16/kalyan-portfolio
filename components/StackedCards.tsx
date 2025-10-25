// components/StackedCards.tsx
"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StackedCards() {
  useEffect(() => {
    // kill any old triggers (hot reload safety)
    ScrollTrigger.getAll().forEach((st) => st.kill());

    const cards = gsap.utils.toArray<HTMLElement>(".c-card");
    if (!cards.length) return;

    // Create a trigger for the last card to use as an "end" anchor
    const lastCardTrigger = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: "center center",
    });

    cards.forEach((card, index) => {
      // scale last one to 1, others to 0.5
      const scale = index === cards.length - 1 ? 1 : 0.5;

      // define the animation (ease goes here, not in ScrollTrigger vars)
      const anim = gsap.to(card, { scale, ease: "none" });

      ScrollTrigger.create({
        trigger: card,
        start: "top top",
        end: () => lastCardTrigger.start, // stick until the last card center hits center
        pin: true,
        pinSpacing: false,
        scrub: 0.5,
        animation: anim, // pass the gsap animation here
        toggleActions: "restart none none reverse",
      });
    });

    // refresh after layout
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // This component only wires up the behavior; it doesn't render the cards.
  // Ensure your page renders elements with className="c-card".
  return null;
}