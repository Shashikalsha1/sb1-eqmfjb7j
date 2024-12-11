import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { signUp } from '@/lib/auth';
import { Package, Truck, User, Users, Anchor, Box } from 'lucide-react';
import type { UserRole } from '@/types';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  displayName: string;
  role: UserRole;
  companyName?: string;
  businessType?: string;
  taxId?: string;
  productType?: 'spare_parts' | 'shipping_products';
}

const roleOptions = [
  { 
    id: 'customer',
    title: 'Customer',
    description: 'I want to purchase products and services',
    icon: User
  },
  {
    id: 'product_vendor',
    title: 'Product Vendor',
    description: 'I want to sell shipping products',
    icon: Package
  },
  {
    id: 'service_vendor',
    title: 'Service Vendor',
    description: 'I want to offer shipping services',
    icon: Truck
  }
] as const;

const productTypes = [
  {
    id: 'spare_parts',
    title: 'Ship Spare Parts',
    description: 'Sell spare parts and components for ships',
    icon: Anchor
  },
  {
    id: 'shipping_products',
    title: 'Ship Products',
    description: 'Sell general shipping and packaging products',
    icon: Box
  }
];

export function RegisterForm() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<'spare_parts' | 'shipping_products' | null>(null);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>();
  
  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    if (!selectedRole) return;
    if (selectedRole === 'product_vendor' && !selectedProductType) return;
    
    const result = await signUp(
      data.email, 
      data.password, 
      selectedRole, 
      data.displayName,
      selectedRole === 'product_vendor' ? { productType: selectedProductType } : undefined
    );
    
    if (result.error) {
      console.error(result.error);
      return;
    }

    navigate('/login', { 
      replace: true,
      state: { message: 'Registration successful. Please wait for admin approval.' }
    });
  };

  // Show role selection first
  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Choose your role
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Select how you want to use our platform
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {roleOptions.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as UserRole)}
                className="w-full flex items-center p-4 border-2 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <role.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium text-gray-900">{role.title}</h3>
                  <p className="text-sm text-gray-500">{role.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show product type selection for product vendors
  if (selectedRole === 'product_vendor' && !selectedProductType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
            >
              <Users className="h-4 w-4 mr-1" />
              Change role
            </button>
            <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
              Select Product Type
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Choose the type of products you want to sell
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {productTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedProductType(type.id as 'spare_parts' | 'shipping_products')}
                className="w-full flex items-center p-4 border-2 rounded-lg hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <div className="flex-shrink-0">
                  <type.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg font-medium text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show registration form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <button
            onClick={() => {
              if (selectedRole === 'product_vendor' && selectedProductType) {
                setSelectedProductType(null);
              } else {
                setSelectedRole(null);
              }
            }}
            className="flex items-center text-sm text-indigo-600 hover:text-indigo-500"
          >
            <Users className="h-4 w-4 mr-1" />
            {selectedRole === 'product_vendor' && selectedProductType ? 'Change product type' : 'Change role'}
          </button>
          <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Register as a {roleOptions.find(r => r.id === selectedRole)?.title}
            {selectedProductType && ` - ${productTypes.find(t => t.id === selectedProductType)?.title}`}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register('role')} value={selectedRole} />
          {selectedProductType && (
            <input type="hidden" {...register('productType')} value={selectedProductType} />
          )}
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="displayName" className="sr-only">Display Name</label>
              <input
                {...register('displayName', { required: 'Display name is required' })}
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Display Name"
              />
              {errors.displayName && (
                <p className="mt-1 text-sm text-red-600">{errors.displayName.message}</p>
              )}
            </div>

            {selectedRole !== 'customer' && (
              <>
                <div>
                  <label htmlFor="companyName" className="sr-only">Company Name</label>
                  <input
                    {...register('companyName', { required: 'Company name is required' })}
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label htmlFor="businessType" className="sr-only">Business Type</label>
                  <input
                    {...register('businessType', { required: 'Business type is required' })}
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Business Type"
                  />
                </div>

                <div>
                  <label htmlFor="taxId" className="sr-only">Tax ID</label>
                  <input
                    {...register('taxId', { required: 'Tax ID is required' })}
                    type="text"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Tax ID"
                  />
                </div>
              </>
            )}

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
                type="password"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>

          <div className="text-center">
            <Link to="/login" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}