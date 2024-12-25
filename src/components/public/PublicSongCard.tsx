import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Image as ImageIcon } from "lucide-react";
import { FileUrlManager } from "@/components/admin/files/FileUrlManager";

interface PublicSongCardProps {
  song: {
    id: string;
    song_url: string | null;
    cover_images: {
      file_path: string;
    } | null;
  };
}

export function PublicSongCard({ song }: PublicSongCardProps) {
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load URLs when component mounts
  useState(() => {
    const loadUrls = async () => {
      if (song.song_url) {
        const url = await FileUrlManager.getPublicUrl('songs', song.song_url);
        setAudioUrl(url);
      }
      
      if (song.cover_images?.file_path) {
        const url = await FileUrlManager.getPublicUrl('covers', song.cover_images.file_path);
        setImageUrl(url);
      }
      
      setIsLoading(false);
    };

    loadUrls();
  });

  if (isLoading) {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-[#9b87f5]/10">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-[#9b87f5]/10 rounded-md" />
            <div className="h-10 bg-[#9b87f5]/10 rounded-md" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white/80 backdrop-blur-sm border-[#9b87f5]/10">
      <CardContent className="p-4 space-y-4">
        {imageUrl ? (
          <div className="relative overflow-hidden rounded-md">
            <img
              src={imageUrl}
              alt="Song cover"
              className="w-full h-48 object-cover rounded-md transform group-hover:scale-105 transition-transform duration-300"
              onError={() => setImageUrl("")}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ) : (
          <div className="w-full h-48 bg-[#9b87f5]/5 rounded-md flex items-center justify-center group-hover:bg-[#9b87f5]/10 transition-colors duration-300">
            <ImageIcon className="w-12 h-12 text-[#9b87f5]/30" />
          </div>
        )}
        
        {audioUrl ? (
          <div className="relative">
            <audio 
              controls 
              className="w-full h-10 rounded-md focus:outline-none focus:ring-2 focus:ring-[#9b87f5]/20"
              onError={() => setAudioUrl("")}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className={`absolute inset-0 bg-[#9b87f5]/5 rounded-md transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`} />
          </div>
        ) : (
          <div className="w-full h-10 bg-[#9b87f5]/5 rounded-md flex items-center justify-center space-x-2">
            <Music className="w-4 h-4 text-[#9b87f5]/30" />
            <span className="text-sm text-muted-foreground">Audio unavailable</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}