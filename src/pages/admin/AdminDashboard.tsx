```typescript
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { AdminOverview } from './AdminOverview';
import { VendorList } from '@/components/dashboard/admin/vendors/VendorList';
import { AdminProductsPage } from './ProductsPage';
import { AdminServicesPage } from './ServicesPage';
import { AdminAnalyticsPage } from './AnalyticsPage';
import { NotificationCenter } from '@/components/shared/NotificationCenter';
import { PaymentsDashboard } from '@/components/shared/PaymentsDashboard';
import { CustomerSupport } from '@/components/shared/CustomerSupport';
import { SettingsPage } from '@/components/shared/SettingsPage';

export function AdminDashboard() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<AdminOverview />} />
        <Route path="vendors" element={<VendorList />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="services" element={<AdminServicesPage />} />
        <Route path="analytics" element={<AdminAnalyticsPage />} />
        <Route path="notifications" element={<NotificationCenter />} />
        <Route path="payments" element={<PaymentsDashboard />} />
        <Route path="support" element={<CustomerSupport />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </DashboardLayout>
  );
}
```