import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface AdminLyricsHeaderProps {
  isGenerating: boolean;
  onGenerateLyrics: () => void;
  isEditing: boolean;
}

export function AdminLyricsHeader({ 
  isGenerating, 
  onGenerateLyrics,
  isEditing 
}: AdminLyricsHeaderProps) {
  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button
        variant="outline"
        onClick={onGenerateLyrics}
        disabled={isGenerating || !isEditing}
      >
        {isGenerating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Lyrics"
        )}
      </Button>
    </div>
  );
}