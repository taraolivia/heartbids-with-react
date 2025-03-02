import { useListings } from "../../ts/utilities/UseListings";

import GeneralInfo from "../components/layout/GeneralInfo";
import Footer from "../components/layout/Footer";
import LatestListings from "../components/lots/LatestListings";
import MostPopularListings from "../components/lots/MostPopularListings";
import AllLots from "../components/lots/AllLots";

const Listings = () => {
  const { listings, loading, error } = useListings();

  return (
    <div className="mt-20">
      <LatestListings listings={listings} loading={loading} error={error} />
      <MostPopularListings />
      <AllLots listings={listings} />
      <GeneralInfo />
      <Footer />
    </div>
  );
};

export default Listings;
