import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function NotificationsPanel() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchNotifications();
    subscribeToUpdates();
  }, []);

  const fetchNotifications = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('status')
      .not('status', 'eq', 'completed');

    if (orders) {
      const pendingLyrics = orders.filter(order => order.status === 'pending_lyrics_approval').length;
      const readyForReview = orders.filter(order => order.status === 'ready_for_review').length;

      const newNotifications = [];
      
      if (pendingLyrics > 0) {
        newNotifications.push({
          id: 'pending-lyrics',
          message: `${pendingLyrics} order${pendingLyrics === 1 ? '' : 's'} need${pendingLyrics === 1 ? 's' : ''} lyrics approval`,
        });
      }

      if (readyForReview > 0) {
        newNotifications.push({
          id: 'ready-review',
          message: `${readyForReview} order${readyForReview === 1 ? '' : 's'} ready for review`,
        });
      }

      setNotifications(newNotifications);
    }
  };

  const subscribeToUpdates = () => {
    const channel = supabase
      .channel('admin-notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            No pending actions
          </p>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="text-sm border-l-2 border-primary pl-4 py-2"
              >
                {notification.message}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}