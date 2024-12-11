```typescript
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ServiceVendorOverview } from './ServiceVendorOverview';
import { ServiceDashboard } from './services/ServiceDashboard';
import { BookingList } from './bookings/BookingList';
import { ReviewDashboard } from './reviews/ReviewDashboard';
import { NotificationCenter } from '@/components/shared/NotificationCenter';
import { PaymentsDashboard } from '@/components/shared/PaymentsDashboard';
import { SettingsPage } from '@/components/shared/SettingsPage';
import { AddServicePage } from '@/pages/AddServicePage';
import { EditServicePage } from '@/pages/EditServicePage';

export function ServiceVendorDashboard() {
  return (
    <Routes>
      <Route path="/" element={<ServiceVendorOverview />} />
      <Route path="services" element={<ServiceDashboard />} />
      <Route path="services/add" element={<AddServicePage />} />
      <Route path="services/edit/:id" element={<EditServicePage />} />
      <Route path="bookings" element={<BookingList />} />
      <Route path="reviews" element={<ReviewDashboard />} />
      <Route path="notifications" element={<NotificationCenter />} />
      <Route path="payments" element={<PaymentsDashboard />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
}
```