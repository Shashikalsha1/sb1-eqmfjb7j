import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, addDays } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Service } from '@/types';

interface BookingCalendarProps {
  service: Service;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export function BookingCalendar({ service, selectedDate, onSelectDate }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const isDateAvailable = (date: Date) => {
    const dayName = format(date, 'EEEE').toLowerCase();
    return (
      !isBefore(date, new Date()) &&
      service.availability[dayName]?.slots?.length > 0
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentMonth(prev => addDays(prev, -30))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button
          onClick={() => setCurrentMonth(prev => addDays(prev, 30))}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 py-2 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}

        {days.map((day, dayIdx) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isAvailable = isDateAvailable(day);
          const dayClasses = `relative bg-white py-6 px-3 text-center cursor-pointer hover:bg-gray-50 ${
            isSelected ? 'bg-indigo-50' : ''
          } ${!isAvailable ? 'cursor-not-allowed bg-gray-50' : ''}`;

          return (
            <div
              key={day.toString()}
              className={dayClasses}
              onClick={() => isAvailable && onSelectDate(day)}
            >
              <time
                dateTime={format(day, 'yyyy-MM-dd')}
                className={`text-sm ${
                  isToday(day)
                    ? 'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto'
                    : isSelected
                    ? 'text-indigo-600 font-semibold'
                    : !isAvailable
                    ? 'text-gray-400'
                    : 'text-gray-900'
                }`}
              >
                {format(day, 'd')}
              </time>
            </div>
          );
        })}
      </div>
    </div>
  );
}