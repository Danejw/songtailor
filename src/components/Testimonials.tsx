import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      text: "SongTailor created the perfect anniversary gift for my husband. The song captured our story beautifully!",
      role: "Customer",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      name: "Michael Chen",
      text: "I was amazed by how well they translated my ideas into music. The process was smooth and the result exceeded my expectations.",
      role: "Customer",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      name: "Emily Rodriguez",
      text: "The team was so patient with my revisions. They really wanted to make sure the song was exactly what I wanted.",
      role: "Customer",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
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
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="w-24 h-24 border-4 border-purple-100 shadow-lg">
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">"{testimonial.text}"</p>
                      <div>
                        <div className="font-semibold text-gray-800">{testimonial.name}</div>
                        <div className="text-purple-600">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};