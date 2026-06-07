import Navbar from "@/components/navigation/Navbar";
import { Hero } from "@/components/sections/hero";
import { OurStory } from "@/components/sections/our-story";
import { Footer } from "@/components/sections/footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <OurStory />
      <Footer />
    </>
  );
}
