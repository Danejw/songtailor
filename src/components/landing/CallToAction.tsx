import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Zap, Sparkles } from "lucide-react";

export const CallToAction = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]" />
      <Sparkles className="absolute top-10 right-10 w-6 h-6 text-white/50 animate-pulse" />
      <Sparkles className="absolute bottom-10 left-10 w-6 h-6 text-white/50 animate-pulse" />
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-white font-medium mb-6 backdrop-blur-sm">
            Ready to Start?
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Create Your Perfect Song?
          </h2>
          <p className="text-xl mb-12 opacity-90">
            Join thousands of happy customers who have turned their stories into beautiful songs
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 text-lg px-8 py-6 shadow-xl hover:shadow-2xl group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start Your Song Journey <Zap className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Button>
        </div>
      </div>
    </section>
  );
};