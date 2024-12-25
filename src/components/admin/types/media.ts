export interface CoverImage {
  id: string;
  file_path: string;
}

export interface OrderSong {
  id: string;
  song_url: string | null;
  is_primary: boolean;
  cover_images: CoverImage | null;
  order_id?: string;
}