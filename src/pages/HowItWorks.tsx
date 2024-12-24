import { Navigation } from "@/components/Navigation";
import { HowItWorks as HowItWorksSection } from "@/components/HowItWorks";
import { Footer } from "@/components/Footer";

const HowItWorks = () => {
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 bg-gradient-to-br from-purple-100 via-white to-blue-100 grid-pattern -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_100%)] -z-10" />
      <Navigation />
      <div className="pt-16 relative">
        <HowItWorksSection />
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;