import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BookingCalendar } from '@/components/bookings/BookingCalendar';
import { BookingTimeSlots } from '@/components/bookings/BookingTimeSlots';
import { BookingSummary } from '@/components/bookings/BookingSummary';
import { useServices } from '@/hooks/useServices';
import { useAuth } from '@/hooks/useAuth';
import * as Tabs from '@radix-ui/react-tabs';
import { Calendar, Clock, CreditCard } from 'lucide-react';

export function BookServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { services, loading } = useServices();
  const { user } = useAuth();
  const service = services?.find(s => s.id === id);
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState('date');

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!service) {
    return (
      <DashboardLayout>
        <div className="text-center">
          <p>Service not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const canProceedToTime = selectedDate !== null;
  const canProceedToSummary = selectedDate !== null && selectedSlot !== null;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Book Service</h1>
          <p className="mt-1 text-sm text-gray-500">
            Schedule an appointment for {service.name}
          </p>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="flex border-b border-gray-200">
              <Tabs.Trigger
                value="date"
                className={`flex-1 px-4 py-4 text-sm font-medium text-center ${
                  activeTab === 'date'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Select Date
                </div>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="time"
                disabled={!canProceedToTime}
                className={`flex-1 px-4 py-4 text-sm font-medium text-center ${
                  !canProceedToTime
                    ? 'text-gray-400 cursor-not-allowed'
                    : activeTab === 'time'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Select Time
                </div>
              </Tabs.Trigger>
              <Tabs.Trigger
                value="summary"
                disabled={!canProceedToSummary}
                className={`flex-1 px-4 py-4 text-sm font-medium text-center ${
                  !canProceedToSummary
                    ? 'text-gray-400 cursor-not-allowed'
                    : activeTab === 'summary'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center justify-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Summary
                </div>
              </Tabs.Trigger>
            </Tabs.List>

            <div className="p-6">
              <Tabs.Content value="date">
                <BookingCalendar
                  service={service}
                  selectedDate={selectedDate}
                  onSelectDate={(date) => {
                    setSelectedDate(date);
                    setActiveTab('time');
                  }}
                />
              </Tabs.Content>

              <Tabs.Content value="time">
                {selectedDate && (
                  <BookingTimeSlots
                    service={service}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    onSelectSlot={(slot) => {
                      setSelectedSlot(slot);
                      setActiveTab('summary');
                    }}
                  />
                )}
              </Tabs.Content>

              <Tabs.Content value="summary">
                {selectedDate && selectedSlot && (
                  <BookingSummary
                    service={service}
                    selectedDate={selectedDate}
                    selectedSlot={selectedSlot}
                    onConfirm={() => {
                      if (!user) {
                        navigate('/login', {
                          state: { from: `/services/${service.id}/book` }
                        });
                        return;
                      }
                      navigate(`/dashboard/customer/bookings`);
                    }}
                    onBack={() => setActiveTab('time')}
                  />
                )}
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </DashboardLayout>
  );
}