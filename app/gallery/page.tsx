import Image from "next/image";
import "@/styles/horizontal-gallery.css";

export const metadata = {
  title: "Gallery — Devakalyan Adigopula",
};

export default function GalleryPage() {
  return (
    <main className="external bg-[#0a0a0a] text-white">
      <section className="horizontal-scroll-wrapper">
        <div className="img-wrapper slower">
          <a href="/aa-review.jpg" target="_blank">
            <Image src="/aa-review.jpg" alt="Tableau Dashboard – American Airlines Review" width={900} height={600} unoptimized />
          </a>
        </div>
        <div className="img-wrapper slower1">
          <a href="/projects/looker.jpg" target="_blank">
            <Image src="/projects/looker.jpg" alt="Looker Studio Dashboard" width={900} height={600} unoptimized />
          </a>
        </div>
        <div className="img-wrapper slower2">
          <a href="/projects/lucid.jpg" target="_blank">
            <Image src="/projects/lucid.jpg" alt="Lucidchart Process Flow" width={900} height={600} unoptimized />
          </a>
        </div>
      </section>
    </main>
  );
}