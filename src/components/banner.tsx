import Image from "next/image";
import { ArrowRight } from "lucide-react";

const searchFields = [
  { label: "Location", value: "Address, City Or Zip" },
  { label: "Date/Duration", value: "Anytime/3 Days" },
  { label: "Budget", value: "$0-$3000" },
  { label: "People", value: "5-10" },
];

export function Banner() {
  return (
    <section className="relative flex min-h-155 flex-col">
      <Image
        src="/images/Banner.png"
        alt="Coastal bay with turquoise water"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative flex flex-1 flex-col items-center px-6 py-24 text-center text-white">
        <h1 className="max-w-4xl font-serif text-6xl leading-[1.05] md:text-8xl">
          Discover Your Next Adventure
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#"
            className="inline-flex h-12 items-center gap-2 rounded-sm bg-brand px-7 text-sm font-semibold tracking-wide text-brand-foreground uppercase transition-colors hover:bg-brand/90"
          >
            Explore Now
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <a
            href="#"
            className="inline-flex h-12 items-center rounded-sm bg-white/20 px-7 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-white/30"
          >
            View Destination
          </a>
        </div>
      </div>

      <form className="relative grid grid-cols-2 divide-x divide-white/40 md:grid-cols-5">
        {searchFields.map((field) => (
          <button
            key={field.label}
            type="button"
            className="bg-white/35 px-5 py-4 text-left backdrop-blur-[2px] transition-colors hover:bg-white/50 "
          >
            <span className="block text-lg font-semibold text-white">
              {field.label}
            </span>
            <span className="mt-0.5 block text-xs text-white">
              {field.value}
            </span>
          </button>
        ))}
        <button
          type="submit"
          className="bg-brand px-5 py-4 text-lg font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
        >
          Search
        </button>
      </form>
    </section>
  );
}
