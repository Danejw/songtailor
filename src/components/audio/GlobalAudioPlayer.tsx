import { useEffect, useRef, useState } from "react";
import { useAudio } from "./AudioContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, X, Volume2, SkipBack, SkipForward, Repeat } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, pauseTrack, playTrack, stopTrack } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSkipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };

  if (!currentTrack) return null;

  return (
    <Card className="fixed bottom-0 left-0 right-0 p-3 bg-white/80 backdrop-blur-lg border-t z-50">
      <div className="container mx-auto flex items-center gap-6">
        {/* Left section: Title and primary controls */}
        <div className="flex items-center gap-4 min-w-[240px] max-w-[320px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => isPlaying ? pauseTrack() : playTrack(currentTrack.url, currentTrack.title)}
            className="h-10 w-10 shrink-0 hover:bg-secondary/80"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{currentTrack.title}</p>
          </div>
        </div>

        {/* Center section: Progress and additional controls */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipBack}
              title="Skip back 10 seconds"
              className="h-8 w-8 hover:bg-secondary/80"
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLoop}
              className={`h-8 w-8 hover:bg-secondary/80 ${isLooping ? "text-primary" : ""}`}
              title="Toggle loop"
            >
              <Repeat className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipForward}
              title="Skip forward 10 seconds"
              className="h-8 w-8 hover:bg-secondary/80"
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 px-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatTime(currentTime)}
            </span>
            <Slider
              className="flex-1"
              value={[currentTime]}
              min={0}
              max={duration || 100}
              step={1}
              onValueChange={handleTimeChange}
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right section: Volume and Close */}
        <div className="flex items-center gap-3 min-w-[180px] justify-end">
          <div className="flex items-center gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              className="w-20"
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
            className="h-8 w-8 hover:bg-secondary/80"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={() => stopTrack()}
        className="hidden"
      />
    </Card>
  );
}