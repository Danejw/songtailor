import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Image as ImageIcon, Play, Pause } from "lucide-react";
import { FileUrlManager } from "@/components/admin/files/FileUrlManager";
import { useAudio } from "@/components/audio/AudioContext";

interface PublicSongCardProps {
  song: {
    id: string;
    song_url: string | null;
    cover_images: {
      file_path: string;
    } | null;
  };
  title?: string;
}

export function PublicSongCard({ song, title = "Untitled Song" }: PublicSongCardProps) {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useAudio();

  useEffect(() => {
    const loadUrls = async () => {
      try {
        if (song.song_url) {
          const url = await FileUrlManager.getPublicUrl('songs', song.song_url);
          setAudioUrl(url);
        }
        
        if (song.cover_images?.file_path) {
          const url = await FileUrlManager.getPublicUrl('covers', song.cover_images.file_path);
          setImageUrl(url);
        }
      } catch (error) {
        console.error('Error loading media URLs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUrls();
  }, [song]);

  const isCurrentlyPlaying = currentTrack?.url === audioUrl && isPlaying;

  const handlePlayPause = () => {
    if (isCurrentlyPlaying) {
      pauseTrack();
    } else {
      playTrack(audioUrl, title);
    }
  };

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

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 group bg-white/80 backdrop-blur-sm border-[#9b87f5]/10 hover:border-[#9b87f5]/30">
      <CardContent className="p-6 space-y-4">
        <div className="relative">
          {imageUrl ? (
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={imageUrl}
                alt="Song cover"
                className="w-full h-48 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-700"
                onError={() => setImageUrl("")}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg flex items-center justify-center group-hover:from-[#9b87f5]/10 group-hover:to-[#7E69AB]/10 transition-colors duration-500">
              <ImageIcon className="w-16 h-16 text-[#9b87f5]/20 group-hover:scale-110 transition-transform duration-500" />
            </div>
          )}

          {audioUrl && (
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white/90 hover:bg-white shadow-lg"
              onClick={handlePlayPause}
            >
              {isCurrentlyPlaying ? (
                <Pause className="h-6 w-6 text-primary" />
              ) : (
                <Play className="h-6 w-6 text-primary ml-1" />
              )}
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-lg text-primary/90">{title}</h3>
          {!audioUrl && (
            <div className="w-full h-12 bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg flex items-center justify-center space-x-2 group-hover:from-[#9b87f5]/10 group-hover:to-[#7E69AB]/10 transition-colors duration-500">
              <Music className="w-5 h-5 text-[#9b87f5]/30" />
              <span className="text-sm text-muted-foreground">Audio unavailable</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}