import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { ServiceVendorDashboard } from '@/pages/vendor/ServiceVendorDashboard';
import { ProductVendorDashboard } from '@/pages/vendor/ProductVendorDashboard';

export const VendorRoutes = [
  <Route
    key="service-vendor-dashboard"
    path="/dashboard/service_vendor/*"
    element={
      <AuthGuard allowedRoles={['service_vendor']}>
        <ServiceVendorDashboard />
      </AuthGuard>
    }
  />,
  <Route
    key="product-vendor-dashboard"
    path="/dashboard/product_vendor/*"
    element={
      <AuthGuard allowedRoles={['product_vendor']}>
        <ProductVendorDashboard />
      </AuthGuard>
    }
  />
];