import CustomModal from "@/components/Modal";
import CallToAction from "./_components/CallToAction";
import Features from "./_components/Features";
import Hero from "./_components/Hero";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <CustomModal />
      <CallToAction />
    </>
  );
}
