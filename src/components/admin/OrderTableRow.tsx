import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Order } from "./types";

interface OrderTableRowProps {
  order: Order;
  onViewDetails: (order: Order) => void;
}

export function OrderTableRow({ order, onViewDetails }: OrderTableRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
      <TableCell>{order.profiles?.email || 'N/A'}</TableCell>
      <TableCell>{order.songs?.title || "Untitled"}</TableCell>
      <TableCell>{order.status}</TableCell>
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