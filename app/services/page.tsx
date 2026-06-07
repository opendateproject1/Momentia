import Navbar from "@/components/navigation/Navbar";
import { Services } from "@/components/sections/services";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Services — Momentia IO",
  description: "Explore Momentia IO's healthcare AI services, revenue cycle management, and operational solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Services />
      </main>
      <Footer />
    </>
  );
}
