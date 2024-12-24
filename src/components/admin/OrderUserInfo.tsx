import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderUserInfoProps {
  email: string;
  status: string;
  onStatusChange: (value: string) => void;
}

export function OrderUserInfo({ email, status, onStatusChange }: OrderUserInfoProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>User Email</Label>
        <Input 
          value={email || ""} 
          readOnly 
          className="bg-gray-50"
          aria-label="User email"
        />
      </div>
      <div>
        <Label>Order Status</Label>
        <Select 
          value={status} 
          onValueChange={onStatusChange}
          aria-label="Order status"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="pending_lyrics_approval">Pending Lyrics Approval</SelectItem>
            <SelectItem value="in_production">In Production</SelectItem>
            <SelectItem value="ready_for_review">Ready for Review</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}