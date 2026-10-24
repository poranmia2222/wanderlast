"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      '"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."',
    name: "Michael Chen",
    location: "Singapore",
    image: "/images/person2.png",
  },
  {
    quote:
      '"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"',
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/images/person1.png",
  },
  {
    quote:
      '"Our Mediterranean Cruise Was Flawless. The Shore Excursions, The Dining, And The Private City Tours Were All First-Class. We Will Definitely Be Back!"',
    name: "Emma Rodriguez",
    location: "Barcelona, Spain",
    image: "/images/person1.png",
  },
  {
    quote:
      '"The Desert Safari Tour Was Thrilling And Perfectly Organized. Our Guide Made The Entire Experience Safe, Fun, And Truly Memorable From Start To Finish."',
    name: "James Okafor",
    location: "Dubai, UAE",
    image: "/images/person2.png",
  },
  {
    quote:
      '"The Amazon Expedition Surpassed Every Review We Read. The Wildlife Encounters, The Lodges, And The Transfers Were All Handled Flawlessly."',
    name: "Sofia Almeida",
    location: "Rio de Janeiro, Brazil",
    image: "/images/person1.png",
  },
];

function ScrollArrow({ direction }: { direction: "prev" | "next" }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();
  const disabled = direction === "prev" ? !canScrollPrev : !canScrollNext;

  return (
    <button
      type="button"
      aria-label={direction === "prev" ? "Previous testimonials" : "Next testimonials"}
      disabled={disabled}
      onClick={direction === "prev" ? scrollPrev : scrollNext}
      className={`flex size-13 cursor-pointer items-center justify-center rounded-full border bg-white transition-colors ${
        direction === "prev"
          ? "border-foreground/15 text-foreground/40 enabled:hover:border-foreground/30 enabled:hover:text-foreground/60"
          : "border-foreground/20 text-foreground/60 enabled:hover:border-foreground/40 enabled:hover:text-foreground"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {direction === "prev" ? (
        <ArrowLeft className="size-5" aria-hidden />
      ) : (
        <ArrowRight className="size-5" aria-hidden />
      )}
    </button>
  );
}

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Carousel opts={{ loop: true, align: "start" }}>
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl text-foreground md:text-5xl">
                What Travelers Say
              </h2>
              <p className="mt-2 text-sm text-foreground/60">
                Real experiences from our happy travelers
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <ScrollArrow direction="prev" />
              <ScrollArrow direction="next" />
            </div>
          </div>

          <CarouselContent className="mt-14">
            {testimonials.map(({ quote, name, location, image }) => (
              <CarouselItem key={name} className="basis-full md:basis-1/2">
                <figure className="flex h-full gap-6 border border-foreground/10 bg-white p-5">
                  <div className="flex flex-1 flex-col justify-between">
                    <blockquote className="font-serif text-xl leading-snug text-foreground">
                      {quote}
                    </blockquote>
                    <div className="mt-6 flex items-start gap-2">
                      <span className="text-brand">—</span>
                      <div>
                        <div className="text-base font-medium text-brand">
                          {name}
                        </div>
                        <div className="mt-1 text-sm text-foreground/50">
                          {location}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative aspect-square w-[38%] min-w-40 self-center">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="300px"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
