import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

export interface PaymentIntent {
  clientSecret: string;
  amount: number;
  currency: string;
}

export async function createPaymentIntent(amount: number): Promise<PaymentIntent> {
  try {
    const createIntent = httpsCallable(functions, 'createPaymentIntent');
    const result = await createIntent({ amount });
    return result.data as PaymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function confirmPayment(paymentIntentId: string): Promise<{ success: boolean }> {
  try {
    const confirmPaymentIntent = httpsCallable(functions, 'confirmPayment');
    const result = await confirmPaymentIntent({ paymentIntentId });
    return result.data as { success: boolean };
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
}