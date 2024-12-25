import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PublicSongCard } from "@/components/public/PublicSongCard";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

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
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Public Songs</h1>
        
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {publicSongs?.map((song) => (
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