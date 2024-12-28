import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { OrderSelector } from "@/components/lyrics/OrderSelector";
import { TextEditor } from "@/components/editor/TextEditor";
import type { Order } from "@/components/admin/types";

export default function LyricsEditor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [canEdit, setCanEdit] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderSongId, setSelectedOrderSongId] = useState<string | null>(null);
  const [lyrics, setLyrics] = useState("");

  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedOrderSongId) {
      fetchLyrics(selectedOrderSongId);
    }
  }, [selectedOrderSongId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view lyrics",
      });
      navigate("/login");
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: orders, error } = await supabase
        .from('orders')
        .select(`
          id,
          songs!fk_song (
            title
          ),
          order_songs (
            id,
            lyrics
          )
        `)
        .eq('user_id', session.user.id)
        .eq('status', 'completed');

      if (error) throw error;

      setOrders(orders || []);
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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data: orderSong, error } = await supabase
        .from('order_songs')
        .select(`
          *,
          orders!order_songs_order_id_fkey (
            user_id
          )
        `)
        .eq('id', orderSongId)
        .maybeSingle();

      if (error) throw error;

      if (!orderSong) {
        toast({
          title: "Not found",
          description: "The requested lyrics could not be found",
          variant: "destructive",
        });
        return;
      }

      const isOwner = orderSong.orders?.user_id === session.user.id;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', session.user.id)
        .single();

      const isAdmin = profile?.is_admin || false;

      setCanEdit(isOwner || isAdmin);
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
      const { error } = await supabase
        .from('order_songs')
        .update({ lyrics: newLyrics })
        .eq('id', selectedOrderSongId);

      if (error) throw error;

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
      throw error; // Re-throw to let TextEditor handle the error state
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
      <OrderSelector
        orders={orders}
        selectedOrderSongId={selectedOrderSongId}
        onOrderSelect={setSelectedOrderSongId}
      />

      {selectedOrderSongId && (
        <TextEditor
          title="Song Lyrics"
          initialContent={lyrics}
          isEditable={canEdit}
          placeholder="No lyrics available"
          onSave={handleSave}
        />
      )}
    </div>
  );
}