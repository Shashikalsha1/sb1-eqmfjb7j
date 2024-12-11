import React from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import { addReview } from '@/lib/reviews';
import { useAuth } from '@/hooks/useAuth';
import type { Review } from '@/types';

interface ReviewFormProps {
  targetId: string;
  targetType: 'product' | 'service';
  vendorId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

interface ReviewFormData {
  rating: number;
  comment: string;
}

export function ReviewForm({ targetId, targetType, vendorId, onSuccess, onCancel }: ReviewFormProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 5
    }
  });

  const rating = watch('rating');

  const onSubmit = async (data: ReviewFormData) => {
    if (!user) return;

    try {
      await addReview({
        targetId,
        targetType,
        vendorId,
        customerId: user.id,
        customerName: user.displayName,
        rating: data.rating,
        comment: data.comment,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      });
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setValue('rating', value)}
              className="focus:outline-none"
            >
              <Star
                className={`h-6 w-6 ${
                  value <= rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill={value <= rating ? 'currentColor' : 'none'}
              />
            </button>
          ))}
          <input
            type="number"
            {...register('rating', { required: true })}
            className="sr-only"
          />
        </div>
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
          Review
        </label>
        <textarea
          {...register('comment', { 
            required: 'Please write a review',
            minLength: { value: 10, message: 'Review must be at least 10 characters' }
          })}
          rows={4}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Share your experience..."
        />
        {errors.comment && (
          <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}