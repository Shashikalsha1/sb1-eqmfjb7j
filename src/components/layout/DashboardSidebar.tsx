import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { roleLinks } from '@/lib/constants/navigation';
import { LogOut, Package } from 'lucide-react';
import { signOut } from '@/lib/auth';

export function DashboardSidebar() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!user) return null;

  const links = roleLinks[user.role] || [];

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-white border-r h-screen">
          <div className="flex items-center flex-shrink-0 px-4">
            <Package className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold">Dashboard</span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={handleSignOut}
                className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <LogOut className="mr-3 h-5 w-5 flex-shrink-0" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}