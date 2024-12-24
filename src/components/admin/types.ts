export interface Song {
  id?: string;
  title: string | null;
  style: string | null;
  lyrics: string | null;
  themes: string | null;
  reference_links: string | null;
}

export interface Profile {
  email: string | null;  // Made email nullable to match database schema
}

export interface CoverImage {
  id: string;
  file_path: string;
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  songs?: Song | null;  // Made songs optional and nullable
  profiles?: Profile | null;  // Made profiles optional and nullable
  amount: number;
  delivery_status: string | null;
  final_song_url: string | null;
  includes_both_versions: boolean | null;
  includes_cover_image: boolean | null;
  metadata: any | null;
  payment_intent_id: string | null;
  payment_status: string | null;
  song_id: string;
  user_id: string;
  cover_images: CoverImage[] | null;  // Made cover_images nullable
}