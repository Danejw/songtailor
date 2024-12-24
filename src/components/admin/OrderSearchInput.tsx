import { Input } from "@/components/ui/input";

interface OrderSearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function OrderSearchInput({ value, onChange }: OrderSearchInputProps) {
  return (
    <Input
      placeholder="Search orders..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="max-w-sm"
    />
  );
}