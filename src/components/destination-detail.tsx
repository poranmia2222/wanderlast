"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  CheckIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import EditDestinationDialog, {
  type Destination,
} from "./destinaation/EditDestinationDialog";
import { useSession } from "@/lib/auth-client";



export function DetailActions({ destination }: { destination: Destination }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const { _id, destinationName } = destination;

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`http://localhost:8000/destination/${_id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.success("Destination deleted", {
        description: `${destinationName} has been removed.`,
      });
      setIsDeleting(false);
      router.push("/destination");
      router.refresh();
    } catch {
      setIsDeleting(false);
      toast.error("Failed to delete destination", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <EditDestinationDialog destination={destination} />
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
            <DialogTitle>Delete this destination?</DialogTitle>
            <DialogDescription>
              This will permanently remove {destinationName} and all its bookings.
              This action cannot be undone.
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
    </div>
  );
}

export function BookingPanel({
  destination,
  departureDate,
}: {
  destination: Destination;
  departureDate: string;
}) {
  const { destinationName, price, _id } = destination;

  const { data: session } = useSession();

  const handleBookNow = async () => {
    // Never send the destination's _id — the backend must generate its own
    // booking ID, otherwise duplicate IDs end up in the bookings list.
    const { _id, ...destinationData } = destination;
    const data = {
      name: session?.user?.name,
      email: session?.user?.email,
      destinationId: _id,
      ...destinationData,
      departureDate,
      bookingDate: new Date(),
    }

    const res = await fetch("http://localhost:8000/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)

    })

    const bookingRes = await res.json()

    if (!res.ok) {
      toast.error("Booking failed", {
        description: bookingRes?.message ?? "Please try again.",
      })
      return
    }

    toast.success("Trip booked!", {
      description: `${destinationName} on ${departureDate}.`,
    })
  }
  return (
    <div className="rounded-xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-bold text-brand">
        ${Number(price).toLocaleString()}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">per person</p>

      <Input readOnly value={departureDate} className="mt-5 h-9" />

      <Button
        size="lg"
        className="mt-4 h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90"
        onClick={handleBookNow}
      >
        Book Now
        <ArrowRightIcon />
      </Button>

      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {[
          "Free cancellation up to 7 days",
          "Travel insurance included",
          "24/7 customer support",
        ].map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <CheckIcon className="size-4 shrink-0 text-green-600" />
            {perk}
          </li>
        ))}
      </ul>
    </div>
  );
}
