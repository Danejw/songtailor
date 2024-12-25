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
  id: string;  // Changed back to required since components expect it
  file_path: string;
}

export interface OrderSong {
  id: string;
  order_id: string | null;
  song_url: string | null;
  is_primary: boolean;
  is_public: boolean;
  created_at: string;
  cover_images: CoverImage | null;
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

export interface OrderMetadata {
  formData: OrderFormData;
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
  metadata: OrderMetadata | null;
  payment_intent_id: string | null;
  payment_status: string | null;
  song_id: string;
  user_id: string;
  order_songs: OrderSong[] | null;
}

// Type guard for checking if metadata has formData
export function hasFormData(metadata: any): metadata is OrderMetadata {
  return metadata && typeof metadata === 'object' && 'formData' in metadata;
}