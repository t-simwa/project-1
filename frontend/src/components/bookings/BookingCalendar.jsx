import { useState } from 'react';
import { formatDate } from '../../utils/formatDate';

const BookingCalendar = ({ bookings }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get bookings for selected month
  const monthBookings = bookings.filter((booking) => {
    const bookingDate = new Date(booking.requestedDate);
    return (
      bookingDate.getMonth() === selectedDate.getMonth() &&
      bookingDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  // Get days in month
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const navigateMonth = (direction) => {
    setSelectedDate(new Date(year, month + direction, 1));
  };

  const getBookingsForDate = (day) => {
    return monthBookings.filter((booking) => {
      const bookingDate = new Date(booking.requestedDate);
      return bookingDate.getDate() === day;
    });
  };

  const days = [];
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">
          {monthNames[month]} {year}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="btn btn-ghost text-sm"
            aria-label="Previous month"
          >
            ←
          </button>
          <button
            onClick={() => setSelectedDate(new Date())}
            className="btn btn-ghost text-sm"
            aria-label="Current month"
          >
            Today
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="btn btn-ghost text-sm"
            aria-label="Next month"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          const dateBookings = day ? getBookingsForDate(day) : [];
          const isToday = day && new Date().toDateString() === new Date(year, month, day).toDateString();

          return (
            <div
              key={index}
              className={`min-h-[60px] p-1 border border-gray-200 ${
                day ? 'bg-white' : 'bg-gray-50'
              } ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
            >
              {day && (
                <>
                  <div className={`text-sm font-medium mb-1 ${isToday ? 'text-indigo-600' : 'text-gray-900'}`}>
                    {day}
                  </div>
                  {dateBookings.length > 0 && (
                    <div className="space-y-1">
                      {dateBookings.slice(0, 2).map((booking) => (
                        <div
                          key={booking._id}
                          className={`text-xs p-1 rounded truncate ${
                            booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : booking.status === 'completed'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                          title={`${booking.requestedTime} - ${booking.listing.title}`}
                        >
                          {booking.requestedTime}
                        </div>
                      ))}
                      {dateBookings.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{dateBookings.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>

      {monthBookings.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No bookings for this month</p>
      )}
    </div>
  );
};

export default BookingCalendar;

