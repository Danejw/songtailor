import { Music, Heart, Star } from "lucide-react";

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Why Choose SongTailor?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We combine creativity with expertise to deliver songs that capture your unique story
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          <div className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-purple-50 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Music className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quality Guaranteed</h3>
            <p className="text-gray-600">Receive quality music that matches your vision and exceeds expectations</p>
          </div>
          <div className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-purple-50 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Personalized Touch</h3>
            <p className="text-gray-600">Every song is uniquely crafted to tell your story</p>
          </div>
          <div className="group p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl border border-gray-100 bg-gradient-to-br from-white to-purple-50 hover:scale-105">
            <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Professional Production</h3>
            <p className="text-gray-600">Studio-quality sound with expert musicians and producers</p>
          </div>
        </div>
      </div>
    </section>
  );
};