import { Json } from "@/integrations/supabase/types";

export interface OrderFormData {
  songTitle: string;
  style: string;
  themes: string[];
  referenceLinks: string[];
  wantSecondCoverImage?: boolean;
}

export interface Order {
  id: string;
  created_at: string;
  status: string;
  songs: {
    title: string | null;
    style: string | null;
    themes: string | null;
    lyrics: string | null;
    reference_links: string | null;
  } | null;
  profiles?: {
    id: string;
    email: string | null;
  } | null;
  amount: number;
  delivery_status: string | null;
  includes_both_versions: boolean | null;
  includes_cover_image: boolean | null;
  metadata: {
    formData?: OrderFormData;
  } | null;
  payment_intent_id: string | null;
  payment_status: string | null;
  song_id: string;
  user_id: string;
  order_songs: OrderSong[] | null;
}