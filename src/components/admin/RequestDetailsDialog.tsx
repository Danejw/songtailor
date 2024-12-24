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
import { OrderUploadedFiles } from "./OrderUploadedFiles";
import { OrderRealTimeUpdates } from "./OrderRealTimeUpdates";
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
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleDeleteAudio = async (orderSongId: string) => {
    const orderSong = order.order_songs?.find(os => os.id === orderSongId);
    if (!orderSong?.song_url) return;
    
    setIsDeleting(true);
    try {
      // Extract filename from URL
      const fileName = orderSong.song_url.split('/').pop();
      if (!fileName) throw new Error("Invalid file URL");

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('songs')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Update order_songs record
      const { error: dbError } = await supabase
        .from('order_songs')
        .update({ song_url: null })
        .eq('id', orderSongId);

      if (dbError) throw dbError;

      toast({
        title: "Audio file deleted successfully",
      });
      
      onOrderUpdated();
    } catch (error: any) {
      toast({
        title: "Error deleting audio file",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCoverImage = async (coverImage: { id: string, file_path: string }, orderSongId: string) => {
    setIsDeleting(true);
    try {
      // Extract filename from URL
      const fileName = coverImage.file_path.split('/').pop();
      if (!fileName) throw new Error("Invalid file URL");

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('covers')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('cover_images')
        .delete()
        .eq('id', coverImage.id);

      if (dbError) throw dbError;

      toast({
        title: "Cover image deleted successfully",
      });
      
      onOrderUpdated();
    } catch (error: any) {
      toast({
        title: "Error deleting cover image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleFileUploaded = async (filePath: string, type: 'song' | 'cover', orderSongId?: string) => {
    if (!orderSongId) {
      toast({
        title: "Error uploading file",
        description: "No order song ID provided",
        variant: "destructive",
      });
      return;
    }

    if (type === 'song') {
      const { error } = await supabase
        .from('order_songs')
        .update({ song_url: filePath })
        .eq('id', orderSongId);

      if (error) {
        toast({
          title: "Error saving song URL",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
    } else if (type === 'cover') {
      const { error } = await supabase
        .from('cover_images')
        .insert({
          order_song_id: orderSongId,
          file_path: filePath,
          song_id: order.song_id
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

    toast({
      title: "File uploaded successfully",
    });
    onOrderUpdated();
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

          <OrderUploadedFiles
            order={order}
            onDeleteAudio={handleDeleteAudio}
            onDeleteCoverImage={handleDeleteCoverImage}
            isDeleting={isDeleting}
          />
          
          <OrderFileUploads
            includesCoverImage={order.includes_cover_image || false}
            includesBothVersions={order.includes_both_versions || false}
            onFileUploaded={handleFileUploaded}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
            orderSongs={order.order_songs || []}
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
              disabled={isUploading || isDeleting}
            >
              Update Status
            </Button>
          </div>
        </div>

        <OrderRealTimeUpdates 
          order={order}
          onOrderUpdated={onOrderUpdated}
        />
      </DialogContent>
    </Dialog>
  );
}
