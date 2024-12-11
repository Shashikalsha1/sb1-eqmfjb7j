import React from 'react';
import { Route } from 'react-router-dom';
import {
  PricingPage,
  PartnersPage,
  HelpPage,
  DocsPage,
  StatusPage,
  ContactPage,
  BlogPage,
  CareersPage,
  PressPage,
  PrivacyPage,
  TermsPage,
  CookiesPage,
  LicensesPage
} from '@/pages/ComingSoonPages';

export const ComingSoonRoutes = [
  <Route key="pricing" path="/pricing" element={<PricingPage />} />,
  <Route key="partners" path="/partners" element={<PartnersPage />} />,
  <Route key="help" path="/help" element={<HelpPage />} />,
  <Route key="docs" path="/docs" element={<DocsPage />} />,
  <Route key="status" path="/status" element={<StatusPage />} />,
  <Route key="contact" path="/contact" element={<ContactPage />} />,
  <Route key="blog" path="/blog" element={<BlogPage />} />,
  <Route key="careers" path="/careers" element={<CareersPage />} />,
  <Route key="press" path="/press" element={<PressPage />} />,
  <Route key="privacy" path="/privacy" element={<PrivacyPage />} />,
  <Route key="terms" path="/terms" element={<TermsPage />} />,
  <Route key="cookies" path="/cookies" element={<CookiesPage />} />,
  <Route key="licenses" path="/licenses" element={<LicensesPage />} />
];