import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, AudioWaveform, Image, Play, Pause } from "lucide-react";
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

      toast({
        title: "Download Started",
        description: `Your ${type} file will download shortly.`,
      });
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
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg h-[200px] shadow" />
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow group">
      <div className="relative aspect-square">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Cover" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            <Image className="w-8 h-8 text-primary/20" />
          </div>
        )}
        {audioUrl && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-sm"
            onClick={() => {
              const audio = document.querySelector(`#audio-${orderSong.id}`) as HTMLAudioElement;
              if (audio.paused) {
                audio.play();
                setIsPlaying(true);
              } else {
                audio.pause();
                setIsPlaying(false);
              }
            }}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary" />
            )}
          </Button>
        )}
      </div>

      <div className="p-3 space-y-2">
        <h4 className="text-xs font-medium text-primary/90">
          {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
        </h4>

        {audioUrl && (
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <AudioWaveform className="w-3 h-3" />
              <span>Audio Track</span>
            </div>
            
            <audio 
              id={`audio-${orderSong.id}`}
              controls 
              className="w-full h-8"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="flex gap-1 pt-1">
          {audioUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-7 text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              onClick={() => handleDownload(audioUrl, 'audio')}
            >
              <Download className="w-3 h-3 mr-1" />
              Audio
            </Button>
          )}
          
          {imageUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-7 text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              onClick={() => handleDownload(imageUrl, 'image')}
            >
              <Download className="w-3 h-3 mr-1" />
              Cover
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}