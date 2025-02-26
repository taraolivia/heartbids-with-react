import { useState } from "react";

interface CopyLinkButtonProps {
  url: string;
  className?: string; // ✅ Allow custom styling
}

const CopyLinkButton: React.FC<CopyLinkButtonProps> = ({ url, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000); 
  };

  return (
    <button
      onClick={handleCopy}
      className={`absolute bottom-2 right-2 bg-black/50 text-white px-3 py-1 rounded-md shadow-md hover:bg-black/70 transition flex items-center gap-2 ${className}`}
    >
      📋 {copied ? "Copied!" : "Copy link to listing"}
    </button>
  );
};

export default CopyLinkButton;
