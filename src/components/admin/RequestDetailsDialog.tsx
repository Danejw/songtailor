import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AudioWaveform, Image, Trash2 } from "lucide-react";
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

  const handleDeleteAudio = async () => {
    if (!order.final_song_url) return;
    
    setIsDeleting(true);
    try {
      // Extract filename from URL
      const fileName = order.final_song_url.split('/').pop();
      if (!fileName) throw new Error("Invalid file URL");

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('songs')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Update order record
      const { error: dbError } = await supabase
        .from('orders')
        .update({ final_song_url: null })
        .eq('id', order.id);

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

  const handleDeleteCoverImage = async (coverImage: { id: string, file_path: string }) => {
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

          {/* Display uploaded files section */}
          {(order.final_song_url || order.songs?.cover_images?.length > 0) && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Uploaded Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {order.final_song_url && (
                  <div className="flex items-center gap-2 p-4 border rounded-lg">
                    <AudioWaveform className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-medium">Final Song</p>
                      <audio controls className="w-full mt-2">
                        <source src={order.final_song_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={handleDeleteAudio}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                {order.songs?.cover_images?.map((cover) => (
                  <div key={cover.id} className="flex items-center gap-2 p-4 border rounded-lg">
                    <Image className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="font-medium">Cover Image</p>
                      <img 
                        src={cover.file_path} 
                        alt="Cover" 
                        className="w-full h-40 object-cover rounded-lg mt-2"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteCoverImage(cover)}
                      disabled={isDeleting}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
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
              disabled={isUploading || isDeleting}
            >
              Update Status
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}