import { Music, Heart, Sparkles, Stars } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="fixed inset-0 bg-gradient-to-b from-white to-purple-50/30 grid-pattern-dark -z-10" />
      <div className="absolute inset-0 bg-white/50" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-600 font-medium mb-4 transform hover:scale-105 transition-transform">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Why Choose SongTailor?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine creativity with expertise to deliver songs that capture your unique story
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: "Personalized Touch",
              description: "Every song is uniquely crafted to tell your story"
            },
            {
              icon: Stars,
              title: "Exceptional Quality",
              description: "We deliver professionally crafted songs that are polished and unforgettable"
            },
            {
              icon: Music,
              title: "Tailored Versatility",
              description: "We create songs in any genre to match your unique vision"
            }
          ].map((feature, index) => (
            <div key={index} className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50 hover:scale-105">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 group-hover:text-purple-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
              <Sparkles className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 right-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};