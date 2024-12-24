export const ProcessSection = () => {
  return (
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
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-xl font-semibold">1</span>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm flex-1 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-3">Share Your Story</h3>
                <p className="text-gray-600">Tell us about your special moment or the message you want to convey</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-xl font-semibold">2</span>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm flex-1 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-3">Choose Your Style</h3>
                <p className="text-gray-600">Select from various musical genres and styles that best fit your vision</p>
              </div>
            </div>
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                <span className="text-xl font-semibold">3</span>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm flex-1 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
                <h3 className="text-xl font-semibold mb-3">Review & Refine</h3>
                <p className="text-gray-600">Get two unique song options and choose your favorite or request adjustments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};