import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

export function AdminStats() {
  const [stats, setStats] = useState({
    totalActive: 0,
    pendingLyrics: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchStats();
    subscribeToUpdates();
  }, []);

  const fetchStats = async () => {
    const { data: orders } = await supabase
      .from('orders')
      .select('status');

    if (orders) {
      const active = orders.filter(order => order.status !== 'completed').length;
      const pending = orders.filter(order => order.status === 'pending_lyrics_approval').length;
      const completed = orders.filter(order => order.status === 'completed').length;

      setStats({
        totalActive: active,
        pendingLyrics: pending,
        completed: completed,
      });
    }
  };

  const subscribeToUpdates = () => {
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalActive}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Lyrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingLyrics}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.completed}</div>
        </CardContent>
      </Card>
    </div>
  );
}