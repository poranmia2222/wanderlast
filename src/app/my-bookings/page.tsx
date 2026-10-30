import React from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { BookingList, type Booking } from "@/components/my-bookings/booking-list";

export const metadata = { title: "My Bookings" };


async function getBookings(email: string): Promise<Booking[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-bookings/${email}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch bookings (status ${res.status})`);
  }
  return res.json();
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const bookings = user?.email ? await getBookings(user.email) : [];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="font-heading text-4xl font-medium tracking-tight sm:text-5xl">
        My Bookings
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Manage and view your upcoming travel plans
      </p>

      <BookingList bookings={bookings} />
    </main>
  );
}
