import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileUploader } from "./FileUploader";

interface RequestDetailsDialogProps {
  order: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderUpdated: () => void;
}

export function RequestDetailsDialog({
  order,
  open,
  onOpenChange,
  onOrderUpdated,
}: RequestDetailsDialogProps) {
  const { toast } = useToast();
  const [status, setStatus] = useState(order?.status || "pending");
  const [isUploading, setIsUploading] = useState(false);

  if (!order) return null;

  const handleStatusUpdate = async () => {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', order.id);

    if (error) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status updated successfully",
      });
      onOrderUpdated();
    }
  };

  const handleFileUploaded = async (filePath: string, type: 'song' | 'cover') => {
    const updates: any = {};
    
    if (type === 'song') {
      updates.final_song_url = filePath;
      updates.status = 'completed';
    } else if (type === 'cover') {
      const { error } = await supabase
        .from('cover_images')
        .insert({
          song_id: order.song_id,
          file_path: filePath,
        });

      if (error) {
        toast({
          title: "Error saving cover image",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    }

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase
        .from('orders')
        .update(updates)
        .eq('id', order.id);

      if (error) {
        toast({
          title: "Error updating order",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Order updated successfully",
        });
        onOrderUpdated();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>User Email</Label>
              <Input value={order.profiles?.email || ""} readOnly />
            </div>
            <div>
              <Label>Order Status</Label>
              <Select value={status} onValueChange={setStatus}>
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

          <div>
            <Label>Song Title</Label>
            <Input value={order.songs?.title || ""} readOnly />
          </div>

          <div>
            <Label>Style</Label>
            <Input value={order.songs?.style || ""} readOnly />
          </div>

          <div>
            <Label>Lyrics</Label>
            <Textarea value={order.songs?.lyrics || ""} readOnly className="min-h-[100px]" />
          </div>

          <div>
            <Label>Reference Links</Label>
            <Input value={order.songs?.reference_links || ""} readOnly />
          </div>

          <div className="space-y-4">
            <div>
              <Label>Upload Song File</Label>
              <FileUploader
                bucket="songs"
                onUploaded={(filePath) => handleFileUploaded(filePath, 'song')}
                accept=".mp3,.wav"
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />
            </div>

            {order.includes_cover_image && (
              <div>
                <Label>Upload Cover Image</Label>
                <FileUploader
                  bucket="covers"
                  onUploaded={(filePath) => handleFileUploaded(filePath, 'cover')}
                  accept="image/*"
                  isUploading={isUploading}
                  setIsUploading={setIsUploading}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleStatusUpdate}
              disabled={isUploading}
            >
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}