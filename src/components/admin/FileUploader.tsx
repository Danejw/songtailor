import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  bucket: string;
  onUploaded: (filePath: string) => void;
  accept?: string;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

export function FileUploader({
  bucket,
  onUploaded,
  accept,
  isUploading,
  setIsUploading,
}: FileUploaderProps) {
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsUploading(true);
      setProgress(0);

      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            setProgress((progress.loaded / progress.total) * 100);
          },
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploaded(publicUrl);

      toast({
        title: "File uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error uploading file",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="file"
          accept={accept}
          onChange={handleUpload}
          disabled={isUploading}
          className="hidden"
          id={`file-upload-${bucket}`}
        />
        <label htmlFor={`file-upload-${bucket}`}>
          <Button
            variant="outline"
            className="w-full"
            disabled={isUploading}
            asChild
          >
            <span>
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload File"}
            </span>
          </Button>
        </label>
      </div>

      {isUploading && (
        <Progress value={progress} className="w-full" />
      )}
    </div>
  );
}