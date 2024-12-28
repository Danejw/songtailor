import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Order } from "@/components/admin/types";

interface OrderSelectorProps {
  orders: Order[];
  selectedOrderSongId: string | null;
  onOrderSelect: (value: string) => void;
}

export function OrderSelector({ orders, selectedOrderSongId, onOrderSelect }: OrderSelectorProps) {
  return (
    <Select
      onValueChange={onOrderSelect}
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
  );
}