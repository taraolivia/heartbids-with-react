import { useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LazyLoadImageProps {
  src: string;
  alt: string;
  className?: string; // ✅ This allows styling from the parent component
}

const LazyLoadImage = ({ src, alt, className = "" }: LazyLoadImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      {/* ✅ Show Lottie animation while loading */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <DotLottieReact
            src="https://lottie.host/2bce5596-f80d-4c53-9e90-0aed894e0464/1spas7Sp5y.lottie"
            loop
            autoplay
            className="w-16 h-16"
          />
        </div>
      )}

      {/* ✅ Actual Image - Styling is applied from the parent component */}
      <img
        src={imageError ? "/HeartBids.png" : src}
        alt={alt}
        className={`transition-opacity duration-500 ease-in-out ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true); // Mark as loaded to remove Lottie animation
        }}
      />
    </div>
  );
};

export default LazyLoadImage;
