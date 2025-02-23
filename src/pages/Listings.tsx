import { useListings } from "../components/UseListings";

import Hero from "../components/Hero";
import GeneralInfo from "../components/GeneralInfo";
import Footer from "../components/Footer";
import LatestListings from "../components/LatestListings";
import MostPopularListings from "../components/MostPopularListings";
import AllLots from "../components/AllLots";

const Listings = () => {
  const { listings, loading, error } = useListings(); // ✅ Now fetching from global context

  return (
    <div>
      <Hero />
      <LatestListings listings={listings} loading={loading} error={error} />
      <MostPopularListings />
      <AllLots listings={listings} />
      <GeneralInfo />
      <Footer />
    </div>
  );
};

export default Listings;
