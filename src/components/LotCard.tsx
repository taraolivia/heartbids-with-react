import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LotCardProps } from "../ts/types/listingTypes";

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
  showSeller 
}) => { 
  const [timeLeft, setTimeLeft] = useState<string>("Calculating...");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(closingDate).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft("Auction ended");
        return;
      }

      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
      const months = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      let timeString = "";
      if (years > 0) timeString += `${years}y `;
      if (months > 0) timeString += `${months}mo `;
      if (days > 0) timeString += `${days}d `;
      if (hours > 0 && years === 0 && months === 0) timeString += `${hours}h `;
      if (minutes > 0 && years === 0 && months === 0 && days === 0) timeString += `${minutes}m`;

      setTimeLeft(timeString.trim());
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [closingDate]);

  return (
    <Link to={`/listing/${id}`} className="block bg-blue-100 shadow-lg rounded-lg p-4 hover:shadow-xl transition">
      <img
        src={image}
        alt={title}
        className="w-full h-50 object-cover rounded-md"
        onError={(e) => {
          if (e.currentTarget.src !== "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png") {
            e.currentTarget.src = "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png";
          }
        }}
      />

      <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>

      {/* ✅ Optional Description */}
      {showDescription && description && <p className="text-gray-600 mt-2">{description}</p>}

      {/* ✅ "Closing in" section remains unchanged */}
      <p className="text-gray-600 mt-2">
        <strong>Closing in:</strong> {timeLeft}
      </p>

      {/* ✅ Optional Tags */}
      {showTags && tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ✅ Show Bids and Price */}
      <p className="text-gray-600 mt-2">
        {bids} {bids === 1 ? "bid" : "bids"}
      </p>
      <p className="text-gray-800 font-bold mt-4">€{price}</p>

      {/* ✅ Show seller info only if enabled */}
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

      {/* ✅ Optional Created/Updated timestamps */}
      {showCreatedUpdated && (
        <div className="text-gray-500 text-xs mt-2">
          {created && <p>Created: {new Date(created).toLocaleDateString()}</p>}
          {updated && <p>Updated: {new Date(updated).toLocaleDateString()}</p>}
        </div>
      )}
    </Link>
  );
};

export default LotCard;
