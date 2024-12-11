import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';
import { useAuthStore } from '@/store/auth';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export class FileTooLargeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileTooLargeError';
  }
}

/**
 * Validates file size and type
 */
function validateFile(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    throw new FileTooLargeError(`File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`);
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('File type not supported. Please upload JPEG, PNG, or GIF images.');
  }
}

/**
 * Uploads a single image to Firebase Storage with retry logic
 */
export async function uploadImage(
  file: File, 
  path: string,
  onProgress?: (progress: number) => void,
  retries = 3
): Promise<string> {
  const { user } = useAuthStore.getState();
  if (!user) throw new Error('User not authenticated');

  // Validate file before upload
  validateFile(file);

  let attempt = 0;
  while (attempt < retries) {
    try {
      // Create a unique file path with timestamp and sanitized name
      const timestamp = Date.now();
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
      const uniquePath = `${path}/${user.id}/${timestamp}_${sanitizedName}`;
      const storageRef = ref(storage, uniquePath);
      
      // Create upload task
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Return promise that resolves with download URL
      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress?.(progress);
          },
          (error) => {
            console.error(`Upload attempt ${attempt + 1} failed:`, error);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            } catch (error) {
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      attempt++;
      if (attempt === retries) throw error;
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error('Upload failed after retries');
}

/**
 * Uploads multiple images to Firebase Storage with progress tracking
 */
export async function uploadMultipleImages(
  files: FileList, 
  basePath: string,
  onProgress?: (progress: number) => void
): Promise<string[]> {
  const totalFiles = files.length;
  let completedFiles = 0;
  const results: string[] = [];

  try {
    const uploadPromises = Array.from(files).map(async (file, index) => {
      const url = await uploadImage(file, basePath, (fileProgress) => {
        const overallProgress = ((completedFiles * 100) + fileProgress) / totalFiles;
        onProgress?.(overallProgress);
      });
      completedFiles++;
      results[index] = url;
      return url;
    });

    await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
}

/**
 * Custom hook for handling image uploads with state management
 */
export function useImageUpload({ 
  basePath,
  onSuccess,
  onError
}: {
  basePath: string;
  onSuccess?: (urls: string[]) => void;
  onError?: (error: Error) => void;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [error, setError] = React.useState<Error | null>(null);

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