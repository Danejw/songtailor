import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "SongTailor created the perfect anniversary gift for my husband. The song captured our story beautifully!",
      role: "Customer"
    },
    {
      name: "Michael Chen",
      text: "I was amazed by how well they translated my ideas into music. The process was smooth and the result exceeded my expectations.",
      role: "Customer"
    },
    {
      name: "Emily Rodriguez",
      text: "The team was so patient with my revisions. They really wanted to make sure the song was exactly what I wanted.",
      role: "Customer"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="max-w-4xl mx-auto">
          <Carousel>
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-8 text-center">
                    <p className="text-xl text-gray-600 mb-6">"{testimonial.text}"</p>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.role}</div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
};