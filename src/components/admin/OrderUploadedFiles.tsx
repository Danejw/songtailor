import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AudioWaveform, Image, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
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
import type { Order, OrderSong } from "./types";

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

  if (!order.order_songs?.length) {
    return null;
  }

  const extractFilename = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 1];
  };

  const getPublicUrl = async (bucket: string, filePath: string) => {
    if (!filePath) return '';
    
    try {
      const filename = extractFilename(filePath);
      console.log('Getting signed URL for:', { bucket, filename });
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filename, 3600);

      if (error) {
        console.error('Error getting signed URL:', error);
        throw error;
      }

      console.log('Got signed URL:', data?.signedUrl);
      return data?.signedUrl || '';
    } catch (error) {
      console.error('Error in getPublicUrl:', error);
      return '';
    }
  };

  useEffect(() => {
    const loadUrls = async () => {
      // Load audio URLs
      for (const orderSong of order.order_songs || []) {
        if (orderSong.song_url && !audioUrls[orderSong.song_url]) {
          try {
            const url = await getPublicUrl('songs', orderSong.song_url);
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
            const url = await getPublicUrl('covers', orderSong.cover_images.file_path);
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
                <div className="flex items-center gap-2 p-4 border rounded-lg">
                  <AudioWaveform className="w-5 h-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium">Song File</p>
                    <audio 
                      controls 
                      className="w-full mt-2"
                      onError={() => handleAudioError(orderSong.song_url!)}
                      key={`${orderSong.song_url}-${audioUrls[orderSong.song_url]}`}
                    >
                      <source 
                        src={audioUrls[orderSong.song_url]} 
                        type="audio/mpeg" 
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setDeleteAudioId(orderSong.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {orderSong.cover_images && !failedImages.has(orderSong.cover_images.file_path) && (
                <div className="flex items-center gap-2 p-4 border rounded-lg">
                  <Image className="w-5 h-5 text-green-500" />
                  <div className="flex-1">
                    <p className="font-medium">Cover Image</p>
                    <img 
                      src={imageUrls[orderSong.cover_images.file_path]} 
                      alt="Cover" 
                      className="w-full h-40 object-cover rounded-lg mt-2"
                      onError={() => handleImageError(orderSong.cover_images!.file_path)}
                    />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => setDeleteCoverImage({ 
                      image: orderSong.cover_images!, 
                      orderSongId: orderSong.id 
                    })}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
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