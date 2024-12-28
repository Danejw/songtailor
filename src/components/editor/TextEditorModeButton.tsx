import { Button } from "@/components/ui/button";
import { Eye, Edit2 } from "lucide-react";

interface TextEditorModeButtonProps {
  isEditing: boolean;
  isSaving: boolean;
  onModeToggle: () => void;
}

export function TextEditorModeButton({
  isEditing,
  isSaving,
  onModeToggle
}: TextEditorModeButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onModeToggle}
      disabled={isSaving}
    >
      {isEditing ? (
        <>
          <Eye className="h-4 w-4 mr-2" />
          View Mode
        </>
      ) : (
        <>
          <Edit2 className="h-4 w-4 mr-2" />
          Edit Mode
        </>
      )}
    </Button>
  );
}