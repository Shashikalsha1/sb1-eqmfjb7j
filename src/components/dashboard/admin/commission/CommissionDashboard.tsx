import React, { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CommissionRateList } from './CommissionRateList';
import { CommissionTierList } from './CommissionTierList';
import { Percent, TrendingUp } from 'lucide-react';

export function CommissionDashboard() {
  const [activeTab, setActiveTab] = useState<'rates' | 'tiers'>('rates');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Commission Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage commission rates and revenue tiers for vendors.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('rates')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                  ${activeTab === 'rates'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-center">
                  <Percent className="h-5 w-5 mr-2" />
                  Commission Rates
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tiers')}
                className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                  ${activeTab === 'tiers'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Revenue Tiers
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'rates' ? <CommissionRateList /> : <CommissionTierList />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}