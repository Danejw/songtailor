import { useEffect, useRef, useState } from "react";
import { useAudio } from "./AudioContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, pauseTrack, playTrack, stopTrack } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  if (!currentTrack) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => isPlaying ? pauseTrack() : playTrack(currentTrack.url, currentTrack.title)}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <div className="flex-1">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
            <audio
              ref={audioRef}
              src={currentTrack.url}
              onEnded={() => stopTrack()}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              className="w-24"
              value={[volume]}
              min={0}
              max={1}
              step={0.1}
              onValueChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0];
                }
              }}
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={stopTrack}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}