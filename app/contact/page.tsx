import Navbar from "@/components/navigation/Navbar";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export const metadata = {
  title: "Contact Us — Momentia IO",
  description: "Get in touch with Momentia IO to learn how we can help your healthcare organization.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
