import { createContext, useContext, useState, ReactNode } from "react";

interface AudioContextType {
  currentTrack: {
    url: string;
    title: string;
  } | null;
  isPlaying: boolean;
  playTrack: (url: string, title: string) => void;
  pauseTrack: () => void;
  stopTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<{ url: string; title: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrack = (url: string, title: string) => {
    if (currentTrack?.url === url) {
      setIsPlaying(true);
    } else {
      setCurrentTrack({ url, title });
      setIsPlaying(true);
    }
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const stopTrack = () => {
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  return (
    <AudioContext.Provider value={{ currentTrack, isPlaying, playTrack, pauseTrack, stopTrack }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}