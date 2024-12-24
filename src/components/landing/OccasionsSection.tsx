import { Gift, Star, Sparkles } from "lucide-react";

export const OccasionsSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Perfect For Every Occasion</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create unforgettable memories with custom songs for any special moment
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="group bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-purple-100 transform hover:scale-105">
            <Gift className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">Wedding First Dance</h3>
            <p className="text-gray-600">Create a unique song that captures your love story</p>
          </div>
          <div className="group bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-purple-100 transform hover:scale-105">
            <Star className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">Anniversary Surprise</h3>
            <p className="text-gray-600">Celebrate years of love with a personalized melody</p>
          </div>
          <div className="group bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-purple-100 transform hover:scale-105">
            <Sparkles className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">Special Moments</h3>
            <p className="text-gray-600">Turn any celebration into an unforgettable memory</p>
          </div>
        </div>
      </div>
    </section>
  );
};