import { useState, useEffect } from "react";

type LotCardProps = {
  image: string;
  title: string;
  price: number;
  bids: number;
  closingDate: string;
  description?: string;
  tags?: string[];
  created?: string;
  updated?: string;
  showDescription?: boolean;
  showTags?: boolean;
  showCreatedUpdated?: boolean;
};

const LotCard = ({
  image,
  title,
  price,
  bids,
  closingDate,
  description,
  tags,
  created,
  updated,
  showDescription = false,
  showTags = false,
  showCreatedUpdated = false,
}: LotCardProps) => {
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
    <div className="bg-blue-100 shadow-lg rounded-lg p-4">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-50 object-cover rounded-md"
        onError={(e) => (e.currentTarget.src = "https://placehold.co/300x200")}
      />
      <h3 className="text-lg font-semibold text-gray-800 mt-4">{title}</h3>

      {/* ✅ Optional Description */}
      {showDescription && description && (
        <p className="text-gray-600 mt-2">{description}</p>
      )}

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
      <p className="text-gray-600 mt-2">{bids} {bids === 1 ? "bid" : "bids"}</p>
      <p className="text-gray-800 font-bold mt-4">€{price}</p>



      <button className="mt-4 bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600">
        View item
      </button>
            {/* ✅ Optional Created/Updated timestamps */}
      {showCreatedUpdated && (
        <div className="text-gray-500 text-xs mt-2">
          {created && <p>Created: {new Date(created).toLocaleDateString()}</p>}
          {updated && <p>Updated: {new Date(updated).toLocaleDateString()}</p>}
        </div>
      )}
    </div>
  );
};

export default LotCard;
