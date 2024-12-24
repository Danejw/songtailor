import { Button } from "@/components/ui/button";
import { AudioWaveform, Image, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Order, OrderSong } from "./types";

interface OrderUploadedFilesProps {
  order: Order;
  onDeleteAudio: (orderSongId: string) => Promise<void>;
  onDeleteCoverImage: (coverImage: { id: string, file_path: string }, orderSongId: string) => Promise<void>;
  isDeleting: boolean;
}

export function OrderUploadedFiles({
  order,
  onDeleteAudio,
  onDeleteCoverImage,
  isDeleting
}: OrderUploadedFilesProps) {
  if (!order.order_songs?.length) {
    return null;
  }

  const getPublicUrl = (bucket: string, filePath: string) => {
    const fileName = filePath.split('/').pop();
    if (!fileName) return '';
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);
    
    return publicUrl;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Uploaded Files</h3>
      {order.order_songs.map((orderSong: OrderSong) => (
        <div key={orderSong.id} className="border p-4 rounded-lg space-y-4">
          <h4 className="font-medium">
            {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {orderSong.song_url && (
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <AudioWaveform className="w-5 h-5 text-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Song File</p>
                  <audio controls className="w-full mt-2">
                    <source src={getPublicUrl('songs', orderSong.song_url)} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeleteAudio(orderSong.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
            
            {orderSong.cover_images && (
              <div className="flex items-center gap-2 p-4 border rounded-lg">
                <Image className="w-5 h-5 text-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Cover Image</p>
                  <img 
                    src={getPublicUrl('covers', orderSong.cover_images.file_path)} 
                    alt="Cover" 
                    className="w-full h-40 object-cover rounded-lg mt-2"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => onDeleteCoverImage(orderSong.cover_images!, orderSong.id)}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}