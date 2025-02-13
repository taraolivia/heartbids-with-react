import { useEffect, useState } from "react";

const AuctionCountdown = ({ closingDate }: { closingDate: string }) => {
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

      const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));
      const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      let formattedTime = "";

      if (months > 0) {
        formattedTime = `${months}m${days > 0 ? `, ${days}d` : ""}`;
      } else if (days > 0) {
        formattedTime = `${days}d${hours > 0 ? `, ${hours}h` : ""}`;
      } else if (hours > 0) {
        formattedTime = `${hours}h${minutes > 0 ? `, ${minutes}m` : ""}`;
      } else {
        formattedTime = `${minutes}m`;
      }

      setTimeLeft(formattedTime);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(interval);
  }, [closingDate]);

  return (
    <p className="text-gray-600 mt-2">
      {timeLeft === "Auction ended" ? (
        timeLeft
      ) : (
        <span>
          <strong>Closing in:</strong> {timeLeft}
        </span>
      )}
    </p>
  );
};

export default AuctionCountdown;
