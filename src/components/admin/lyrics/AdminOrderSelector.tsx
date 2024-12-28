import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Order } from "@/components/admin/types";

interface AdminOrderSelectorProps {
  orders: Order[];
  selectedOrderSongId: string | null;
  onOrderSelect: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
}

export function AdminOrderSelector({
  orders,
  selectedOrderSongId,
  onOrderSelect,
  statusFilter,
  onStatusFilterChange,
}: AdminOrderSelectorProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Select
        value={statusFilter}
        onValueChange={onStatusFilterChange}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="pending_lyrics_approval">Pending Lyrics Approval</SelectItem>
          <SelectItem value="in_production">In Production</SelectItem>
          <SelectItem value="ready_for_review">Ready for Review</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={selectedOrderSongId || undefined}
        onValueChange={onOrderSelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an order to edit lyrics" />
        </SelectTrigger>
        <SelectContent>
          {orders.map((order) => (
            order.order_songs?.map((orderSong) => (
              <SelectItem key={orderSong.id} value={orderSong.id}>
                {order.songs?.title || "Untitled Song"} ({order.status})
              </SelectItem>
            ))
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}