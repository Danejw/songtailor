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
      {/* Empty for now - we moved the generate button to TextEditor */}
    </div>
  );
}