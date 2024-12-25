import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, AudioWaveform, Image as ImageIcon, Play, Pause } from "lucide-react";
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
        <div className="bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 rounded-xl h-[400px] shadow-lg animate-gradient" />
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl group hover:scale-[1.02]">
      <div className="relative aspect-square">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Cover" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 flex items-center justify-center">
            <ImageIcon className="w-20 h-20 text-primary/20" />
          </div>
        )}
        {audioUrl && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-6 right-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/95 hover:bg-white shadow-xl hover:shadow-2xl scale-90 hover:scale-100 backdrop-blur-sm"
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
              <Pause className="w-5 h-5 text-primary animate-pulse" />
            ) : (
              <Play className="w-5 h-5 text-primary" />
            )}
          </Button>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 space-y-6">
        <h4 className="font-medium text-lg text-primary/90 group-hover:text-primary transition-colors duration-300">
          {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
        </h4>

        {audioUrl && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AudioWaveform className="w-4 h-4" />
              <span>Audio Track</span>
            </div>
            
            <div className="relative group/audio">
              <audio 
                id={`audio-${orderSong.id}`}
                controls 
                className="w-full rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src={audioUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover/audio:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {audioUrl && (
            <Button
              variant="outline"
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md"
              onClick={() => handleDownload(audioUrl, 'audio')}
            >
              <Download className="w-4 h-4 mr-2" />
              Download Audio
            </Button>
          )}
          
          {imageUrl && (
            <Button
              variant="outline"
              className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md"
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