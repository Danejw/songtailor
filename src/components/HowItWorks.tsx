import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  PenLine, 
  Music, 
  FileEdit, 
  Download, 
  Image, 
  Check 
} from "lucide-react";

export const HowItWorks = () => {
  const navigate = useNavigate();
  
  const steps = [
    {
      icon: PenLine,
      title: "Tell Us About Your Song",
      description: "Share your vision through our simple request form. Include title, style preferences, lyrics or themes, and any inspirational references."
    },
    {
      icon: FileEdit,
      title: "Lyric Revision (Optional)",
      description: "We'll create lyrics based on your input and work with you until they're perfect."
    },
    {
      icon: Music,
      title: "We Create Your Song",
      description: "Our talented team crafts two unique song options tailored to your preferences."
    },
    {
      icon: Check,
      title: "Choose Your Favorite",
      description: "Select your preferred version or get both options for just $15 extra."
    },
    {
      icon: Image,
      title: "Add a Finishing Touch",
      description: "Optional: Add a professional cover image for $5 to make your song extra special."
    },
    {
      icon: Download,
      title: "Download and Enjoy",
      description: "Get your custom song and use it however you like—it's yours forever!"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <step.icon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Step {index + 1}: {step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button 
            size="lg"
            onClick={() => navigate("/login")}
            className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </section>
  );
};