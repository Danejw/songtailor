import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useLyricsGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateLyrics = async (orderSongId: string, currentLyrics?: string, additionalPrompt?: string) => {
    try {
      setIsGenerating(true);
      
      const { data, error } = await supabase.functions.invoke('generate-lyrics', {
        body: { orderSongId, currentLyrics, additionalPrompt }
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lyrics generated successfully",
      });

      return data.lyrics;
    } catch (error) {
      console.error('Error generating lyrics:', error);
      toast({
        title: "Error",
        description: "Failed to generate lyrics. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generateLyrics,
  };
}