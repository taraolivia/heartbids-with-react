export type Bid = {
  id: string;
  amount: number;
  created: string;
  bidder: {
    name: string;
    email: string;
    bio?: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string };
  };
  listing?: Listing; // ✅ Use the full `Listing` type
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
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  wins?: string[]; // ✅ Added to match `Listing.seller`
};


export type LotCardProps = {
  id: string;
  image: string;
  title: string;
  price: number; // ✅ Highest bid on the listing
  userBid?: number; // ✅ Your highest bid
  bids: number;
  closingDate?: string;
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
  showControls?: boolean;
  showClosingDate?: boolean;
};





export type UserProfile = {
  name: string;
  email: string;
  bio?: string;
  avatar?: { url: string; alt?: string };
  banner?: { url: string; alt?: string };
  credits: number;
  _count?: { listings?: number; wins?: number };
  listings?: Listing[]; // ✅ Made optional to avoid issues before data loads
};


