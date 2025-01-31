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
import { OrderStatusFilter } from "./OrderStatusFilter";
import { OrderTableRow } from "./OrderTableRow";
import { RequestDetailsDialog } from "./RequestDetailsDialog";
import type { Order, OrderFormData, OrderMetadata } from "./types";
import { convertToOrderMetadata } from "./types";

const fetchOrdersWithDetails = async (): Promise<Order[]> => {
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;
  
  if (session?.user?.id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select()
      .eq('id', session.user.id)
      .maybeSingle();

    if (!profile) {
      await supabase.from('profiles').insert({
        id: session.user.id,
        email: session.user.email,
        is_admin: true
      });
    }
  }

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email');

  const { data: ordersData, error: ordersError } = await supabase
    .from('orders')
    .select(`
      *,
      songs!fk_song (
        id,
        title,
        style,
        lyrics,
        themes,
        reference_links,
        status
      ),
      order_songs (
        id,
        song_url,
        is_primary,
        is_public,
        created_at,
        cover_images!cover_images_order_song_id_fkey (
          id,
          file_path
        )
      )
    `)
    .order('created_at', { ascending: false });

  if (ordersError) {
    console.error('Error fetching orders:', ordersError);
    throw ordersError;
  }

  const ordersWithProfiles = (ordersData || []).map(order => ({
    ...order,
    profiles: profiles?.find(profile => profile.id === order.user_id) || null,
    order_songs: order.order_songs || [],
    metadata: convertToOrderMetadata(order.metadata)
  })) as Order[];

  return ordersWithProfiles;
};

export function RequestsTable() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
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
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.songs?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.profiles?.email || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <OrderSearchInput 
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <OrderStatusFilter
          value={statusFilter}
          onChange={setStatusFilter}
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
