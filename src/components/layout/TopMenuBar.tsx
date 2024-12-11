import React from 'react';
import { Link } from 'react-router-dom';
import { Ship, Phone, Mail } from 'lucide-react';

export function TopMenuBar() {
  return (
    <div className="bg-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Ship className="h-4 w-4 mr-1" />
              <span className="text-sm">Global Shipping Partner</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span className="text-sm">+91 99673 34445</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span className="text-sm">support@a2zships.com</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/help" className="text-sm hover:text-indigo-200">Help</Link>
            <Link to="/contact" className="text-sm hover:text-indigo-200">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}