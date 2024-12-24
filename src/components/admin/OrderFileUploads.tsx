import { Label } from "@/components/ui/label";
import { FileUploader } from "./FileUploader";

interface OrderFileUploadsProps {
  includesCoverImage: boolean;
  onFileUploaded: (filePath: string, type: 'song' | 'cover') => void;
  isUploading: boolean;
  setIsUploading: (value: boolean) => void;
}

export function OrderFileUploads({ 
  includesCoverImage, 
  onFileUploaded,
  isUploading,
  setIsUploading 
}: OrderFileUploadsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Upload Song File</Label>
        <FileUploader
          bucket="songs"
          onUploaded={(filePath) => onFileUploaded(filePath, 'song')}
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
            onUploaded={(filePath) => onFileUploaded(filePath, 'cover')}
            accept="image/*"
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />
        </div>
      )}
    </div>
  );
}