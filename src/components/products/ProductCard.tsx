import React from 'react';
import { Package, Star, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/cart';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    onAddToCart?.();
    
    // Show feedback briefly
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              target.onerror = null;
            }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
        )}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded text-white text-xs">
            +{product.images.length - 1} more
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
            {product.category}
          </span>
          {product.averageRating && (
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-yellow-700">
                {product.averageRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mt-2">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span>Stock: {product.stock} units</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white 
              ${product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : isAdding 
                  ? 'bg-green-500'
                  : 'bg-indigo-600 hover:bg-indigo-700'} 
              transition-colors duration-200`}
          >
            {product.stock === 0 ? (
              'Out of Stock'
            ) : isAdding ? (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4 mr-2" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}