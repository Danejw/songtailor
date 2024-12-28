import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PublicSongCard } from "@/components/public/PublicSongCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Music, Loader2 } from "lucide-react";
import type { OrderSong } from "@/components/admin/types";

const PublicSongs = () => {
  const { data: publicSongs, isLoading, error } = useQuery({
    queryKey: ['publicSongs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('order_songs')
        .select(`
          id,
          order_id,
          song_url,
          is_primary,
          is_public,
          created_at,
          orders!inner (
            id,
            metadata,
            songs!inner (
              id,
              title,
              style,
              themes
            )
          ),
          cover_images (
            id,
            file_path
          )
        `)
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching public songs:', error);
        throw error;
      }
      
      return data || [];
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const getSongTitle = (song: any) => {
    const songData = song.orders?.songs;
    const orderMetadata = song.orders?.metadata?.formData;
    
    if (songData?.title) return songData.title;
    if (orderMetadata?.songTitle) return orderMetadata.songTitle;
    
    return "Untitled Song";
  };

  const getSongDetails = (song: any) => {
    const songData = song.orders?.songs;
    const orderMetadata = song.orders?.metadata?.formData;
    
    const style = songData?.style || orderMetadata?.musicStyle || "Various Styles";
    const theme = songData?.themes || orderMetadata?.theme || "Various Themes";
    return { style, theme };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 via-white to-[#7E69AB]/10">
      <Navigation />
      
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-transparent animate-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] bg-clip-text text-transparent mb-6 animate-fade-in">
            Browse Songs
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-100">
            Discover and listen to our collection of publicly shared songs
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-[#9b87f5]" />
              <div className="absolute inset-0 blur-lg bg-[#9b87f5]/30 animate-pulse" />
            </div>
            <p className="text-lg text-muted-foreground animate-pulse">Loading songs...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 animate-fade-in">
            <div className="relative">
              <Music className="h-24 w-24 text-muted-foreground/30" />
              <div className="absolute inset-0 blur-xl bg-[#9b87f5]/10 animate-pulse" />
            </div>
            <p className="text-2xl font-semibold text-muted-foreground">Unable to load songs</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        ) : !publicSongs?.length ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] space-y-6 animate-fade-in">
            <div className="relative">
              <Music className="h-24 w-24 text-muted-foreground/30" />
              <div className="absolute inset-0 blur-xl bg-[#9b87f5]/10 animate-pulse" />
            </div>
            <p className="text-2xl font-semibold text-muted-foreground">No public songs available yet</p>
            <p className="text-muted-foreground">Check back later for new additions</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {publicSongs.map((song) => {
              const { style, theme } = getSongDetails(song);
              return (
                <PublicSongCard
                  key={song.id}
                  song={song}
                  title={getSongTitle(song)}
                  style={style}
                  theme={theme}
                />
              );
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicSongs;