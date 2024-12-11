import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CustomerOverview } from './CustomerOverview';
import { CustomerOrderList } from './orders/CustomerOrderList';
import { CustomerBookingList } from './bookings/CustomerBookingList';
import { CustomerReviewDashboard } from './reviews/CustomerReviewDashboard';
import { CustomerWishlist } from './wishlist/CustomerWishlist';
import { CustomerNotifications } from './notifications/CustomerNotifications';
import { PaymentsDashboard } from '@/components/shared/PaymentsDashboard';
import { CustomerSupport } from '@/components/shared/CustomerSupport';
import { SettingsPage } from '@/components/shared/SettingsPage';

export function CustomerDashboard() {
  return (
    <Routes>
      <Route path="/" element={<CustomerOverview />} />
      <Route path="orders" element={<CustomerOrderList />} />
      <Route path="bookings" element={<CustomerBookingList />} />
      <Route path="reviews" element={<CustomerReviewDashboard />} />
      <Route path="wishlist" element={<CustomerWishlist />} />
      <Route path="notifications" element={<CustomerNotifications />} />
      <Route path="payments" element={<PaymentsDashboard />} />
      <Route path="support" element={<CustomerSupport />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
}