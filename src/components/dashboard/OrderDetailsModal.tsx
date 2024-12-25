import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { OrderMediaDisplay } from "./OrderMediaDisplay";

interface OrderDetailsModalProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OrderDetailsModal: FC<OrderDetailsModalProps> = ({
  order,
  open,
  onOpenChange,
}) => {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Song Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Title:</div>
              <div>{order.songs?.title || "Untitled Song"}</div>
              <div className="text-muted-foreground">Style:</div>
              <div>{order.songs?.style || "Not specified"}</div>
              <div className="text-muted-foreground">Themes:</div>
              <div>{order.songs?.themes || "Not specified"}</div>
            </div>
          </div>

          {order.order_songs?.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Song Files</h3>
              {order.order_songs.map((orderSong: any) => (
                <OrderMediaDisplay key={orderSong.id} orderSong={orderSong} />
              ))}
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">Order Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">Order Date:</div>
              <div>{format(new Date(order.created_at), "MMM d, yyyy")}</div>
              <div className="text-muted-foreground">Status:</div>
              <div>
                <Badge>{order.status}</Badge>
              </div>
              <div className="text-muted-foreground">Amount:</div>
              <div>${order.amount}</div>
              <div className="text-muted-foreground">Payment Status:</div>
              <div>
                <Badge variant="outline">{order.payment_status}</Badge>
              </div>
              <div className="text-muted-foreground">Delivery Status:</div>
              <div>
                <Badge variant="outline">{order.delivery_status}</Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Additional Features</h3>
            <div className="space-y-2 text-sm">
              {order.includes_both_versions && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Two Versions</Badge>
                  <span className="text-muted-foreground">
                    This order includes both song versions
                  </span>
                </div>
              )}
              {order.includes_cover_image && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Cover Image</Badge>
                  <span className="text-muted-foreground">
                    This order includes a cover image
                  </span>
                </div>
              )}
              {order.includes_both_versions && order.metadata?.formData?.wantSecondCoverImage && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Second Cover Image</Badge>
                  <span className="text-muted-foreground">
                    This order includes a cover image for the second version
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};