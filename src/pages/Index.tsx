import { Navigation } from "@/components/Navigation";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { OccasionsSection } from "@/components/landing/OccasionsSection";
import { CallToAction } from "@/components/landing/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <OccasionsSection />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;