import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Image as ImageIcon, Play, Pause, AlertCircle } from "lucide-react";
import { FileUrlManager } from "@/components/admin/files/FileUrlManager";
import { useAudio } from "@/components/audio/AudioContext";
import { useToast } from "@/hooks/use-toast";
import type { OrderSong } from "@/components/admin/types";

interface PublicSongCardProps {
  song: OrderSong;
  title: string;
  style: string;
  theme: string;
}

export function PublicSongCard({ song, title, style, theme }: PublicSongCardProps) {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [hasAudioError, setHasAudioError] = useState(false);
  const [hasImageError, setHasImageError] = useState(false);
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();
  const { toast } = useToast();

  useEffect(() => {
    const loadUrls = async () => {
      try {
        setIsLoading(true);
        setHasAudioError(false);
        setHasImageError(false);

        if (song.song_url) {
          try {
            const url = await FileUrlManager.getPublicUrl('songs', song.song_url);
            if (url) {
              setAudioUrl(url);
            } else {
              setHasAudioError(true);
            }
          } catch (error) {
            console.error('Error loading audio URL:', error);
            setHasAudioError(true);
          }
        }
        
        if (song.cover_images?.file_path) {
          try {
            const url = await FileUrlManager.getPublicUrl('covers', song.cover_images.file_path);
            if (url) {
              setImageUrl(url);
            } else {
              setHasImageError(true);
            }
          } catch (error) {
            console.error('Error loading image URL:', error);
            setHasImageError(true);
          }
        }
      } catch (error) {
        console.error('Error loading media URLs:', error);
        toast({
          title: "Error loading media",
          description: "Some media files could not be loaded",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadUrls();
  }, [song, toast]);

  const isCurrentlyPlaying = currentTrack?.songId === song.id && isPlaying;

  if (isLoading) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-500 bg-white/80 backdrop-blur-sm border-[#9b87f5]/10">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg" />
            <div className="h-10 bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const handlePlayPause = () => {
    if (!audioUrl || hasAudioError) {
      toast({
        title: "Cannot play audio",
        description: "The audio file is not available",
        variant: "destructive",
      });
      return;
    }

    if (isCurrentlyPlaying) {
      pauseTrack();
    } else {
      playTrack(audioUrl, title, song.id);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-[#9b87f5]/10 hover:border-[#9b87f5]/30">
      <CardContent className="p-6 space-y-4">
        {!hasImageError && imageUrl ? (
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={imageUrl}
              alt={`Cover for ${title}`}
              className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-700"
              onError={() => setHasImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {!hasAudioError && audioUrl && (
              <Button
                variant="secondary"
                size="icon"
                className="absolute bottom-2 right-2 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/90 hover:bg-white shadow-sm"
                onClick={handlePlayPause}
              >
                {isCurrentlyPlaying ? (
                  <Pause className="h-5 w-5 text-primary" />
                ) : (
                  <Play className="h-5 w-5 text-primary ml-0.5" />
                )}
              </Button>
            )}
          </div>
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg flex items-center justify-center group-hover:from-[#9b87f5]/10 group-hover:to-[#7E69AB]/10 transition-colors duration-500">
            <Music className="w-16 h-16 text-[#9b87f5]/20 group-hover:scale-110 transition-transform duration-500" />
          </div>
        )}
        
        <div className="space-y-2">
          <h3 className="font-medium text-lg text-primary/90 group-hover:text-primary truncate">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground/80">
            {style} • {theme}
          </p>
          
          {hasAudioError ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 rounded-lg p-2">
              <AlertCircle className="h-4 w-4" />
              <span>Audio unavailable</span>
            </div>
          ) : audioUrl && (
            <Button
              variant="outline"
              size="sm"
              className="w-full h-10 gap-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              onClick={handlePlayPause}
            >
              {isCurrentlyPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Play
                </>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}