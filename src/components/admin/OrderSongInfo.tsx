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
        <Input value={song?.title || ""} readOnly />
      </div>

      <div>
        <Label>Style</Label>
        <Input value={song?.style || ""} readOnly />
      </div>

      <div>
        <Label>Lyrics</Label>
        <Textarea value={song?.lyrics || ""} readOnly className="min-h-[100px]" />
      </div>

      <div>
        <Label>Reference Links</Label>
        <Input value={song?.reference_links || ""} readOnly />
      </div>
    </>
  );
}