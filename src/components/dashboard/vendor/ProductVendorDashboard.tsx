```typescript
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProductVendorOverview } from './ProductVendorOverview';
import { ProductDashboard } from './products/ProductDashboard';
import { OrderList } from './orders/OrderList';
import { ReviewDashboard } from './reviews/ReviewDashboard';
import { NotificationCenter } from '@/components/shared/NotificationCenter';
import { PaymentsDashboard } from '@/components/shared/PaymentsDashboard';
import { SettingsPage } from '@/components/shared/SettingsPage';
import { AddProductPage } from '@/pages/AddProductPage';
import { EditProductPage } from '@/pages/EditProductPage';

export function ProductVendorDashboard() {
  return (
    <Routes>
      <Route path="/" element={<ProductVendorOverview />} />
      <Route path="products" element={<ProductDashboard />} />
      <Route path="products/add" element={<AddProductPage />} />
      <Route path="products/edit/:id" element={<EditProductPage />} />
      <Route path="orders" element={<OrderList />} />
      <Route path="reviews" element={<ReviewDashboard />} />
      <Route path="notifications" element={<NotificationCenter />} />
      <Route path="payments" element={<PaymentsDashboard />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
}
```