import { useListings } from "../components/utilities/UseListings";

import Hero from "../components/layout/Hero";
import GeneralInfo from "../components/layout/GeneralInfo";
import Footer from "../components/layout/Footer";
import LatestListings from "../components/lots/LatestListings";
import MostPopularListings from "../components/lots/MostPopularListings";
import AllLots from "../components/lots/AllLots";

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
