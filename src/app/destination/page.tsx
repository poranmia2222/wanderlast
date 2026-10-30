import React from "react";

import { DestinationsGrid, type Destination } from "@/components/destinations-grid";

export const metadata = { title: "All Destinations" };

async function getDestinations(): Promise<Destination[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`);
  if (!res.ok) {
    throw new Error(`Failed to fetch destinations (status ${res.status})`);
  }
  return res.json();
}

export default async function AllDestinations() {
  const destinations = await getDestinations();

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      <DestinationsGrid destinations={destinations} />
    </main>
  );
}
