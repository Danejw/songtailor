import { supabase } from "@/integrations/supabase/client";

export class FileUrlManager {
  static extractFilename(url: string): string {
    // Remove any query parameters first
    const urlWithoutParams = url.split('?')[0];
    const parts = urlWithoutParams.split('/');
    return parts[parts.length - 1];
  }

  static async getPublicUrl(bucket: string, filePath: string): Promise<string> {
    if (!filePath) return '';
    
    try {
      // If the filePath already contains a token, return it as is
      if (filePath.includes('token=')) {
        return filePath;
      }
      
      const filename = this.extractFilename(filePath);
      console.log('Getting signed URL for:', { bucket, filename });
      
      // Create a new signed URL with a longer expiration time (24 hours)
      const { data: signedUrlData, error: signedUrlError } = await supabase.storage
        .from(bucket)
        .createSignedUrl(filename, 86400); // 24 hours in seconds

      if (signedUrlError) {
        console.error('Error getting signed URL:', signedUrlError);
        throw signedUrlError;
      }

      if (!signedUrlData?.signedUrl) {
        throw new Error('No signed URL returned');
      }

      console.log('Got signed URL successfully');
      return signedUrlData.signedUrl;
    } catch (error) {
      console.error('Error in getPublicUrl:', error);
      // Return an empty string instead of throwing to avoid cascading errors
      return '';
    }
  }
}