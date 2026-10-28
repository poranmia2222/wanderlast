"use client";

import React, { useState } from "react";
import Link from "next/link";

import { BookingCard, type Booking } from "@/components/BookingCard";
import { Button } from "@/components/ui/button";

export type { Booking };

export function BookingList({ bookings }: { bookings: Booking[] }) {
  const [items, setItems] = useState(bookings);

  const handleDeleted = (deleted: Booking) => {
    setItems((prev) => prev.filter((b) => b._id !== deleted._id));
  };

  if (items.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-dashed p-16 text-center">
        <p className="font-serif text-xl">No bookings yet</p>
        <p className="text-sm text-muted-foreground">
          Explore destinations and book your next trip.
        </p>
        <Button
          render={
            <Link
              href="/destination"
              className="inline-flex h-8 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
            />
          }
        >
          Explore Destinations
        </Button>
      </div>
    );
  }

  return (
    <ul className="mt-8 space-y-5">
      {items.map((booking) => (
        <BookingCard
          key={booking._id}
          booking={booking}
          onDeleted={handleDeleted}
        />
      ))}
    </ul>
  );
}
