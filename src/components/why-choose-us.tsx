import { Headset, Map, ShieldCheck, type LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: Map,
    title: "Expert Guides",
    description: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-brand/10 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-serif text-4xl text-foreground md:text-5xl">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-sm text-foreground/60">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-white px-7 py-12 shadow-sm"
            >
              <Icon className="size-8 stroke-1.5 text-brand" aria-hidden />
              <h3 className="mt-9 font-serif text-2xl text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
