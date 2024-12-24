import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { OrderDetailsHeader } from "./OrderDetailsHeader";
import { OrderUserInfo } from "./OrderUserInfo";
import { OrderSongInfo } from "./OrderSongInfo";
import { OrderFileUploads } from "./OrderFileUploads";
import type { Order } from "./types";

interface RequestDetailsDialogProps {
  order: Order | null;
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
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <OrderDetailsHeader />
        
        <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-8rem)] p-1">
          <OrderUserInfo 
            email={order.profiles?.email || ""}
            status={status}
            onStatusChange={setStatus}
          />
          
          <OrderSongInfo 
            song={order.songs} 
            onSongUpdated={onOrderUpdated}
          />
          
          <OrderFileUploads
            includesCoverImage={order.includes_cover_image || false}
            onFileUploaded={handleFileUploaded}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />

          <div className="flex justify-end space-x-4 sticky bottom-0 bg-background pt-4">
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