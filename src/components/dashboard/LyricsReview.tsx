import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface LyricsReviewProps {
  orders: any[];
}

export const LyricsReview: FC<LyricsReviewProps> = ({ orders }) => {
  const { toast } = useToast();
  const [feedback, setFeedback] = useState("");
  const ordersNeedingLyricReview = orders.filter(
    (order) => order.status === "pending_lyrics_approval"
  );

  if (ordersNeedingLyricReview.length === 0) return null;

  const handleLyricsApproval = async (orderId: string, approved: boolean) => {
    try {
      const { error } = await supabase
        .from('lyrics_revisions')
        .update({ 
          status: approved ? 'approved' : 'needs_revision',
          feedback: approved ? null : feedback 
        })
        .eq('song_id', orderId);

      if (error) throw error;

      toast({
        title: approved ? "Lyrics approved!" : "Revision requested",
        description: approved 
          ? "We'll start producing your song now" 
          : "We'll revise the lyrics based on your feedback",
      });
    } catch (error) {
      console.error('Error updating lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to update lyrics status",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lyrics Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {ordersNeedingLyricReview.map((order) => (
          <div key={order.id} className="space-y-4">
            <div className="font-medium">{order.songs?.title}</div>
            <div className="whitespace-pre-wrap rounded-lg bg-muted p-4">
              {order.lyrics_revisions?.[0]?.content || "Loading lyrics..."}
            </div>
            <div className="space-y-4">
              <Textarea
                placeholder="Your feedback for revisions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleLyricsApproval(order.id, false)}
                >
                  Request Revisions
                </Button>
                <Button onClick={() => handleLyricsApproval(order.id, true)}>
                  Approve Lyrics
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};