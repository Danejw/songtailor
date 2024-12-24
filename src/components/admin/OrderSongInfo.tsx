import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Song } from "./types";

interface OrderSongInfoProps {
  song: Song | null | undefined;
  onSongUpdated: () => void;
}

export function OrderSongInfo({ song, onSongUpdated }: OrderSongInfoProps) {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSong, setEditedSong] = useState<Song | null>(song || null);
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setEditedSong(song || null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditedSong(song || null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editedSong) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('songs')
        .update({
          title: editedSong.title,
          style: editedSong.style,
          lyrics: editedSong.lyrics,
          reference_links: editedSong.reference_links,
        })
        .eq('id', song?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Song details updated successfully",
      });
      
      setIsEditing(false);
      onSongUpdated();
    } catch (error) {
      console.error('Error updating song:', error);
      toast({
        title: "Error",
        description: "Failed to update song details",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof Song, value: string) => {
    if (!editedSong) return;
    setEditedSong({ ...editedSong, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Song Details</h3>
        {!isEditing ? (
          <Button onClick={handleEdit} variant="outline" size="sm">
            Edit Details
          </Button>
        ) : (
          <div className="space-x-2">
            <Button 
              onClick={handleCancel} 
              variant="outline" 
              size="sm"
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              size="sm"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label>Song Title</Label>
          <Input 
            value={isEditing ? editedSong?.title || "" : song?.title || ""} 
            onChange={(e) => handleChange('title', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            aria-label="Song title"
          />
        </div>

        <div>
          <Label>Style</Label>
          <Input 
            value={isEditing ? editedSong?.style || "" : song?.style || ""} 
            onChange={(e) => handleChange('style', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            aria-label="Song style"
          />
        </div>

        <div>
          <Label>Lyrics</Label>
          <Textarea 
            value={isEditing ? editedSong?.lyrics || "" : song?.lyrics || ""} 
            onChange={(e) => handleChange('lyrics', e.target.value)}
            readOnly={!isEditing}
            className={`min-h-[100px] ${!isEditing ? "bg-gray-50" : ""}`}
            aria-label="Song lyrics"
          />
        </div>

        <div>
          <Label>Reference Links</Label>
          <Input 
            value={isEditing ? editedSong?.reference_links || "" : song?.reference_links || ""} 
            onChange={(e) => handleChange('reference_links', e.target.value)}
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50" : ""}
            aria-label="Reference links"
          />
        </div>
      </div>
    </div>
  );
}