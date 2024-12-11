import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useImageUpload } from '@/lib/storage';
import { ProgressBar } from './ProgressBar';

interface ImageUploadProgressProps {
  onUploadComplete: (urls: string[]) => void;
  basePath: string;
  maxFiles?: number;
  onError?: (error: string) => void;
}

export function ImageUploadProgress({ 
  onUploadComplete, 
  basePath, 
  maxFiles = 5,
  onError 
}: ImageUploadProgressProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const { upload, uploading, progress, error } = useImageUpload({
    basePath,
    onSuccess: (urls) => {
      onUploadComplete(urls);
      // Clear previews after successful upload
      previews.forEach(url => URL.revokeObjectURL(url));
      setPreviews([]);
    },
    onError: (error) => {
      onError?.(error.message);
    }
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    try {
      if (files.length > maxFiles) {
        throw new Error(`Maximum ${maxFiles} images allowed`);
      }

      // Check file sizes before creating previews
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 10 * 1024 * 1024) {
          throw new Error('File size must be less than 10MB');
        }
      }

      // Create preview URLs
      const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
      setPreviews(prev => {
        // Clean up old preview URLs
        prev.forEach(url => URL.revokeObjectURL(url));
        return newPreviews;
      });

      await upload(files);
    } catch (err) {
      const error = err as Error;
      onError?.(error.message);
      // Reset input
      e.target.value = '';
    }
  };

  const removePreview = (index: number) => {
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      const newPreviews = [...prev];
      newPreviews.splice(index, 1);
      return newPreviews;
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Upload files</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
            <p className="pl-1 text-sm text-gray-500">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG, GIF up to 10MB (max {maxFiles} images)
          </p>
        </div>

        {uploading && (
          <div className="mt-4">
            <ProgressBar progress={progress} />
            <p className="text-sm text-gray-500 text-center mt-2">
              Uploading... {Math.round(progress)}%
            </p>
          </div>
        )}

        {error && (
          <div className="mt-4 text-sm text-red-600 text-center">
            Upload failed: {error.message}
          </div>
        )}
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {previews.map((preview, index) => (
            <div key={preview} className="relative group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}