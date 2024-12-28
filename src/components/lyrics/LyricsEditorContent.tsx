import { TextEditor } from "@/components/editor/TextEditor";
import { QuickActionButtons } from "@/components/lyrics/QuickActionButtons";
import { useRef } from "react";

interface LyricsEditorContentProps {
  lyrics: string;
  canEdit: boolean;
  onSave: (newLyrics: string) => Promise<void>;
  setLyrics: (lyrics: string) => void;
}

export function LyricsEditorContent({ 
  lyrics, 
  canEdit, 
  onSave,
  setLyrics 
}: LyricsEditorContentProps) {
  const editorRef = useRef<HTMLTextAreaElement>(null);

  const insertSection = (section: string) => {
    const textarea = editorRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    
    // Add newlines before and after if we're not at the start of a line
    const beforeNewline = start > 0 && text[start - 1] !== '\n' ? '\n' : '';
    const afterNewline = end < text.length && text[end] !== '\n' ? '\n' : '';
    
    const sectionText = `${beforeNewline}[${section}]${afterNewline}`;
    const newContent = text.substring(0, start) + sectionText + text.substring(end);
    
    setLyrics(newContent);
    
    // Reset cursor position after the inserted section
    const newPosition = start + sectionText.length;
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <div className="space-y-4">
      {canEdit && (
        <QuickActionButtons onInsertSection={insertSection} />
      )}
      <TextEditor
        ref={editorRef}
        title="Song Lyrics"
        initialContent={lyrics}
        isEditable={canEdit}
        placeholder="No lyrics available"
        onSave={onSave}
      />
    </div>
  );
}