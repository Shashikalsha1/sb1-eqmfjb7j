import React from 'react';
import { MainLayout } from './MainLayout';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}