import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { Music, Heart, Star, Gift, Sparkles, ArrowRight, Check, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-32 px-4 bg-gradient-to-br from-purple-50 via-white to-blue-50">
        <div className="container mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-600 font-semibold mb-6">
            Transform Your Stories Into Songs
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 leading-tight">
            Turn Your Stories Into<br />Stunning Songs!
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Custom songs crafted for your unique moments, bringing your stories to life through music
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg"
              onClick={() => navigate("/login")}
              className="text-lg px-8 py-6 bg-purple-600 hover:bg-purple-700 group"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate("/how-it-works")}
              className="text-lg px-8 py-6"
            >
              Learn More
            </Button>
          </div>
          <div className="mt-12 flex justify-center gap-8 text-gray-600">
            <div className="flex items-center">
              <Check className="text-green-500 mr-2" /> 100% Satisfaction
            </div>
            <div className="flex items-center">
              <Check className="text-green-500 mr-2" /> Free Revisions
            </div>
            <div className="flex items-center">
              <Check className="text-green-500 mr-2" /> Money Back Guarantee
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose SongTailor?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine creativity with expertise to deliver songs that capture your unique story
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                <Music className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Guaranteed</h3>
              <p className="text-gray-600">Receive quality music that matches your vision and exceeds expectations</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Personalized Touch</h3>
              <p className="text-gray-600">Every song is uniquely crafted to tell your story</p>
            </div>
            <div className="text-center p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Professional Production</h3>
              <p className="text-gray-600">Studio-quality sound with expert musicians and producers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-gradient-to-b from-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple process makes it easy to create your perfect song
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-semibold">1</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex-1 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Share Your Story</h3>
                  <p className="text-gray-600">Tell us about your special moment or the message you want to convey</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-semibold">2</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex-1 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Choose Your Style</h3>
                  <p className="text-gray-600">Select from various musical genres and styles that best fit your vision</p>
                </div>
              </div>
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <span className="text-xl font-semibold">3</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm flex-1 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Review & Refine</h3>
                  <p className="text-gray-600">Get two unique song options and choose your favorite or request adjustments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfect For Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Perfect For Every Occasion</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create unforgettable memories with custom songs for any special moment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-purple-100">
              <Gift className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Wedding First Dance</h3>
              <p className="text-gray-600">Create a unique song that captures your love story</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-purple-100">
              <Star className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Anniversary Surprise</h3>
              <p className="text-gray-600">Celebrate years of love with a personalized melody</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-purple-100">
              <Sparkles className="w-12 h-12 text-purple-600 mb-6" />
              <h3 className="text-xl font-semibold mb-4">Special Moments</h3>
              <p className="text-gray-600">Turn any celebration into an unforgettable memory</p>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Call to Action */}
      <section className="py-24 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Your Perfect Song?</h2>
            <p className="text-xl mb-12 opacity-90">
              Join thousands of happy customers who have turned their stories into beautiful songs
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transform transition-all duration-300 text-lg px-8 py-6"
            >
              Start Your Song Journey <Zap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;