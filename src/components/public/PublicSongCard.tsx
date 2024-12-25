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
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-4">
            <div className="h-48 bg-muted rounded-md"></div>
            <div className="h-10 bg-muted rounded-md"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4 space-y-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Song cover"
            className="w-full h-48 object-cover rounded-md"
            onError={() => setImageUrl("")}
          />
        ) : (
          <div className="w-full h-48 bg-muted rounded-md flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        
        {audioUrl ? (
          <audio 
            controls 
            className="w-full"
            onError={() => setAudioUrl("")}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        ) : (
          <div className="w-full h-10 bg-muted rounded-md flex items-center justify-center">
            <Music className="w-6 h-6 text-muted-foreground" />
            <span className="ml-2 text-sm text-muted-foreground">Audio unavailable</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}