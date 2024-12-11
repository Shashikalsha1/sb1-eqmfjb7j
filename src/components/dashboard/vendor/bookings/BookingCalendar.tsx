import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import type { Booking } from '@/types';

interface BookingCalendarProps {
  bookings: Booking[];
}

export function BookingCalendar({ bookings }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const getDayBookings = (date: Date) => {
    return bookings.filter(booking => isSameDay(new Date(booking.date), date));
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between py-4">
        <h2 className="font-semibold text-gray-900">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
            className="px-3 py-1 border rounded-md hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px border-b border-gray-200 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700">
        <div className="bg-white py-2">Sun</div>
        <div className="bg-white py-2">Mon</div>
        <div className="bg-white py-2">Tue</div>
        <div className="bg-white py-2">Wed</div>
        <div className="bg-white py-2">Thu</div>
        <div className="bg-white py-2">Fri</div>
        <div className="bg-white py-2">Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {days.map((day, dayIdx) => {
          const dayBookings = getDayBookings(day);
          return (
            <div
              key={day.toString()}
              className={`min-h-[100px] bg-white px-3 py-2 ${
                dayIdx === 0 ? `col-start-${day.getDay() + 1}` : ''
              }`}
            >
              <time
                dateTime={format(day, 'yyyy-MM-dd')}
                className="block text-sm font-medium text-gray-500"
              >
                {format(day, 'd')}
              </time>
              <div className="space-y-1 mt-2">
                {dayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`text-xs p-1 rounded-md truncate
                      ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}
                  >
                    {booking.slot} - {booking.serviceId}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}