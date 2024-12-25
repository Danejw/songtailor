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
        
        {audioUrl ? (
          <div className="relative rounded-lg overflow-hidden">
            <audio 
              controls 
              className="w-full h-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9b87f5]/20"
              onError={() => setAudioUrl("")}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className={`absolute inset-0 bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'}`} />
          </div>
        ) : (
          <div className="w-full h-12 bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 rounded-lg flex items-center justify-center space-x-2 group-hover:from-[#9b87f5]/10 group-hover:to-[#7E69AB]/10 transition-colors duration-500">
            <Music className="w-5 h-5 text-[#9b87f5]/30" />
            <span className="text-sm text-muted-foreground">Audio unavailable</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}