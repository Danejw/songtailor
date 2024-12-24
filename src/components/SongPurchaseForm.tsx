import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PriceSummary } from "./PriceSummary";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  songTitle: z.string().optional(),
  provideLyrics: z.enum(["yes", "no"]),
  lyrics: z.string().optional(),
  theme: z.string().optional(),
  musicStyle: z.string(),
  otherMusicStyle: z.string().optional(),
  mood: z.string(),
  otherMood: z.string().optional(),
  references: z.string().optional(),
  wantCoverImage: z.boolean(),
  wantSecondSong: z.boolean(),
  wantSecondCoverImage: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const musicStyles = [
  "Pop",
  "Country",
  "EDM",
  "Hip-Hop",
  "Acoustic/Folk",
  "Rock",
  "Other",
];

const moods = [
  "Happy",
  "Romantic",
  "Sad/Emotional",
  "Inspirational",
  "Funny/Playful",
  "Other",
];

export function SongPurchaseForm() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [basePrice] = useState(29.99);
  const [showLyrics, setShowLyrics] = useState(false);
  const [showOtherMusicStyle, setShowOtherMusicStyle] = useState(false);
  const [showOtherMood, setShowOtherMood] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wantCoverImage: false,
      wantSecondSong: false,
      wantSecondCoverImage: false,
    },
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please log in to make a purchase",
      });
      navigate("/login", { state: { returnTo: "/order" } });
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          title: "Authentication Required",
          description: "Please log in to make a purchase",
        });
        navigate("/login", { state: { returnTo: "/order" } });
        return;
      }

      // Here we would typically handle the form submission
      toast({
        title: "Order submitted successfully!",
        description: "Redirecting to payment...",
      });
      
      // Redirect to payment page (to be implemented)
      setTimeout(() => navigate("/payment"), 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Custom Song Request</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Personal Information</h3>
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Song Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Song Details</h3>
            
            <FormField
              control={form.control}
              name="songTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Song Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Give your song a name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="provideLyrics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Would you like to provide lyrics?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        setShowLyrics(value === "yes");
                      }}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I'll provide my own lyrics
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Write lyrics for me
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showLyrics && (
              <FormField
                control={form.control}
                name="lyrics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Lyrics</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter your lyrics here"
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Theme/Story (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the story or idea behind your song"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="musicStyle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Music Style</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowOtherMusicStyle(value === "Other");
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {musicStyles.map((style) => (
                        <SelectItem key={style} value={style}>
                          {style}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showOtherMusicStyle && (
              <FormField
                control={form.control}
                name="otherMusicStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe Your Music Style</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your preferred music style"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mood/Tone</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setShowOtherMood(value === "Other");
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a mood" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {moods.map((mood) => (
                        <SelectItem key={mood} value={mood}>
                          {mood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showOtherMood && (
              <FormField
                control={form.control}
                name="otherMood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe Your Desired Mood</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your preferred mood/tone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="references"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>References/Examples (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share songs that inspire you"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Add-Ons */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Add-Ons</h3>
            
            <FormField
              control={form.control}
              name="wantCoverImage"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Cover Image (+$5)
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      A unique, professional design that complements your song
                    </p>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="wantSecondSong"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Second Song Option (+$15)
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Get both custom song variations instead of choosing just one
                    </p>
                  </div>
                </FormItem>
              )}
            />

            {form.watch().wantSecondSong && (
              <FormField
                control={form.control}
                name="wantSecondCoverImage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ml-6">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Cover Image for Second Song (+$5)
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Add a unique cover for your second song variation
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Price Summary */}
          <PriceSummary 
            basePrice={basePrice}
            values={form.watch()}
          />

          <Button type="submit" className="w-full">
            Submit and Continue to Payment
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SongPurchaseForm;