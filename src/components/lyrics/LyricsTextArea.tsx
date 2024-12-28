import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface LyricsTextAreaProps {
  lyrics: string;
  isEditing: boolean;
  isSaving: boolean;
  onLyricsChange: (value: string) => void;
  onSave: () => void;
}

export function LyricsTextArea({ 
  lyrics, 
  isEditing, 
  isSaving, 
  onLyricsChange, 
  onSave 
}: LyricsTextAreaProps) {
  return (
    <>
      <Textarea
        value={lyrics}
        onChange={(e) => onLyricsChange(e.target.value)}
        className="min-h-[300px] font-mono"
        placeholder="No lyrics available"
        readOnly={!isEditing}
      />
      {isEditing && (
        <Button
          className="w-full"
          onClick={onSave}
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      )}
    </>
  );
}