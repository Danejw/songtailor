import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PublicSongCard } from "@/components/public/PublicSongCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Music, Loader2 } from "lucide-react";

const PublicSongs = () => {
  const { data: publicSongs, isLoading } = useQuery({
    queryKey: ['publicSongs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order_songs')
        .select(`
          *,
          cover_images (
            file_path
          )
        `)
        .eq('is_public', true);

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/5 via-white to-[#7E69AB]/5">
      <Navigation />
      
      {/* Hero section with gradient and pattern */}
      <div className="relative py-16 bg-gradient-to-b from-white via-white/80 to-transparent">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] bg-clip-text text-transparent mb-4">
            Public Songs
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and listen to our collection of publicly shared songs
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-[#9b87f5]" />
            <p className="text-muted-foreground">Loading songs...</p>
          </div>
        ) : !publicSongs?.length ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <Music className="h-16 w-16 text-muted-foreground/50" />
            <p className="text-xl text-muted-foreground">No public songs available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicSongs.map((song) => (
              <PublicSongCard key={song.id} song={song} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicSongs;