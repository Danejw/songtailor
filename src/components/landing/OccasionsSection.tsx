import { Gift, Star, Sparkles, Music } from "lucide-react";

export const OccasionsSection = () => {
  const occasions = [
    {
      icon: Gift,
      title: "Wedding First Dance",
      description: "Create a unique song that captures your love story"
    },
    {
      icon: Star,
      title: "Anniversary Surprise",
      description: "Celebrate years of love with a personalized melody"
    },
    {
      icon: Music,
      title: "Special Moments",
      description: "Turn any celebration into an unforgettable memory"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-600 font-medium mb-4 transform hover:scale-105 transition-transform">
            Perfect Occasions
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Perfect For Every Occasion
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create unforgettable memories with custom songs for any special moment
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occasion, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-white to-purple-50 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-purple-100 transform hover:scale-105">
              <occasion.icon className="w-12 h-12 text-purple-600 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">
                {occasion.title}
              </h3>
              <p className="text-gray-600">{occasion.description}</p>
              <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};