import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react";
import { TextEditorCopyButton } from "./TextEditorCopyButton";
import { TextEditorGenerateButton } from "./TextEditorGenerateButton";
import { TextEditorModeButton } from "./TextEditorModeButton";

interface TextEditorProps {
  title?: string;
  initialContent: string;
  isEditable?: boolean;
  placeholder?: string;
  className?: string;
  onSave?: (content: string) => Promise<void>;
  onModeChange?: (isEditing: boolean) => void;
  onContentChange?: (content: string) => void;
  isGenerating?: boolean;
  onGenerateLyrics?: () => void;
}

const SECTION_MARKERS = [
  "Intro",
  "Verse",
  "Chorus",
  "Bridge",
  "Instrumental",
  "Outro"
] as const;

export function TextEditor({
  title = "Content Editor",
  initialContent = "",
  isEditable = false,
  placeholder = "No content available",
  className = "",
  onSave,
  onModeChange,
  onContentChange,
  isGenerating = false,
  onGenerateLyrics,
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

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onContentChange?.(newContent);
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
    
    const beforeNewline = start > 0 && text[start - 1] !== '\n' ? '\n' : '';
    const afterNewline = end < text.length && text[end] !== '\n' ? '\n' : '';
    
    const sectionText = `${beforeNewline}[${section}]${afterNewline}`;
    const newContent = text.substring(0, start) + sectionText + text.substring(end);
    
    handleContentChange(newContent);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + sectionText.length, start + sectionText.length);
    }, 0);
  };

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          {onGenerateLyrics && (
            <TextEditorGenerateButton
              isGenerating={isGenerating}
              onGenerateLyrics={onGenerateLyrics}
              disabled={!isEditing}
            />
          )}
          <TextEditorCopyButton content={content} />
          {isEditable && (
            <>
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
              <TextEditorModeButton
                isEditing={isEditing}
                isSaving={isSaving}
                onModeToggle={handleModeToggle}
              />
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="w-full rounded-md border">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="min-h-[300px] w-full border-none focus-visible:ring-0 resize-none"
            placeholder={placeholder}
            readOnly={!isEditing}
            style={{ height: textareaRef.current?.scrollHeight }}
          />
        </div>
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
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}