import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { OrderDetailsModal } from "./OrderDetailsModal";

interface OrdersListProps {
  orders: any[];
  type: "active" | "completed";
}

export const OrdersList: FC<OrdersListProps> = ({ orders, type }) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No {type} orders found
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-1">
              <div className="font-medium">
                {order.songs?.title || "Untitled Song"}
              </div>
              <div className="text-sm text-muted-foreground">
                Ordered on {format(new Date(order.created_at), "MMM d, yyyy")}
              </div>
              <div className="flex gap-2 mt-2">
                <Badge>{order.status}</Badge>
                {order.includes_both_versions && (
                  <Badge variant="outline">Two Versions</Badge>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedOrder(order);
                  setIsModalOpen(true);
                }}
              >
                View Details
              </Button>
              {type === "completed" && order.final_song_url && (
                <Button size="sm">Download</Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <OrderDetailsModal
        order={selectedOrder}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
};