import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  CheckIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import { BookingPanel, DetailActions } from "@/components/destination-detail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = { title: "Destination Details" };

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

// Your backend has no rating field yet — derive a stable 4.5–5.0 rating and
// review count from the document id so numbers don't jump between renders.
function ratingFromId(id: string) {
  let hash = 0;
  for (const char of id) {
    hash = (hash * 33 + char.charCodeAt(0)) >>> 0;
  }
  return {
    rating: (4.5 + (hash % 50) / 100).toFixed(1),
    reviews: 120 + (hash % 200),
  };
}

function highlightSentences(description: string) {
  return description
    .split(/(?<=[.?!])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatDepartureDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return `${month}/${day}/${year}`;
}

export default async function DestinationDetailsPage(
  props: PageProps<"/destination/[id]">
) {
  const { id } = await props.params;

  const jwtToken = await auth.api.getToken({
    headers: await headers()
  })
  const token = jwtToken?.token
  const res = await fetch(`http://localhost:8000/destination/${id}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) notFound();
  const destination: Destination = await res.json();

  const { rating, reviews } = ratingFromId(destination._id);
  const highlights = highlightSentences(destination.description);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <Link
          href="/destination"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Destinations
        </Link>
        <DetailActions destination={destination} />
      </div>

      <div className="relative mt-6 aspect-12/5 w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
        />
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <section>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPinIcon className="size-4" />
            {destination.country}
          </p>
          <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
            {destination.destinationName}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="flex items-center gap-1.5">
              <StarIcon className="size-4 fill-current text-green-600" />
              <strong>{rating}</strong>
              <span className="text-muted-foreground">({reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CalendarDaysIcon className="size-4 text-muted-foreground" />
              {destination.duration}
            </span>
          </div>

          <div className="mt-6 border-b" />

          <h2 className="mt-6 font-heading text-2xl">Overview</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {destination.description}
          </p>

          <h2 className="mt-8 font-heading text-2xl">Highlights</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-green-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </section>

        <aside>
          <BookingPanel
            destination={destination}
            departureDate={formatDepartureDate(destination.departureDate)}
          />
        </aside>
      </div>
    </main>
  );
}
