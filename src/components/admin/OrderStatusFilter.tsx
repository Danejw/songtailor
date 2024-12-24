import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderStatusFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function OrderStatusFilter({ value, onChange }: OrderStatusFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
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
  );
}