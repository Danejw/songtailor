import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderMediaDisplay } from "./OrderMediaDisplay";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
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
      <Card>
        <CardHeader>
          <CardTitle>My Purchased Songs</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!orders?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Purchased Songs</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            You haven't purchased any songs yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Purchased Songs</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="space-y-4">
            <div className="border-b pb-2">
              <h3 className="font-medium text-lg">
                {order.songs?.title || "Untitled Song"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {order.songs?.style} • {order.songs?.themes}
              </p>
            </div>
            <div className="space-y-4">
              {order.order_songs?.map((orderSong) => (
                <OrderMediaDisplay key={orderSong.id} orderSong={orderSong} />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}