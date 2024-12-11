import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Hero } from '@/components/home/Hero';
import { Features } from '@/components/home/Features';
import { Stats } from '@/components/home/Stats';
import { Testimonials } from '@/components/home/Testimonials';

export function HomePage() {
  return (
    <MainLayout showTopMenuBar={true}>
      <Hero />
      <Features />
      <Stats />
      <Testimonials />
    </MainLayout>
  );
}