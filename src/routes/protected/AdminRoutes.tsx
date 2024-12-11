import React from 'react';
import { Route } from 'react-router-dom';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';

export const AdminRoutes = (
  <Route
    key="admin-dashboard"
    path="/dashboard/admin/*"
    element={
      <AuthGuard allowedRoles={['admin']}>
        <AdminDashboard />
      </AuthGuard>
    }
  />
);