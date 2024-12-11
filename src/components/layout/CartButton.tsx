import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';

interface CartButtonProps {
  onClick: () => void;
}

export function CartButton({ onClick }: CartButtonProps) {
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-400 hover:text-gray-500"
    >
      <ShoppingBag className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-medium text-white">
          {itemCount}
        </span>
      )}
    </button>
  );
}