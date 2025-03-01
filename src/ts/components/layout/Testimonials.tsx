
interface Testimonial {
  name: string;
  cause: string;
  review: string;
  image: string;
  charityLogo: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sophia Reed",
    cause: "Canvas Collective",
    review:
      "HeartBids made it so easy to auction my paintings for charity. Seeing my work contribute to an arts education fund was truly rewarding!",
    image: "https://images.pexels.com/photos/3482526/pexels-photo-3482526.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    charityLogo: "/images/charities/icons8-paint-96.png",
  },
  {
    name: "Liam Bennett",
    cause: "Paw Haven",
    review:
      "By auctioning handcrafted pet accessories, I am raising money to cover vet bills for rescued animals. The process is seamless, and the impact was real!",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    charityLogo: "/images/charities/icons8-cat-caregivers-96.png",
  },
  {
    name: "Ella Harper",
    cause: "Verdant Earth",
    review:
      "HeartBids connected me with like-minded people who bid on my upcycled furniture. Every sale supports a greener planet!",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    charityLogo: "/images/charities/icons8-green-earth-96.png",
  },
  {
    name: "James Carter",
    cause: "Hopeful Hearts",
    review:
      "Donating my woodworking pieces helped raise funds for children in hospitals. HeartBids made giving back so easy!",
    image: "https://images.pexels.com/photos/316680/pexels-photo-316680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    charityLogo: "/images/charities/icons8-health-96.png",
  },
  {
    name: "Amira Patel",
    cause: "Golden Years",
    review:
      "Seeing my handmade quilts bring warmth to elders through HeartBids has been an unforgettable experience!",
    image: "https://images.pexels.com/photos/2109998/pexels-photo-2109998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    charityLogo: "/images/charities/icons8-elder-96.png",
  },
  {
    name: "Rafael Gomez",
    cause: "Beetle Brigade",
    review:
      "HeartBids allowed me to auction rare insect photography, supporting pollinator preservation projects!",
    image: "https://images.pexels.com/photos/2091327/pexels-photo-2091327.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    charityLogo: "/images/charities/icons8-insect-96.png",
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            See How HeartBids is Changing Lives
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 ${
                index % 2 === 0 ? "translate-y-2" : "-translate-y-2"
              }`}
            >
              {/* Image */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover object-center border-2 border-gray-300 mb-4 shadow-md"
              />

              {/* Review */}
              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Name & Cause */}
              <div className="text-gray-800 font-semibold text-lg">{testimonial.name}</div>
              <div className="text-secondary-600 text-base flex items-center space-x-2 mt-4">
                <img src={testimonial.charityLogo} alt={testimonial.cause} className="h-8 w-8" />
                <span>{testimonial.cause}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
