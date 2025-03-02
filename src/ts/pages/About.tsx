import MostPopularListings from "../components/lots/MostPopularListings";
import FAQ from "../components/layout/FAQ";
import GeneralInfo from "../components/layout/GeneralInfo";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <div>

      {/* Text Sections */}
      <section className="bg-gradient-to-b from-background-50 to-primary-200 md:pt-30 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 flex-wrap md:flex-nowrap font-serif">
        <div className="min-w-70">
            <h1 className="md:text-5xl text-3xl font-bold ">What are HeartBids?</h1>
        <p className="mt-5 lg:text-3xl text-xl">HeartBids is an auction platform designed to facilitate meaningful contributions to charitable causes. By auctioning items, services, and craftsmanship, users support organizations that rely on community-driven funding.</p>

        </div>
<img src="/images/hero/dog-painting.png" alt="" className="max-w-100 md:-mt-30 h-80 m-auto md:h-full" />
           </div>
      </section>

        <div className=" max-w-9/10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 my-5 items-center ">
        <div className="max-w-5xl">

          <h2 className="text-2xl font-bold text-gray-800">About HeartBids</h2>
          <p className="text-gray-600 mt-4 max-w-5xl">
            HeartBids is an auction platform designed to facilitate meaningful contributions to charitable causes.
            By auctioning items, services, and craftsmanship, users support organizations that rely on
            community-driven funding.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mt-8">How It Works</h2>
          <ul className="list-disc ml-6 mt-4 text-gray-600">
            <li>Donate & List: Users can offer items, services, or expertise for auction, with proceeds donated directly.</li>
            <li>Bid & Contribute: Participants place bids, ensuring their valuable resources are put to great use.</li>
            <li>
              Earn & Reinvest: Those who auction their items receive credits, which can be used to support future auctions.
            </li>
          </ul>

        <h2 className="text-2xl font-bold text-gray-800">A Platform for Giving</h2>
          <p className="text-gray-600 mt-4">
          HeartBids relies on individuals who choose to contribute their belongings, skills, and time. Their efforts make it possible to fund important initiatives through a structured and transparent auction system.
          </p>
          <p className="text-gray-600 mt-4">
          By taking part in HeartBids, users directly support charitable projects in a way that is both effective and sustainable.          </p>
          </div>

        </div>

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
