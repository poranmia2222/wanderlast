import { Banner } from "@/components/banner";
import { Cta } from "@/components/cta";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <main>
      <Banner />
      <FeaturedDestinations/>
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </main>
  );
}
