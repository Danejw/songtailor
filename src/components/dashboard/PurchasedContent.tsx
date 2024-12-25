import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderMediaDisplay } from "./OrderMediaDisplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Music2 } from "lucide-react";
import type { Order } from "@/components/admin/types";

export function PurchasedContent() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['purchased-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          songs!fk_song (
            title,
            style,
            themes
          ),
          order_songs (
            id,
            song_url,
            is_primary,
            cover_images (
              id,
              file_path
            )
          )
        `)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });

  if (isLoading) {
    return (
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music2 className="w-6 h-6 text-primary/80" />
            My Purchased Songs
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
        </CardContent>
      </Card>
    );
  }

  if (!orders?.length) {
    return (
      <Card className="bg-white/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Music2 className="w-6 h-6 text-primary/80" />
            My Purchased Songs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-12">
            You haven't purchased any songs yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-primary/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music2 className="w-6 h-6 text-primary/80" />
          My Purchased Songs
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="group space-y-6 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="space-y-3">
                <h3 className="font-medium text-lg text-primary/90 group-hover:text-primary">
                  {order.songs?.title || "Untitled Song"}
                </h3>
                <p className="text-sm text-muted-foreground/80">
                  {order.songs?.style} • {order.songs?.themes}
                </p>
              </div>
              <div className="grid gap-8">
                {order.order_songs?.map((orderSong) => (
                  <OrderMediaDisplay key={orderSong.id} orderSong={orderSong} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}