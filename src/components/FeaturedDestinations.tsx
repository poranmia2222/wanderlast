"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


interface Destination {
  _id: string;
  category: string;
  country: string;
  departureDate: string;
  description: string;
  destinationName: string;
  duration: string;
  imageUrl: string;
  price: number;
}

// The backend has no rating field yet — derive a stable 4.5–5.0 rating from
// the document id so numbers don't jump between renders (same approach as
// src/app/destination/[id]/page.tsx).
function ratingFromId(id: string) {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  }
  return (4.5 + (hash % 50) / 100).toFixed(1);
}

export default function FeaturedDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-destinations`, {
          headers: token ? { authorization: `Bearer ${token}` } : undefined,
        });
        if (!res.ok) throw new Error(`Failed to fetch destinations (status ${res.status})`);
        const raw = (await res.json()) as Destination[];
        // The API can return the same destination (same _id) more than once;
        // duplicates would break React keys and double-render cards.
        const seen = new Set<string>();
        setDestinations(
          raw.filter((d) => {
            if (seen.has(d._id)) return false;
            seen.add(d._id);
            return true;
          })
        );
      } catch {
        setFailed(true);
      }
    })();
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 className="font-serif text-4xl text-foreground md:text-5xl">
              Featured Destinations
            </h2>
            <p className="mt-2 text-sm text-foreground/60">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>
          <Link
            href="/destination"
            className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 text-sm font-medium tracking-widest text-brand uppercase transition-colors hover:border-foreground/60"
          >
            All Destinations
            <ArrowRightIcon className="size-4" />
          </Link>
        </div>

        {failed ? (
          <p className="mt-14 text-sm text-muted-foreground" role="status">
            Destinations are unavailable right now. Please try again later.
          </p>
        ) : destinations.length === 0 ? (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-3/2 w-full animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        ) : (
          <FeaturedCarousel destinations={destinations} />
        )}
      </div>
    </section>
  );
}

function FeaturedCarousel({ destinations }: { destinations: Destination[] }) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(destinations.length);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!api) return;

    const refreshPages = () => {
      const snaps = api.scrollSnapList().length;
      setCount(snaps > 0 ? snaps : destinations.length);
    };
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    const onScroll = () => setProgress(api.scrollProgress() ?? 0);

    refreshPages();
    onSelect();
    onScroll();
    api.on("select", onSelect);
    api.on("scroll", onScroll);
    api.on("resize", refreshPages);
    api.on("reInit", refreshPages);

    return () => {
      api.off("select", onSelect);
      api.off("scroll", onScroll);
      api.off("resize", refreshPages);
      api.off("reInit", refreshPages);
    };
  }, [api, destinations.length]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: true, align: "start" }}
      className="mt-14"
    >
      <CarouselContent>
        {destinations.map((destination) => (
          <CarouselItem
            key={destination._id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
          >
            <article className="flex flex-col">
              <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg bg-muted">
                <Image
                  src={destination.imageUrl}
                  alt={destination.destinationName}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-background px-2.5 py-1 text-sm font-medium text-foreground shadow-sm">
                  {ratingFromId(destination._id)}
                  <StarIcon className="size-3.5 fill-current" />
                </span>
              </div>

              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPinIcon className="size-3.5" />
                {destination.country}
              </p>

              <div className="mt-1 flex items-end justify-between gap-3">
                <h3 className="font-serif text-lg leading-snug">
                  {destination.destinationName}
                </h3>
                <p className="font-serif text-xl leading-none font-bold whitespace-nowrap">
                  ${destination.price.toLocaleString()}
                  <span className="text-[10px] font-medium text-muted-foreground">
                    /Person
                  </span>
                </p>
              </div>

              <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDaysIcon className="size-3.5" />
                {destination.duration}
              </p>

              <Link
                href={`/destination/${destination._id}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium tracking-widest text-brand uppercase underline underline-offset-4 hover:underline hover:opacity-80"
              >
                Book Now
                <ArrowUpRightIcon className="size-4" />
              </Link>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-12 flex items-center gap-6">
        <p className="font-serif text-xl text-foreground" aria-live="polite">
          {current + 1}
          <span className="mx-1 text-foreground/40">/</span>
          {count}
        </p>

        <div
          className="h-px flex-1 bg-foreground/15"
          role="progressbar"
          aria-label="Carousel position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div
            className="h-px bg-foreground transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex shrink-0 gap-3">
          <ScrollArrow direction="prev" />
          <ScrollArrow direction="next" />
        </div>
      </div>
    </Carousel>
  );
}

function ScrollArrow({ direction }: { direction: "prev" | "next" }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const disabled = direction === "prev" ? !canScrollPrev : !canScrollNext;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous destinations" : "Next destinations"}
      disabled={disabled}
      onClick={direction === "prev" ? scrollPrev : scrollNext}
      className="flex size-13 cursor-pointer items-center justify-center rounded-full border border-foreground/20 bg-white text-foreground/60 transition-colors enabled:hover:border-foreground/40 enabled:hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
    >
      {direction === "prev" ? (
        <ArrowLeftIcon className="size-5" aria-hidden />
      ) : (
        <ArrowRightIcon className="size-5" aria-hidden />
      )}
    </button>
  );
}
