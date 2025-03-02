import { useEffect, useState } from "react";

const AuctionCountdown = ({ closingDate }: { closingDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<string>("Calculating...");
  const [borderClass, setBorderClass] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!closingDate) {
        setTimeLeft("Invalid date");
        setBorderClass("border-gray-300");
        return;
      }

      const endTime = new Date(closingDate).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      let borderColor = "border-secondary-300"; // Default
      if (difference <= 0) {
        setTimeLeft("Auction ended");
        borderColor = "border-gray-300";
      } else if (difference < 1000 * 60 * 60 * 24 * 3) {
        borderColor = "border-accent-300";
      } else if (difference < 1000 * 60 * 60 * 24 * 30) {
        borderColor = "border-primary-300";
      }
      setBorderClass(borderColor);

      if (difference > 0) {
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
      }
    };

    calculateTimeLeft(); // ✅ Ensure it updates immediately
    const interval = setInterval(calculateTimeLeft, 1000); // ✅ Updates every second for final minute
    return () => clearInterval(interval);
  }, [closingDate]);

  return (
    <div className={`mt-2 px-3 py-2 text-base border-t-2 border-b-2 ${borderClass}`}>
      {timeLeft === "Auction ended" ? timeLeft : `Closing in: ${timeLeft}`}
    </div>
  );
};

export default AuctionCountdown;
