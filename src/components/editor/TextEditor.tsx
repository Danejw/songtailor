import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Edit2, Loader2, ChevronUp, ChevronDown } from "lucide-react";

interface TextEditorProps {
  title?: string;
  initialContent: string;
  isEditable?: boolean;
  placeholder?: string;
  className?: string;
  onSave?: (content: string) => Promise<void>;
  onModeChange?: (isEditing: boolean) => void;
}

const SECTION_MARKERS = [
  "Verse",
  "Chorus",
  "Bridge",
  "Instrumental",
  "Outro",
  "Intro"
] as const;

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
  const [showQuickActions, setShowQuickActions] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  const insertSection = (section: typeof SECTION_MARKERS[number]) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    // Add newlines before and after if we're not at the start of a line
    const beforeNewline = start > 0 && text[start - 1] !== '\n' ? '\n' : '';
    const afterNewline = end < text.length && text[end] !== '\n' ? '\n' : '';
    
    const sectionText = `${beforeNewline}[${section}]${afterNewline}`;
    const newContent = text.substring(0, start) + sectionText + text.substring(end);
    
    setContent(newContent);
    
    // Reset cursor position after the inserted section
    const newPosition = start + sectionText.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{title}</CardTitle>
        {isEditable && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowQuickActions(!showQuickActions)}
            >
              {showQuickActions ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
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
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] font-mono"
          placeholder={placeholder}
          readOnly={!isEditing}
        />
        {isEditing && (
          <div className="space-y-4">
            {showQuickActions && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {SECTION_MARKERS.map((section) => (
                  <Button
                    key={section}
                    variant="outline"
                    size="sm"
                    onClick={() => insertSection(section)}
                  >
                    Add [{section}]
                  </Button>
                ))}
              </div>
            )}
            {onSave && (
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
          </div>
        )}
      </CardContent>
    </Card>
  );
}