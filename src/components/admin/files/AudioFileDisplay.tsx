import { useState } from "react";
import { AudioWaveform } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface AudioFileDisplayProps {
  songUrl: string;
  audioUrl: string;
  onError: (songUrl: string) => void;
  onDelete: (songUrl: string) => void;
  isDeleting: boolean;
}

export function AudioFileDisplay({
  songUrl,
  audioUrl,
  onError,
  onDelete,
  isDeleting,
}: AudioFileDisplayProps) {
  return (
    <div className="flex items-center gap-2 p-4 border rounded-lg">
      <AudioWaveform className="w-5 h-5 text-blue-500" />
      <div className="flex-1">
        <p className="font-medium">Song File</p>
        <audio 
          controls 
          className="w-full mt-2"
          onError={() => onError(songUrl)}
          key={`${songUrl}-${audioUrl}`}
        >
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
      <Button
        variant="destructive"
        size="icon"
        onClick={() => onDelete(songUrl)}
        disabled={isDeleting}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}