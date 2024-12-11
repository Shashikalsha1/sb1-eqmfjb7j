import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  increment,
  runTransaction,
  getDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuthStore } from '@/store/auth';
import { validateOrderItems, calculateOrderTotals } from './validation';
import type { OrderItem, CreateOrderResult } from './types';
import type { Order } from '@/types';

export async function createOrder(
  items: OrderItem[], 
  isCashOnDelivery: boolean = false
): Promise<CreateOrderResult> {
  try {
    const { user } = useAuthStore.getState();
    if (!user) {
      return { 
        success: false, 
        error: 'User not authenticated. Please log in to continue.' 
      };
    }

    // Validate items and stock
    try {
      validateOrderItems(items);
    } catch (error) {
      return {
        success: false,
        error: (error as Error).message
      };
    }

    // Group items by vendor
    const itemsByVendor = items.reduce((acc, item) => {
      const vendorId = item.product.vendorId;
      if (!acc[vendorId]) {
        acc[vendorId] = [];
      }
      acc[vendorId].push(item);
      return acc;
    }, {} as Record<string, OrderItem[]>);

    const orderIds: string[] = [];

    // Verify vendors exist and are active
    for (const vendorId of Object.keys(itemsByVendor)) {
      const vendorDoc = await getDoc(doc(db, 'users', vendorId));
      if (!vendorDoc.exists()) {
        return {
          success: false,
          error: `Vendor not found. Please try again later.`
        };
      }
      if (vendorDoc.data().status !== 'active') {
        return {
          success: false,
          error: `One or more vendors are currently unavailable. Please try again later.`
        };
      }
    }

    // Use transaction to ensure atomic updates
    await runTransaction(db, async (transaction) => {
      // First verify stock for all items
      for (const item of items) {
        const productRef = doc(db, 'products', item.productId);
        const productSnap = await transaction.get(productRef);
        
        if (!productSnap.exists()) {
          throw new Error(`Product ${item.product.name} is no longer available`);
        }
        
        const productData = productSnap.data();
        if (productData.status !== 'active') {
          throw new Error(`Product ${item.product.name} is currently unavailable`);
        }

        const currentStock = productData.stock;
        if (currentStock < item.quantity) {
          throw new Error(`Only ${currentStock} units available for ${item.product.name}`);
        }
      }

      // Create orders for each vendor
      for (const [vendorId, vendorItems] of Object.entries(itemsByVendor)) {
        const { subtotal, commission } = calculateOrderTotals(vendorItems);

        const orderData = {
          customerId: user.id,
          customerName: user.displayName,
          vendorId,
          items: vendorItems.map(item => ({
            productId: item.productId,
            name: item.product.name,
            quantity: item.quantity,
            price: item.product.price
          })),
          status: isCashOnDelivery ? 'pending_cod' : 'pending',
          paymentMethod: isCashOnDelivery ? 'cash_on_delivery' : 'online',
          total: subtotal,
          commission,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Create order document
        const orderRef = await addDoc(collection(db, 'orders'), orderData);
        orderIds.push(orderRef.id);

        // Update product stock
        for (const item of vendorItems) {
          const productRef = doc(db, 'products', item.productId);
          transaction.update(productRef, {
            stock: increment(-item.quantity),
            updatedAt: serverTimestamp()
          });
        }
      }
    });

    return { success: true, orderIds };
  } catch (error) {
    console.error('Error creating order:', error);
    return { 
      success: false, 
      error: (error as Error).message || 'An unexpected error occurred. Please try again.' 
    };
  }
}

export async function updateOrderStatus(orderId: string, status: Order['status']) {
  try {
    const orderRef = doc(db, 'orders', orderId);
    
    // Verify order exists
    const orderDoc = await getDoc(orderRef);
    if (!orderDoc.exists()) {
      return { error: 'Order not found' };
    }

    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { error: (error as Error).message };
  }
}

export * from './types';
export * from './validation';