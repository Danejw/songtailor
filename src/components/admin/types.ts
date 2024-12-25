// Basic types
export interface Song {
  id?: string;
  title: string | null;
  style: string | null;
  lyrics: string | null;
  themes: string | null;
  reference_links: string | null;
}

export interface Profile {
  id: string;
  email: string | null;
}

export interface CoverImage {
  id: string;
  file_path: string;
}

export interface OrderSong {
  id: string;
  song_url: string | null;
  is_primary: boolean;
  cover_images: CoverImage | null;
  metadata?: { songTitle?: string } | null;
  order_id?: string;
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  songs: Song | null;
  profiles?: Profile | null;
  amount: number;
  delivery_status: string | null;
  includes_both_versions: boolean | null;
  includes_cover_image: boolean | null;
  metadata: any | null;
  payment_intent_id: string | null;
  payment_status: string | null;
  song_id: string;
  user_id: string;
  order_songs: OrderSong[] | null;
}