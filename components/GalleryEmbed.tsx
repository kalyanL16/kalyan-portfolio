"use client";

import Image from "next/image";

export default function GalleryEmbed({ id = "projects" }: { id?: string }) {
  // Use your saved image paths
  const images = [
    { src: "/aa-review.jpg", alt: "American Airlines Review (Tableau)" },
    { src: "/projects/looker.jpg", alt: "Looker Studio Sales Dashboard" },
    { src: "/projects/lucid.jpg", alt: "Lucidchart Airline Process Flow" },
  ];

  return (
    <section id={id} className="bg-[#0a0a0a] text-white py-20">
      <div className="mx-auto w-[min(1200px,92%)]">
        <header className="mb-8 text-center">
          <p className="mb-2 text-xs tracking-[0.22em] text-white/60">
            FEATURED PROJECTS
          </p>
          <h2 className="text-[clamp(30px,4vw,44px)] font-semibold">
            Horizontal Parallax Gallery
          </h2>
          <p className="mx-auto mt-3 max-w-[60ch] text-sm text-white/70">
            Scroll sideways to explore my Tableau, Looker Studio, and Lucidchart projects.
          </p>
        </header>

        <div className="hg-strip">
          {images.map((img, i) => (
            <div
              key={i}
              className={`hg-item ${
                i % 3 === 0
                  ? "speed-slow"
                  : i % 3 === 1
                  ? "speed-mid"
                  : "speed-fast"
              }`}
            >
              <a
                href={img.src}
                target="_blank"
                rel="noreferrer"
                className="hg-frame"
              >
                <div className="hg-img">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1200px) 90vw, 1000px"
                    priority={false}
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="hg-caption">{img.alt}</div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}