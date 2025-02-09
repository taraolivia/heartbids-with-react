export type Bid = {
    amount: number;
    bidder: { name: string; email: string }; // Adjust based on API response
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
  };
  