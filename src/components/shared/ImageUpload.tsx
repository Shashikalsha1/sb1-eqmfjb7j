import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FileTooLargeError } from '@/lib/storage';

interface ImageUploadProps {
  onChange: (files: FileList) => void;
  value?: string[];
  multiple?: boolean;
  className?: string;
  maxFiles?: number;
  accept?: string;
  error?: string;
  onError?: (error: string) => void;
}

export function ImageUpload({
  onChange,
  value = [],
  multiple = false,
  className,
  maxFiles = 5,
  accept = 'image/*',
  error,
  onError
}: ImageUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      
      try {
        if (files.length > maxFiles) {
          throw new Error(`Maximum ${maxFiles} files allowed`);
        }

        // Check file sizes
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 10 * 1024 * 1024) {
            throw new FileTooLargeError('File size must be less than 10MB');
          }
        }
        
        onChange(files);
      } catch (err) {
        const error = err as Error;
        onError?.(error.message);
      }
    },
    [maxFiles, onChange, onError]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      
      try {
        if (files.length > maxFiles) {
          throw new Error(`Maximum ${maxFiles} files allowed`);
        }

        // Check file sizes
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 10 * 1024 * 1024) {
            throw new FileTooLargeError('File size must be less than 10MB');
          }
        }
        
        onChange(files);
      } catch (err) {
        const error = err as Error;
        onError?.(error.message);
        // Reset input
        e.target.value = '';
      }
    },
    [maxFiles, onChange, onError]
  );

  const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        onDrop={handleDrop}
        onDragOver={preventDefault}
        onDragEnter={preventDefault}
        className={cn(
          "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors duration-200",
          error && "border-red-500"
        )}
      >
        <input
          type="file"
          onChange={handleChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-gray-400" />
          <span className="mt-2 block text-sm font-medium text-gray-600">
            Drop images here or click to upload
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            {multiple ? `Up to ${maxFiles} images allowed` : 'Single image upload'}
          </span>
          <span className="mt-1 block text-xs text-gray-500">
            Maximum file size: 10MB
          </span>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {value && value.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {value.map((url, index) => (
            <div key={url} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-24 w-full object-cover rounded-lg"
              />
              <button
                onClick={() => {
                  const newValue = value.filter((_, i) => i !== index);
                  onChange(
                    new DataTransfer().files // Create empty FileList
                  );
                }}
                className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}