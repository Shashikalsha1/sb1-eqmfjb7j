import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp,
  increment,
  writeBatch,
  runTransaction,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { useAuthStore } from '@/store/auth';
import type { Order, Product } from '@/types';

interface CreateOrderResult {
  success: boolean;
  orderIds?: string[];
  error?: string;
}

export async function createOrder(
  items: Array<{
    productId: string;
    product: Product;
    quantity: number;
  }>, 
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

    // Group items by vendor
    const itemsByVendor = items.reduce((acc, item) => {
      const vendorId = item.product.vendorId;
      if (!acc[vendorId]) {
        acc[vendorId] = [];
      }
      acc[vendorId].push(item);
      return acc;
    }, {} as Record<string, typeof items>);

    const orderIds: string[] = [];

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
        const total = vendorItems.reduce(
          (sum, item) => sum + (item.product.price * item.quantity),
          0
        );

        // Calculate commission (10%)
        const commission = Math.round(total * 0.1 * 100) / 100;

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
          total,
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
    const { user } = useAuthStore.getState();
    if (!user) {
      return { error: 'User not authenticated' };
    }

    const orderRef = doc(db, 'orders', orderId);
    const orderDoc = await getDoc(orderRef);

    if (!orderDoc.exists()) {
      return { error: 'Order not found' };
    }

    const orderData = orderDoc.data();
    if (orderData.vendorId !== user.id && orderData.customerId !== user.id) {
      return { error: 'Unauthorized: You can only update your own orders' };
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

export function subscribeToOrders(
  userId: string, 
  role: 'vendor' | 'customer',
  callback: (orders: Order[]) => void
) {
  const q = query(
    collection(db, 'orders'),
    where(role === 'vendor' ? 'vendorId' : 'customerId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date()
    })) as Order[];
    
    callback(orders);
  });
}