import MostPopularListings from "../components/lots/MostPopularListings";
import FAQ from "../components/layout/FAQ";
import GeneralInfo from "../components/layout/GeneralInfo";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <div>

      {/* Text Sections */}
      <section className="pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-800">About HeartBids</h2>
          <p className="text-gray-600 mt-4">
            HeartBids is an auction platform designed to facilitate meaningful contributions to charitable causes.
            By auctioning items, services, and craftsmanship, users support organizations that rely on
            community-driven funding.
          </p>

          <h3 className="text-2xl font-bold text-gray-800 mt-8">How It Works</h3>
          <ul className="list-disc ml-6 mt-4 text-gray-600">
            <li>Donate & List: Users can offer items, services, or expertise for auction, with proceeds donated directly.</li>
            <li>Bid & Contribute: Participants place bids, ensuring their valuable resources are put to great use.</li>
            <li>
              Earn & Reinvest: Those who auction their items receive credits, which can be used to support future auctions.
            </li>
          </ul>
        </div>
      </section>

      {/* Popular Lots */}
      <MostPopularListings />

      {/* FAQ Section */}
      <section className="py-16">
        <FAQ />
      </section>

      {/* General Info Section */}
      <GeneralInfo />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;
