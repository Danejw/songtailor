import { LyricsPromptInput } from "./LyricsPromptInput";

interface AdminLyricsHeaderProps {
  isGenerating: boolean;
  onGenerateLyrics: (prompt: string) => void;
  isEditing: boolean;
}

export function AdminLyricsHeader({ 
  isGenerating, 
  onGenerateLyrics,
  isEditing 
}: AdminLyricsHeaderProps) {
  return (
    <LyricsPromptInput
      isGenerating={isGenerating}
      onGenerateLyrics={onGenerateLyrics}
      isEditing={isEditing}
    />
  );
}