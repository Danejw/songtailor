import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Music, Heart, Clock, Star, Gift, Sparkles } from "lucide-react";

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

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose SongTailor?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Professional Quality</h3>
              <p className="text-gray-600">Studio-grade production with expert musicians and producers</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Touch</h3>
              <p className="text-gray-600">Every song is uniquely crafted to tell your story</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Turnaround</h3>
              <p className="text-gray-600">Receive your custom song within days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Share Your Story</h3>
                  <p className="text-gray-600">Tell us about your special moment or the message you want to convey</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Choose Your Style</h3>
                  <p className="text-gray-600">Select from various musical genres and styles that best fit your vision</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Review & Refine</h3>
                  <p className="text-gray-600">Get two unique song options and choose your favorite or request adjustments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Perfect For Every Occasion</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <Gift className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Wedding First Dance</h3>
              <p className="text-gray-600">Create a unique song that captures your love story</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <Star className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Anniversary Surprise</h3>
              <p className="text-gray-600">Celebrate years of love with a personalized melody</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <Sparkles className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Special Moments</h3>
              <p className="text-gray-600">Turn any celebration into an unforgettable memory</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Perfect Song?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy customers who have turned their stories into beautiful songs
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/login")}
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Start Your Song Journey
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;