import { Link } from "react-router-dom";
import { LotCardProps } from "../ts/types/listingTypes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AuctionCountdown from "./AuctionCountdown";

const LotCard: React.FC<LotCardProps> = ({ id, image, title, price, bids, closingDate, userBid, description, tags, created, updated, showDescription, showTags, showCreatedUpdated, seller, showSeller, showControls, showClosingDate = true, onDelete }) => {
  return (
    <div className="bg-blue-100 shadow-lg rounded-sm px-5 pt-5 hover:shadow-2xl transition-transform transform hover:scale-101 min-w-72 mt-6 mb-6 m-auto flex flex-col h-full w-full">
      <Link to={`/listing/${id}`} className="block">
        {/* ✅ Image Styling - Consistent Height & Rounded Corners */}
        <img
          src={image || "/images/logo/HeartBids.png"}
          alt={title}
          className="w-full h-72 object-cover rounded-lg border border-gray-300"
          onError={(e) => {
            e.currentTarget.src = "/images/logo/HeartBids.png";
          }}
        />

        {/* ✅ Title Styling */}
        <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>

        {showSeller && seller && (
          <div className="mt-4 p-2 bg-blue-200 rounded-lg shadow-md w-fit">
            <Link to={`/profile/${seller.name}`} className="flex items-center gap-3 hover:underline">
              <img src={seller.avatar?.url || "/default-avatar.png"} alt={seller.avatar?.alt || `${seller.name}'s avatar`} className="w-8 h-8 rounded-full border border-gray-400 object-cover" />
              <div>
                <p className="text-gray-900 font-medium">{seller.name}</p>
              </div>
            </Link>
          </div>
        )}

        {showDescription && description && <p className="text-gray-700 mt-2">{description}</p>}

        {showTags && Array.isArray(tags) && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {tags
              .filter((tag) => tag.toLowerCase() !== "heartbids")
              .map((tag) => (
                <span key={tag} className="bg-gray-300 text-gray-800 text-sm font-semibold px-3 py-1 rounded-sm">
                  #{tag}
                </span>
              ))}
          </div>
        )}

        {/* ✅ Countdown */}
{/* ✅ Only render AuctionCountdown if `showClosingDate` is true */}
{showClosingDate && closingDate && <AuctionCountdown closingDate={closingDate} />}

        {/* ✅ Bidding Details - More Readable & Aligned */}
        <p className="text-lg font-bold mt-2">
          Highest Bid: <span className="text-pink-600">€{price}</span>
          <span className="text-gray-600 text-base">
            {" "}
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
          <div className="text-gray-700 text-base mt-2">
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
