import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Truck, Calendar, Clock } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice, formatDate } from '@/lib/utils';
import { createOrder } from '@/lib/orders';
import { useAuth } from '@/hooks/useAuth';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCashOnDelivery, setIsCashOnDelivery] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    try {
      setIsSubmitting(true);

      // Split items into products and services
      const productItems = items.filter(item => item.type === 'product');
      const serviceItems = items.filter(item => item.type === 'service');

      // Create product orders
      if (productItems.length > 0) {
        const result = await createOrder(
          productItems.map(item => ({
            productId: item.productId!,
            product: item.product!,
            quantity: item.quantity
          })),
          isCashOnDelivery
        );
        
        if (result.error) {
          throw new Error(result.error);
        }
      }

      // Create service bookings
      for (const item of serviceItems) {
        if (!item.bookingDate || !item.bookingSlot) continue;
        
        // TODO: Implement createBooking function
        // await createBooking({
        //   service: item.service!,
        //   date: item.bookingDate,
        //   slot: item.bookingSlot
        // });
      }

      clearCart();
      onClose();
      navigate('/dashboard/customer/orders');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-xl">
            <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Shopping Cart</h2>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="mt-8 text-center">
                  <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Cart is empty</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Start shopping to add items to your cart.
                  </p>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li key={item.type === 'product' ? item.productId : item.serviceId} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            {item.type === 'product' ? (
                              item.product?.images?.[0] ? (
                                <img
                                  src={item.product.images[0]}
                                  alt={item.product.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <ShoppingBag className="h-8 w-8 text-gray-400" />
                                </div>
                              )
                            ) : (
                              item.service?.images?.[0] ? (
                                <img
                                  src={item.service.images[0]}
                                  alt={item.service.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                  <Calendar className="h-8 w-8 text-gray-400" />
                                </div>
                              )
                            )}
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  {item.type === 'product' ? item.product?.name : item.service?.name}
                                </h3>
                                <p className="ml-4">
                                  {item.type === 'product' 
                                    ? formatPrice(item.product!.price * item.quantity)
                                    : formatPrice(item.service!.price)
                                  }
                                </p>
                              </div>
                              {item.type === 'service' && item.bookingDate && (
                                <div className="mt-1 text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(item.bookingDate)}
                                  </div>
                                  <div className="flex items-center mt-1">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {item.bookingSlot}
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              {item.type === 'product' && (
                                <div className="flex items-center">
                                  <label htmlFor={`quantity-${item.productId}`} className="sr-only">
                                    Quantity
                                  </label>
                                  <select
                                    id={`quantity-${item.productId}`}
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.productId!, Number(e.target.value))}
                                    className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                  >
                                    {[...Array(10)].map((_, i) => (
                                      <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}

                              <button
                                type="button"
                                onClick={() => removeItem(
                                  item.type === 'product' ? item.productId! : item.serviceId!,
                                  item.type
                                )}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{formatPrice(total)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>

                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isCashOnDelivery}
                      onChange={(e) => setIsCashOnDelivery(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 flex items-center">
                      <Truck className="h-4 w-4 mr-1" />
                      Cash on Delivery
                    </span>
                  </label>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Checkout'
                    )}
                  </button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{' '}
                    <button
                      type="button"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                      onClick={onClose}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}