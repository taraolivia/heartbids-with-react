import { Link } from "react-router-dom";
import { LotCardProps } from "../ts/types/listingTypes";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import AuctionCountdown from "./AuctionCountdown";


const LotCard: React.FC<LotCardProps> = ({
  id,
  image,
  title,
  price,
  bids,
  closingDate,
  userBid, // ✅ Accept user's highest bid
  description,
  tags,
  created,
  updated,
  showDescription,
  showTags,
  showCreatedUpdated,
  seller,
  showSeller,
  showControls = false,
  onDelete, 
}) => {
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

    {showDescription && description && <p className="text-gray-700 mt-2">{description}</p>}

    {/* ✅ Countdown */}
    <AuctionCountdown closingDate={closingDate} />

    {showTags && Array.isArray(tags) && tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mt-2">
        {tags.map((tag) => (
          <span key={tag} className="bg-gray-300 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    )}

    {/* ✅ Bidding Details - More Readable & Aligned */}
    <p className="text-gray-600 mt-3">{bids} {bids === 1 ? "bid" : "bids"}</p>
    <p className="text-lg font-bold mt-2">Highest Bid: <span className="text-pink-600">€{price}</span></p>

    {/* ✅ User’s Highest Bid (if applicable) */}
    {userBid !== undefined && (
      <p className="text-blue-600 font-bold mt-1">
        Your Highest Bid: <span className="text-blue-500">€{userBid}</span>
      </p>
    )}

    {showSeller && seller && (
      <div className="mt-4 p-3 bg-gray-50 rounded-lg shadow-md">
        <h4 className="text-gray-800 font-semibold">Seller:</h4>
        <div className="flex items-center gap-3 mt-2">
          {seller.avatar?.url && (
            <img 
              src={seller.avatar.url} 
              alt={seller.avatar.alt || seller.name} 
              className="w-12 h-12 rounded-full border border-gray-400" 
            />
          )}
          <div>
            <p className="text-gray-900 font-medium">{seller.name}</p>
            <p className="text-gray-500 text-xs">{seller.email}</p>
            {seller.bio && <p className="text-gray-600 text-sm">{seller.bio}</p>}
          </div>
        </div>
      </div>
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
