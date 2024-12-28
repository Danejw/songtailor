import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";

interface LyricsPromptInputProps {
  isGenerating: boolean;
  onGenerateLyrics: (prompt: string) => void;
  isEditing: boolean;
}

export function LyricsPromptInput({ 
  isGenerating, 
  onGenerateLyrics,
  isEditing 
}: LyricsPromptInputProps) {
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    onGenerateLyrics(prompt);
    setPrompt(""); // Clear prompt after generation
  };

  return (
    <div className="space-y-4 mb-4">
      <Textarea
        placeholder="Add additional context for lyrics generation (optional)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px]"
        disabled={!isEditing || isGenerating}
      />
      <div className="flex justify-end">
        <Button
          variant="outline"
          onClick={handleGenerate}
          disabled={isGenerating || !isEditing}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 className="h-4 w-4 mr-2" />
              Generate Lyrics
            </>
          )}
        </Button>
      </div>
    </div>
  );
}