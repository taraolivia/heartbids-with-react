export type Bid = {
  id: string; // ✅ Added unique bid ID
  amount: number;
  bidder: {
    name: string;
    email: string;
    bio?: string; // ✅ Added bio
    avatar?: { url: string; alt?: string }; // ✅ Added avatar
    banner?: { url: string; alt?: string }; // ✅ Added banner
  };
  created: string;
};

export type Listing = {
  id: string;
  title: string;
  description: string | null;
  created: string;
  updated: string;
  endsAt: string;
  media: Array<{ url: string; alt: string }>;
  tags: string[];
  _count: { bids: number };
  bids?: Bid[];
  seller: {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
    wins?: string[]; // ✅ Ensuring seller's `wins` is an array of listing IDs
  };
};


export type LatestListingsProps = {
  loading: boolean;
  error: string | null;
};

export type Seller = {
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    url: string;
    alt?: string;
  };
};

export type LotCardProps = {
  id: string;
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
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  showControls?: boolean; // ✅ NEW: Only show buttons when true
};




export type UserProfile = {
  name: string;
  email: string; // ✅ Added email
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  credits: number;
  _count?: { listings?: number; wins?: number }; 
  listings: Listing[];
};


