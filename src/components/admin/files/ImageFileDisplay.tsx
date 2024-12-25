import { Image, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageFileDisplayProps {
  coverImage: { id: string; file_path: string };
  imageUrl: string;
  onError: (filePath: string) => void;
  onDelete: (coverImage: { id: string; file_path: string }) => void;
  isDeleting: boolean;
}

export function ImageFileDisplay({
  coverImage,
  imageUrl,
  onError,
  onDelete,
  isDeleting,
}: ImageFileDisplayProps) {
  return (
    <div className="flex items-center gap-2 p-4 border rounded-lg">
      <Image className="w-5 h-5 text-green-500" />
      <div className="flex-1">
        <p className="font-medium">Cover Image</p>
        <img 
          src={imageUrl} 
          alt="Cover" 
          className="w-full h-40 object-cover rounded-lg mt-2"
          onError={() => onError(coverImage.file_path)}
        />
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(coverImage)}
        disabled={isDeleting}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}