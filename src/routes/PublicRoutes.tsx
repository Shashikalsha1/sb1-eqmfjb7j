import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ServicesPage } from '@/pages/ServicesPage';
import { AboutPage } from '@/pages/AboutPage';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { CreateAdminPage } from '@/pages/admin/CreateAdminPage';
import { BookServicePage } from '@/pages/BookServicePage';

export const PublicRoutes = [
  <Route key="home" path="/" element={<HomePage />} />,
  <Route key="products" path="/products" element={<ProductsPage />} />,
  <Route key="services" path="/services" element={<ServicesPage />} />,
  <Route key="about" path="/about" element={<AboutPage />} />,
  <Route key="login" path="/login" element={<LoginForm />} />,
  <Route key="register" path="/register" element={<RegisterForm />} />,
  <Route key="admin-create" path="/admin/create" element={<CreateAdminPage />} />,
  <Route key="book-service" path="/services/:id/book" element={<BookServicePage />} />
];