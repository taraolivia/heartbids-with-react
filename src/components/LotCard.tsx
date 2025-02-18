import { Link } from "react-router-dom";
import { LotCardProps } from "../ts/types/listingTypes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AuctionCountdown from "./AuctionCountdown";

const LotCard: React.FC<LotCardProps> = ({ id, image, title, price, bids, closingDate, userBid, description, tags, created, updated, showDescription, showTags, showCreatedUpdated, seller, showSeller, showControls = false, onDelete }) => {
  return (
    <div className="bg-blue-100 shadow-lg rounded-xl p-5 hover:shadow-2xl transition-transform transform hover:scale-105 min-w-72 max-w-80">
      {showControls && (
        <div className="flex justify-between mb-3">
          <EditButton listingId={id} />
          <DeleteButton listingId={id} onDelete={onDelete ?? (() => {})} />
        </div>
      )}

      <Link to={`/listing/${id}`} className="block">
        {/* ✅ Image Styling - Consistent Height & Rounded Corners */}
        <img
          src={image}
          alt={title}
          className="w-full h-72 object-cover rounded-lg border border-gray-300"
          onError={(e) => {
            e.currentTarget.src = "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png";
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
          <div className="flex flex-wrap gap-2 mt-2">
            {tags
              .filter((tag) => tag.toLowerCase() !== "heartbids") // ✅ Exclude "HeartBids" tag
              .map((tag) => (
                <span key={tag} className="bg-gray-300 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
          </div>
        )}

        {/* ✅ Countdown */}
        <AuctionCountdown closingDate={closingDate} />

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
          <div className="text-gray-500 text-xs mt-2">
            {created && <p>Created: {new Date(created).toLocaleDateString()}</p>}
            {updated && <p>Updated: {new Date(updated).toLocaleDateString()}</p>}
          </div>
        )}
      </Link>
    </div>
  );
};

export default LotCard;
