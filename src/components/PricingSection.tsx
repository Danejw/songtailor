import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const PricingSection = () => {
  const navigate = useNavigate();
  
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
        <p className="text-lg text-gray-600 text-center mb-12">Choose your perfect package and bring your song to life</p>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-start flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Basic Package</h3>
                <p className="text-gray-600 mb-6">Everything you need to create your perfect song</p>
                <ul className="space-y-3">
                  {[
                    "One custom song",
                    "Professional production",
                    "Your lyrics or written by us",
                    "Style of your choice",
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
                <div className="text-4xl font-bold mb-2">$29.99</div>
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
              <h4 className="font-semibold mb-6">Available Add-ons:</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Cover Image</h5>
                  <p className="text-sm text-gray-600 mb-2">Professional design matching your song's theme</p>
                  <p className="font-semibold text-purple-600">+$5.00</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Second Song Option</h5>
                  <p className="text-sm text-gray-600 mb-2">Get both versions of your custom song</p>
                  <p className="font-semibold text-purple-600">+$15.00</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h5 className="font-semibold mb-2">Second Cover Image</h5>
                  <p className="text-sm text-gray-600 mb-2">Unique cover for your second song</p>
                  <p className="font-semibold text-purple-600">+$5.00</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <h4 className="font-semibold mb-4">Example Packages:</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Basic Package</span>
                  <span className="font-semibold">$29.99</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Basic + Cover Image</span>
                  <span className="font-semibold">$34.99</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span>Complete Package (Both Songs + Both Covers)</span>
                  <span className="font-semibold">$54.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};