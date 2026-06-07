import Navbar from "@/components/navigation/Navbar";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "About — Momentia IO",
  description: "Learn about Momentia IO and our approach to healthcare AI and revenue cycle management.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <About />
      </main>
      <Footer />
    </>
  );
}
