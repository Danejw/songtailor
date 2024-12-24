import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

export const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative py-32 px-4 bg-gradient-to-br from-purple-100 via-white to-blue-100 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.8)_100%)]" />
      <div className="container mx-auto text-center relative">
        <span className="inline-block px-6 py-2 rounded-full bg-purple-100 text-purple-600 font-semibold mb-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          Transform Your Stories Into Songs
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 leading-tight animate-gradient">
          Turn Your Stories Into<br />Stunning Songs!
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Custom songs crafted for your unique moments, bringing your stories to life through music
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 group relative overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10 flex items-center">
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
          <Button 
            variant="outline"
            size="lg"
            onClick={() => navigate("/how-it-works")}
            className="text-lg px-8 py-6 border-2 hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
          >
            Learn More
          </Button>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
          <div className="flex items-center group">
            <Check className="text-green-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-green-600 transition-colors">100% Satisfaction</span>
          </div>
          <div className="flex items-center group">
            <Check className="text-green-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-green-600 transition-colors">Free Revisions</span>
          </div>
          <div className="flex items-center group">
            <Check className="text-green-500 mr-2 group-hover:scale-110 transition-transform" />
            <span className="group-hover:text-green-600 transition-colors">Money Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};