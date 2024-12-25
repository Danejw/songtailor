import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { AudioFileDisplay } from "./AudioFileDisplay";
import { ImageFileDisplay } from "./ImageFileDisplay";
import { FileUrlManager } from "./FileUrlManager";
import type { Order, OrderSong } from "../types";

interface OrderUploadedFilesProps {
  order: Order;
  onDeleteAudio: (orderSongId: string) => Promise<void>;
  onDeleteCoverImage: (coverImage: { id: string, file_path: string }, orderSongId: string) => Promise<void>;
  isDeleting: boolean;
}

export function OrderUploadedFiles({
  order,
  onDeleteAudio,
  onDeleteCoverImage,
  isDeleting
}: OrderUploadedFilesProps) {
  const { toast } = useToast();
  const [deleteAudioId, setDeleteAudioId] = useState<string | null>(null);
  const [deleteCoverImage, setDeleteCoverImage] = useState<{ image: { id: string, file_path: string }, orderSongId: string } | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [failedAudio, setFailedAudio] = useState<Set<string>>(new Set());
  const [audioUrls, setAudioUrls] = useState<Record<string, string>>({});
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadUrls = async () => {
      // Load audio URLs
      for (const orderSong of order.order_songs || []) {
        if (orderSong.song_url && !audioUrls[orderSong.song_url]) {
          try {
            const url = await FileUrlManager.getPublicUrl('songs', orderSong.song_url);
            if (url) {
              setAudioUrls(prev => ({ ...prev, [orderSong.song_url!]: url }));
            }
          } catch (error) {
            console.error('Error loading audio URL:', error);
            setFailedAudio(prev => new Set([...prev, orderSong.song_url!]));
          }
        }
      }

      // Load image URLs
      for (const orderSong of order.order_songs || []) {
        if (orderSong.cover_images?.file_path && !imageUrls[orderSong.cover_images.file_path]) {
          try {
            const url = await FileUrlManager.getPublicUrl('covers', orderSong.cover_images.file_path);
            if (url) {
              setImageUrls(prev => ({ ...prev, [orderSong.cover_images!.file_path]: url }));
            }
          } catch (error) {
            console.error('Error loading image URL:', error);
            setFailedImages(prev => new Set([...prev, orderSong.cover_images!.file_path]));
          }
        }
      }
    };

    loadUrls();
  }, [order.order_songs]);

  const handleImageError = (filePath: string) => {
    setFailedImages(prev => new Set([...prev, filePath]));
    toast({
      title: "Failed to load image",
      description: "The image file could not be loaded",
      variant: "destructive",
    });
  };

  const handleAudioError = (filePath: string) => {
    setFailedAudio(prev => new Set([...prev, filePath]));
    toast({
      title: "Failed to load audio",
      description: "The audio file could not be loaded",
      variant: "destructive",
    });
  };

  const handleDeleteAudio = async () => {
    if (deleteAudioId) {
      await onDeleteAudio(deleteAudioId);
      setDeleteAudioId(null);
    }
  };

  const handleDeleteCoverImage = async () => {
    if (deleteCoverImage) {
      await onDeleteCoverImage(deleteCoverImage.image, deleteCoverImage.orderSongId);
      setDeleteCoverImage(null);
    }
  };

  if (!order.order_songs?.length) {
    return null;
  }

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Uploaded Files</h3>
        {order.order_songs.map((orderSong: OrderSong) => (
          <div key={orderSong.id} className="border p-4 rounded-lg space-y-4">
            <h4 className="font-medium">
              {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orderSong.song_url && !failedAudio.has(orderSong.song_url) && (
                <AudioFileDisplay
                  songUrl={orderSong.song_url}
                  audioUrl={audioUrls[orderSong.song_url]}
                  onError={handleAudioError}
                  onDelete={() => setDeleteAudioId(orderSong.id)}
                  isDeleting={isDeleting}
                />
              )}
              
              {orderSong.cover_images && !failedImages.has(orderSong.cover_images.file_path) && (
                <ImageFileDisplay
                  coverImage={orderSong.cover_images}
                  imageUrl={imageUrls[orderSong.cover_images.file_path]}
                  onError={handleImageError}
                  onDelete={(image) => setDeleteCoverImage({ 
                    image, 
                    orderSongId: orderSong.id 
                  })}
                  isDeleting={isDeleting}
                />
              )}

              {/* Fallback messages */}
              {orderSong.song_url && failedAudio.has(orderSong.song_url) && (
                <div className="p-4 border rounded-lg bg-muted">
                  <p className="text-muted-foreground">Audio file unavailable or access denied</p>
                </div>
              )}
              
              {orderSong.cover_images && failedImages.has(orderSong.cover_images.file_path) && (
                <div className="p-4 border rounded-lg bg-muted">
                  <p className="text-muted-foreground">Cover image unavailable or access denied</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!deleteAudioId} onOpenChange={() => setDeleteAudioId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Audio File</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this audio file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAudio}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!deleteCoverImage} onOpenChange={() => setDeleteCoverImage(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Cover Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this cover image? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCoverImage}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}