import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-purple-600">SongTailor</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600">Home</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-purple-600">How It Works</a>
            <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
            <Button 
              variant="outline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};