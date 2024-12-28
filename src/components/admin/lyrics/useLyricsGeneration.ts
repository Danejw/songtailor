import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useLyricsGeneration() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateLyrics = async (orderSongId: string, currentLyrics?: string, additionalPrompt?: string) => {
    try {
      setIsGenerating(true);
      console.log('Invoking generate-lyrics function with:', { orderSongId, currentLyrics, additionalPrompt });
      
      // Make sure we're passing a proper object structure
      const { data, error } = await supabase.functions.invoke('generate-lyrics', {
        body: JSON.stringify({ 
          orderSongId, 
          currentLyrics, 
          additionalPrompt 
        })
      });

      if (error) {
        console.error('Error from generate-lyrics function:', error);
        throw error;
      }

      if (!data?.lyrics) {
        console.error('No lyrics data returned:', data);
        throw new Error('No lyrics returned from the function');
      }

      console.log('Successfully generated lyrics:', data.lyrics);

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