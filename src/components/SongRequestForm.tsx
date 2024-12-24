import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface SongRequestFormData {
  title: string;
  style: string;
  lyrics: string;
  themes: string;
  reference_links: string;
}

const SongRequestForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const form = useForm<SongRequestFormData>();

  const onSubmit = async (data: SongRequestFormData) => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to submit a request",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase.from("songs").insert({
        ...data,
        user_id: user.id,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your song request has been submitted!",
      });
      
      form.reset();
    } catch (error) {
      console.error("Error submitting song request:", error);
      toast({
        title: "Error",
        description: "Failed to submit song request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Song Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your desired song title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="style"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Musical Style</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Rock, Jazz, Pop, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lyrics"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lyrics (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter your lyrics or leave blank for our writers" 
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="themes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Themes</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Love, Nature, Adventure" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reference_links"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reference Links (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Links to similar songs or inspiration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </Form>
  );
};

export default SongRequestForm;