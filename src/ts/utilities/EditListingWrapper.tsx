import { useParams } from "react-router-dom";
import EditListingPage from "../pages/listing/edit/EditListing";

const EditListingWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p className="text-red-500">Error: Listing ID is required.</p>;
  }

  return <EditListingPage listingId={id} />;
};

export default EditListingWrapper;
