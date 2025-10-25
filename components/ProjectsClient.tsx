"use client";

import Image from "next/image";
import { useEffect } from "react";
import { projects as projectData } from "@/data/projects";

/**
 * Drop-in “rotate cards on scroll”.
 * - Alternates image/text left-right
 * - Uses IntersectionObserver (no extra libs)
 * - Plays once per card
 */
export default function ProjectsClient({
  projects = projectData,
  id = "projects",
}: {
  projects?: typeof projectData;
  id?: string;
}) {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(".rotate-card")
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // small stagger using DOM order
            const i = Number((e.target as HTMLElement).dataset.idx || 0);
            setTimeout(() => e.target.classList.add("is-visible"), i * 90);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -5% 0px" }
    );

    cards.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} className="mx-auto w-[min(1180px,92%)] py-16 md:py-24">
      <h2 className="mb-10 text-center text-sm tracking-[0.28em] text-white/70">
        PROJECT SHOWCASE
      </h2>

      <div className="rotate-stage space-y-16 md:space-y-20">
        {projects.map((p, i) => {
          const imageLeft = i % 2 === 0;
          return (
            <article
              key={p.slug}
              data-idx={i}
              className="rotate-card grid items-center gap-10 rounded-2xl bg-white/0 p-2 md:grid-cols-2"
            >
              {/* image */}
              <div className={imageLeft ? "" : "order-last md:order-none"}>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={1024}
                      height={640}
                      unoptimized
                      className="h-auto w-full object-cover"
                    />
                  )}
                </div>
                <div className="mt-3 text-sm text-white/60">{p.year}</div>
              </div>

              {/* text */}
              <div className="space-y-4">
                <div className="inline-flex rounded-full border border-white/15 px-3 py-1 text-[11px] tracking-[0.18em] text-white/70">
                  {p.stack.toUpperCase()}
                </div>
                <h3 className="text-2xl font-semibold leading-tight">
                  {p.title}
                </h3>
                <p className="text-white/80 leading-relaxed">{p.summary}</p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags?.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/90 hover:border-white/35 hover:bg-white/5"
                  >
                    {p.cta ?? "View Project"}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}