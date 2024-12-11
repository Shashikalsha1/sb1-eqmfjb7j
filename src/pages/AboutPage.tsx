import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Users, Globe, Shield, Award } from 'lucide-react';

const stats = [
  { label: 'Active Users', value: '10K+' },
  { label: 'Global Partners', value: '500+' },
  { label: 'Countries Served', value: '50+' },
  { label: 'Successful Deliveries', value: '1M+' },
];

const team = [
  {
    name: 'Sarah Chen',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Michael Rodriguez',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Emily Johnson',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'David Kim',
    role: 'Head of Product',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const values = [
  {
    name: 'Customer First',
    description: 'We prioritize our customers\' needs and satisfaction above all else.',
    icon: Users,
  },
  {
    name: 'Global Reach',
    description: 'Connecting businesses worldwide through our extensive network.',
    icon: Globe,
  },
  {
    name: 'Security',
    description: 'Ensuring the safety and security of every shipment.',
    icon: Shield,
  },
  {
    name: 'Excellence',
    description: 'Maintaining the highest standards in shipping and logistics.',
    icon: Award,
  },
];

export default function AboutPage() {
  return (
    <MainLayout showTopMenuBar={true}>
      {/* Hero Section */}
      <div className="relative bg-indigo-800 py-24 px-6 sm:py-32 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-indigo-600 opacity-90" />
        </div>
        <div className="relative mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            About A2Z Ships
          </h1>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            Revolutionizing shipping and logistics through innovation and reliability.
            We connect businesses worldwide with efficient shipping solutions.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simplifying Global Shipping
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At A2Z Ships, we're dedicated to making global shipping accessible, efficient, and reliable for businesses of all sizes. Our innovative platform connects shippers with trusted carriers worldwide.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                <dd className="text-4xl font-semibold tracking-tight text-indigo-600 mt-2">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What We Stand For
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.name} className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-8">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-600">
                    <value.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                    {value.name}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet the Leaders
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <img
                    className="mx-auto h-32 w-32 rounded-full"
                    src={member.image}
                    alt={member.name}
                  />
                  <h3 className="mt-6 text-lg font-semibold leading-7 tracking-tight text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-sm leading-6 text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}