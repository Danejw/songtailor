export const ProcessSection = () => {
  const steps = [
    {
      title: "Share Your Story",
      description: "Tell us about your special moment or the message you want to convey"
    },
    {
      title: "Choose Your Style",
      description: "Select from various musical genres and styles that best fit your vision"
    },
    {
      title: "Review & Refine",
      description: "Get two unique song options and choose your favorite or request adjustments"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-medium mb-4 transform hover:scale-105 transition-transform">
            Simple Process
          </span>
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our simple process makes it easy to create your perfect song
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                  <span className="text-xl font-semibold">{index + 1}</span>
                </div>
                <div className="bg-gradient-to-br from-white to-purple-50 p-8 rounded-xl shadow-sm flex-1 group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 border border-purple-100">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};