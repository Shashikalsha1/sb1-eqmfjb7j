import { useState } from 'react';
import { uploadMultipleImages } from '@/lib/storage';

interface UseImageUploadOptions {
  basePath: string;
  onSuccess?: (urls: string[]) => void;
  onError?: (error: Error) => void;
}

export function useImageUpload({ basePath, onSuccess, onError }: UseImageUploadOptions) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  const upload = async (files: FileList) => {
    try {
      setUploading(true);
      setError(null);
      setProgress(0);

      const urls = await uploadMultipleImages(
        files, 
        basePath,
        (progress) => {
          setProgress(Math.round(progress));
        }
      );
      
      onSuccess?.(urls);
      return urls;
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  return {
    upload,
    uploading,
    progress,
    error
  };
}