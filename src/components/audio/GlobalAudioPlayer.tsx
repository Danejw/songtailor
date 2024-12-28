import { useEffect, useRef, useState } from "react";
import { useAudio } from "./AudioContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function GlobalAudioPlayer() {
  const { currentTrack, isPlaying, pauseTrack, playTrack, stopTrack } = useAudio();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          pauseTrack();
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack, pauseTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setCurrentTime(0);
    };

    const handleEnded = () => {
      stopTrack();
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isDragging, stopTrack]);

  const handleTimeChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime = value[0];
      setCurrentTime(newTime);
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSliderDragStart = () => {
    setIsDragging(true);
  };

  const handleSliderDragEnd = () => {
    setIsDragging(false);
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

  if (!currentTrack) return null;

  return (
    <Card className={cn(
      "fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t z-50 transition-all duration-300",
      isCollapsed ? "h-16" : "p-4"
    )}>
      <div className="container max-w-2xl mx-auto relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute right-0 top-0 text-muted-foreground"
        >
          {isCollapsed ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {isCollapsed ? (
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => isPlaying ? pauseTrack() : playTrack(currentTrack.url, currentTrack.title, currentTrack.songId)}
                className="h-10 w-10"
              >
                {isPlaying ? 
                  <Pause className="h-6 w-6" /> : 
                  <Play className="h-6 w-6 ml-1" />
                }
              </Button>
              <div>
                <h3 className="font-medium text-sm">{currentTrack.title}</h3>
              </div>
            </div>
            <div className="w-1/3">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleTimeChange}
                onPointerDown={handleSliderDragStart}
                onPointerUp={handleSliderDragEnd}
                className="cursor-pointer"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="font-medium text-lg">{currentTrack.title}</h3>
            </div>

            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleTimeChange}
                onPointerDown={handleSliderDragStart}
                onPointerUp={handleSliderDragEnd}
                className="cursor-pointer"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkipBack}
                className="h-10 w-10"
              >
                <SkipBack className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => isPlaying ? pauseTrack() : playTrack(currentTrack.url, currentTrack.title, currentTrack.songId)}
                className="h-14 w-14 bg-black text-white hover:bg-black/90 rounded-full"
              >
                {isPlaying ? 
                  <Pause className="h-8 w-8" /> : 
                  <Play className="h-8 w-8 ml-1" />
                }
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleSkipForward}
                className="h-10 w-10"
              >
                <SkipForward className="h-6 w-6" />
              </Button>
            </div>
          </div>
        )}
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