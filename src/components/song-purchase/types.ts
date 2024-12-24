import { z } from "zod";

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;

export const musicStyles = [
  "Pop",
  "Country",
  "EDM",
  "Hip-Hop",
  "Acoustic/Folk",
  "Rock",
  "Other",
];

export const moods = [
  "Happy",
  "Romantic",
  "Sad/Emotional",
  "Inspirational",
  "Funny/Playful",
  "Other",
];