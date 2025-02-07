import React from "react";

interface Testimonial {
  name: string;
  organization: string;
  review: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sophia Reed",
    organization: "ArtBid Charity",
    review:
      "HeartBids helped us raise over $10,000 for our local art program. The platform is intuitive, and the bidders were incredibly generous!",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Liam Bennett",
    organization: "Animal Rescue Co.",
    review:
      "Thanks to HeartBids, we funded 50 rescue operations in just three months. The support has been overwhelming!",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
  {
    name: "Ella Harper",
    organization: "EcoLiving Foundation",
    review:
      "The HeartBids community is amazing. Every bid directly supports our mission to promote sustainable living practices.",
    image: "https://via.placeholder.com/150", // Replace with actual image URL
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold">3940+ Happy HeartBids Users</p>
          <h2 className="text-3xl font-bold text-gray-800">
            Don’t just take our word for it
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

              {/* Name & Organization */}
              <div className="text-gray-800 font-semibold">{testimonial.name}</div>
              <div className="text-blue-600">{testimonial.organization}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
