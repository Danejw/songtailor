import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "./types";
import { cn } from "@/lib/utils";

interface OrderTableRowProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-[#F2FCE2]';  // Soft Green
    case 'pending':
      return 'bg-[#FEF7CD]';  // Soft Yellow
    case 'in_production':
      return 'bg-[#FEC6A1]';  // Soft Orange
    case 'pending_lyrics_approval':
      return 'bg-[#E5DEFF]';  // Soft Purple
    case 'ready_for_review':
      return 'bg-[#FFDEE2]';  // Soft Pink
    default:
      return '';
  }
};

export function OrderTableRow({ order, onViewDetails }: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
      <TableCell>{order.profiles?.email || 'N/A'}</TableCell>
      <TableCell>{order.songs?.title || "Untitled"}</TableCell>
      <TableCell>
        <span className={cn(
          "px-2 py-1 rounded-full text-sm",
          getStatusColor(order.status)
        )}>
          {order.status}
        </span>
      </TableCell>
      <TableCell>{format(new Date(order.created_at), "MMM d, yyyy")}</TableCell>
      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(order)}
        >
          View Details
        </Button>
      </TableCell>
    </TableRow>
  );
}