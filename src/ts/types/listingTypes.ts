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
  bids?: Bid[]; // ✅ No change here; just ensure it's properly fetched
  seller: {
    name: string;
    email: string; // ✅ Added email
    bio?: string;
    avatar?: { url: string; alt?: string };
    banner?: { url: string; alt?: string }; // ✅ Added banner
    wins?: string[]; // ✅ Added wins (array of listing IDs)
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
};
