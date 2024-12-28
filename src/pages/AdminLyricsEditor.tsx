import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { TextEditor } from "@/components/editor/TextEditor";
import { AdminOrderSelector } from "@/components/admin/lyrics/AdminOrderSelector";
import type { Order } from "@/components/admin/types";
import { convertToOrderMetadata } from "@/components/admin/types";

export default function AdminLyricsEditor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderSongId, setSelectedOrderSongId] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    checkAdminAuth();
    fetchOrders();
  }, [statusFilter]);

  useEffect(() => {
    if (selectedOrderSongId) {
      fetchLyrics(selectedOrderSongId);
    }
  }, [selectedOrderSongId]);

  const checkAdminAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access admin features",
      });
      navigate("/login");
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', session.user.id)
      .single();

    if (!profile?.is_admin) {
      toast({
        title: "Access denied",
        description: "Admin privileges required",
        variant: "destructive",
      });
      navigate("/");
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const query = supabase
        .from('orders')
        .select(`
          id,
          created_at,
          status,
          amount,
          delivery_status,
          includes_both_versions,
          includes_cover_image,
          payment_status,
          payment_intent_id,
          metadata,
          user_id,
          song_id,
          songs!fk_song (
            id,
            title,
            style,
            lyrics,
            reference_links,
            themes,
            status
          ),
          order_songs (
            id,
            lyrics
          )
        `)
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query.eq('status', statusFilter);
      }

      const { data: ordersData, error } = await query;

      if (error) throw error;

      const typedOrders: Order[] = (ordersData || []).map(order => ({
        ...order,
        metadata: order.metadata ? convertToOrderMetadata(order.metadata) : undefined
      }));

      setOrders(typedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLyrics = async (orderSongId: string) => {
    try {
      setIsLoading(true);
      const { data: orderSong, error } = await supabase
        .from('order_songs')
        .select('lyrics')
        .eq('id', orderSongId)
        .single();

      if (error) throw error;

      setLyrics(orderSong.lyrics || "");
    } catch (error) {
      console.error('Error fetching lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to load lyrics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (newLyrics: string) => {
    if (!selectedOrderSongId) return;

    try {
      const { data: orderSong, error: orderSongError } = await supabase
        .from('order_songs')
        .select('orders!order_songs_order_id_fkey (song_id)')
        .eq('id', selectedOrderSongId)
        .single();

      if (orderSongError) throw orderSongError;

      const songId = orderSong.orders.song_id;

      const [orderSongUpdate, songUpdate] = await Promise.all([
        supabase
          .from('order_songs')
          .update({ lyrics: newLyrics })
          .eq('id', selectedOrderSongId),
        
        supabase
          .from('songs')
          .update({ lyrics: newLyrics })
          .eq('id', songId)
      ]);

      if (orderSongUpdate.error) throw orderSongUpdate.error;
      if (songUpdate.error) throw songUpdate.error;

      toast({
        title: "Success",
        description: "Lyrics saved successfully",
      });
      setLyrics(newLyrics);
    } catch (error) {
      console.error('Error saving lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to save lyrics",
        variant: "destructive",
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <AdminOrderSelector
        orders={orders}
        selectedOrderSongId={selectedOrderSongId}
        onOrderSelect={setSelectedOrderSongId}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {selectedOrderSongId && (
        <TextEditor
          title="Song Lyrics"
          initialContent={lyrics}
          isEditable={true}
          placeholder="No lyrics available"
          onSave={handleSave}
        />
      )}
    </div>
  );
}