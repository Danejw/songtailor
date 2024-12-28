export interface Order {
  id: string;
  songs: Song;
  order_songs: OrderSong[];
  created_at: string;
  status: string;
  amount: number;
  delivery_status: string | null;
  includes_both_versions?: boolean;
  includes_cover_image?: boolean;
  payment_status?: string;
  payment_intent_id?: string;
  metadata?: OrderMetadata;
  profiles?: {
    email: string;
  };
  user_id: string;
  song_id: string;
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

export interface OrderSong {
  id: string;
  song_url?: string | null;
  is_primary?: boolean;
  is_public?: boolean;
  created_at?: string;
  lyrics?: string | null;
  order_id?: string;
  cover_images?: {
    id: string;
    file_path: string;
  };
}

export interface OrderMetadata {
  formData?: OrderFormData;
}

export interface OrderFormData {
  [key: string]: any;
  songTitle?: string;
}

export const convertToOrderMetadata = (metadata: any): OrderMetadata => {
  if (!metadata) return {};
  
  try {
    if (typeof metadata === 'string') {
      return JSON.parse(metadata);
    }
    return metadata;
  } catch (error) {
    console.error('Error parsing metadata:', error);
    return {};
  }
};

export const hasFormData = (metadata: any): boolean => {
  if (!metadata) return false;
  return !!metadata.formData;
};