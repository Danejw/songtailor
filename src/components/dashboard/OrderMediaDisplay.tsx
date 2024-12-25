import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, AudioWaveform, Image } from "lucide-react";
import { FileUrlManager } from "@/components/admin/files/FileUrlManager";
import { useToast } from "@/hooks/use-toast";
import type { OrderSong } from "@/components/admin/types";

interface OrderMediaDisplayProps {
  orderSong: OrderSong;
}

export function OrderMediaDisplay({ orderSong }: OrderMediaDisplayProps) {
  const { toast } = useToast();
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUrls = async () => {
      try {
        if (orderSong.song_url) {
          const url = await FileUrlManager.getPublicUrl('songs', orderSong.song_url);
          setAudioUrl(url);
        }
        
        if (orderSong.cover_images?.file_path) {
          const url = await FileUrlManager.getPublicUrl('covers', orderSong.cover_images.file_path);
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Error loading media URLs:', error);
        toast({
          title: "Error",
          description: "Failed to load media files",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUrls();
  }, [orderSong]);

  const handleDownload = async (url: string, type: 'audio' | 'image') => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${type === 'audio' ? 'song' : 'cover'}-${orderSong.id}.${type === 'audio' ? 'mp3' : 'jpg'}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-40 bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium">
        {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
      </h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audioUrl && (
          <div className="p-4 border rounded-lg space-y-3 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <AudioWaveform className="w-5 h-5 text-[#9b87f5]" />
              <span className="font-medium">Audio Track</span>
            </div>
            <audio 
              controls 
              className="w-full"
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDownload(audioUrl, 'audio')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Audio
            </Button>
          </div>
        )}
        
        {imageUrl && (
          <div className="p-4 border rounded-lg space-y-3 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Image className="w-5 h-5 text-[#9b87f5]" />
              <span className="font-medium">Cover Image</span>
            </div>
            <img 
              src={imageUrl} 
              alt="Cover" 
              className="w-full h-40 object-cover rounded-lg"
            />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDownload(imageUrl, 'image')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Cover
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}