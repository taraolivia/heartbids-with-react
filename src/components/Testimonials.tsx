import React from "react";

interface Testimonial {
  name: string;
  cause: string;
  review: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sophia Reed",
    cause: "Community Art Programs",
    review:
      "HeartBids made it so easy to auction my paintings for charity. Seeing my work contribute to an arts education fund was truly rewarding!",
    image: "https://via.placeholder.com/150", 
  },
  {
    name: "Liam Bennett",
    cause: "Animal Rescue & Welfare",
    review:
      "By auctioning handcrafted pet accessories, I am raising money to cover vet bills for rescued animals. The process is seamless, and the impact was real!",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ella Harper",
    cause: "Eco Sustainability Initiatives",
    review:
      "HeartBids connected me with like-minded people who bid on my upcycled furniture. Every sale supports a greener planet!",
    image: "https://via.placeholder.com/150", 
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold">Join Our Giving Community</p>
          <h2 className="text-3xl font-bold text-gray-800">
            See How HeartBids is Changing Lives
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center"
            >
              {/* Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />

              {/* Review */}
              <p className="text-gray-600 mb-4 italic">"{testimonial.review}"</p>

              {/* Name & Cause */}
              <div className="text-gray-800 font-semibold">{testimonial.name}</div>
              <div className="text-blue-600">{testimonial.cause}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
