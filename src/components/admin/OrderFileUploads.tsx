import { useState } from "react";
import { Label } from "@/components/ui/label";
import { FileUploader } from "./FileUploader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderSong } from "./types";

interface OrderFileUploadsProps {
  includesCoverImage: boolean;
  includesBothVersions: boolean;
  onFileUploaded: (filePath: string, type: 'song' | 'cover', orderSongId?: string) => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
  orderSongs: OrderSong[];
}

export function OrderFileUploads({ 
  includesCoverImage,
  includesBothVersions,
  onFileUploaded,
  isUploading,
  setIsUploading,
  orderSongs
}: OrderFileUploadsProps) {
  const [showSecondSong, setShowSecondSong] = useState(false);

  return (
    <div className="space-y-4">
      {orderSongs.map((orderSong, index) => (
        <div key={orderSong.id} className="space-y-4 border p-4 rounded-lg">
          <h4 className="font-medium">
            {orderSong.is_primary ? "Primary Version" : "Alternative Version"}
          </h4>
          
          <div>
            <Label>Upload Song File</Label>
            <FileUploader
              bucket="songs"
              onUploaded={(filePath) => onFileUploaded(filePath, 'song', orderSong.id)}
              accept=".mp3,.wav"
              isUploading={isUploading}
              setIsUploading={setIsUploading}
            />
          </div>

          {includesCoverImage && (
            <div>
              <Label>Upload Cover Image</Label>
              <FileUploader
                bucket="covers"
                onUploaded={(filePath) => onFileUploaded(filePath, 'cover', orderSong.id)}
                accept="image/*"
                isUploading={isUploading}
                setIsUploading={setIsUploading}
              />
            </div>
          )}
        </div>
      ))}

      {includesBothVersions && !showSecondSong && orderSongs.length === 1 && (
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowSecondSong(true)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Alternative Version
        </Button>
      )}
    </div>
  );
}