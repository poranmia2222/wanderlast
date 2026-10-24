"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowRightIcon,
  CheckIcon,
  PenLineIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DetailActions() {
  const router = useRouter();

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        onClick={() => toast.info("Edit coming soon")}
      >
        <PenLineIcon />
        Edit
      </Button>
      <Button
        variant="outline"
        className="border-destructive/40 text-destructive hover:bg-destructive/10"
        onClick={() => router.push("/destination")}
      >
        <Trash2Icon className="text-destructive" />
        Cancel
      </Button>
    </div>
  );
}

export function BookingPanel({
  name,
  price,
  departureDate,
}: {
  name: string;
  price: number;
  departureDate: string;
}) {
  return (
    <div className="rounded-xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10">
      <p className="text-sm text-muted-foreground">Starting from</p>
      <p className="mt-1 text-3xl font-bold text-brand">${price.toLocaleString()}</p>
      <p className="mt-1 text-sm text-muted-foreground">per person</p>

      <Input readOnly value={departureDate} className="mt-5 h-9" />

      <Button
        size="lg"
        className="mt-4 h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90"
        onClick={() =>
          toast.success("Trip booked", {
            description: `${name} on ${departureDate}.`,
          })
        }
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
