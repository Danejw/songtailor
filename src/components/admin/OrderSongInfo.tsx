import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Song } from "./types";

interface OrderSongInfoProps {
  song: Song | null | undefined;
}

export function OrderSongInfo({ song }: OrderSongInfoProps) {
  return (
    <>
      <div>
        <Label>Song Title</Label>
        <Input 
          value={song?.title || ""} 
          readOnly 
          className="bg-gray-50"
          aria-label="Song title"
        />
      </div>

      <div>
        <Label>Style</Label>
        <Input 
          value={song?.style || ""} 
          readOnly 
          className="bg-gray-50"
          aria-label="Song style"
        />
      </div>

      <div>
        <Label>Lyrics</Label>
        <Textarea 
          value={song?.lyrics || ""} 
          readOnly 
          className="min-h-[100px] bg-gray-50"
          aria-label="Song lyrics"
        />
      </div>

      <div>
        <Label>Reference Links</Label>
        <Input 
          value={song?.reference_links || ""} 
          readOnly 
          className="bg-gray-50"
          aria-label="Reference links"
        />
      </div>
    </>
  );
}