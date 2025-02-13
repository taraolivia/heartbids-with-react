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
    <div className="bg-blue-100 shadow-lg rounded-lg p-4 hover:shadow-xl transition">
      {/* ✅ Buttons Container - Flexbox for Even Spacing */}
      {showControls && (
        <div className="flex justify-between mb-2">
          <EditButton listingId={id} />
          <DeleteButton listingId={id} onDelete={onDelete ?? (() => {})} /> 
          </div>
      )}

      {/* ✅ Entire card remains clickable */}
      <Link to={`/listing/${id}`} className="block">
        <img
          src={image}
          alt={title}
          className="w-full h-50 object-cover rounded-md"
          onError={(e) => {
            e.currentTarget.src = "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png";
          }}
        />

        <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>

        {showDescription && description && <p className="text-gray-600 mt-2">{description}</p>}

        <AuctionCountdown closingDate={closingDate} />


        {showTags && tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-gray-600 mt-2">{bids} {bids === 1 ? "bid" : "bids"}</p>
        <p className="text-gray-800 font-bold mt-4">€{price}</p>

        {showSeller && seller && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-gray-800 font-semibold">Seller:</h4>
            <div className="flex items-center gap-2 mt-2">
              {seller.avatar?.url && <img src={seller.avatar.url} alt={seller.avatar.alt || seller.name} className="w-10 h-10 rounded-full" />}
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
