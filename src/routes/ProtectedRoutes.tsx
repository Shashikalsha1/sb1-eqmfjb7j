import React from 'react';
import { AdminRoutes } from './protected/AdminRoutes';
import { VendorRoutes } from './protected/VendorRoutes';
import { CustomerRoutes } from './protected/CustomerRoutes';

export const ProtectedRoutes = [
  AdminRoutes,
  ...VendorRoutes,
  CustomerRoutes
];