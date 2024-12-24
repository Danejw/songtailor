import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DownloadSectionProps {
  orders: any[];
}

export const DownloadSection: FC<DownloadSectionProps> = ({ orders }) => {
  const downloadableOrders = orders.filter(
    (order) => order.status === "completed" && order.final_song_url
  );

  if (downloadableOrders.length === 0) return null;

  const handleDownload = async (url: string, filename: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('songs')
        .download(url);

      if (error) throw error;

      // Create a download link
      const blob = new Blob([data], { type: 'audio/mpeg' });
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Downloads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {downloadableOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div>
                <div className="font-medium">
                  {order.songs?.title || "Untitled Song"}
                </div>
                <div className="text-sm text-muted-foreground">
                  Ready for download
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() =>
                    handleDownload(
                      order.final_song_url,
                      `${order.songs?.title || "song"}.mp3`
                    )
                  }
                >
                  Download Song
                </Button>
                {order.includes_cover_image && order.cover_images?.[0]?.file_path && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleDownload(
                        order.cover_images[0].file_path,
                        `${order.songs?.title || "cover"}.jpg`
                      )
                    }
                  >
                    Download Cover
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};