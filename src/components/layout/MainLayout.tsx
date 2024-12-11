import React from 'react';
import { TopMenuBar } from './TopMenuBar';
import { TopNav } from './TopNav';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';

interface MainLayoutProps {
  children: React.ReactNode;
  showTopMenuBar?: boolean;
}

export function MainLayout({ children, showTopMenuBar = false }: MainLayoutProps) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {showTopMenuBar && <TopMenuBar />}
      <TopNav onCartClick={() => setIsCartOpen(true)} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}