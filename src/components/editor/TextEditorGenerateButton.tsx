import { Button } from "@/components/ui/button";
import { Magic, Loader2 } from "lucide-react";

interface TextEditorGenerateButtonProps {
  isGenerating: boolean;
  onGenerateLyrics: () => void;
  disabled: boolean;
}

export function TextEditorGenerateButton({ 
  isGenerating, 
  onGenerateLyrics,
  disabled 
}: TextEditorGenerateButtonProps) {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={onGenerateLyrics}
      disabled={disabled || isGenerating}
      title="Generate Lyrics"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Magic className="h-4 w-4" />
      )}
    </Button>
  );
}