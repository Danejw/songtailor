import { Button } from "@/components/ui/button";
import { AudioWaveform, Image, Trash2 } from "lucide-react";
import type { Order } from "./types";

interface OrderUploadedFilesProps {
  order: Order;
  onDeleteAudio: () => Promise<void>;
  onDeleteCoverImage: (coverImage: { id: string, file_path: string }) => Promise<void>;
  isDeleting: boolean;
}

export function OrderUploadedFiles({
  order,
  onDeleteAudio,
  onDeleteCoverImage,
  isDeleting
}: OrderUploadedFilesProps) {
  if (!order.final_song_url && (!order.songs?.cover_images || order.songs.cover_images.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Uploaded Files</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {order.final_song_url && (
          <div className="flex items-center gap-2 p-4 border rounded-lg">
            <AudioWaveform className="w-5 h-5 text-blue-500" />
            <div className="flex-1">
              <p className="font-medium">Final Song</p>
              <audio controls className="w-full mt-2">
                <source src={order.final_song_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDeleteAudio}
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
        
        {order.songs?.cover_images?.map((cover) => (
          <div key={cover.id} className="flex items-center gap-2 p-4 border rounded-lg">
            <Image className="w-5 h-5 text-green-500" />
            <div className="flex-1">
              <p className="font-medium">Cover Image</p>
              <img 
                src={cover.file_path} 
                alt="Cover" 
                className="w-full h-40 object-cover rounded-lg mt-2"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDeleteCoverImage(cover)}
              disabled={isDeleting}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}