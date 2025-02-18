import { useEffect, useState } from "react";
import clsx from "clsx"; // ✅ Use clsx for cleaner class handling

const AuctionCountdown = ({ closingDate }: { closingDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<string>("Calculating...");
  const [statusClass, setStatusClass] = useState<string>("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endTime = new Date(closingDate).getTime();
      const now = new Date().getTime();
      const difference = endTime - now;

      // ✅ Determine status and apply color classes
      let status = "";
      if (difference <= 0) {
        setTimeLeft("Auction ended");
        status = "bg-gray-300"; // Ended (gray)
      } else if (difference < 1000 * 60 * 60 * 24 * 3) {
        status = "bg-red-100"; // Less than 3 days (red)
      } else if (difference < 1000 * 60 * 60 * 24 * 30) {
        status = "bg-green-100"; // Less than a month (green)
      } else {
        status = "bg-blue-200"; // More than a month (blue)
      }
      setStatusClass(status);

      // ✅ Format the time remaining
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

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(interval);
  }, [closingDate]);

  return (
    <div className={clsx("mt-2 px-3 py-2 rounded-lg text-sm font-semibold", statusClass)}>
      {timeLeft === "Auction ended" ? timeLeft : `Closing in: ${timeLeft}`}
    </div>
  );
};

export default AuctionCountdown;
