"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    tag: "TABLEAU",
    title: "American Airlines Review Analysis: Customer Sentiment to KPI",
    summary:
      "An immersive Tableau dashboard translating thousands of reviews into actionable insights — dynamic filters, KPI trends, and sentiment visuals so teams can pinpoint issues and act quickly.",
    href: "https://public.tableau.com/app/profile/devakalyan.adigopula/viz/Book1_17608078541400/Dashboard1",
    ctaText: "View Tableau Dashboard",
    image: "/aa-review.jpg",
  },
  {
    tag: "LOOKER STUDIO",
    title: "Interactive Sales Dashboard: Full-Cycle Data Investigation",
    summary:
      "Transformed raw sales data into an interactive story. Led the full lifecycle from data investigation and planning to design and KPI development for confident, real-time decisions.",
    href: "https://lookerstudio.google.com/u/0/reporting/5661eb4e-8fa4-48fd-90f6-f52f8f1efa10/page/P0hcF?s=gydmKb2pdqs",
    ctaText: "Explore Looker Studio Report",
    image: "/projects/looker.jpg",
  },
  {
    tag: "LUCIDCHART",
    title: "AI-Enabled Process Optimization: Airline Check-in (As-Is vs To-Be)",
    summary:
      "Mapped the manual As-Is check-in against an AI-enabled To-Be model to expose inefficiencies and design a faster, measurable workflow improvement.",
    href: "https://lucid.app/lucidchart/59064455-3305-42db-8c31-ab92c37909ad/edit?viewport_loc=-3675%2C-3641%2C5703%2C3322%2C0_0&invitationId=inv_2133556a-02e3-41bb-9b24-9d0cd7c7b2a6",
    ctaText: "See the Process Flow",
    image: "/projects/lucid.jpg",
  },
];

export default function ProjectsPage() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ScrollTrigger.getAll().forEach((st) => st.kill());

    if (!prefersReduced && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { y: "0%", opacity: 1 },
        {
          y: "-100%",
          opacity: 0,
          duration: 1.6,
          ease: "power2.inOut",
          delay: 0.1,
          onComplete: () => {
            overlayRef.current &&
              overlayRef.current.parentElement?.removeChild(overlayRef.current);
          },
        }
      );
    } else {
      overlayRef.current &&
        overlayRef.current.parentElement?.removeChild(overlayRef.current);
    }

    gsap.fromTo(
      ".intro-fade",
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: prefersReduced ? 0.01 : 1.0,
        ease: "power3.out",
        stagger: prefersReduced ? 0 : 0.08,
        delay: prefersReduced ? 0 : 0.25,
      }
    );

    const cards = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>(".rotate-card") ?? []
    );

    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.965, y: 34, rotateY: -8 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateY: 0,
          duration: prefersReduced ? 0.01 : 1.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: prefersReduced ? 0 : i * 0.03,
        }
      );
    });

    ScrollTrigger.refresh();
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = Array.from(
      listRef.current?.querySelectorAll<HTMLElement>(".rotate-card") ?? []
    );
    const cleanups: Array<() => void> = [];

    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);

        gsap.to(card, {
          rotateY: dx * 5.5,
          rotateX: -dy * 5.5,
          y: -3,
          boxShadow: "0 26px 90px rgba(0,0,0,0.45)",
          transformPerspective: 1000,
          transformOrigin: "center",
          duration: 0.28,
          ease: "power2.out",
        });
      };
      const onLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          boxShadow: "0 20px 60px rgba(0,0,0,0.40)",
          duration: 0.32,
          ease: "power2.out",
        });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-20 bg-[#0b0f17]" />

      {/* Overlay */}
      <div ref={overlayRef} className="fixed inset-0 z-[100] bg-[#0b0f17]" />

      {/* INTRO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <p className="intro-fade text-[16px] md:text-[20px] tracking-[0.28em] font-semibold text-white/70 uppercase">
          FEATURED WORK
        </p>
        <h1 className="intro-fade mt-4 text-4xl md:text-6xl font-semibold">
          Showcasing the Art of Business Analysis
        </h1>
        <p className="intro-fade mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
          Here are my projects, showcasing my end-to-end approach to business analysis.
          Each project translates requirements into optimized Lucidchart process models,
          high-impact Tableau dashboards, and actionable Looker Studio strategies.
        </p>
        <p className="intro-fade mt-8 text-sm text-white/55">Scroll to see projects</p>
      </section>

      {/* PROJECTS */}
      <section ref={listRef} className="mx-auto w-[min(1180px,92%)] pb-24 md:pb-28">
        <div className="space-y-16 md:space-y-20">
          {PROJECTS.map((p, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <article
                key={p.title}
                className="rotate-card rounded-2xl overflow-hidden bg-white/[0.045] border border-white/10 backdrop-blur-[2px] shadow-[0_20px_60px_rgba(0,0,0,0.40)] will-change-transform"
              >
                <div
                  className={`grid items-center gap-8 md:gap-12 md:grid-cols-2 p-5 md:p-8 ${
                    imageLeft ? "" : "md:[&>div:first-child]:order-2"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-black/40">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_30%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.45)_85%)]" />
                  </div>

                  {/* TEXT */}
                  <div className="space-y-4">
                    <span className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-[0.18em] text-white/70">
                      {p.tag}
                    </span>
                    <h3 className="text-2xl md:text-[28px] font-semibold leading-tight">
                      {p.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">{p.summary}</p>
                    <div className="pt-2">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition"
                      >
                        {p.ctaText}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Removed Back-to-Home button completely */}
    </main>
  );
}