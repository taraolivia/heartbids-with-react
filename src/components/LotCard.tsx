import { useState, useEffect } from "react";

type Seller = {
    name: string;
    email: string;
    bio?: string;
    avatar?: {
        url: string;
        alt?: string;
    }
}

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
  seller?: Seller;
  showSeller?: boolean;
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
  seller,
  showSeller = false,
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
        onError={(e) => (e.currentTarget.src = "https://media-hosting.imagekit.io//6ed86c1b39c84cff/HeartBids%20(2).png?Expires=1833634300&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=DXzKjKB9EBskp3Bvq-3FtMxhTtUHE2KAukzJMqO5LbXgl8FP60SfJ~0O6McJzoOI4pemUMFl24KopwqxhMfW43C9ZLP18whF774erFlx-k3YgWa5rfL3S-vPps0KlrpfcqiZS3KBesfBFlENrQscU03jUHEEH4m8BE5BpOm8P6w-~9GcCsJ20C2zEYzluPExOP9W-q9w2QQ9X8GGuXxcrgaY568UXeteS9XSYQGnHe1I7LdLwdTqFlN59BBQrlXqTU~glSXVFBiJgcUHg3B61xF3k-aOw9M-Dt5edaqmjTlRkFSiAkknFLmEvUjreiupxnWaMFx6pmm~sham2D0PcA__")}
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

      {/* ✅ Show seller info only if enabled */}
      {showSeller && seller && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-gray-800 font-semibold">Seller:</h4>
          <div className="flex items-center gap-2 mt-2">
            {seller.avatar?.url && (
              <img
                src={seller.avatar.url}
                alt={seller.avatar.alt || seller.name}
                className="w-10 h-10 rounded-full"
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
