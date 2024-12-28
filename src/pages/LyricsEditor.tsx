import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Eye, Edit2 } from "lucide-react";

export default function LyricsEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [canEdit, setCanEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchLyrics();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to view lyrics",
      });
      navigate("/login", { state: { returnTo: `/lyrics/${id}` } });
      return;
    }
  };

  const fetchLyrics = async () => {
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
        .eq('id', id)
        .single();

      if (error) throw error;

      if (!orderSong) {
        toast({
          title: "Not found",
          description: "The requested lyrics could not be found",
          variant: "destructive",
        });
        navigate("/dashboard");
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
    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('order_songs')
        .update({ lyrics })
        .eq('id', id);

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
          {canEdit && (
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
        </CardHeader>
        <CardContent>
          <Textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            className="min-h-[300px] font-mono"
            placeholder="No lyrics available"
            readOnly={!isEditing}
          />
          {isEditing && (
            <Button
              className="mt-4"
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
        </CardContent>
      </Card>
    </div>
  );
}