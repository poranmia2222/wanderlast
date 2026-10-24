import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Cta() {
  return (
    <section className="relative flex min-h-96 items-center justify-center">
      <Image
        src="/images/CTA.png"
        alt="Aerial view of a tropical island with a plane overhead"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative flex flex-col items-center px-6 py-20 text-center text-white">
        <h2 className="max-w-3xl font-serif text-4xl leading-tight md:text-6xl">
          Ready To Start Your Journey?
        </h2>
        <p className="my-6 text-sm text-white/85 md:text-base">
          Join thousands of travelers who have discovered the world with us
        </p>

        <a
          href="#"
          className="inline-flex h-13 items-center gap-2.5 bg-white px-8 text-sm font-medium tracking-wide text-foreground uppercase transition-colors hover:bg-white/90"
        >
          Book Your Trip Today
          <ArrowRight className="size-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
