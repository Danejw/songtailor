export interface Order {
  id: string;
  songs: {
    title: string;
  };
  order_songs: {
    id: string;
    lyrics: string | null;
  }[];
  created_at: string;
  status: string;
  amount: number;
  delivery_status: string;
  includes_both_versions?: boolean;
  includes_cover_image?: boolean;
  payment_status?: string;
  payment_intent_id?: string;
  metadata?: any;
}

export interface Song {
  id: string;
  title: string;
  style: string;
  lyrics: string | null;
  reference_links: string | null;
  themes?: string;
  status?: string;
}