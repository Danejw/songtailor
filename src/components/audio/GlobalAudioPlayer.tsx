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
    <Card className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t z-50">
      <div className="container mx-auto grid grid-cols-[1fr_2fr_1fr] gap-4 items-center">
        {/* Left section: Title */}
        <div className="flex items-center min-w-[200px]">
          <div className="truncate">
            <p className="text-sm font-medium">{currentTrack.title}</p>
          </div>
        </div>

        {/* Center section: Controls and Progress */}
        <div className="flex flex-col items-center gap-3">
          {/* Progress bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-muted-foreground w-12 text-right">
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
            <span className="text-xs text-muted-foreground w-12">
              {formatTime(duration)}
            </span>
          </div>

          {/* Main controls */}
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLoop}
              className={`h-8 w-8 ${isLooping ? "text-primary" : ""}`}
              title="Toggle loop"
            >
              <Repeat className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipBack}
              className="h-9 w-9"
              title="Skip back 10 seconds"
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => isPlaying ? pauseTrack() : playTrack(currentTrack.url, currentTrack.title)}
              className="h-11 w-11"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkipForward}
              className="h-9 w-9"
              title="Skip forward 10 seconds"
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2 ml-2">
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
          </div>
        </div>

        {/* Right section: Close button */}
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={stopTrack}
            className="h-8 w-8"
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
