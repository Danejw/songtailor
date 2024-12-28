import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

const SECTION_MARKERS = [
  "Verse",
  "Chorus",
  "Bridge",
  "Instrumental",
  "Outro",
  "Intro"
] as const;

interface QuickActionButtonsProps {
  onInsertSection: (section: typeof SECTION_MARKERS[number]) => void;
}

export function QuickActionButtons({ onInsertSection }: QuickActionButtonsProps) {
  const [showQuickActions, setShowQuickActions] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
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
      </div>
      
      {showQuickActions && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SECTION_MARKERS.map((section) => (
            <Button
              key={section}
              variant="outline"
              size="sm"
              onClick={() => onInsertSection(section)}
            >
              Add [{section}]
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}