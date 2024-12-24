import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderSearchInput } from "./OrderSearchInput";
import { OrderTableRow } from "./OrderTableRow";
import { RequestDetailsDialog } from "./RequestDetailsDialog";
import type { Order } from "./types";

const fetchOrdersWithDetails = async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;
  
  if (session?.user?.id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .single();

    if (!profile) {
      await supabase.from('profiles').insert({
        id: session.user.id,
        email: session.user.email,
        is_admin: true
      });
    }
  }

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      songs!fk_song (
        title,
        style,
        lyrics,
        themes,
        reference_links
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Fetch profiles separately since there's no direct foreign key
  if (data) {
    const userIds = [...new Set(data.map(order => order.user_id))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, email')
      .in('id', userIds);

    // Merge profiles into orders
    const ordersWithProfiles = data.map(order => ({
      ...order,
      profiles: profiles?.find(profile => profile.id === order.user_id) || null
    }));

    return ordersWithProfiles as Order[];
  }

  return [];
};

export function RequestsTable() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ['orders-with-details'],
    queryFn: fetchOrdersWithDetails,
    meta: {
      errorMessage: "Error fetching orders"
    }
  });

  useEffect(() => {
    const channel = supabase
      .channel('admin-order-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const filteredOrders = orders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(searchLower) ||
      (order.songs?.title || '').toLowerCase().includes(searchLower) ||
      (order.profiles?.email || '').toLowerCase().includes(searchLower)
    );
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <OrderSearchInput 
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Song Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <OrderTableRow
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <RequestDetailsDialog
        order={selectedOrder}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
        onOrderUpdated={refetch}
      />
    </div>
  );
}