import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const fetchOrders = async () => {
  const { data: orders, error } = await supabase
    .from('orders')
    .select('status');
    
  if (error) throw error;
  return orders || [];
};

export function AdminStats() {
  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const stats = {
    totalActive: orders.filter(order => order.status !== 'completed').length,
    pendingLyrics: orders.filter(order => order.status === 'pending_lyrics_approval').length,
    completed: orders.filter(order => order.status === 'completed').length,
  };

  useEffect(() => {
    const channel = supabase
      .channel('order-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          // React Query will handle the refetch
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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