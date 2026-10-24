import { Banner } from "@/components/banner";
import { Cta } from "@/components/cta";
import { Testimonials } from "@/components/testimonials";
import { WhyChooseUs } from "@/components/why-choose-us";

export default function Home() {
  return (
    <main>
      <Banner />
      <WhyChooseUs />
      <Testimonials />
      <Cta />
    </main>
  );
}
