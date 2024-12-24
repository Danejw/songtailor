import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Turn Your Stories Into Stunning Songs!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Custom songs crafted for your unique moments
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700"
          >
            Get Started
          </Button>
        </div>
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;