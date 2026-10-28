"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import {
  CalendarDaysIcon,
  CircleCheckIcon,
  ClockIcon,
  EyeIcon,
  HashIcon,
  MapPinIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface Booking {
  _id: string;
  name: string;
  email: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  bookingDate: string;
  /** Optional: destination id is stored on the booking document for linking */
  destinationId?: string;
  /** Optional: derive status from departure date when missing */
  status?: "confirmed" | "pending" | "cancelled" | string;
}

function getStatus(booking: Booking): {
  label: string;
  classes: string;
  icon: React.ReactNode;
} {
  const status =
    booking.status ??
    (new Date(booking.departureDate) > new Date() ? "pending" : "completed");

  switch (status) {
    case "confirmed":
      return {
        label: "Confirmed",
        classes: "border-green-200 bg-green-50 text-green-700",
        icon: <CircleCheckIcon className="size-3.5" />,
      };
    case "pending":
      return {
        label: "Pending",
        classes: "border-orange-200 bg-orange-50 text-orange-700",
        icon: <ClockIcon className="size-3.5" />,
      };
    default:
      return {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        classes: "border-border bg-muted text-muted-foreground",
        icon: <ClockIcon className="size-3.5" />,
      };
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BookingCard({
  booking,
  onDeleted,
}: {
  booking: Booking;
  onDeleted?: (deleted: Booking) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const status = getStatus(booking);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `http://localhost:8000/my-bookings/${booking._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.success("Booking deleted", {
        description: `Your booking for ${booking.destinationName} has been removed.`,
      });
      onDeleted?.(booking);
    } catch {
      toast.error("Failed to delete booking", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li
      className="flex flex-col gap-5 rounded-lg border bg-card p-4 shadow-xs sm:flex-row sm:items-center"
    >
      <div className="relative aspect-3/2 w-full shrink-0 overflow-hidden rounded-md bg-muted sm:aspect-2/1 sm:w-64">
        <Image
          src={booking.imageUrl}
          alt={booking.destinationName}
          fill
          sizes="(max-width: 640px) 100vw, 256px"
          className="object-cover transition-opacity"
        />
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${status.classes}`}
        >
          {status.icon}
          {status.label}
        </span>

        <h2 className="mt-2 font-serif text-2xl leading-snug">
          {booking.destinationName}
        </h2>

        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <CalendarDaysIcon className="size-3.5 shrink-0" />
            Departure: {formatDate(booking.departureDate)}
            <span className="mx-1.5 hidden sm:inline">·</span>
            <span className="hidden sm:inline">
              {booking.duration}
            </span>
          </p>
          <p className="flex items-center gap-1.5">
            <HashIcon className="size-3.5 shrink-0" />
            Booking ID: {booking._id}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPinIcon className="size-3.5 shrink-0" />
            {booking.country}
          </p>
        </div>

        <p className="mt-2 font-serif text-2xl font-bold text-brand">
          ${booking.price?.toLocaleString()}
        </p>
      </div>

      <div className="flex shrink-0 gap-3 sm:flex-col">
        <Dialog>
          <DialogTrigger
            render={
              <Button
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10"
              />
            }
          >
            <Trash2Icon className="text-destructive" />
            Delete
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete this booking?</DialogTitle>
              <DialogDescription>
                This will permanently remove your booking for{" "}
                {booking.destinationName}. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose
                render={<Button variant="outline" />}
                disabled={isDeleting}
              >
                Cancel
              </DialogClose>
              <Button
                className="bg-destructive text-white hover:bg-destructive/90"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                <Trash2Icon />
                {isDeleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          render={
            <Link
              href={`/destination/${booking.destinationId ?? booking._id}`}
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg bg-brand px-2.5 text-sm font-medium text-white hover:bg-brand/90"
            />
          }
        >
          <EyeIcon className="size-4" />
          View
        </Button>
      </div>
    </li>
  );
}

export default BookingCard;
