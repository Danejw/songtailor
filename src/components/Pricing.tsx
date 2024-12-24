import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Pricing = () => {
  const navigate = useNavigate();
  
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-start flex-col md:flex-row gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Custom Song Package</h3>
                <ul className="space-y-3">
                  {[
                    "Two unique song options",
                    "Professional production",
                    "Custom lyrics (if needed)",
                    "Up to 2 revisions",
                    "High-quality audio files",
                    "Full rights to your song"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-center md:text-right">
                <div className="text-4xl font-bold mb-2">$49</div>
                <p className="text-gray-600 mb-4">One-time payment</p>
                <Button 
                  onClick={() => navigate("/login")}
                  className="w-full md:w-auto bg-purple-600 hover:bg-purple-700"
                >
                  Get Started
                </Button>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t">
              <h4 className="font-semibold mb-4">Optional Add-ons:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <span>Both Song Versions</span>
                  <span className="font-semibold">+$15</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                  <span>Custom Cover Art</span>
                  <span className="font-semibold">+$5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};