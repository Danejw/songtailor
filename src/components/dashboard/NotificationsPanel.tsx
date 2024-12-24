import { FC, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface NotificationsPanelProps {
  userId: string;
}

export const NotificationsPanel: FC<NotificationsPanelProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Subscribe to order status changes
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newStatus = payload.new.status;
          setNotifications((prev) => [
            {
              id: payload.new.id,
              message: getStatusMessage(newStatus),
              timestamp: new Date(),
            },
            ...prev,
          ].slice(0, 5)); // Keep only last 5 notifications
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending_lyrics_approval':
        return 'Your lyrics are ready for review!';
      case 'in_production':
        return 'Your song is now in production!';
      case 'ready_for_review':
        return 'Your song is ready for review!';
      case 'completed':
        return 'Your song is now available for download!';
      default:
        return 'Your order status has been updated.';
    }
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
            No new notifications
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
};