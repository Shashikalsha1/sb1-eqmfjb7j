import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { useServices } from '@/hooks/useServices';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export function ServiceCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { services } = useServices();
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const getServiceAvailability = (date: Date) => {
    return services?.filter(service => 
      service.availability[format(date, 'EEEE').toLowerCase()]?.length > 0
    ) || [];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Service Calendar</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-lg font-medium">
            {format(currentMonth, 'MMMM yyyy')}
          </span>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-7 gap-px border-b border-gray-200 bg-gray-50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="px-4 py-2 text-sm font-medium text-gray-900">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {days.map((day, dayIdx) => {
            const availableServices = getServiceAvailability(day);
            return (
              <div
                key={day.toString()}
                className={`min-h-[120px] bg-white p-4 ${
                  dayIdx === 0 ? `col-start-${day.getDay() + 1}` : ''
                }`}
              >
                <time dateTime={format(day, 'yyyy-MM-dd')} className="text-sm font-medium text-gray-900">
                  {format(day, 'd')}
                </time>
                <div className="mt-2 space-y-1">
                  {availableServices.map((service) => (
                    <div
                      key={service.id}
                      className="text-xs p-1 bg-indigo-50 text-indigo-700 rounded truncate"
                    >
                      {service.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}