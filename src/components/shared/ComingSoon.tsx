import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Construction } from 'lucide-react';
import { PublicLayout } from '@/components/layout/PublicLayout';

interface ComingSoonProps {
  title: string;
  description?: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <PublicLayout>
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Construction className="mx-auto h-16 w-16 text-indigo-600" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {title}
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            {description || "We're working hard to bring you something amazing. Check back soon!"}
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Home className="h-5 w-5 mr-2" />
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}