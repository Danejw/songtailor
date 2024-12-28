import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileUrlManager } from "@/components/admin/files/FileUrlManager";
import { useToast } from "@/hooks/use-toast";
import { useAudio } from "@/components/audio/AudioContext";
import type { OrderSong, OrderMetadata } from "@/components/admin/types";
import { supabase } from "@/integrations/supabase/client";
import { Play, Pause, Download, Image } from "lucide-react";
import { hasFormData } from "@/components/admin/types";

interface OrderMediaDisplayProps {
  orderSong: OrderSong;
}

export function OrderMediaDisplay({ orderSong }: OrderMediaDisplayProps) {
  const { toast } = useToast();
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [songTitle, setSongTitle] = useState<string>("Untitled Song");

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

        if (orderSong.order_id) {
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .select('metadata')
            .eq('id', orderSong.order_id)
            .maybeSingle();

          if (orderError) throw orderError;

          if (orderData?.metadata) {
            const metadata = orderData.metadata as OrderMetadata;
            if (hasFormData(metadata) && metadata.formData?.songTitle) {
              setSongTitle(metadata.formData.songTitle);
            }
          }
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

  const isCurrentlyPlaying = currentTrack?.url === audioUrl && isPlaying;

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
              if (isCurrentlyPlaying) {
                pauseTrack();
              } else {
                playTrack(audioUrl, songTitle, orderSong.id);
              }
            }}
          >
            {isCurrentlyPlaying ? (
              <Pause className="w-4 h-4 text-primary" />
            ) : (
              <Play className="w-4 h-4 text-primary" />
            )}
          </Button>
        )}
      </div>

      <div className="p-3 space-y-2">
        <div className="flex gap-1 pt-1">
          {audioUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-7 text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              onClick={() => {
                if (isCurrentlyPlaying) {
                  pauseTrack();
                } else {
                  playTrack(audioUrl, songTitle, orderSong.id);
                }
              }}
            >
              {isCurrentlyPlaying ? (
                <>
                  <Pause className="w-3 h-3 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Play
                </>
              )}
            </Button>
          )}
          
          {imageUrl && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-7 text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              onClick={() => window.open(imageUrl, '_blank')}
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
