import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Calendar,
  Settings,
  Home,
  ShoppingBag,
  Star,
  Clock,
  TrendingUp,
  Bell,
  CreditCard,
  HelpCircle,
  Heart,
  Percent
} from 'lucide-react';
import type { UserRole } from '@/types';

interface SidebarLink {
  icon: React.ElementType;
  label: string;
  href: string;
}

export const roleLinks: Record<UserRole, SidebarLink[]> = {
  admin: [
    { icon: Home, label: 'Go to Home', href: '/' },
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/admin' },
    { icon: Users, label: 'Vendors', href: '/dashboard/admin/vendors' },
    { icon: Package, label: 'Products', href: '/dashboard/admin/products' },
    { icon: Calendar, label: 'Services', href: '/dashboard/admin/services' },
    { icon: TrendingUp, label: 'Analytics', href: '/dashboard/admin/analytics' },
    { icon: Percent, label: 'Commission', href: '/dashboard/admin/commission' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/admin/notifications' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/admin/payments' },
    { icon: HelpCircle, label: 'Support', href: '/dashboard/admin/support' },
    { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
  ],
  service_vendor: [
    { icon: Home, label: 'Go to Home', href: '/' },
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/service_vendor' },
    { icon: Calendar, label: 'Services', href: '/dashboard/service_vendor/services' },
    { icon: Clock, label: 'Bookings', href: '/dashboard/service_vendor/bookings' },
    { icon: Star, label: 'Reviews', href: '/dashboard/service_vendor/reviews' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/service_vendor/notifications' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/service_vendor/payments' },
    { icon: Settings, label: 'Settings', href: '/dashboard/service_vendor/settings' },
  ],
  product_vendor: [
    { icon: Home, label: 'Go to Home', href: '/' },
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/product_vendor' },
    { icon: Package, label: 'Products', href: '/dashboard/product_vendor/products' },
    { icon: ShoppingBag, label: 'Orders', href: '/dashboard/product_vendor/orders' },
    { icon: Star, label: 'Reviews', href: '/dashboard/product_vendor/reviews' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/product_vendor/notifications' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/product_vendor/payments' },
    { icon: Settings, label: 'Settings', href: '/dashboard/product_vendor/settings' },
  ],
  customer: [
    { icon: Home, label: 'Go to Home', href: '/' },
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/customer' },
    { icon: ShoppingBag, label: 'Orders', href: '/dashboard/customer/orders' },
    { icon: Calendar, label: 'Bookings', href: '/dashboard/customer/bookings' },
    { icon: Star, label: 'Reviews', href: '/dashboard/customer/reviews' },
    { icon: Heart, label: 'Wishlist', href: '/dashboard/customer/wishlist' },
    { icon: Bell, label: 'Notifications', href: '/dashboard/customer/notifications' },
    { icon: CreditCard, label: 'Payments', href: '/dashboard/customer/payments' },
    { icon: HelpCircle, label: 'Support', href: '/dashboard/customer/support' },
    { icon: Settings, label: 'Settings', href: '/dashboard/customer/settings' },
  ],
};