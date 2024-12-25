import { supabase } from "@/integrations/supabase/client";

export class FileUrlManager {
  static extractFilename(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  static async getPublicUrl(bucket: string, filePath: string): Promise<string> {
    if (!filePath) return '';
    
    try {
      const filename = this.extractFilename(filePath);
      console.log('Getting signed URL for:', { bucket, filename });
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filename, 3600);

      if (error) {
        console.error('Error getting signed URL:', error);
        throw error;
      }

      console.log('Got signed URL:', data?.signedUrl);
      return data?.signedUrl || '';
    } catch (error) {
      console.error('Error in getPublicUrl:', error);
      return '';
    }
  }
}