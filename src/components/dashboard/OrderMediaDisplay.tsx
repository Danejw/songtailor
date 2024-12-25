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
  const [isPlaying, setIsPlaying] = useState(false);

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
  }, [orderSong, toast]);

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
      <div className="animate-pulse">
        <div className="bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-xl h-[400px]" />
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative aspect-square">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 flex items-center justify-center">
            <Image className="w-16 h-16 text-[#9b87f5]/20" />
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <h4 className="font-medium text-lg">
          {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
        </h4>

        {audioUrl && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AudioWaveform className="w-4 h-4" />
              <span>Audio Track</span>
            </div>
            
            <audio 
              controls 
              className="w-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          {audioUrl && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDownload(audioUrl, 'audio')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Audio
            </Button>
          )}
          
          {imageUrl && (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleDownload(imageUrl, 'image')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Cover
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}