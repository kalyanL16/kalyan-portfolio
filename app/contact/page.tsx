// app/contact/page.tsx
import Link from "next/link";

export const metadata = {
  title: "Contact — Devakalyan Adigopula",
  description:
    "Get in touch with Devakalyan: what I know, what I do, what I'm looking for, and how to contact me.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-[#0b0f17] text-white overflow-hidden">
      {/* Ambient backdrop glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[15%] top-[5%] h-[55vh] w-[55vh] rounded-full blur-[120px] opacity-30"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(120,180,255,0.35) 0%, rgba(120,180,255,0) 70%)" }} />
        <div className="absolute -right-[20%] bottom-[-10%] h-[70vh] w-[70vh] rounded-full blur-[140px] opacity-30"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(255,195,95,0.35) 0%, rgba(255,195,95,0) 70%)" }} />
      </div>

      <section id="contact" className="mx-auto w-[min(1100px,92%)] py-20 md:py-28">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-3 inline-flex items-center gap-2 text-xs tracking-[0.22em] text-white/70">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path d="M12 2l2.39 4.85 5.35.78-3.87 3.77.91 5.32L12 14.9 6.22 16.72l.91-5.32-3.87-3.77 5.35-.78L12 2Z"
                    fill="currentColor" className="opacity-80"/>
            </svg>
            <span>ABOUT / CONTACT</span>
          </div>

          <h1 className="text-[clamp(28px,6vw,48px)] font-extrabold leading-[1.05]">
            Let’s Collaborate
          </h1>
          <p className="mt-4 max-w-[70ch] mx-auto text-[15.5px] leading-[1.8] text-white/80">
            Here’s a quick snapshot of what I bring, what I do, and what I’m looking for.
          </p>
          <div className="mx-auto mt-6 h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* What I know */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-3">What I know</h2>
            <ul className="space-y-2 text-white/85 text-sm leading-relaxed">
              <li>• Power BI, Tableau, Looker Studio</li>
              <li>• SQL, Microsoft Fabric, Excel Power Query</li>
              <li>• Requirements elicitation & BPMN</li>
              <li>• UAT, QA, and acceptance criteria</li>
              <li>• Jira / Azure DevOps workflows</li>
              <li>• Data storytelling & stakeholder reporting</li>
            </ul>
          </div>

          {/* What I am (professionally) */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-3">What I am (professionally)</h2>
            <p className="text-white/85 text-sm leading-relaxed">
              A Business Analyst who translates business strategy into measurable delivery.
              I connect stakeholders to engineers, craft precise requirements, model processes,
              validate solutions, and surface insights that drive decisions.
            </p>
          </div>

          {/* What I want */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold mb-3">What I want</h2>
            <p className="text-white/85 text-sm leading-relaxed">
              Roles where I can own discovery → delivery: Business Analyst / BI Analyst positions
              focused on process improvement, analytics, and stakeholder impact.
            </p>
          </div>
        </div>

        {/* Get in touch */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8 backdrop-blur-sm relative">
          <h3 className="text-xl md:text-2xl font-semibold">Get in touch</h3>
          <p className="mt-3 text-white/85">
            Email:{" "}
            <a href="mailto:devakalyan242@gmail.com" className="underline decoration-white/30 hover:decoration-white">
              devakalyan242@gmail.com
            </a>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/Deva_Business_Analyst_Resume.pdf"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06]
                         px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/[0.12] transition"
            >
              Download Resume
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06]
                         px-4 py-2 text-sm font-medium text-white/90 hover:bg-white/[0.12] transition"
            >
              See Projects
            </Link>
          </div>

          {/* Right-side external floating rail (within this section on desktop) */}
          <div className="hidden md:flex flex-col gap-3 absolute right-4 top-1/2 -translate-y-1/2">
            {[
              {
                href: "https://www.linkedin.com/in/kalyan-adigopula/",
                label: "LinkedIn",
                icon: (
                  <path fill="currentColor" d="M6.94 6.5A1.94 1.94 0 1 1 5 4.56 1.94 1.94 0 0 1 6.94 6.5ZM5.5 8.25h2.88V20H5.5ZM10.5 8.25h2.76v1.6h.04a3.02 3.02 0 0 1 2.71-1.49c2.9 0 3.43 1.91 3.43 4.39V20h-2.88v-4.94c0-1.18 0-2.69-1.64-2.69s-1.89 1.28-1.89 2.6V20H10.5Z" />
                ),
              },
              {
                href: "https://github.com/kalyanL16",
                label: "GitHub",
                icon: (
                  <path fill="currentColor" d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48V19.4c-2.78.6-3.37-1.19-3.37-1.19a2.65 2.65 0 0 0-1.11-1.46c-.91-.62.07-.61.07-.61a2.1 2.1 0 0 1 1.53 1.03 2.14 2.14 0 0 0 2.92.83 2.14 2.14 0 0 1 .64-1.34c-2.22-.25-4.55-1.11-4.55-4.93a3.86 3.86 0 0 1 1.03-2.68 3.6 3.6 0 0 1 .1-2.65s.84-.27 2.75 1.03a9.42 9.42 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03a3.6 3.6 0 0 1 .1 2.65 3.86 3.86 0 0 1 1.03 2.68c0 3.83-2.33 4.68-4.56 4.93a2.4 2.4 0 0 1 .68 1.86V20c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
                ),
              },
              {
                href: "https://public.tableau.com/app/profile/devakalyan.adigopula",
                label: "Tableau Public",
                icon: (
                  <path fill="currentColor" d="M11 2h2v4h4v2h-4v4h-2V8H7V6h4V2zm-6 9h2v2H5v2H3v-2H1v-2h2V9h2v2zm16 0h2v2h-2v2h-2v-2h-2v-2h2V9h2v2zM11 18h2v4h4v2h-4v4h-2v-4H7v-2h4v-4z" />
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.06] backdrop-blur hover:bg-white/[0.14] transition shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_8px_24px_rgba(0,0,0,.45)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-90">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}