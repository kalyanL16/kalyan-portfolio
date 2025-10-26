// components/Education.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Bidirectional reveal (down + up) */
function useReveal(ref: React.RefObject<HTMLElement | null>, selector = ".edu-fade") {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!items.length) return;

    // initial
    items.forEach((el, i) => {
      el.style.transition =
        "transform .8s cubic-bezier(.2,.8,.2,1), opacity .7s ease";
      el.style.transitionDelay = `${i * 80}ms`;
      el.classList.add("opacity-0", "translate-y-6");
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.add("!opacity-100", "!translate-y-0");
          } else {
            el.classList.remove("!opacity-100", "!translate-y-0");
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ref, selector]);
}

export default function Education() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useReveal(sectionRef);

  const [src, setSrc] = useState("/education/dev.jpg");

  return (
    <section id="education" ref={sectionRef} className="relative bg-[#0b0f17] text-white">
      <div className="py-20 md:py-28">
        <div className="mx-auto w-[min(1200px,92%)] grid gap-12 md:grid-cols-2 md:gap-14 items-center">
          {/* LEFT — Portrait with spotlight + feather mask */}
          <div className="relative mx-auto md:mx-0">
            {/* neutral spotlight */}
            <div className="absolute -inset-24 -z-10 pointer-events-none">
              <div
                className="absolute left-1/2 top-1/2 h-[140%] w-[140%]
                           -translate-x-1/2 -translate-y-1/2 rounded-full
                           bg-[radial-gradient(closest-side,rgba(255,255,255,0.10),rgba(255,255,255,0)_70%)]
                           blur-[120px] opacity-80"
              />
            </div>

            {/* add edu-fade so the image animates too */}
            <div className="relative aspect-[4/5] w-[min(520px,86vw)] edu-fade">
              <Image
                src={src}
                alt="Devakalyan Adigopula"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                onError={() => setSrc("/hero-kalyan.png")}
                className={[
                  "object-cover object-top",
                  "[filter:brightness(1.06)_contrast(1.05)_saturate(1.04)]",
                  "[--feather:radial-gradient(150%_140%_at_58%_52%,#000_68%,rgba(0,0,0,0)_92%)]",
                  "[-webkit-mask-image:var(--feather)]",
                  "[mask-image:var(--feather)]",
                ].join(" ")}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(95%_85%_at_50%_45%,rgba(0,0,0,0)_60%,rgba(0,0,0,0.22)_100%)]" />
            </div>
          </div>

          {/* RIGHT — Copy (unchanged) */}
          <div className="relative">
            <div className="edu-fade mb-3 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-white/70">
              <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-80">
                <path
                  d="M21 3s-6 1-10 5-5 10-5 10 6-1 10-5 5-10 5-10Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              <span>EDUCATION</span>
            </div>

            <h2 className="edu-fade text-[clamp(28px,6vw,54px)] font-extrabold leading-[1.02]">
              ENLIGHTENED THE <br />
              <span className="text-white/85">PATHWAYS</span>
            </h2>

            <p className="edu-fade mt-5 max-w-[58ch] text-[15.5px] leading-[1.8] text-white/80">
              I bridge formal analytics education with real-world delivery. My Master’s in Business
              Analytics sharpens statistical thinking and data strategy, while hands-on experience
              across enterprise environments like <b>Wipro</b> and <b>Reliance Communications</b> shaped my
              approach to requirements, process modeling, and measurable outcomes. I connect
              stakeholder needs to technical execution making analysis a business advantage.
            </p>

            <div className="mt-8 space-y-6">
              {/* Item 1 */}
              <div className="edu-fade grid grid-cols-[44px_1fr] items-start gap-4">
                <div className="mt-1 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="M22 9L12 5 2 9l10 4 7-2.8V14M6 10v4c2 1.5 4 2.5 6 2.5S16 15.5 18 14v-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">University of Scranton</h3>
                  <p className="text-white/75">
                    Master’s in Business Analytics — <b>GPA 3.93/4.0</b>
                  </p>
                  <p className="text-white/55 text-sm">2023 — 2025</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="edu-fade grid grid-cols-[44px_1fr] items-start gap-4">
                <div className="mt-1 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path
                      d="M4 19a3 3 0 0 1 3-3h13M4 5h14a2 2 0 0 1 2 2v12M4 5v14a2 2 0 0 0 2 2h13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    Anil Neerukonda Institute of Technology &amp; Sciences
                  </h3>
                  <p className="text-white/75">
                    Bachelor’s in Electronics &amp; Communication Engineering
                  </p>
                  <p className="text-white/55 text-sm">2019 — 2022</p>
                </div>
              </div>
            </div>

            <div className="edu-fade mt-10 h-px w-full bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}