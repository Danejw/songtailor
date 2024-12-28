import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Eye, Edit2 } from "lucide-react";

interface Order {
  id: string;
  songs: {
    title: string;
  } | null;
  order_songs: {
    id: string;
    lyrics: string | null;
  }[] | null;
}

export default function LyricsEditor() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderSongId, setSelectedOrderSongId] = useState<string | null>(null);

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
      return;
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
          songs (
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

      // Fetch order song with related order and check permissions
      const { data: orderSong, error } = await supabase
        .from('order_songs')
        .select(`
          *,
          orders!order_songs_order_id_fkey (
            user_id
          )
        `)
        .eq('id', orderSongId)
        .single();

      if (error) throw error;

      if (!orderSong) {
        toast({
          title: "Not found",
          description: "The requested lyrics could not be found",
          variant: "destructive",
        });
        return;
      }

      // Check if user is owner
      const isOwner = orderSong.orders?.user_id === session.user.id;
      
      // Check if user is admin
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

  const handleSave = async () => {
    if (!selectedOrderSongId) return;

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('order_songs')
        .update({ lyrics })
        .eq('id', selectedOrderSongId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lyrics saved successfully",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to save lyrics",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
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
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle>Song Lyrics</CardTitle>
          <div className="flex gap-2">
            {selectedOrderSongId && canEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    View Mode
                  </>
                ) : (
                  <>
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit Mode
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select
            onValueChange={(value) => setSelectedOrderSongId(value)}
            value={selectedOrderSongId || undefined}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a song to view/edit lyrics" />
            </SelectTrigger>
            <SelectContent>
              {orders.map((order) => (
                order.order_songs?.map((orderSong) => (
                  <SelectItem key={orderSong.id} value={orderSong.id}>
                    {order.songs?.title || "Untitled Song"}
                  </SelectItem>
                ))
              ))}
            </SelectContent>
          </Select>

          {selectedOrderSongId && (
            <>
              <Textarea
                value={lyrics}
                onChange={(e) => setLyrics(e.target.value)}
                className="min-h-[300px] font-mono"
                placeholder="No lyrics available"
                readOnly={!isEditing}
              />
              {isEditing && (
                <Button
                  className="w-full"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}