"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRightIcon,
  CalendarDaysIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Destination {
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

const PRICE_RANGES = [
  { value: "all", label: "Price Range" },
  { value: "0-1000", label: "Under $1000" },
  { value: "1000-2000", label: "$1000 - $2000" },
  { value: "2000-5000", label: "$2000 - $5000" },
  { value: "5000-above", label: "$5000 & Above" },
] as const;

const SORT_OPTIONS = [
  { value: "featured", label: "Sort By" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "departure-asc", label: "Departure: Earliest First" },
] as const;

export function DestinationsGrid({ destinations }: { destinations: Destination[] }) {
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(
    () => Array.from(new Set(destinations.map((d) => d.category))),
    [destinations]
  );

  const categoryOptions = useMemo(
    () => [{ value: "all", label: "Category" }].concat(
      categories.map((c) => ({ value: c, label: c }))
    ),
    [categories]
  );

  const visible = useMemo(() => {
    const [min, max] = priceRange.split("-");
    let result = destinations.filter((d) => {
      if (category !== "all" && d.category !== category) return false;
      if (priceRange !== "all") {
        if (max === "above" && d.price < Number(min)) return false;
        if (max !== "above" && (d.price < Number(min) || d.price > Number(max))) return false;
      }
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) =>
          a.destinationName.localeCompare(b.destinationName)
        );
        break;
      case "departure-asc":
        result = [...result].sort((a, b) =>
          a.departureDate.localeCompare(b.departureDate)
        );
        break;
    }
    return result;
  }, [destinations, category, priceRange, sortBy]);

  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <FilterSelect
          value={category}
          onChange={setCategory}
          options={categoryOptions}
        />
        <FilterSelect
          value={priceRange}
          onChange={setPriceRange}
          options={PRICE_RANGES}
        />
        <FilterSelect
          value={sortBy}
          onChange={setSortBy}
          options={SORT_OPTIONS}
        />
      </div>

      <p className="mt-6 text-sm text-muted-foreground" role="status">
        Showing {visible.length} destination{visible.length === 1 ? "" : "s"}
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          No destinations match your filters.
        </div>
      ) : (
        <ul className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((destination) => (
            <DestinationCard key={destination._id} destination={destination} />
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: readonly { value: string; label: string }[];
}) {
  const current = options.find((o) => o.value === value);
  return (
    <Select
      items={options}
      value={current?.value ?? "all"}
      onValueChange={(item) => onChange((item as string | null) ?? "all")}
    >
      <SelectTrigger className="h-10 w-full justify-between text-[13px] font-semibold uppercase tracking-widest">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <li className="flex flex-col">
      <div className="relative aspect-3/2 w-full overflow-hidden rounded-lg bg-muted">
        <Image
          src={destination.imageUrl}
          alt={destination.destinationName}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
        <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-md bg-foreground px-2.5 py-1 text-sm font-medium text-background">
          4.5
          <StarIcon className="size-3.5 fill-current" />
        </span>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
        <MapPinIcon className="size-3.5" />
        {destination.country}
      </p>

      <div className="mt-1 flex items-end justify-between gap-3">
        <h2 className="font-serif text-lg leading-snug">{destination.destinationName}</h2>
        <p className="font-serif text-xl leading-none font-bold whitespace-nowrap">
          ${destination.price.toLocaleString()}
          <span className="text-[10px] font-medium text-muted-foreground">/Person</span>
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
    </li>
  );
}
