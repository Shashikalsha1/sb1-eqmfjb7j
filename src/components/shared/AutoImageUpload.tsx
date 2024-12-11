import React, { useState, useCallback } from 'react';
import { Upload, CheckCircle, X } from 'lucide-react';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useAuth } from '@/hooks/useAuth';

interface AutoImageUploadProps {
  onUploadComplete: (urls: string[]) => void;
  basePath: string;
  maxFiles?: number;
}

export function AutoImageUpload({ onUploadComplete, basePath, maxFiles = 5 }: AutoImageUploadProps) {
  const { user } = useAuth();
  const [previews, setPreviews] = useState<Array<{ url: string; uploaded: boolean }>>([]);
  const { upload, uploading, progress } = useImageUpload({
    basePath: `${basePath}/${user?.id}`,
    onSuccess: (urls) => {
      onUploadComplete(urls);
      // Mark all previews as uploaded
      setPreviews(prev => prev.map(p => ({ ...p, uploaded: true })));
    }
  });

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !user) return;

    if (files.length > maxFiles) {
      alert(`Maximum ${maxFiles} images allowed`);
      return;
    }

    // Create preview URLs and start upload immediately
    const newPreviews = Array.from(files).map(file => ({
      url: URL.createObjectURL(file),
      uploaded: false
    }));

    setPreviews(prev => {
      // Clean up old preview URLs
      prev.forEach(p => URL.revokeObjectURL(p.url));
      return newPreviews;
    });

    try {
      await upload(files);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  }, [maxFiles, upload, user]);

  const removePreview = (index: number) => {
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
              <span>Select files</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            PNG, JPG, GIF up to 10MB (max {maxFiles} images)
          </p>
        </div>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {previews.map((preview, index) => (
            <div key={preview.url} className="relative group">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={preview.url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover"
                />
                {uploading && !preview.uploaded && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="w-3/4">
                      <div className="h-1 bg-white rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-white text-xs mt-1 text-center">{Math.round(progress)}%</p>
                    </div>
                  </div>
                )}
                {preview.uploaded && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => removePreview(index)}
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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