import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { CustomerDashboard } from '@/components/dashboard/customer/CustomerDashboard';
import { CustomerOrderList } from '@/components/dashboard/customer/orders/CustomerOrderList';
import { CustomerBookingList } from '@/components/dashboard/customer/bookings/CustomerBookingList';
import { CustomerReviewDashboard } from '@/components/dashboard/customer/reviews/CustomerReviewDashboard';
import { CustomerWishlist } from '@/components/dashboard/customer/wishlist/CustomerWishlist';
import { CustomerNotifications } from '@/components/dashboard/customer/notifications/CustomerNotifications';
import { PaymentsDashboard } from '@/components/shared/PaymentsDashboard';
import { CustomerSupport } from '@/components/shared/CustomerSupport';
import { SettingsPage } from '@/components/shared/SettingsPage';

export const CustomerRoutes = (
  <Route
    key="customer-dashboard"
    path="/dashboard/customer/*"
    element={
      <AuthGuard allowedRoles={['customer']}>
        <CustomerDashboard />
      </AuthGuard>
    }
  />
);