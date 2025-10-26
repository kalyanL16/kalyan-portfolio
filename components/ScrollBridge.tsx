"use client";

export default function ScrollBridge() {
  return (
    // a short section that pins its contents for a premium handoff
    <section className="relative h-[56vh]">
      <div className="sticky top-0 h-[56vh] flex flex-col items-center justify-end pointer-events-none">
        {/* sunrise arc */}
        <svg
          className="block w-[92%] max-w-[1200px] h-[120px]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <defs>
            {/* warm gradient */}
            <linearGradient id="sunrise-bridge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8a00" />
              <stop offset="50%" stopColor="#ffd54a" />
              <stop offset="100%" stopColor="#ff8a00" />
            </linearGradient>
            {/* soft glow */}
            <filter id="sunrise-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            id="sunrise-curve"
            d="M50,110 C300,10 900,10 1150,110"
            stroke="url(#sunrise-bridge)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#sunrise-glow)"
            // dash for a subtle traveling light
            style={{
              strokeDasharray: 1400,
              strokeDashoffset: 0,
              animation: "sunriseDash 8s linear infinite",
            }}
          />
        </svg>

        {/* label (clickable) */}
        <a
          href="#education"
          className="pointer-events-auto mt-1 mb-6 inline-flex items-center gap-2 rounded-full
                     px-4 py-1.5 text-[13px] tracking-[0.16em] text-white/90
                     ring-1 ring-white/15 bg-white/[0.06] backdrop-blur
                     hover:bg-white/[0.12] transition"
        >
          Continue Journey ↓
        </a>
      </div>
    </section>
  );
}