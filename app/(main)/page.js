import Hero from '../components/sections/Hero';
import Features from '../components/sections/Features';
import Categories from '../components/sections/Categories';
import HowItWorks from '../components/sections/HowItWorks';
import Testimonials from '../components/sections/Testimonials';
import Stats from '../components/sections/Stats';
import CTA from '../components/sections/CTA';

export default function Home() {
  return (
    <>
      {/* Section 1: Hero */}
      <Hero />

      {/* Section 2: Categories & Popular Products */}
      <Categories />

      {/* Section 3: Features */}
      <Features />

      {/* Section 4: How It Works */}
      <HowItWorks />

      {/* Section 5: Testimonials */}
      <Testimonials />

      {/* Section 6: Stats */}
      <Stats />

      {/* Section 7: Call to Action */}
      <CTA />
    </>
  );
}
