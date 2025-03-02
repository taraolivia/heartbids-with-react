import { useLoading } from "../../utilities/LoadingProvider";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary/70 backdrop-blur-md z-50">
      <DotLottieReact
        src="https://lottie.host/8caf7e57-45e3-4900-8313-7877f7b1ad8b/JNaDKQNbol.lottie"
        loop
        autoplay
        className="w-30 h-30"
      />
    </div>
  );
};

export default LoadingOverlay;
