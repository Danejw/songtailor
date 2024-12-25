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
  order_id: string | null;
  song_url: string | null;
  is_primary: boolean;
  cover_images: CoverImage | null;
  is_public?: boolean;
}

export interface OrderFormData {
  name: string;
  email: string;
  phone?: string;
  songTitle?: string;
  provideLyrics: "yes" | "no";
  lyrics?: string;
  theme?: string;
  musicStyle: string;
  otherMusicStyle?: string;
  mood: string;
  otherMood?: string;
  references?: string;
  wantCoverImage: boolean;
  wantSecondSong: boolean;
  wantSecondCoverImage: boolean;
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
  metadata: {
    formData: OrderFormData;
  } | null;
  payment_intent_id: string | null;
  payment_status: string | null;
  song_id: string;
  user_id: string;
  order_songs: OrderSong[] | null;
}