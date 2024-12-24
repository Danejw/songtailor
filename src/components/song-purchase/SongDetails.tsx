import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormValues } from "./types";

// Define constants for select options
const musicStyles = [
  "Pop",
  "Rock",
  "Jazz",
  "Classical",
  "Hip Hop",
  "Folk",
  "Country",
  "Electronic",
  "R&B",
  "Other",
];

const moods = [
  "Happy",
  "Sad",
  "Energetic",
  "Romantic",
  "Relaxing",
  "Uplifting",
  "Melancholic",
  "Other",
];

interface SongDetailsProps {
  form: UseFormReturn<FormValues>;
  showLyrics: boolean;
  setShowLyrics: (show: boolean) => void;
  showOtherMusicStyle: boolean;
  setShowOtherMusicStyle: (show: boolean) => void;
  showOtherMood: boolean;
  setShowOtherMood: (show: boolean) => void;
}

export function SongDetails({
  form,
  showLyrics,
  setShowLyrics,
  showOtherMusicStyle,
  setShowOtherMusicStyle,
  showOtherMood,
  setShowOtherMood,
}: SongDetailsProps) {
  return (
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
  );
}