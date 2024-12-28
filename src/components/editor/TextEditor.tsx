import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit2, Loader2 } from "lucide-react";

interface TextEditorProps {
  title?: string;
  initialContent: string;
  isEditable?: boolean;
  placeholder?: string;
  className?: string;
  onSave?: (content: string) => Promise<void>;
  onModeChange?: (isEditing: boolean) => void;
}

export function TextEditor({
  title = "Content Editor",
  initialContent = "",
  isEditable = false,
  placeholder = "No content available",
  className = "",
  onSave,
  onModeChange,
}: TextEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleModeToggle = () => {
    const newMode = !isEditing;
    setIsEditing(newMode);
    onModeChange?.(newMode);
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    try {
      setIsSaving(true);
      await onSave(content);
      setIsEditing(false);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{title}</CardTitle>
        {isEditable && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleModeToggle}
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
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] font-mono"
          placeholder={placeholder}
          readOnly={!isEditing}
        />
        {isEditing && onSave && (
          <Button
            className="w-full"
            onClick={handleSave}
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
      </CardContent>
    </Card>
  );
}