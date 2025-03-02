import { Link } from "react-router-dom";
import { LotCardProps } from "../../types/listingTypes";
import EditButton from "../ui/EditButton";
import DeleteButton from "../ui/DeleteButton";
import AuctionCountdown from "../ui/AuctionCountdown";
import LazyLoadImage from "../../utilities/LazyLoadImage";

const LotCard: React.FC<LotCardProps> = ({ id, image, title, price, bids, closingDate, userBid, description, tags, created, updated, showDescription, showTags, showCreatedUpdated, seller, showSeller, showControls, showClosingDate = true, onDelete }) => {
  console.log("LotCard - Seller Data:", seller);

  return (
    <div className="font-serif bg-secondary-50 shadow-md rounded-xs p-3 pt-3 hover:shadow-2xl transition-transform transform hover:scale-101 min-w-62 md:min-w-72 lg:min-w-74 max-w-90 mt-6 m-auto flex flex-col  h-full w-full">
      <Link to={`/listing/${id}`} className="block">
        <LazyLoadImage src={image || "/HeartBids.png"} alt={title} className="w-full h-74 object-cover rounded-sm border border-gray-300" />

        {/* ✅ Title Styling */}
        <h3 className="text-xl font-serif text-gray-900 mt-6">{title}</h3>

        {showSeller && seller && (
          <div className="mt-4 p-2 bg-blue-200 rounded-lg shadow-md w-fit">
            <Link to={`/profile/${seller.name}`} className="flex items-center gap-3 hover:underline">
              <img src={seller.avatar?.url} alt={seller.avatar?.alt || `${seller.name}'s avatar`} className="w-8 h-8 rounded-full object-cover" onError={(e) => (e.currentTarget.src = "/images/default-avatar.png")} />
              <div>
                <p className="text-gray-900 font-medium">
                  {seller.name}
                  {seller.selectedCharity && <img src={seller.selectedCharity.logo} alt={`${seller.selectedCharity.name} Logo`} className="w-6 h-6 inline ml-2 rounded-full" />}
                </p>
              </div>
            </Link>
          </div>
        )}

        {showDescription && description && <p className="text-gray-700 mt-4">{description}</p>}

        {showTags && Array.isArray(tags) && (
          <div className="flex flex-wrap gap-2 my-6 font-serif">
            {tags.length > 0 ? (
              <>
                {tags
                  .filter((tag) => tag.toLowerCase() !== "heartbids")
                  .slice(0, 3) // ✅ Only show up to 3 tags
                  .map((tag) => (
                    <span key={tag} className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-sm">
                      #{tag}
                    </span>
                  ))}

                {tags.filter((tag) => tag.toLowerCase() !== "heartbids").length > 3 && <span className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-sm">+{tags.length - 3}</span>}
              </>
            ) : (
              <span className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-sm">#</span> // ✅ Show "#" if no tags
            )}
          </div>
        )}

        {/* ✅ Countdown */}
        {showClosingDate && closingDate && <AuctionCountdown closingDate={closingDate} />}

        {/* ✅ Bidding Details - More Readable & Aligned */}
        <p className="text-lg font-semibold font-serif mt-4 ml-1">
          <span className="text-pink-600  text-2xl">€ {price}</span>
          <span className="text-gray-600 ml-3">
            ({bids} {bids === 1 ? "bid" : "bids"})
          </span>
        </p>

        {/* ✅ User’s Highest Bid (if applicable) */}
        {userBid !== undefined && (
          <p className="text-blue-600 font-bold mt-1">
            Your Highest Bid: <span className="text-blue-500">€{userBid}</span>
          </p>
        )}

        {showCreatedUpdated && (
          <div className="text-gray-700 text-base mt-4">
            {created && <p>Created: {new Date(created).toLocaleDateString()}</p>}
            {updated && <p>Updated: {new Date(updated).toLocaleDateString()}</p>}
          </div>
        )}
      </Link>
      {showControls && (
        <div className="flex justify-between mt-5">
          <EditButton listingId={id} />
          <DeleteButton listingId={id} onDelete={onDelete ?? (() => {})} />
        </div>
      )}
    </div>
  );
};

export default LotCard;
